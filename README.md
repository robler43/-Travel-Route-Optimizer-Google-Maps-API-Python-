# **🚗 Travel Route Optimizer (Google Maps API \+ Python)**

A Python application designed to calculate and optimize the shortest driving route between multiple destinations, utilizing real-time traffic data from the Google Maps Directions API. This tool guarantees the optimal route by evaluating all possible permutations.

## **📌 Features**

* **Exact Optimal Route:** Implements a permutation (brute-force) algorithm using itertools to evaluate all possible travel orders, guaranteeing the discovery of the absolute shortest route.  
* **Real-time Traffic:** Considers current, real-time traffic conditions by setting departure\_time=datetime.now() in the Directions API request for highly accurate travel time estimates.  
* **Intelligent Caching:** Uses a Python dictionary (and pickle for persistence) to cache travel times between every pair of locations. This drastically reduces redundant API calls, saving computation time and cost.  
* **Comprehensive Output:** Prints all possible travel routes along with their total travel times, clearly identifying and returning the **shortest route** found.  
* **Location Flexibility:** Handles both specific street addresses and common location names (cities, landmarks).

## **🛠️ Stack & Requirements**

This project requires a standard Python environment and the official Google Maps Client library.

* **Python:** 3.8+  
* **API:** Google Maps Directions API (API Key required)  
* **Python Libraries:**  
  * googlemaps (Google Maps Python Client)  
  * itertools (Standard library for permutations)  
  * datetime (Standard library for real-time traffic stamping)  
  * pickle (Standard library for travel time caching)

## **⚙️ Setup**

### **1\. API Key Acquisition**

You must obtain a **Google Maps API Key** from the Google Cloud Console and ensure the **Directions API** is enabled.

### **2\. Clone the Repository**

git clone \[https://github.com/robler43/Travel-Route-Optimizer-Google-Maps-API-Python.git\](https://github.com/robler43/Travel-Route-Optimizer-Google-Maps-API-Python.git)  
cd Travel-Route-Optimizer-Google-Maps-API-Python

### **3\. Install Dependencies**

pip install \-r requirements.txt

### **4\. Configuration**

Open the main application file (e.g., app.py) and replace the placeholder with your actual API Key:

API\_KEY \= "YOUR\_GOOGLE\_MAPS\_API\_KEY\_HERE"

### **5\. Run the Script**

python app.py

## **💡 Implementation Details**

The core functionality of the optimizer rests on three key components:

1. **Permutation Algorithm:** The script takes a list of destinations (excluding the fixed start/end points) and generates every possible sequence. If you have $N$ intermediate stops, it generates $(N\!)$ possible routes to test, guaranteeing the best solution (optimal for up to 8-10 stops).  
2. **API Handler with Caching:** Before making a Directions API request for the duration between two points (A to B), the application first checks the local **cache dictionary**. This ensures that if the time between A and B has already been calculated (and is still valid/recent), the API call is skipped, drastically improving performance and reducing costs.  
3. **Real-time Context:** By providing the Directions API with departure\_time=datetime.now(), the calculated travel times incorporate current traffic speeds, providing a highly accurate estimate for the immediate optimal route.

## **📂 Sample Output**

The program systematically logs each route evaluation before providing the final, optimized result.

Evaluating 120 possible routes...

Route 1: Texas Tech University \-\> Dallas, TX \-\> Austin, TX, 6th Street \-\> Houston, TX \-\> Waco, TX | Time: 9.23 hours  
Route 2: Texas Tech University \-\> Austin, TX, 6th Street \-\> Dallas, TX \-\> Waco, TX \-\> Houston, TX | Time: 9.01 hours  
Route 3: Texas Tech University \-\> Houston, TX \-\> Dallas, TX \-\> Waco, TX \-\> Austin, TX, 6th Street | Time: 9.35 hours  
...  
Route 118: Texas Tech University \-\> Waco, TX \-\> Houston, TX \-\> Austin, TX, 6th Street \-\> Dallas, TX | Time: 8.79 hours

\---  
Best Route Found:  
Texas Tech University \-\> Austin, TX, 6th Street \-\> Houston, TX \-\> Waco, TX \-\> Dallas, TX  
Total Travel Time: 8.76 hours

## **🚀 Future Improvements**

* **User Interface:** Design a responsive UI (e.g., using Flask/Django) with a customer-centered experience for inputting addresses and viewing results.  
* **Heuristic Algorithms:** Implement heuristic approaches (e.g., Genetic Algorithms, Simulated Annealing) to handle much larger datasets (10+ stops) where brute-force permutation becomes computationally infeasible.  
* **Map Visualization:** Integrate a map library (like Folium or Google Maps JavaScript API) to visualize the optimized route directly on a map.  
* **Multi-modal Support:** Extend functionality to support optimization across different transportation modes (driving, walking, cycling, public transit).
