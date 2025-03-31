from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Trips
from .utils import get_route, get_route2
from .serializer import TripsSerializer
import polyline
from datetime import datetime, timedelta

#constant variables as per FMCS
HOURS_LIMIT = 70  # 70-hour max in 8 days
DAILY_DRIVE_LIMIT = 11  # Max 11 hours per day
DAILY_REST = 10  # Mandatory 10-hour rest
BREAK_REQUIRED = 8  # 30-min break after 8 hours
FUEL_INTERVAL = 1000  # Refuel every 1,000 miles

# Create your views here.
class tripView(APIView):
    '''
    class tripview for trip end points, post, get, delete & put
    '''
    def post(self, request):
        '''
        method:post
        description: to handle post request of trip
        args:
            request: the comming request
        returns:
            the newly created trip id
        '''
        
        if not request.data :
            return Response({'error': 'No data received'}, status=status.HTTP_400_BAD_REQUEST)
        
        print('request data:', request.data)
        
        serializer = TripsSerializer(data=request.data)
        if serializer.is_valid():
            trip = serializer.save()
            return Response({"trip_id": trip.id}, status=status.HTTP_201_CREATED)
        return Response({'error': str(serializer.errors)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

    def calculateFuleStopsBreaks(self, route_data, log_sheet):
        '''
        method: calculateFuleStopsBreaks
        description: method used to calculate fuel stops and break
        args:
            route: the route returned by ors
            log_sheet: the given log sheet
        returns:
            the route coordinates, fuel stops
        '''
        total_distance = route_data["routes"][0]["summary"]["distance"] / 1609  # Convert meters to miles
        # Decode the polyline-encoded geometry
        coordinates = polyline.decode(route_data["routes"][0]["geometry"])
        
        #coordinates = route_data["routes"][0]["geometry"]["coordinates"]
        
        stops = []
        breaks = []
        fuel_step = 1000 # Every 1,000 miles
        breaks_step = 480 # Every 8 hours (assuming 60mph)  
        
        fuel_needed = total_distance // fuel_step
        break_needed = total_distance // breaks_step 
        step_distance = total_distance / len(coordinates) 

        if fuel_needed > 0:
            stop_index = 0
            for i in range(int(fuel_needed)):
                stop_index += int(fuel_step / step_distance)
                if stop_index < len(coordinates):
                    stops.append(coordinates[stop_index])

        if break_needed > 0:
            break_index = 0
            for i in range(int(break_needed)):
                break_index += int(breaks_step / step_distance)
                if break_index < len(coordinates):
                    breaks.append(coordinates[break_index])


        return {
            "route": coordinates,
            "fuel_stops": stops,
            "breaks": breaks,
            "log_sheet": log_sheet
        }

    def get(self, request, id):
        '''
        method:get
        description: to handle get request of trip
        args:
            request: the comming request
        returns:
            the trip
        '''
        tp = Trips.objects.get(id=id)
        route = get_route2(tp.pickup_location_latitude, tp.pickup_location_longitude, tp.dropoff_location_latitude, tp.dropoff_location_longitude)
        if not route:
            return Response({"error": "Failed to fetch route"}, status=status.HTTP_400_BAD_REQUEST)
        
        cycle_used = tp.current_cycle_used
        total_dur = route["routes"][0]["summary"]["duration"] / 3600 # convert seconds to hour
        total_hrs = float(cycle_used) + float(total_dur)

        if total_hrs > HOURS_LIMIT:
            return Response({"error": "Trip exceeds FMCSA 70-hour rule"}, status=status.HTTP_400_BAD_REQUEST)

        tp.total_distance = route["routes"][0]["summary"]["distance"] / 1609 # convert meter to miles
        tp.total_duration = total_dur 
        tp.save()

        #calculate log sheet
        log_sheet = []
        hours_left = HOURS_LIMIT - cycle_used
        current_time = datetime.utcnow()
        daily_hours = 0
        total_hours = 0
        fuel_count = 0
        estimated_speed = 60  # Avg speed in mph

        while (total_dur > 0 and hours_left > 0):
            entry = {"date": current_time.strftime("%Y-%m-%d %H:%M:%S"), "status": "Driving"}
            log_sheet.append(entry)
            drive_time = min(total_dur, DAILY_DRIVE_LIMIT, hours_left)

            # Simulate driving
            total_dur -= drive_time
            hours_left -= drive_time
            total_hours += drive_time
            daily_hours += drive_time
            current_time += timedelta(hours=drive_time)

            # 30-min break after 8 hours
            if daily_hours >= BREAK_REQUIRED:
                log_sheet.append({"date": current_time.strftime("%Y-%m-%d %H:%M:%S"), "status": "Break"})
                current_time += timedelta(minutes=30)
                daily_hours = 0

            # Fueling Stop
            if total_dur >= FUEL_INTERVAL / estimated_speed:
                fuel_count += 1
                log_sheet.append({"date": current_time.strftime("%Y-%m-%d %H:%M:%S"), "status": "Fueling"})
                current_time += timedelta(minutes=30)  # Assume 30-min refuel

            # Rest Break (10 hours per day)
            if total_hours >= DAILY_DRIVE_LIMIT:
                log_sheet.append({"date": current_time.strftime("%Y-%m-%d %H:%M:%S"), "status": "Rest"})
                current_time += timedelta(hours=DAILY_REST)
                total_hours = 0



        #calculate Fuel stops & breaks
        return Response(self.calculateFuleStopsBreaks(route, log_sheet), status=status.HTTP_200_OK)
