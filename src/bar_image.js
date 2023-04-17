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
            label: "Title",
            default: "Default title"
        },
        default_icon: {
            type: "string",
            label: "Icon (Image Base64)",
            default: ""
        },
        first_dimension: {
            type: "string",
            label: "Dimension values 'my_view.my_dimension'",
            default: "[view].[dimension]"
        },
        second_dimension: {
            type: "number",
            label: "Dimension color. Example: #FFFFFF - 'my_view.my_dimension'",
            default: "[view].[dimension]"
        },
        third_dimension: {
            type: "number",
            label: "Dimension with the path or image of an SVG - 'my_view.my_dimension'",
            default: "[view].[dimension]"
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

        if (queryResponse.fields.dimensions.length != 3) {
            element.innerHTML = "<h1>There is a problem with your dimensions</h1><br>this chart requires three dimensions";
            this.addError({ title: "There is a problem with your dimensions", message: "this chart requires three dimensions" });
            return;
        }

        if (queryResponse.fields.measures.length != 1) {
            element.innerHTML = "<h1>No Dimensions</h1><br>This chart requires a measure.";
            this.addError({ title: "No measure", message: "This chart requires a measure." });
            return;
        }

        var i = 0
        options = []
        var vis = this;

       // var default_title = `<img style="width:150px; height:auto;" src="${config.default_icon}">${config.title_graphic}`

        // set the dimensions and margins of the graph
        var margin = { top: 90, right: 20, bottom: 30, left: 20 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // set the ranges
        var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);

        var y = d3.scaleLinear()
            .range([height, 0]);

        // append the svg object to the body of the page
        // append a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        // element.innerHTML = `<div  style="float:left; margin-top:20px; margin-left:20px; font-size:20px;"> ${default_title}</div>`

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
                style: d[queryResponse.fields.dimensions[1].name]["value"],
                patch_d: d[queryResponse.fields.dimensions[2].name]["value"]
            });

            // formattedData.push({
            //     count: d[queryResponse.fields.measures[0].name]["value"],
            //     my_dimension: d[config.first_dimension]["value"],
            //     style: d[config.second_dimension]["value"],
            //     patch_d: d[config.third_dimension]["value"]
            // });
        });

        // Scale the range of the data in the domains
        x.domain(formattedData.map(function (d) { return d.my_dimension; }));
        y.domain([0, d3.max(formattedData, function (d) { return d.count; })]);

        svg.selectAll(".bar")
            .data(formattedData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("rx", "10px")
            .attr("style", function (d) {
                return "fill: " + d.style + ";";
            })
            .attr("title", function (d) {
                return d.my_dimension;
            })
            .attr("x", function (d) { return x(d.my_dimension); })
            .attr("width", x.bandwidth())
            .attr("y", function (d) { return y(d.count) - 80; })
            .attr("height", function (d) { return height - y(d.count); });

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + (height) + ")")
            .call(d3.axisBottom(x));

        svg.selectAll("rect")
            .data(formattedData)
            .append("title")
            .text(function (d) { return "" + d.my_dimension + " \n\n" + d.count; });

        svg.selectAll(".tick")
            .data(formattedData)
            .append("circle")
            .attr("fill", function (d) {
                return d.style;
            })
            .attr('cx', '29')
            .attr('cy', '29')
            .attr('r', '30')
            .attr("transform", "translate(-29,-70)");

        //add image
        svg.selectAll(".tick")
            .data(formattedData)
            .html(function (d) {
                var image = String(d.patch_d)
                image = image.replace("<image ", `<circle transform=\"translate(-29,-70)\" xmlns=\"http://www.w3.org/2000/svg\" r=\"29\" fill=\"${d.style}\" cy=\"29\" cx=\"29\"/><image transform=\"translate(-29,-70)\" `)
                image = image.replace("<path ", `<circle transform=\"translate(-29,-70)\" xmlns=\"http://www.w3.org/2000/svg\" r=\"29\" fill=\"${d.style}\" cy=\"29\" cx=\"29\"/><path transform=\"translate(-29,-70)\" `)
                return image;
            })

        svg.append("g")
            .call(d3.axisLeft(y));

        //begin remove 
        svg.selectAll(".tick").selectAll("line").remove();
        svg.selectAll(".tick").selectAll("text").remove();
        svg.selectAll(".domain").remove();
        //end remove 

        $(element).find(".bar").click(function (d) {
            vis.trigger("filter", [{
                field: queryResponse.fields.dimensions[0].name,
                value: d.delegateTarget.__data__.my_dimension,
                run: true,
            }]);
        });

        doneRendering()
    }

};

looker.plugins.visualizations.add(visObject);