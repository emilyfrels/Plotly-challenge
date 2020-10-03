// console.log because we can
console.log("Belly Button Biodiversity Dashboard - this is app.js");

// DISCLAIMER: MUCH OF THE BELOW CODE IS FROM DOM'S EXPERTISE DURING OFFICE HOURS WHILE HE WALKED US THROUGH THIS HOMEWORK

// function to draw bar graph
function DrawBargraph(sampleId) {

    // console.log to make sure we're drawing bar graph for selected sample
    console.log(`DrawBargraph(${sampleId})`);

    // call for data for bar graph
    d3.json("samples.json").then((data) => {
        
        // console.log("Data for bar graph: ");
        // console.log(data);

        // variable to find the sample data
        var samples = data.samples;

        // filter to find the samples associated to the sample ID
        var resultArray = samples.filter(s => s.id == sampleId);

        // variable to return the first result of the sample
        var result = resultArray[0];

        // variables for the values and labels for the bar graph
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;

        var yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();
        
        // variable for the sample values returned for the sample ID
        var sample_values = result.sample_values;

        // define bar data
        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }

        // define bar layout
        var barLayout = {
            title: "Top 10 OTUs Found",
            xaxis: {title: "Number of OTUs"}
        }

        // draw bar graph
        Plotly.newPlot("bar", [barData], barLayout);

    });
}

// function to draw bubble chart
function DrawBubblechart(sampleId) {

    console.log(`DrawBubblechart(${sampleId})`);

    // call for data for bubble chart
    d3.json("samples.json").then((data) => {

        // console.log("Data for bubble chart:");
        // console.log(data);

        // variable to find the sample data
        var samples = data.samples;

        // filter to find the samples associated to the sample ID
        var resultArray = samples.filter(s => s.id == sampleId);

        // variable to return the first result of the samples
        var result = resultArray[0];

        // variables for the values and labels for the bubble chart
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;

        
        // variable for the sample values returned for the sample ID
        var sample_values = result.sample_values;

        // define bubble data
        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids
            }
        }

        // define bubble layout
        var bubbleLayout = {
            title: `Bacteria Samples for Subject ID No. ${sampleId}`,
            xaxis: {title: "OTU ID"}
        }

        // draw bubble chart
        Plotly.newPlot("bubble", [bubbleData], bubbleLayout);

    });
}

// function to display meta data
function ShowMetaData(sampleId) {

    console.log(`ShowMetaData(${sampleId})`);

    // call for data for meta data
    d3.json("samples.json").then((data) => {

        // console.log("Data for meta data:");
        // console.log(data);

        // variable to find meta data
        var metadata = data.metadata;

        // filter to find data for specific sample id
        var resultArray = metadata.filter(md => md.id == sampleId);

        // variable to return the first result
        var result = resultArray[0];

        // define where to display meta data results and clear existing data once new sample is selected
        var panel = d3.select("#sample-metadata");
        panel.html("");

        // iterate through results to grab keys and values to display in 'Demographic Info' section
        Object.entries(result).forEach(([key, value]) => {

            var textToShow = `${key}: ${value}`;
            panel.append("h6").text(textToShow);
        });
    });
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