// Store API query variables
var baseURL = "http://127.0.0.1:5000";
var option = "/api/v1.0/ed";

// Assemble API query URL
var url = baseURL + option
console.log(url)


//#############################################################
//Create function to get the values from the API
//#############################################################

function getValues(id) {

    // Fetch the JSON data and console log it
    d3.json(url).then(importedData => {
        // console.log(importedData)

        //Create arrays for charting
        labels = []
        id = []
        zip = []
        visits = []
        hospType = []
        hospSize = []
        medical = []
        medicare = []
        other = []
        self = []
        dx = []
        Hispanics = []
        NonHispanics = []

        //Create loop to append to each array for charting
        importedData.forEach(function(obj) {
            var label = obj.facility_name
            labels.push(label)

            var ids = obj.oshpd_id
            id.push(ids)

            var zips = obj.DBA_ZIP_CODE
            zip.push(zips)

            var visit = obj.ED_Visit
            visits.push(visit)

            var type = obj.control_type_desc
            hospType.push(type)

            var size = obj.licensed_bed_size
            hospSize.push(size)

            var cal = obj.Medi_Cal
            medical.push(cal)

            var care = obj.Medicare
            medicare.push(care)

            var ot = obj.Other_Payer
            other.push(ot)

            var pay = obj.SelfPay
            self.push(pay)

            var d = obj.DX_Symptoms
            dx.push(d)

            var his = obj.HispanicorLatino
            Hispanics.push(his)

            var non = obj.HispanicorNon
            NonHispanics.push(non)

        });

        //#############################################################
        // Create bar chart
        //#############################################################

        // Create trace for ED visits (1)
        var trace1 = {
            x: labels,
            y: visits,
            name: 'Emergency Room Visits',
            type: 'bar',
            text: visits.map(String),
            textposition: 'auto',
            hoverinfo: 'none',
            marker: {
                color: 'rgb(158,202,225)',
                opacity: 0.7,
                line: {
                    color: 'rgb(8,48,107)',
                    width: 1.5
                }
            }
        };

        // Create trace for hospital size (2)
        var trace2 = {
            x: labels,
            y: hospType,
            name: 'Hospital Type',
            type: 'bar',
            text: hospType.map(String),
            textposition: 'auto',
            hoverinfo: 'none',
            marker: {
                color: 'orange',
                opacity: 0.5,
                line: {
                    color: 'rgb(8,48,107)',
                    width: 1.5
                }
            }
        };

        var trace3 = {
            x: labels,
            y: hospSize,
            name: 'Hospital Size',
            type: 'bar',
            text: hospSize.map(String),
            textposition: 'auto',
            hoverinfo: 'none',
            marker: {
                color: 'orange',
                opacity: 0.5,
                line: {
                    color: 'rgb(8,48,107)',
                    width: 1.5
                }
            }
        };
        
        // Create the data array for our plot
        var data = [trace1, trace2, trace3];

        // Define the plot layout
        var layout = {
            title: "title",
            yaxis: {
                tickmode: "linear",
            },
            height: 500,
            width: 1000
        };

        // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar", data, layout);

        // // Create data array for bubble chart
        // var trace4 = {
        //     x: values,
        //     y: medical,
        //     text: medical.map(String),
        //     mode: 'markers',
        //     marker: {
        //         color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        //         size: population
        //     }
        // };

        // var data1 = [trace4];
        // //Creat layout of bubble chart
        // var layout1 = {
        //     xaxis: { title: "Title" },
        //     height: 800,
        //     width: 1200
        // };

        // //Plot bubble chart
        // Plotly.newPlot("bubble", data1, layout1);

        // var trace5 = {
        //     x: labels,
        //     y: dx,
        //     name: 'Symptoms',
        //     type: 'bar',
        //     text: dx.map(String),
        //     textposition: 'auto',
        //     hoverinfo: 'none',
        //     marker: {
        //         color: 'orange',
        //         opacity: 0.5,
        //         line: {
        //             color: 'rgb(8,48,107)',
        //             width: 1.5
        //         }
        //     }
        // }
        
        // function buildTable(Medi_Cal, Medicare, Private, Self_Pay) {
        //     var table = d3.select("#payer-table");
        //     var tbody = table.select("tbody");
        //     var trow;
        //     // for (var i = 0; i < 12; i++) {
        //       trow = tbody.append("tr");
        //       trow.append("td").text(Medi_Cal);
        //       trow.append("td").text(Medicare);
        //       trow.append("td").text(Private);
        //       trow.append("td").text(Self_Pay);
        //     }
        
        //   function buildPlot(){

        //     var Medi_Cal = [45]
        //     var Medicare = [16]
        //     var Private = [29]
        //     var Self_Pay = [8]
        //   }

    })
}

