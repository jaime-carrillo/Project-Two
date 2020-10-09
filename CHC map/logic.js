// Create a map object
var myMap = L.map("map", {
  center: [34.05, -118.24],
  zoom: 10 
});

// Add a tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 15,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// An array containing each clinic's name, location, and address
var clinics = [{
  location: [33.9855537, -118.2561492],
  name: "Central City Community Health Center",
  address: "5970 S Central Ave, Los Angeles"
},{
  location: [34.0413927, -118.0821561],
  name: "Central City Community Health Center",
  address: "1000 San Gabriel Blvd UNIT 200, Rosemead"
},{
  location: [34.1366539, -118.2402801],
  name: "Comprehensive Community Health Centers",
  address: "801 S Chevy Chase Dr #250, Glendale"
},{
  location: [34.0622278, -118.0495264],
  name: "Central City Community Health Center - El Monte",
  address: "10050 Garvey Ave #111, El Monte"
},{
  location: [34.1775883, -118.1509283],
  name: "Wesley Health Centers - Pasadena",
  address: "1845 N Fair Oaks Ave, Pasadena"
},{
  location: [34.0088578, -118.3390703],
  name: "Watts Healthcare Crenshaw Community Health Center",
  address: "3756 Santa Rosalia Dr #400, Los Angeles"
},{
  location: [34.1391136, -118.2039119],
  name: "Comprehensive Community Health Centers, Inc.",
  address: "1704 Colorado Blvd, Eagle Rock"
},{
  location: [34.0019635, -118.0846602],
  name: "Community Health Clinic",
  address: "Pico Rivera"
},{
  location: [34.0559882, -118.2750503],
  name: "Angeles Community Health Center",
  address: "1919 W 7th St 2nd & 3rd floor, Los Angeles"
},{
  location: [34.02606, -118.2531051],
  name: "Universal Community Health Center",
  address: "1005 E Washington Blvd suite a, Los Angeles"
},{
  location: [34.1213389, -118.2048862],
  name: "Comprehensive Community Health Centers - Highland Park",
  address: "5059 York Blvd, Highland Park"
},{
  location: [34.0198871, -118.2627435],
  name: "Universal Community Health Center",
  address: "2801 San Pedro St, Los Angeles"
},{
  location: [34.0762215, -118.3735073],
  name: "Saban Community Clinic - Beverly Health Center",
  address: "8405 Beverly Blvd, Los Angeles"
},{
  location: [34.0553964, -118.2709695],
  name: "Comprehensive Community Health Centers",
  address: "1614 Wilshire Blvd, Los Angeles"
},{
  location: [34.0244737, -118.156277],
  name: "Via Care Community Health Center",
  address: "607 S Atlantic Blvd, East Los Angeles"
}, {
  location: [34.1418516, -118.085342],
  name: "Community Health Alliance of Pasadena",
  address: "3160 E Del Mar Blvd Suite 100, Pasadena"
}, {
  location: [33.8812618, -118.2925387],
  name: "Angeles Community Health Center",
  address: "1030 W Gardena Blvd, Gardena"
}, {
  location: [34.0073123, -118.2661803],
  name: "Kedren Community Health Center Inc.",
  address: "4211 S Avalon Blvd, Los Angeles"
}, {
  location: [33.9038706, -118.2160379],
  name: "JMK COMMUNITY HEALTH CENTER",
  address: "1112 N Santa Fe Ave, Compton"
}, {
  location: [33.9504913, -118.1632876],
  name: "Complete Care Community Health Center",
  address: "5831 Firestone Blvd ste e, South Gate"
}
];

// Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
for (var i = 0; i < clinics.length; i++) {
  var clinic = clinics[i];
  L.marker(clinic.location)
    .bindPopup("<h1>" + clinic.name + "</h1> <hr> <h3>Address: " + clinic.address + "</h3>")
    .addTo(myMap);
}
