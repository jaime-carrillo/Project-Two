var url = "http://127.0.0.1:5000//api/v1.0/hd";

// read json from url
// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// // Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);


var data = [{
  values: [data.Percent]
  labels: [data.HealthDistrict],
  domain: {column: 0},
  name: 'Los Angeles County',
  hoverinfo: 'label+percent+name',
  hole: .4,
  type: 'pie'
}];

var layout = {
  title: 'Percent of Adults Reported Having Trouble Obtaining Need Medical Care',
  annotations: [
    {
      font: {
        size: 20
      },
      showarrow: false,
      text: 'LA County',
      x: 0.17,
      y: 0.5
    },

  ],
  height: 400,
  width: 600,
  showlegend: false,
  grid: {rows: 1, columns: 2}
};

Plotly.newPlot('myDiv', data, layout);