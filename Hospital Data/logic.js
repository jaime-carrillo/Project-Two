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

// Store API query variables
var baseURL = "http://127.0.0.1:5000";
var option = "/api/v1.0/ed";

// Assemble API query URL
var url = baseURL + option

// console.log(url)

// d3.json(url, function(x) {
//     for (var i = 0; i < x.length; i++) {

//         // Set the data location property to a variable
//         console.log(x)
//     }
// })

// Grab the data with d3
d3.json(url, function(response) {

    // Create a new marker cluster group
    var markers = L.markerClusterGroup();

    // Loop through data
    for (var i = 0; i < response.length; i++) {

        // Set the data location property to a variable
        var lat = response[i].LATITUDE;
        var lon = response[i].LONGITUDE;

        // Check for location property
        if (location) {

            // Add a new marker to the cluster group and bind a pop-up
            markers.addLayer(L.marker([lat, lon])
                .bindPopup(response[i].descriptor));
        }

    }

    // Add our marker cluster layer to the map
    myMap.addLayer(markers);

});