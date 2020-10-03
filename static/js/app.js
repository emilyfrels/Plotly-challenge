// console.log because we can
console.log("Belly Button Biodiversity Dashboard - this is app.js");

// DISCLAIMER: MUCH OF THE BELOW CODE IS FROM DOM'S EXPERTISE DURING OFFICE HOURS WHILE HE WALKED US THROUGH THIS HOMEWORK

// function to draw bar graph
function DrawBargraph(sampleId) {

    console.log(`DrawBargraph(${sampleId})`);
}

// function to draw bubble chart
function DrawBubblechart(sampleId) {

    console.log(`DrawBubblechart(${sampleId})`);
}

// function to display meta data
function ShowMetaData(sampleId) {

    console.log(`ShowMetaData(${sampleId})`);
}

// function for when user selects new option in dropdown (our event listener for when user selects a new option from dropdown)
function optionChanged(newSampleId) {

    console.log(`User selected ${newSampleId}`);

    // draw graphs on change and show meta data
    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    ShowMetaData(newSampleId);
}

// function to initialize the page
function InitDashboard() {
    
    // track where we are in the code
    console.log(`Calling InitDashboard()`);

    // define variable to grab the selector so we can map the data to it
    var selector = d3.select("#selDataset");

    // read in samples.json
    d3.json("samples.json").then((data) => {

        // check to make sure we're reading in the data
        console.log(data);

        // create variable for sample names
        var sampleNames = data.names;

        // assign where sample names will go
        sampleNames.forEach((sampleId) => {

            // for each sample id, enter the value into the 'option' element for our dropdown in our selector
            selector.append("option").text(sampleId).property("value", sampleId);
            
        });

        // create variable for sampleId and grab first sampleId
        var sampleId = sampleNames[0];
        console.log("Starting sample: ", sampleId);

        // draw bar graph
        DrawBargraph(sampleId);

        //draw bubble chart
        DrawBubblechart(sampleId);

        // display meta data
        ShowMetaData(sampleId);
    });
}

// call the InitDashboard() function
InitDashboard();