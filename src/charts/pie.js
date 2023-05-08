import { max } from "d3"

export function pieChart(params) {

    try {

        var d3 = params.d3
        var width = params.width
        var margin = params.margin
        var height = params.height
        var data = params.data
        var barNotSelected = params.barNotSelected
        var queryResponse = params.queryResponse
        var titleChart = params.titleGraphic
        var details = params.details

        // var innerRadius =  Math.min(width, height) / 1.2
        var innerRadius = 90
        console.log("innerRadius", innerRadius)
        var transformWidthG = (parseInt(width) + parseInt(margin.left) + parseInt(margin.right)) - 105 //+ parseInt(margin.left)
        var transformHeightG = (parseInt(height) + parseInt(margin.top) + parseInt(margin.bottom)) - 100 //+ parseInt(margin.left)


        var radius = 0
        //ar radius = Math.min(width, height) / 2.2

        var strokeWidth = 3

        var centerTitle = innerRadius == 0 ? '' : ''

        var formattedData = [];

        var pie = d3.pie().value(function (d) {
            return d.measure_count;
        });

        console.log("width", width)
        console.log("height", height)

        try {
            if (details.crossfilters.length > 0) {
                data = data.filter(function (d) {
                    console.log('d[queryResponse.fields.dimensions[0].name]["value"]', d[queryResponse.fields.dimensions[0].name]["value"])
                    if (!details.crossfilters[0].values.includes(d[queryResponse.fields.dimensions[0].name]["value"])) {
                        // if (!details.crossfilters[0].values.includes(d["pug_product.ds_valor"].value)) {
                        return d["color"].value = barNotSelected
                    } else {
                        return d["color"].value = d["color"].value
                    }
                });
            }
        } catch (error) { }


        // format  data
        data.forEach(function (d) {
            formattedData.push({
                measure_count: d[queryResponse.fields.measures[0].name]["value"],
                dimension_values: d[queryResponse.fields.dimensions[0].name]["value"]
            });
        });

        d3.select("#chart")
            .attr("style", "overflow:hidden")
            .html(`<h3 style="position:absolute; margin-left:10px;margin-top:8px;">
                        <span style="font-family: 'Quicksand', sans-serif; font-weight: normal;
                       ">     
                        ${titleChart}
                        </span>
                        </h3>`)



        var svg = d3.select("#chart")
            .append("svg")
            .attr("preserveAspectRatio", "xMaxYMax meet")
            .attr("width", parseInt(width) + parseInt(margin.left) + parseInt(margin.right))
            .attr("height", parseInt(height) + parseInt(margin.top) + parseInt(margin.bottom))









        svg.append("text")
            .data(pie(formattedData))
            .attr("transform", function (d) {

                return `translate(${15},${90})`;
            })
            .text(function (d) {
                var max = Math.max(d.data.measure_count)
                return String(parseFloat((d.endAngle - d.startAngle) / (2 * Math.PI) * 100).toFixed(0)) + "%"
                // return d.data.measure_count + "%";
            })
            .attr("style", "font-family: 'Quicksand', sans-serif; font-weight: bold; font-size:18px")


        svg.append("text")
            .data(pie(formattedData))
            .attr("transform", function (d) {

                return `translate(${15},${90})`;
            })
            .text(function (d) {               
                return d.data.dimension_values                
            })
            .attr("style", "font-family: 'Quicksand', sans-serif; font-weight: bold; font-size:18px")















        var ordScale = d3.scaleOrdinal()
            .domain(formattedData)
            .range(['#FD8A64', '#1EC370', '#6A52FA', '#20B9FC']);




        var g = svg.append("g")
            .attr("class", "main")
            .attr("transform", "translate(" + transformWidthG + "," + transformHeightG + ")");



        var arcs = g.selectAll(".main")
            .data(pie(formattedData))
            .enter()
            .append("g")
            .attr("class", "arc")









        var path = d3.arc()
            .innerRadius(innerRadius)//donut
            .outerRadius(radius)

        var label = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(radius);

        arcs.append("path")
            .attr('stroke', '#fff')
            .attr('stroke-width', strokeWidth)
            .attr("fill", function (d) {
                console.log('Teste', d)
                return ordScale(d.data.dimension_values);
            })
            .attr("d", path)

        // console.log(8)
        // arcs.append("text")
        //     .attr("transform", function (d) {
        //         var [x, y] = label.centroid(d);
        //         return `translate(${x - 20},${y})`;
        //     })
        //     .text(function (d) {
        //         return d.data.dimension_values;
        //     })
        //     .style("font-family", "arial")
        //     .style("font-size", 13);



        arcs.append("text")
            .attr("transform", function (d) {
                var [x, y] = label.centroid(d);
                return `translate(${x - 20},${y + 20})`;
            })
            .text(function (d) {
                return parseFloat((d.endAngle - d.startAngle) / (2 * Math.PI) * 100).toFixed(0) + "%"
                // return d.data.measure_count + "%";
            })
            .attr("style", "font-family: 'Quicksand', sans-serif; font-weight: bold; font-size:15px; color:#fff;")
            .attr("fill", "#fff")


        arcs.append("text")
            .attr("text-anchor", "middle")
            .text(centerTitle);


        //arcs.exit().remove();

        return arcs

    } catch (error) {
        return error

    }

}