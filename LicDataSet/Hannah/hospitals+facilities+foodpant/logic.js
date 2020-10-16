// Creating map object
var myMap = L.map("map", {
  center: [34.05, -118.24],
  zoom: 11
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// function mapLoad() {
//   var facilities = new L.LayerGroup();
//   var hospitals = new L.LayerGroup();
// }

// Store API query variables
var facURL = "http://127.0.0.1:5000/api/v1.0/facilities";
var hosURL = "http://127.0.0.1:5000/api/v1.0/hospitals";
var foodURL = "http://127.0.0.1:5000/api/v1.0/food";

// Grab the data with d3
d3.json(facURL, function(response) {

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var lat = response[i].LATITUDE;
    var lon = response[i].LONGITUDE;
    // console.log(lat)

    // Check for location property
    if (lat) {

      //Icon for hospital markers
      var chcIcon = new L.Icon({
        iconSize: [27, 27],
        iconAnchor: [13, 27],
        popupAnchor:  [1, -24],
        iconUrl: 'clinic.png'
    });

      // Add a new marker to the cluster group and bind a pop-up
      var marker = L.marker([lat,lon],{icon: chcIcon}).addTo(myMap);

      // Binding a pop-up to our marker
    marker.bindPopup(response[i].Name);

  }

}
});

// Grab the data with d3
d3.json(hosURL, function(response) {

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var lat = response[i].LATITUDE;
    var lon = response[i].LONGITUDE;
    // console.log(lat)

    // Check for location property
    if (lat) {

      //Icon for hospital markers
      var chcIcon = new L.Icon({
        iconSize: [27, 27],
        iconAnchor: [13, 27],
        popupAnchor:  [1, -24],
        iconUrl: 'hospital.png'
    });

      // Add a new marker to the cluster group and bind a pop-up
      var marker = L.marker([lat,lon],{icon: chcIcon}).addTo(myMap);

      // Binding a pop-up to our marker
    marker.bindPopup(response[i].FACILITY_NAME);

  }

}


});

// Grab the data with d3
d3.json(foodURL, function(response) {

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var lat = response[i].Latitude;
    var lon = response[i].Longitude;
    console.log(lat)

    // Check for location property
    if (lat) {

      //Icon for hospital markers
      var foodIcon = new L.Icon({
        iconSize: [27, 27],
        iconAnchor: [13, 27],
        popupAnchor:  [1, -24],
        iconUrl: 'carrot.png'
    });

      // Add a new marker to the cluster group and bind a pop-up
      var marker = L.marker([lat,lon],{icon: foodIcon}).addTo(myMap);

      // Binding a pop-up to our marker
    marker.bindPopup(response[i].name);

  }

}


});
// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function () {

//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = ["Hospital", "Community Health Clinic", "Food Pantry"],
//         labels = ["hospital.png","clinic.png", "carrot.png"];

//     // // loop through our density intervals and generate a label with a colored square for each interval
//     // for (var i = 0; i < grades.length; i++) {
//     //     div.innerHTML +=
//     //         grades[i] + (" <img src="+ labels[i] +" height='50' width='50'>") +'<br>';
//     // }

//     return div;
// };

// legend.addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div legend");
    // var limits = geojson.options.limits;
    // var colors = geojson.options.colors;
    // var labels = [];

    // Add min & max
    var legendInfo = "<h1>Median Income</h1>" +
      "<div >" +
        "<div class=legend></div>" +
        "<div >hi</div>" +
      "</div>";

    div.innerHTML = legendInfo};

    legend.addTo(myMap);