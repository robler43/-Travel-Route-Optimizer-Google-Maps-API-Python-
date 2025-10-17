# 🚗 Travel Route Optimizer (Google Maps API + Python)

This project uses the **Google Maps Directions API** with Python to calculate and optimize the shortest driving route between multiple destinations. It tries all possible permutations of stops and finds the most efficient travel order while considering **real-time traffic conditions**.

---

## 📌 Features
- Calculates driving time between multiple cities or addresses.  
- Uses **real-time traffic data** from Google Maps (`departure_time=datetime.now()`).  
- Implements **caching** to minimize duplicate API calls and reduce costs.  
- Prints all possible travel routes with their total travel times.  
- Returns the **shortest route** and total travel time.  

---

## 🛠️ Requirements
- Python 3.8+  
- [Google Maps Python Client](https://github.com/googlemaps/google-maps-services-python)  

---

## ⚙️ Setup
1. Get a Google Maps API Key from Google Cloud Console.
2. Replace the API_KEY in app.py with your own key:

---

## 📂Sample Output:
"""
Route: Texas Tech University -> Dallas, TX -> Austin, TX, 6th Street -> Houston, TX -> Waco, TX | Time: 9.23 hours
Route: Texas Tech University -> Austin, TX, 6th Street -> Houston, TX -> Waco, TX -> Dallas, TX | Time: 8.76 hours
...

Best Route Found:
Texas Tech University -> Austin, TX, 6th Street -> Houston, TX -> Waco, TX -> Dallas, TX
Total Travel Time: 8.76 hours
"""

---

## 🚀 Future Improvements
- Design & Apply a responsive UI with customer centered experience
