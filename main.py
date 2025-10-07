import googlemaps
from datetime import datetime
from itertools import permutations

API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")
map_client = googlemaps.Client(key=API_KEY)
get_duration_cache = {}

def get_duration(origin, destination):

    key = (origin, destination)
    #Check dictionary for duplicates to save runtime and reduce API calls
    if key in get_duration_cache:
        return get_duration_cache[key]

    directions_result = map_client.directions( #creates JSON object
        origin,
        destination,
        mode="driving",
        departure_time=datetime.now(), #Tells google to consider current traffic conditions
    )

    if directions_result:
        leg = directions_result[0]["legs"][0]
        duration = (leg["duration"]["value"])/3600 #get duration in minutes
        return float(duration)

def calculate_shortest_travel(origin, desinations):
    most_efficient_option = None
    shortest_time = float("inf")

    # Try all possible options of destinations
    for order in permutations(destinations):
        route = [origin] + list(order)
        print("the route: ", route)
        total = 0

        for i in range(len(route) - 1):  # calculating time for each permutation
            key = (route[i], route[i + 1])  # tuple for dictionary lookup

            if key in get_duration_cache:  # reuse stored duration
                duration = get_duration_cache[key]
            else:
                duration = get_duration(route[i], route[i + 1])
                get_duration_cache[key] = duration  # store in dict for future use
                reverse_key = (route[i + 1], route[i]) #reverse duration
                if reverse_key not in get_duration_cache:
                    get_duration_cache[reverse_key] = duration
            total += duration

        if total < shortest_time: #check which option is quickest
            shortest_time = total
            most_efficient_option = route

        print(f"Route: {' -> '.join(route)} | Time: {total:.2f} hours")

    print("\nBest Route Found:")
    print(" -> ".join(most_efficient_option))
    print(f"Total Travel Time: {shortest_time:.2f} hours")

    return most_efficient_option, shortest_time

origin = "Texas Tech University, Lubbock, TX"
destinations = [
    "Dallas, TX",
    "Austin, TX, 6th Street",
    "Houston, TX",
    "Waco, TX"]


calculate_shortest_travel(origin, destinations)