// #############################################################
// On change to the DOM, call getData()
// #############################################################

function getData(id) {
    d3.json(url).then((data) => {
        // console.log(data)

        //Create array for charting 
        demoData = []
        console.log(demoData)

        //Create loop to append to array for charting
        data.forEach(function(obj) {
            profile_dict = {}
            profile_dict["facility_name"] = obj.facility_name
            profile_dict["ED_Visit"] = obj.ED_Visit
            profile_dict["HispanicorLatino"] = obj.HispanicorLatino
            // profile_dict["Prop_65y"] = obj.Prop_65y
                //profile_dict["Prop_65y_rank"] = obj.Prop_65y_rank
                // profile_dict["Poverty"] = poverty
                // profile_dict["Poverty_rank"] = povertyR
            // profile_dict["Median_incoms"] = obj.Median_incoms
                // profile_dict["MI_rank"] = mirank
                // profile_dict["Farmers_market"] = market
                // profile_dict["Farmers_market_rank"] = marketrank
            // profile_dict["Food_insecurity"] = obj.Food_insecurity
                // profile_dict["Food_insecurity_rank"] = foorank
                // profile_dict["School_Meals"] = meal
                // profile_dict["School_Meals_rank"] = mealrank
            // profile_dict["Health_index"] = obj.Health_index
                // profile_dict["Health_index_rank"] = idxrank

            //Push to array
            demoData.push(profile_dict)
                // console.log(profile_dict)
        })
        console.log(id)

        //#############################################################
        // define variable to filter data
        //#############################################################

        // Filter by district name
        var info = demoData.filter(d => d.facility_name == id)
        console.log(info[0].facility_name)

        // select demographic data from list
        var demoInfo = d3.select("#sample-metadata");

        //clear demographic info before update
        demoInfo.html("");

        // get demographic data for the name and append to panel
        demoInfo.append("h4").text(info[0].facility_name)
            .append("h4").text("Total ED Visits: " + info[0].ED_Visit)
            .append("h5").text("Type of Hospital: " + info[0].control_type_desc)
            .append("h5").text("Hispanics: " + info[0].HispanicorLatino)
            .append("h6").text("DX Symptoms: " + info[0].DX_Symptoms)
            // .append("h6").text("Food Insecurity: " + info[0].Food_insecurity)
            // .append("h6").text("Health Index: " + info[0].Health_index)


        //#############################################################
        // Gauge for dynamic district
        //#############################################################

        // Enter a speed between 0 and 180
        // var level = info[0].Health_index * 1.71

        // Trig to calc meter point
        // var degrees = 180 - level,
        //     radius = .5;
        // var radians = degrees * Math.PI / 180;
        // var x = radius * Math.cos(radians);
        // var y = radius * Math.sin(radians);
        // var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
        // // Path: may have to change to create a better triangle
        // var mainPath = path1,
        //     pathX = String(x),
        //     space = ' ',
        //     pathY = String(y),
        //     pathEnd = ' Z';
        // var path = mainPath.concat(pathX, space, pathY, pathEnd);

        // //Create data for dynamic guage
        // var data2 = [{
        //         type: 'scatter',
        //         x: [0],
        //         y: [0],
        //         marker: { size: 14, color: '850000' },
        //         showlegend: false,
        //         name: 'Index',
        //         text: info[0].Health_index,
        //         hoverinfo: 'text+name'
        //     },
        //     {
        //         values: [1, 1, 1, 1, 1, 1, 6],
        //         rotation: 90,
        //         text: ['100', '80', '60', '40', '20', '0', ''],
        //         textinfo: 'text',
        //         textposition: 'inside',
        //         marker: {
        //             colors: ['#8ebe6b', '#9fc97f', '#b2d494', '#c5dea8', '#dae7bd', '#f1f1d2',
        //                 'rgba(0, 0, 0, 0)'
        //             ]
        //         },
        //         hoverinfo: 'label',
        //         hole: .5,
        //         type: 'pie',
        //         showlegend: false
        //     }
        // ];

        // //Create layout for dynamic guage
        // var layout2 = {
        //     shapes: [{
        //         type: 'path',
        //         path: path,
        //         fillcolor: 'rgba(0, 0, 0, 0)',
        //         line: {
        //             color: '850000'
        //         }
        //     }],
        //     title: info[0].GEONAME,
        //     subtitle: 'Plot Subtitle',
        //     height: 370,
        //     width: 370,
        //     xaxis: {
        //         zeroline: false,
        //         showticklabels: false,
        //         showgrid: false,
        //         range: [-1, 1],
        //         titlefont: {
        //             title: 'x Axis',
        //             family: 'Courier New, monospace',
        //             size: 18,
        //             color: '#7f7f7f'
        //         }
        //     },
        //     yaxis: {
        //         zeroline: false,
        //         showticklabels: false,
        //         showgrid: false,
        //         range: [-1, 1]
        //     }
        // };

        //Plot dynamic gauge chart
        Plotly.newPlot('gauge1', data2, layout2);

        //#############################################################
        // Gauge for Los Angles County Average
        //#############################################################
        var benchmark = 44.73372093
        var level = benchmark * 1.71

        // Trig to calc meter point
        var degrees = 180 - level,
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);
        var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
        // Path: may have to change to create a better triangle
        var mainPath = path1,
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX, space, pathY, pathEnd);

        //Create data for static guage
        var data2 = [{
                type: 'scatter',
                x: [0],
                y: [0],
                marker: { size: 14, color: '850000' },
                showlegend: false,
                name: 'Index',
                text: benchmark,
                hoverinfo: 'text+name'
            },
            {
                values: [1, 1, 1, 1, 1, 1, 6],
                rotation: 90,
                text: ['100', '80', '60', '40', '20', '0', ''],
                textinfo: 'text',
                textposition: 'inside',
                marker: {
                    colors: ['#8ebe6b', '#9fc97f', '#b2d494', '#c5dea8', '#dae7bd', '#f1f1d2',
                        'rgba(0, 0, 0, 0)'
                    ]
                },
                hoverinfo: 'label',
                hole: .5,
                type: 'pie',
                showlegend: false
            }
        ];

        //Create layout for static guage
        var layout2 = {
            shapes: [{
                type: 'path',
                path: path,
                fillcolor: 'rgba(0, 0, 0, 0)',
                line: {
                    color: '850000'
                }
            }],
            title: 'Los Angles County',
            subtitle: 'Plot Subtitle',
            height: 400,
            width: 400,
            xaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1],
                titlefont: {
                    title: 'x Axis',
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                }
            },
            yaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1]
            }
        };

        //Plot static gauge chart
        Plotly.newPlot('gauge2', data2, layout2);
    });
}

//#############################################################
// create  function for change event
//#############################################################

function optionChanged(id) {
    getValues(id);
    getData(id);
}
optionChanged()
//#############################################################
// create initial function to get data and display plots
//#############################################################
function init() {
    // Assign the value of the dropdown menu option to a variable
    var dropdownMenu = d3.select("#selDataset");

    // read the data 
    d3.json(url).then((data) => {

        names = []
        data.forEach(function(obj) {
                var label = obj.facility_name
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

init();