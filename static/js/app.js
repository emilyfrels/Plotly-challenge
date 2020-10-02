// console.log because we can
console.log("Belly Button Biodiversity Dashboard - this is app.js");

// DISCLAIMER: MUCH OF THE BELOW CODE IS FROM DOM'S EXPERTISE DURING OFFICE HOURS WHILE HE WALKED US THROUGH THIS HOMEWORK

// function to initialize dashboard on webpage
function InitDashboard() {
    
    console.log(`Calling InitDashboard()`);

    // define variable to grab the selector so we can map the data to it
    var selector = d3.select("#selDataset");

    // read in samples.json
    d3.json("samples.json").then((data) => {

        // check to make sure we're reading in the data
        console.log(data);
    });
}

InitDashboard();