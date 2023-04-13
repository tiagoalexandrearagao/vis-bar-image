/**
 * Welcome to the Looker Custom Visualization Builder! Please refer to the following resources 
 * to help you write your visualization:
 *  - API Documentation - https://github.com/looker/custom_visualizations_v2/blob/master/docs/api_reference.md
 *  - Example Visualizations - https://github.com/looker/custom_visualizations_v2/tree/master/src/examples
 *  - How to use the CVB - https://developers.looker.com/marketplace/tutorials/about-custom-viz-builder
 **/

const visObject = {
    /**
     * Configuration options for your visualization. In Looker, these show up in the vis editor
     * panel but here, you can just manually set your default values in the code.
     **/
    options: {
        title_graphic: {
            type: "string",
            label: "Image png (Base64)",
            default: "data:image/png;base64,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"
        },
        first_option: {
            type: "string",
            label: "My First Option",
            default: "Default Value"
        },
        second_option: {
            type: "number",
            label: "My Second Option",
            default: 42
        },

    },



    /**
     * The create function gets called when the visualization is mounted but before any
     * data is passed to it.
     **/
    create: function (element, config) {
        element.innerHTML = "<h1>Ready to render!</h1>";
    },

    /**
     * UpdateAsync is the function that gets called (potentially) multiple times. It receives
     * the data and should update the visualization with the new data.
     **/
    updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
        if (data.length === 0) {
            element.innerHTML = "<h1>No Results</h1>";
            this.addError({ title: "No Results" });
            done();
            return;
        }

        var i = 0
        options = []
        var vis = this;

        var default_img = "data:image/png;base64,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"
        //<img style="width:150px; height:auto;" src="${default_img}">
        var default_title = "Comportamento"

        // set the dimensions and margins of the graph
        var margin = { top: 20, right: 20, bottom: 30, left: 90 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // set the ranges
        var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);

        var color = d3.scaleBand()
            .range([0, width])
            .padding(0.1);

        var y = d3.scaleLinear()
            .range([height, 0]);

        // append the svg object to the body of the page
        // append a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        element.innerHTML = `<div  style="float:left; margin-top:20px; margin-left:20px; font-size:20px;"> ${default_title}</div>`

        var svg = d3.select("#vis").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        formattedData = []

        // format the data
        data.forEach(function (d) {
            //console.log(queryResponse)          
            formattedData.push({
                count: d[queryResponse.fields.measures[0].name]["value"],
                my_dimension: d[queryResponse.fields.dimensions[0].name]["value"],
                style: `fill: ${d[queryResponse.fields.dimensions[1].name]["value"]}` 
            });
        });

        // Scale the range of the data in the domains
        x.domain(formattedData.map(function (d) { return d.my_dimension; }));        
        y.domain([0, d3.max(formattedData, function (d) { return d.count; })]);   

        svg.selectAll(".bar")
            .data(formattedData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("style",  function (d) { return d.style; })
            .attr("x", function (d) { return x(d.my_dimension); })
            .attr("width", x.bandwidth())
            .attr("y", function (d) { return y(d.count); })
            .attr("height", function (d) { return height - y(d.count); });

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));  

        $(element).find(".bar").click(function (d) {
            vis.trigger("filter", [{
                field: queryResponse.fields.dimensions[0].name, // the name of the field to filter
                value: '', // the "advanced syntax" for the filter
                run: true, // whether to re-run the query with the new filter
            }]);
        });

        doneRendering()
    }

};

looker.plugins.visualizations.add(visObject);