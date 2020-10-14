// Store API query variables
var baseURL = "http://127.0.0.1:5000";
var option = "/api/v1.0/hospitals&encounters";

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
        //console.log(importedData)
        // console.log(importedData.samples.otu_ids)
        // console.log(importedData.samples[0].sample_values)

        // arr = []
        // for (i = 0; i < importedData.length; i++) {
        //     var ids = importedData[i].ID
        //     arr.push(ids)
        // }
        // console.log(arr)

        // Use the map method with the arrow function to return all the filtered movie titles.
        //var ids = Object.keys(importedData)
        // console.log(ids)

        // var values = ids.map(id => id.NET_TOT)
        //console.log(values)

        //var beds = importedData.map(d => d.Total_beds)

        // var ids = importedData[0].ID
        // var values = importedData[0].Net_Total
        //console.log(values)
        labels = []
        values = []
        beds = []
        ids = []
        importedData.forEach(function(obj) {
            var label = obj.FACILITY_NAME
            labels.push(label)

            var value = obj.NET_TOT
            values.push(value)

            var bed = obj.TOTAL_NUMBER_BEDS
            beds.push(bed)

            var id = obj.ID
            ids.push(id)
        });
        console.log(ids);

        // create labels
        //var labels = importedData.map(d => d.FACILITY_NAME)
        // console.log(labels)

        // Create your trace.
        var trace = {
            x: values,
            y: ids,
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
            }
        };

        // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar", data, layout);

        // Create data array for bubble chart
        var trace1 = {
            x: ids,
            y: values,
            mode: "markers",
            marker: {
                size: beds,
                color: ids
            },
            text: importedData[0].ids

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
        var demoData = data;
        // console.log(demoData)

        // demoData = []
        // importedData.forEach(function(obj) {
        //     demoData.push(obj)
        // })

        // define variable to filter data
        var info = demoData.filter(d => d.toString() === id)[0];
        // console.log(info[0].ID)

        // select demographic data
        var demoInfo = d3.select("#sample-metadata");

        //clear demographic info before update
        demoInfo.html("");

        // get demographic data for the id and append to panel
        Object.entries(info).forEach((key) => {
            demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1]);
        });

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
        ids = Object.keys(data)
        console.log(ids)

        //get ids for dropdow
        ids.forEach(function(ID) {
            dropdownMenu.append("option").text(ID).property("value");
        })

        // call functions to display plot
        getValues(ids);
        getData(ids);

    })
}

init();