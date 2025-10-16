let map, directionsService, directionsRenderer;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 31.9686, lng: -99.9018 }, // Center on Texas
    zoom: 6,
  });
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
}

window.onload = initMap;

// Add new destination input
document.getElementById("add-destination-btn").addEventListener("click", () => {
    const container = document.getElementById("destinations-container");
    const div = document.createElement("div");
    div.className = "destination-input";
    div.innerHTML = `
      <input type="text" class="destination" placeholder="Enter a destination">
      <button class="remove-btn">❌</button>
    `;
    container.appendChild(div);
  
    // Remove button functionality
    div.querySelector(".remove-btn").addEventListener("click", () => div.remove());
  
    // Initialize Google Places Autocomplete for the new input
    const newInput = div.querySelector(".destination");
    new google.maps.places.Autocomplete(newInput);
  });

// Calculate route
document.getElementById("calculate-btn").addEventListener("click", async () => {
  const origin = document.getElementById("origin").value;
  const destinations = Array.from(document.querySelectorAll(".destination"))
    .map(input => input.value.trim())
    .filter(Boolean);

  if (!origin || destinations.length < 2) {
    alert("Please enter an origin and at least 2 destinations.");
    return;
  }

  document.getElementById("result").innerHTML = "<p>⏳ Calculating best route...</p>";

  // Call backend
  const res = await fetch("/calculate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ origin, destinations }),
  });

  const data = await res.json();
  const { best_route, best_time, all_routes } = data;

  // Display best route
  let html = `
    <h3>✅ Best Route</h3>
    <p><strong>Total Travel Time:</strong> ${best_time} hours</p>
    <ol>${best_route.map(stop => `<li>${stop}</li>`).join("")}</ol>
  `;

  // Display all other slower routes
  html += `<h3>Other Routes</h3><ul>`;
  all_routes.forEach(r => {
    if (JSON.stringify(r.route) !== JSON.stringify(best_route)) {
      html += `<li>${r.route.join(" → ")} | ${r.time} hours</li>`;
    }
  });
  html += `</ul>`;

  document.getElementById("result").innerHTML = html;

  // Display best route on map
  const waypoints = best_route.slice(1, -1).map(city => ({ location: city, stopover: true }));

  directionsService.route(
    {
      origin: best_route[0],
      destination: best_route[best_route.length - 1],
      waypoints: waypoints,
      travelMode: "DRIVING",
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        alert("Directions request failed due to " + status);
      }
    }
  );
});

function initAutocomplete() {
    const originInput = document.getElementById("origin");
    new google.maps.places.Autocomplete(originInput);
  
    // Initialize autocomplete for all destination fields
    const destinationInputs = document.querySelectorAll(".destination");
    destinationInputs.forEach(input => {
      new google.maps.places.Autocomplete(input);
    });
  }
  
  // Call after page loads
  window.onload = () => {
    initMap();
    initAutocomplete();
  };



document.getElementById("loading").style.display = "block";
// hide later
document.getElementById("loading").style.display = "none";
