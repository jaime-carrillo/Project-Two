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
    d3.json(url, function(response) {

        // var parentGroup = L.markerClusterGroup()

        // Create feature group
        test = L.featureGroup(getArrayOfMarkers())

        // test = L.featureGroup.subGroup(
        //     parentGroup,
        //     getArrayOfMarkers()
        // )

        //Create function to get an array of the lat and lon

        function getArrayOfMarkers() {
            var result = [];
            var popup = [];

            for (var i = 0; i < response.length; i += 1) {

                if (location) {
                    var lat = response[i].LATITUDE;
                    var lon = response[i].LONGITUDE;
                    var name = response[i].FACILITY_NAME

                    result.push(L.marker([lat, lon]));
                    popup.push(name);
                    //result.push([lat, lon])

                }
            }
            return result;
        }

        //Create function to get faclity name for popups

        function getPopups() {
            var popup = [];

            for (var i = 0; i < response.length; i += 1) {

                if (location) {
                    var name = response[i].FACILITY_NAME
                    popup.push(name);

                }
            }
            // console.log(popup)
            return popup;
        }

        test.bindPopup(getPopups()).openPopup();


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



// var map = L.map("map"),
//   parentGroup = L.markerClusterGroup(options), // Could be any other Layer Group type.
//   // This is where the magic happens!
//   mySubGroup = L.featureGroup.subGroup(parentGroup, arrayOfMarkers);

// parentGroup.addTo(map);
// mySubGroup.addTo(map);



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