// Store API query variables
var baseURL = "http://127.0.0.1:5000";
var option = "/api/v1.0/profiles";

// Assemble API query URL
var url = baseURL + option
console.log(url)

// d3.json(url).then(importedData => {
//     // console.log(importedData.names);
//     console.log(importedData[0])
// })



function getValues(id) {

    // Fetch the JSON data and console log it
    d3.json(url).then(importedData => {
        // console.log(importedData.names);
        // console.log(importedData)
        // console.log(importedData.samples.otu_ids)
        // console.log(importedData.samples[0].sample_values)

        labels = []
        values = []
        beds = []
        importedData.forEach(function(obj) {
            var label = obj.GEONAME
            labels.push(label)

            var value = obj.Median_incoms
            values.push(value)

            var bed = obj.Pop_Tot
            beds.push(bed)

        });

        // console.log(ids);

        // create labels
        //var labels = importedData.map(d => d.FACILITY_NAME)
        // console.log(labels)

        // Create your trace.
        var trace = {
            x: values,
            y: labels,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Create the data array for our plot
        var data = [trace];

        // Define the plot layout
        var layout = {
            title: "title",
            yaxis: {
                tickmode: "linear",
            },
            height: 1200,
            width: 800
        };

        // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar", data, layout);

        // Create data array for bubble chart
        var trace1 = {
            x: values,
            y: beds,
            mode: "markers",
            marker: {
                size: beds //,
                    //color: labels
            },
            text: importedData[0].GEONAME

        };

        var data1 = [trace1];
        //Creat layout of bubble chart
        var layout1 = {
            xaxis: { title: "OSHPID" },
            height: 800,
            width: 1200
        };

        //Plot bubble chart
        Plotly.newPlot("bubble", data1, layout1);

    })

}


// On change to the DOM, call getData()
function getData(id) {
    d3.json(url).then((data) => {
        // console.log(demoData)

        // demoData = data
        // console.log(data)

        demoData = []
        console.log(demoData)

        data.forEach(function(obj) {
            profile_dict = {}
            profile_dict["GEONAME"] = obj.GEONAME
            profile_dict["Pop_Tot"] = obj.Pop_Tot
                // profile_dict["Pop_Tot_Per"] = totP
                // profile_dict["Prop_65y"] = age
                // profile_dict["Prop_65y_rank"] = age_r
                // profile_dict["Poverty"] = poverty
                // profile_dict["Poverty_rank"] = povertyR
                // profile_dict["Median_incoms"] = mi
                // profile_dict["MI_rank"] = mirank
                // profile_dict["Farmers_market"] = market
                // profile_dict["Farmers_market_rank"] = marketrank
                // profile_dict["Food_insecurity"] = food
                // profile_dict["Food_insecurity_rank"] = foorank
                // profile_dict["School_Meals"] = meal
                // profile_dict["School_Meals_rank"] = mealrank
                // profile_dict["Health_index"] = idx
                // profile_dict["Health_index_rank"] = idxrank

            demoData.push(profile_dict)
                // console.log(profile_dict)
        })
        console.log(id)


        // define variable to filter data
        // var info = demoData.filter(d => d === id)[0];
        var info = demoData.filter(d => d.GEONAME == id)
            // console.log(info[0].ID)

        console.log(info[0].GEONAME)

        // select demographic data
        var demoInfo = d3.select("#sample-metadata");

        //clear demographic info before update
        demoInfo.html("");

        // get demographic data for the id and append to panel
        // Object.values(info).forEach((key) => {
        //     demoInfo.append("h5").text(info[0].GEONAME + ": " + info[1] + "\n")
        // });


        demoInfo.append("h5").text("Name: " + info[0].GEONAME + "\n" + "Total Population: " + info[0].Pop_Tot + "\n")

    })
}


//         // Enter a speed between 0 and 180
//         var level = info.wfreq * 20.5 //info.wfreq;

//         // Trig to calc meter point
//         var degrees = 180 - level,
//             radius = .5;
//         var radians = degrees * Math.PI / 180;
//         var x = radius * Math.cos(radians);
//         var y = radius * Math.sin(radians);
//         var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
//         // Path: may have to change to create a better triangle
//         var mainPath = path1,
//             pathX = String(x),
//             space = ' ',
//             pathY = String(y),
//             pathEnd = ' Z';
//         var path = mainPath.concat(pathX, space, pathY, pathEnd);

//         var data2 = [{
//                 type: 'scatter',
//                 x: [0],
//                 y: [0],
//                 marker: { size: 14, color: '850000' },
//                 showlegend: false,
//                 name: 'speed',
//                 text: level,
//                 hoverinfo: 'text+name'
//             },
//             {
//                 values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
//                 rotation: 90,
//                 text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
//                 textinfo: 'text',
//                 textposition: 'inside',
//                 marker: {
//                     colors: ['#699c2b', '#73a842',
//                         '#7fb356', '#8ebe6b', '#9fc97f', '#b2d494', '#c5dea8', '#dae7bd', '#f1f1d2',
//                         'rgba(0, 0, 0, 0)'
//                     ]
//                 },
//                 hoverinfo: 'label',
//                 hole: .5,
//                 type: 'pie',
//                 showlegend: false
//             }
//         ];

//         var layout2 = {
//             shapes: [{
//                 type: 'path',
//                 path: path,
//                 fillcolor: '850000',
//                 line: {
//                     color: '850000'
//                 }
//             }],
//             title: "Belly Button Washing Frequency",
//             subtitle: 'Plot Subtitle',
//             height: 400,
//             width: 400,
//             xaxis: {
//                 zeroline: false,
//                 showticklabels: false,
//                 showgrid: false,
//                 range: [-1, 1],
//                 titlefont: {
//                     title: 'x Axis',
//                     family: 'Courier New, monospace',
//                     size: 18,
//                     color: '#7f7f7f'
//                 }
//             },
//             yaxis: {
//                 zeroline: false,
//                 showticklabels: false,
//                 showgrid: false,
//                 range: [-1, 1]
//             }
//         };

//         //Plot gauge chart
//         Plotly.newPlot('gauge', data2, layout2);
//     });

// }

// create  function for change event
function optionChanged(id) {
    getValues(id);
    getData(id);
}


function init() {
    // Assign the value of the dropdown menu option to a variable
    var dropdownMenu = d3.select("#selDataset");

    // read the data 
    d3.json(url).then((data) => {

        names = []
        data.forEach(function(obj) {
                var label = obj.GEONAME
                names.push(label)
            })
            // console.log(names)

        //get ids for dropdow
        names.forEach(function(ID) {
            dropdownMenu.append("option").text(ID).property("value");
        })

        // call functions to display plot
        getValues(names[0]);
        getData(names[0]);

    })
}

// function init() {

//     var dropdown = d3.select("#selDataset");

//     d3.json("samples.json").then((data) => {

//         data.names.forEach(function(name) {
//             dropdown.append("option").text(name).property("value");
//         });

//         buildPlots(data.names[0]);
//         demoInfo(data.names[0])
//     });
// }


init();