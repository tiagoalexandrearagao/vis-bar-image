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
        var margin = { top: 90, right: 20, bottom: 30, left: 90 },
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
                style: d[queryResponse.fields.dimensions[1].name]["value"],
                patch_d: 'M11.9505 25.0593C11.6173 24.9041 11.3792 25.0593 11.3792 25.4292V32.3624C11.3792 32.7324 11.6054 32.8875 11.9505 32.7324L12.3909 32.5414C12.6646 32.4102 12.7955 32.2312 12.7955 31.9328V25.8707C12.7955 25.5724 12.6646 25.3815 12.3909 25.2621L11.9505 25.0593ZM22.4242 27.2192C21.8648 27.2192 21.3292 27.4579 20.9721 27.8278V25.3815C20.9721 25.2025 20.865 25.107 20.6984 25.107H19.8415C19.6629 25.107 19.5677 25.2144 19.5677 25.3815V32.4102C19.5677 32.5892 19.6748 32.6846 19.8415 32.6846H20.6151C20.7936 32.6846 20.8888 32.5772 20.8888 32.4102V32.1118C21.2221 32.4937 21.841 32.7801 22.4599 32.7801C23.8048 32.7801 24.9712 31.551 24.9712 29.9996C24.9712 28.4245 23.7929 27.2192 22.4242 27.2192ZM9.60584 27.3147C9.42731 27.3147 9.3321 27.4221 9.3321 27.5891V27.8875C9.02265 27.5056 8.43946 27.2192 7.86817 27.2192C6.46375 27.2192 5.24976 28.4245 5.24976 29.9996C5.24976 31.5748 6.39234 32.6608 7.83246 32.6608C8.47516 32.6608 8.97504 32.3624 9.26069 32.0522C9.24879 33.15 8.6775 33.6512 7.67774 33.6512C7.15406 33.6393 6.65418 33.4842 6.08289 33.1142C5.92816 33.0068 5.76154 33.0426 5.67822 33.2097L5.33307 33.8899C5.24976 34.045 5.27356 34.2002 5.44019 34.3076C6.1543 34.773 6.99933 34.9997 7.72535 34.9997C9.62965 34.9997 10.677 33.9734 10.677 31.5987V27.5891C10.677 27.4101 10.5699 27.3147 10.4033 27.3147H9.60584ZM16.1757 27.2192C14.6879 27.2192 13.4382 28.3887 13.4382 29.9996C13.4382 31.6106 14.6641 32.7801 16.1757 32.7801C17.6634 32.7801 18.9131 31.6106 18.9131 29.9996C18.9131 28.3887 17.6872 27.2192 16.1757 27.2192ZM28.2799 27.2192C26.7921 27.2192 25.5424 28.3887 25.5424 29.9996C25.5424 31.6106 26.7683 32.7801 28.2799 32.7801C29.7676 32.7801 31.0173 31.6106 31.0173 29.9996C31.0173 28.3887 29.7914 27.2192 28.2799 27.2192ZM37.1111 30.7156C36.9563 30.7156 36.873 30.7872 36.7897 30.9185C36.5874 31.2765 36.2422 31.4197 35.8257 31.4197C35.0997 31.4197 34.5403 30.8111 34.5403 29.9996C34.5403 29.1762 35.1116 28.5796 35.8257 28.5796C36.2303 28.5796 36.5398 28.7467 36.7421 29.0569C36.8254 29.2001 36.9325 29.2598 37.0754 29.2598H38.0037C38.1941 29.2598 38.3013 29.1404 38.2417 28.9495C37.9323 27.9352 36.9325 27.2311 35.8019 27.2311C34.3498 27.2311 33.1477 28.4006 33.1477 30.0116C33.1477 31.6226 34.3022 32.792 35.8019 32.792C36.9563 32.792 37.968 32.0999 38.2656 31.0378C38.3132 30.8469 38.1941 30.7395 38.0156 30.7395H37.1111V30.7156ZM41.491 27.2192C40.0032 27.2192 38.7535 28.3887 38.7535 29.9996C38.7535 31.6106 39.9794 32.7801 41.491 32.7801C42.9787 32.7801 44.2284 31.6106 44.2284 29.9996C44.2284 28.3887 43.0025 27.2192 41.491 27.2192ZM50.5483 27.2192C49.977 27.2192 49.3938 27.4579 48.9891 27.9829C48.6916 27.5414 48.1917 27.2192 47.5609 27.2192C46.942 27.2192 46.5016 27.4937 46.216 27.8636V27.5891C46.216 27.4101 46.1089 27.3147 45.9423 27.3147H45.1686C44.9901 27.3147 44.8949 27.4221 44.8949 27.5891V32.3982C44.8949 32.5772 45.002 32.6727 45.1686 32.6727H46.0256C46.2041 32.6727 46.2993 32.5653 46.2993 32.3982V29.761C46.2993 29.0092 46.6683 28.5557 47.2515 28.5557C47.8228 28.5557 48.1322 28.9495 48.1322 29.7132V32.3982C48.1322 32.5772 48.2393 32.6727 48.406 32.6727H49.2629C49.4414 32.6727 49.5366 32.5653 49.5366 32.3982V29.761C49.5366 29.0092 49.9056 28.5557 50.4888 28.5557C51.072 28.5557 51.3695 28.9495 51.3695 29.7132V32.3982C51.3695 32.5772 51.4766 32.6727 51.6433 32.6727H52.5002C52.6787 32.6727 52.7739 32.5653 52.7739 32.3982V29.5462C52.7501 28.1261 51.9289 27.2192 50.5483 27.2192ZM7.96338 31.4078C7.23737 31.4078 6.63037 30.835 6.63037 29.9877C6.63037 29.1285 7.23737 28.5677 7.96338 28.5677C8.6894 28.5677 9.29639 29.1404 9.29639 29.9877C9.28449 30.835 8.6894 31.4078 7.96338 31.4078ZM16.1757 31.4197C15.4378 31.4197 14.8427 30.823 14.8427 29.9996C14.8427 29.1762 15.4378 28.5796 16.1757 28.5796C16.9136 28.5796 17.5087 29.1762 17.5087 29.9996C17.5206 30.823 16.9136 31.4197 16.1757 31.4197ZM22.2575 31.4197C21.5434 31.4197 20.9364 30.8469 20.9364 29.9996C20.9364 29.1524 21.5315 28.5796 22.2575 28.5796C22.9716 28.5796 23.5786 29.1524 23.5786 29.9996C23.5786 30.8588 22.9716 31.4197 22.2575 31.4197ZM28.2799 31.4197C27.542 31.4197 26.9469 30.823 26.9469 29.9996C26.9469 29.1762 27.542 28.5796 28.2799 28.5796C29.0178 28.5796 29.6129 29.1762 29.6129 29.9996C29.6248 30.823 29.0178 31.4197 28.2799 31.4197ZM41.491 31.4197C40.753 31.4197 40.158 30.823 40.158 29.9996C40.158 29.1762 40.753 28.5796 41.491 28.5796C42.2289 28.5796 42.824 29.1762 42.824 29.9996C42.8359 30.823 42.2408 31.4197 41.491 31.4197ZM32.0766 30.9304C31.6005 30.9304 31.1601 31.3004 31.1601 31.8493C31.1601 32.4102 31.6005 32.7801 32.0766 32.7801C32.5527 32.7801 32.993 32.4102 32.993 31.8612C32.993 31.3004 32.5527 30.9304 32.0766 30.9304Z'
            });
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
            //.attr("x", function (d) { return x(d.my_dimension); })
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


        svg.selectAll(".tick")
            .data(formattedData)
            .append("path")
            .attr('d', function (d) {
                return d.patch_d;
            })
            .attr('fill', "white")
            .attr("transform", "translate(-29,-70)");

        /*svg.selectAll(".tick")
            .data(formattedData)
            .append("path")
            .attr('d', function (d) {
                return d.patch_d;
            })
            .attr('fill', "white")
            .attr("transform", "translate(-29,-70)");*/

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));


        //remove lines
        svg.selectAll(".tick").selectAll("line").remove();
        svg.selectAll(".tick").selectAll("text").remove();
        svg.selectAll(".domain").remove();

        $(element).find(".bar").click(function (d) {

            console.log('Chave', queryResponse.fields.dimensions[0].name)
            console.log('Valor', d.delegateTarget.__data__.my_dimension)

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