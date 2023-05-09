import { max } from "d3"

export function pieChart(params) {

    try {

        var animationDuration = 2500;

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


        var radius = 90
        //ar radius = Math.min(width, height) / 2.2

        var strokeWidth = 3

        var centerTitle = innerRadius == 0 ? '' : ''

        var formattedData = [];

        var pie = d3.pie().value(function (d) {
            return d.measure_count;
        });

        console.log("width", width)
        console.log("height", height)
        var colors = Array()

        colors = ['#FD8A64', '#1EC370', '#6A52FA', '#20B9FC']

        try {
            if (details.crossfilters.length > 0) {
                var i = 0;

                data = data.filter(function (d) {
                    console.log('d[queryResponse.fields.dimensions[0].name]["value"]', d[queryResponse.fields.dimensions[0].name]["value"])
                    if (!details.crossfilters[0].values.includes(d[queryResponse.fields.dimensions[0].name]["value"])) {
                        //colors[i] = colors[i] 
                        colors[i] = String(barNotSelected[0]).toUpperCase()
                    } else {
                        console.log("Manter a mesma cor")
                    }
                    console.log("Color[i]", colors[i])
                    i++;
                });
            }
        } catch (error) {
            console.log(error)
        }


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


        //TODO: Resolver posicionamento quando o percentual for inferior a 10
        svg.append("text")
            .data(pie(formattedData))
            .attr("transform", function (d) {
                return `translate(${15},${90})`;
            })
            .text(function (d) {
                return String(parseFloat((d.endAngle - d.startAngle) / (2 * Math.PI) * 100).toFixed(0)) + "%"
            })
            .attr("style", "font-family: 'Quicksand', sans-serif; font-weight: bold; font-size:18px")


        svg.append("text")
            .data(pie(formattedData))
            .attr("transform", function (d) {
                return `translate(${15},${115})`;
            })
            .text(function (d) {
                return d.data.dimension_values
            })
            .attr("style", "font-family: 'Quicksand', sans-serif; font-weight: normal; font-size:18px")


        try {
            var ordScale = d3.scaleOrdinal()
                .domain(formattedData)
                .range(colors);

            console.log("Cores reprocessadas", colors)
        } catch (error) {
            console.log("Erro na alteração das cores", error)

            var ordScale = d3.scaleOrdinal()
                .domain(formattedData)
                .range(['#FD8A64', '#1EC370', '#6A52FA', '#20B9FC']);
        }


        var g = svg.append("g")
            .attr("class", "main")
            .attr("transform", "translate(" + transformWidthG + "," + transformHeightG + ")");


        var arcs = g.selectAll(".main")
            .data(pie(formattedData))
            .enter()
            .append("g")
            .attr("class", "arc")


        //TODO: Resolvido a seleção do cross-filtering
        var dimension = Array()

        arcs.on("click", function (d) {
            try {

                dimension[queryResponse.fields.dimensions[0].name] = {
                    field: queryResponse.fields.dimensions[0].name,
                    value: d.target.__data__.data.dimension_values
                }

                var payload = {
                    event: d,
                    row: dimension
                }

                LookerCharts.Utils.toggleCrossfilter(payload);
            } catch (error) {
                console.log(error)
            }

        })






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
                console.log('ordScale(d.data.dimension_values)', ordScale(d.data.dimension_values))
                return ordScale(d.data.dimension_values);
            })
            .attr("d", path)

            //inicio novo
            .attr("x", function (d) {
                var a = d.startAngle + (d.endAngle - d.startAngle) / 2 - Math.PI / 2;
                d.cx = Math.cos(a) * (radius - 75);
                return d.x = Math.cos(a) * (radius - 20);
            })
            .attr("y", function (d) {
                var a = d.startAngle + (d.endAngle - d.startAngle) / 2 - Math.PI / 2;
                d.cy = Math.sin(a) * (radius - 75);
                return d.y = Math.sin(a) * (radius - 20);
            })
            //fim novo
            .on('mouseover', function (d) {
                d3.select(this).style("cursor", "pointer");
                d3.select(this).style("stroke-width", strokeWidth + 9);
                d3.select(this).style("stroke", function (d) {
                    return ordScale(d.data.dimension_values);
                });
                d3.select(this).style("stroke-opacity", "0.5");
            })
            .on('mouseout', function (d) {
                d3.select(this).style("stroke-width", strokeWidth);
                d3.select(this).style("stroke", "#fff");
                d3.select(this).style("stroke-opacity", "1");
            })



        /////inicio nova implementação



        var labelRadius = radius

        var chartData = formattedData

        chartData.forEach(function (d) {
            d.measure_count = +d.measure_count;
            d.enabled = true;
        });





        var layoutLabels = d3.pie()
            .sort(null)
            .value(function (d) { return d.disabled ? 0 : d.measure_count });

        var pieLabels = svg.selectAll(".pieLabel")
            .data(layoutLabels(chartData))
            .enter()
            .append('g')
            .attr('class', 'pieLabel')


        var labelsArc = d3.arc().outerRadius(radius);

        pieLabels.append("g").classed("pieLabel", true).each(function (d, i) {
            var group = d3.select(this);

            group.attr('transform', function (d) {

                d.outerRadius = radius + 10;
                d.innerRadius = radius + 15;
                var rotateAngle = (d.startAngle + d.endAngle) / 2 * (180 / Math.PI);
                if ((d.startAngle + d.endAngle) / 2 < Math.PI) {
                    rotateAngle -= 90;
                } else {
                    rotateAngle += 90;
                }
                return 'translate(' + labelsArc.centroid(d) + ') rotate(' + rotateAngle + ')';
            });

        });

        var slices = pieLabels.append("text")
            .attr("transform", function (d) {
                var c = arc.centroid(d),
                    x = c[0],
                    y = c[1],
                    // pythagorean theorem for hypotenuse
                    h = Math.sqrt(x * x + y * y);
                return "translate(" + (x / h * labelRadius) + ',' +
                    (y / h * labelRadius) + ")";
            })
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(function (d, i) { return ((d.data.measure_count / sum) * 100).toFixed(0) + "%"; });

        ////fim nova implementação





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



        console.log("chartData", chartData)

        var sum = d3.sum(chartData, function (d) { return d.measure_count });

        arcs.append("text")
        // .attr("transform", function (d) {
        //     var [x, y] = label.centroid(d);
        //     var maxX =  Math.floor(Math.random() * 20)
        //     var maxY =  Math.floor(Math.random() * 30)
        //     return `translate(${x - maxX},${y + maxY})`;
        // })
        // .text(function (d) {
        //     return parseFloat((d.endAngle - d.startAngle) / (2 * Math.PI) * 100).toFixed(0) + "%"
        //     // return d.data.measure_count + "%";
        // })
        // .attr("style", "font-family: 'Quicksand', sans-serif; font-weight: bold; font-size:15px; color:#333;")
        // .attr("fill", "#000")        








        arcs.append("text")
            .attr("text-anchor", "middle")
            .text(centerTitle);


        arcs.exit().remove();

        return arcs

    } catch (error) {
        console.log(error)
        return error

    }

}

// function tweenPie(b) {
//     var i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
//     return function (t) { return arc(i(t)); };
// };