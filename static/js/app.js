//Initialize the data to a constant
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//MetaData Info
function demoInfo(inputId){
    d3.json(url).then(function(data){
        let summary = data.metadata;

        for (i = 0; i < summary.length; i++){
            let id = summary[i].id.toString();
            if (id === inputId){
                console.log(summary[i]);

                d3.select("#sample-metadata").append("tr").text(`Id: ${summary[i].id}`);
                d3.select("#sample-metadata").append("tr").text(`Ethnicity: ${summary[i].ethnicity}`);
                d3.select("#sample-metadata").append("tr").text(`Gender: ${summary[i].gender}`);
                d3.select("#sample-metadata").append("tr").text(`Age: ${summary[i].age}`);
                d3.select("#sample-metadata").append("tr").text(`Location: ${summary[i].location}`);
                d3.select("#sample-metadata").append("tr").text(`Bbtype: ${summary[i].bbtype}`);
                d3.select("#sample-metadata").append("tr").text(`Wfreq: ${summary[i].wfreq}`);
            };
        };
    });
};

//Plots
function Plots(inputId){
    d3.json(url).then(function(data){

        ourIdsBubble = [];
        ourValues = [];
        ourLabels = [];

        for (i = 0; i < data.samples.length; i++){
            bellyBacteria = data.samples[i];
            if (bellyBacteria.id === inputId){

                for (j = 0; j < bellyBacteria.otu_ids.length; j++){
                    pointer = bellyBacteria.otu_ids[j];
                    ourIdsBubble.push(pointer);
                };

                console.log(ourIdsBubble)

                for (j = 0; j < bellyBacteria.sample_values.length; j++){
                    pointer = bellyBacteria.sample_values[j];
                    ourValues.push(pointer)
                };

                console.log(ourValues)

                for (j = 0; j < bellyBacteria.otu_labels.length; j++){
                    pointer = bellyBacteria.otu_labels[j]
                    ourLabels.push(pointer)
                };

                console.log(ourLabels)
            };
        };
        ourIdsBar = ourIdsBubble.slice(0,10).reverse();
        ourValuesBar = ourValues.slice(0,10).reverse(); 
        ourLabelsBar = ourLabels.slice(0,10).reverse();

        for (i=0; i<ourIdsBar.length; i++){
           ourIdsBar[i] = `OTU ${ourIdsBar[i]}`
        }

        console.log(ourIdsBar);
        console.log(ourValuesBar);
        console.log(ourLabelsBar);

        let trace1 = {
            x: ourValuesBar,
            y: ourIdsBar,
            text: ourLabelsBar,
            type: "bar",
            orientation: "h"
        };

        let trace2 = {
            x: ourIdsBubble,
            y: ourValues,
            mode: 'markers',
            marker: {
              size: ourValues,
              color: ourIdsBubble,
            colorscale: "Earth"
            },
            text: ourLabels
          };

        Plotly.newPlot("plotBar", [trace1]); 
        Plotly.newPlot("plotBubble", [trace2])

        });
};

function init(){
    let dropDownMenu = d3.select("#selDataset");

    d3.json(url).then(function(data){
        let ids = data.names;

        dropDownMenu.property(ids)

        console.log("These are the ids", ids);
    });


    demoInfo("940");
    Plots("940");

};

init();

