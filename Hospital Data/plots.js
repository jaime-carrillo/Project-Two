// Store API query variables
var baseURL = "http://127.0.0.1:5000";
var option = "/api/v1.0/ed";

// Assemble API query URL
var url = baseURL + option

console.log(url)
d3.json(option, function(data) {
    console.log(data)
})



// // Use filter() to pass the function as its argument
// var hospitals = data.filter(id);

// //  Check to make sure your are filtering your movies.
// console.log(id);

// // Use the map method with the arrow function to return all the filtered movie titles.
// var visits = data.map(visit =>  movies.title);

// // Use the map method with the arrow function to return all the filtered movie metascores.
// var ratings = filteredMovies.map(movies => movies.metascore);

// // Check your filtered metascores.
// console.log(ratings);

// // Create your trace.
// var trace = {
//   x: titles,
//   y: ratings,
//   type: "bar"
// };

// // Create the data array for our plot
// var data = [trace];

// // Define the plot layout
// var layout = {
//   title: "The highest critically acclaimed movies.",
//   xaxis: { title: "Title" },
//   yaxis: { title: "Metascore (Critic) Rating"}
// };

// // Plot the chart to a div tag with id "bar-plot"
// Plotly.newPlot("bar-plot", data, layout);



