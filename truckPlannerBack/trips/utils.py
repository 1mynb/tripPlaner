import requests
from geopy.geocoders import Nominatim


ORS_API_KEY = '5b3ce3597851110001cf6248561f33508efa414caa5ba5ef9520a5b8'


def get_coordinates(addr):
    '''
    method:get_coordinates
    desc: method used to get coordinates from given address using geopy
    args: 
        addr (string) - the given address
    returns: 
        the coordinates of the given address
    '''
    geoloc = Nominatim(user_agent='truckerapp')
    loc = geoloc.geocode(addr)
    if loc:
        return (loc.latitude, loc.longitude)
    return None

def get_route(pickup, dropoff):
    '''
    method: get_route
    desc: method used to get routes using open route service
    args:
        pickup (string): the given pickup address
        dropoff (string): the given dropoff address
    returns:
        the routes from start to end location
    '''
    pickup_coords = get_coordinates(pickup)
    dropoff_coords = get_coordinates(dropoff)

    #print(f'pickup_coords: {pickup_coords}')
    #print(f'dropoff_coords: {dropoff_coords}')

    if not pickup_coords or not dropoff_coords:
        return None

    url = "https://api.openrouteservice.org/v2/directions/driving-car/json"
    payload = {
        "coordinates": [[pickup_coords[1], pickup_coords[0]],  # Convert to (lon, lat)
                        [dropoff_coords[1], dropoff_coords[0]]],
        "radiuses": [3000, 3000]  # Increase search radius
    }

    headers = {
        "Authorization": ORS_API_KEY,
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)
    data = response.json()

    #print(data)

    if "routes" in data and data["routes"]:
        return data  # Return full route data
    else:
        #print('routes not defined')
        return None

def get_route2(pickup_lat, pickup_log, dropoff_lat, dropoff_log):
    '''
    method: get_route
    desc: method used to get routes using open route service
    args:
        pickup_lat (float): the given pickup latitude
        dropoff_lat (float): the given dropoff latitude
        pickup_log (float): the given pickup longitude
        dropoff_log (float): the given dropoff longitude
    returns:
        the routes from start to end location
    '''
    

    url = "https://api.openrouteservice.org/v2/directions/driving-car/json"
    payload = {
        "coordinates": [[pickup_log, pickup_lat],  # Convert to (lon, lat)
                        [dropoff_log, dropoff_lat]],
        "radiuses": [3000, 3000]  # Increase search radius
    }

    headers = {
        "Authorization": ORS_API_KEY,
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)
    data = response.json()

    #print(data)

    if "routes" in data and data["routes"]:
        return data  # Return full route data
    else:
        return None



