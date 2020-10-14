function init() {
    data = [{
        x: [CityCounty, District, Corporation, Investor, LLC, Non-Profit, UnivCalifornia],
        y: [3,1,14, 7,7,44,2] }];

    Plotly.newPlot("plot", data);

}

d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly() {
    var dropdownMenu = d3.select("#selDataset");

    var dataset = dropdownMenu.property("value");

    var x = [];
    var y = [];

    if (dataset === 'dataset1') {
        x = [CityCounty, District, Corporation, Investor, LLC, Non-Profit, UnivCalifornia];
        y = [3,1,14, 7,7,44,2];
    }

    if (dataset2 === 'dataset2') {
        x = [CityCounty, District, Corporation, Investor, LLC, Non-Profit, UnivCalifornia];
        y = [258031, 114007, 372357, 141153, 133390, 2140346, 78766];
    }

    Plotly.restyle("plot", "x", [x]);
    Plotly.restyle("plot", "y", [y]);

}

init();