from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Trips
from .utils import get_route, get_route2
from .serializer import TripsSerializer

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
        # data = request.data
        # trip = Trips.objects.create(
        #     current_location = data["current_location"],
        #     pickup_location = data["pickup_location"],
        #     dropoff_location = data["dropOff_location"],
        #     current_cycle_used = data["current_cycle_used"]

        #     current_location_latitude = data["current_location_latitude"],
        #     pickup_location_latitude = data["pickup_location_latitude"],
        #     dropoff_location_latitude = data["dropOff_latitude"],

        #     current_location_longitude = data["current_location_longitude"],
        #     pickup_location_longitude = data["pickup_location_longitude"],
        #     dropoff_location_longitude = data["dropOff_longitude"],
            
        # )

        # route = get_route(trip.pickup_location, trip.dropOff_location)
        # if not route:
        #     return Response({"error": "Failed to fetch route"}, status=status.HTTP_400_BAD_REQUEST)
            
        # trip.total_distance = route["routes"][0]["summary"]["distance"] / 1609 # convert meter to miles
        # trip.total_duration = route["routes"][0]["summary"]["duration"] / 3600 # convert seconds to hour

        if not request.data :
            return Response({'error': 'No data received'}, status=status.HTTP_400_BAD_REQUEST)
        
        print('request data:', request.data)
        
        serializer = TripsSerializer(data=request.data)
        if serializer.is_valid():
            trip = serializer.save()
            return Response({"trip_id": trip.id}, status=status.HTTP_201_CREATED)
        return Response({'error': str(serializer.errors)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

    
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

        if total_hrs > 70:
            print("Trip exceeds FMCSA 70-hour rule", total_dur)
            return Response({"error": "Trip exceeds FMCSA 70-hour rule"}, status=status.HTTP_400_BAD_REQUEST)

        tp.total_distance = route["routes"][0]["summary"]["distance"] / 1609 # convert meter to miles
        tp.total_duration = route["routes"][0]["summary"]["duration"] / 3600 # convert seconds to hour
        tp.save()
        return Response(route, status=status.HTTP_200_OK)
