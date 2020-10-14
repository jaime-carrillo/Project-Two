// Load in geojson data for income
var geoData = "static/data/Median_Household_Income_2016.geojson";

// Grab data with d3

d3.json(geoData, function(income_data) {

    // Create a new choropleth layer
    var income = L.choropleth(income_data, {

            // Define what  property in the features to use
            valueProperty: "MHI2016",

            // Set color scale
            scale: ["#00c7ff", "#94003a"],

            // Number of breaks in step range
            steps: 6,

            // q for quartile, e for equidistant, k for k-means
            mode: "q",
            style: {
                // Border color
                color: "#fff",
                weight: 1,
                fillOpacity: 0.7
            },

            // Binding a pop-up to each layer
            onEachFeature: function(feature, layer) {
                layer.bindPopup("Zip Code: " + feature.properties.ZIP + "<br>Median Household Income:<br>" +
                    "$" + feature.properties.MHI2016);
            }
        }) //.addTo(myMap);

    //Set up Service Planning Area boundries
    var spa_link = "static/data/spa.geojson"

    //set up color function for each area
    function chooseColor(objectid) {
        switch (objectid) {
            case "1":
                return "orange";
            case "2":
                return "yellow";
            case "3":
                return "green";
            case "4":
                return "purple";
            case "5":
                return "green";
            case "6":
                return "yellow";
            case "7":
                return "orange";
            case "8":
                return "purple";
            default:
                return "grey";
        }
    }


    d3.json(spa_link, function(spa_data) {
        console.log(spa_data)
        spa = L.geoJson(spa_data, {
                style: function(feature) {
                    return {
                        color: chooseColor(feature.properties.objectid),
                        //fillColor: "blue", //chooseColor(feature.properties.area),
                        fillOpacity: 0,
                        weight: 3
                    }
                },
                onEachFeature: function(feature, layer) {
                    layer.on({
                        mouseover: function(event) {
                            layer = event.target
                            layer.setStyle({
                                fillOpacity: .5
                            });
                        },
                        mouseout: function(event) {
                                layer = event.target
                                layer.setStyle({
                                    fillOpacity: 0
                                })
                            }
                            // ,
                            // click: function(event) {
                            //     myMap.fitBounds(event.target.getBounds())
                            // }
                    });
                    layer.bindPopup("<h1>" + feature.properties.spa_name + " (" + feature.properties.abbv + ")" + "</h1>")
                }
            }) //.addTo(myMap)
    });

    // Store API query variables
    var baseURL = "http://127.0.0.1:5000";
    var option = "/api/v1.0/hospitals";

    // Assemble API query URL
    var url = baseURL + option
    console.log(url)

    // Grab the data with d3
    var test = d3.json(url, function(response) {

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
                    .bindPopup(response[i].FACILITY_NAME));
            }

        }

        // Add our marker cluster layer to the map
        // myMap.addLayer(markers);

    });

    //Set up health distric boundries
    var link = "static/data/hd.geojson"

    d3.json(link, function(data) {
        console.log(data)
        health_districts = L.geoJson(data, {
                style: function(feature) {
                    return {
                        color: "black",
                        //fillColor: "blue", //chooseColor(feature.properties.borough),
                        fillOpacity: 0,
                        weight: 2
                    }
                },
                onEachFeature: function(feature, layer) {
                    layer.on({
                        mouseover: function(event) {
                            layer = event.target
                            layer.setStyle({
                                fillOpacity: .5
                            });
                        },
                        mouseout: function(event) {
                                layer = event.target
                                layer.setStyle({
                                    fillOpacity: 0
                                })
                            }
                            // ,
                            // click: function(event) {
                            //     myMap.fitBounds(event.target.getBounds())
                            // }
                    });
                    layer.bindPopup("<h1>" + feature.properties.hd_name + " (" + feature.properties.hd_2012 + ")" + "</h1>")
                }
            }) //.addTo(myMap)

        // Sending income, districts, and spa layer to the createMap function
        createMap(income, health_districts, spa, test);
    });

});

function createMap(income, health_districts, spa, test) {

    // Create tile layer
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    })

    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Ligh map": lightmap
    };

    // Create an overlays object to add to the layer control
    var overlays = {
        "Income": income,
        "Health Districts": health_districts,
        "Service Planning Area": spa,
        "Hospitals": test
    };


    // Create the map with our layers
    var myMap = L.map("map", {
        center: [34.26, -118.243683],
        zoom: 9.5,
        layers: [
            lightmap,
            income,
            health_districts,
            spa,
            test
        ]
    });


    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlays, {
        collapsed: false
    }).addTo(myMap);

    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var limits = income.options.limits;
        var colors = income.options.colors;
        var labels = [];

        // Add min & max
        var legendInfo = "<h1>Median Income</h1>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
            "</div>";

        div.innerHTML = legendInfo;

        limits.forEach(function(limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);
}