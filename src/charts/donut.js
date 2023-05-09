import { max } from "d3"

export function donutChart(params) {


    //var animationDuration = 2500;

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
    var transformWidthG = (parseInt(width) + parseInt(margin.left) + parseInt(margin.right)) - 135 //+ parseInt(margin.left)
    var transformHeightG = (parseInt(height) + parseInt(margin.top) + parseInt(margin.bottom)) - 100 //+ parseInt(margin.left)


    var radius = 125
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
                //console.log('d[queryResponse.fields.dimensions[0].name]["value"]', d[queryResponse.fields.dimensions[0].name]["value"])
                if (!details.crossfilters[0].values.includes(d[queryResponse.fields.dimensions[0].name]["value"])) {
                    colors[i] = String(barNotSelected[0]).toUpperCase()
                }
                console.log("Color[i]", colors[i])
                i++;
            });
        }
    } catch (error) {

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


    var color = d3.scaleOrdinal()
        .range(['#FD8A64', '#1EC370', '#6A52FA', '#20B9FC']);

    var biggestarc = d3.arc()
        // .outerRadius(radius - 100)
        .outerRadius(0)
        .innerRadius(radius - 60);

    var bigarc = d3.arc()
        // .outerRadius(radius - 100)
        .outerRadius(radius - 100)
        .innerRadius(radius - 50);

    var smallarc = d3.arc()
        // .outerRadius(radius - 100)
        .outerRadius(0)
        .innerRadius(radius - 40);

    var biggerarc = d3.arc()
        // .outerRadius(radius - 80)
        .outerRadius(0)
        .innerRadius(radius - 70);

    var pie = d3.pie()
        .sort(null)
        .value(function (d) {
            return d.measure_count;
        });

    var svgTitle = d3.select("#chart")


    //texto lateral percentual
    svgTitle.append("span")
        .data(pie(formattedData))
        .attr("fill", "#333")
        .attr("transform", function (d) {
            return `translate(${-210},${-70})`;
        })
        .text(function (d) {
            return String(parseFloat((d.endAngle - d.startAngle) / (2 * Math.PI) * 100).toFixed(0)) + "%"
        })
        .attr("style", "font-family: 'Quicksand', sans-serif; font-weight: bold; font-size:18px; color:#333")


    //texto lateral value
    svgTitle.append("span")
        .data(pie(formattedData))
        .attr("transform", function (d) {
            return `translate(${-210},${-55})`;
        })
        .text(function (d) {
            return d.data.dimension_values
        })
        .attr("style", "font-family: 'Quicksand', sans-serif; font-weight: normal; font-size:12px")


    var svg = d3.select("#chart").append("svg")
        // .attr("width", width)//antigo
        // .attr("height", height)//antigo
        .attr("preserveAspectRatio", "xMaxYMax meet")
        .attr("width", parseInt(width) + parseInt(margin.left) + parseInt(margin.right))//novo
        .attr("height", parseInt(height) + parseInt(margin.top) + parseInt(margin.bottom))//novo

        .append("g")
        //  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")//antigo
        .attr("transform", "translate(" + transformWidthG + "," + transformHeightG + ")")//novo




    var data = formattedData

    var piedata = pie(data);

    var g = svg.selectAll(".arc")
        .data(piedata)
        .enter().append("g")

        .attr("class", "arc");

    g.append("path")
        .attr("d", function (d) {

            if (d.data.dimension_values == "Biggest") {
                return biggestarc(d);
            } else if (d.data.dimension_values == "Big") {
                return bigarc(d);
            } else {
                return smallarc(d);
            }
        }).style("fill", function (d) {
            return color(d.data.dimension_values);
        })
        //novo
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

    g.append("text")                                     //add a label to each slice
        .attr("transform", function (d) {
            //set the label's origin to the center of the arc
            d.innerRadius = 0;
            d.outerRadius = radius;
            if (d.data.dimension_values == "Biggest") {
                return "translate(" + biggestarc.centroid(d) + ")";
            }

            else {
                return "translate(" + smallarc.centroid(d) + ")";
            }

        })
        .attr("text-anchor", "middle")
        .attr("font-size", "11px")
        .attr("style", "font-family: 'Quicksand', sans-serif; font-weight: bold; font-size:11px")
        .text(function (d, i) {
            console.log("data[i]", data[i])
            return parseFloat((d.endAngle - d.startAngle) / (2 * Math.PI) * 100).toFixed(0) + "%"
        });


    var labels = g.append('g').classed('labels', true);

    labels.selectAll("text").data(piedata)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("font-size", "11px")
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
        .text(function (d) { return d.data.dimension_values; })
        .attr("style", "font-family: 'Quicksand', sans-serif; font-weight: normal; font-size:11px")
        .each(function (d) {
            var bbox = this.getBBox();
            d.sx = d.x - bbox.width / 2 - 2;
            d.ox = d.x + bbox.width / 2 + 2;
            d.sy = d.oy = d.y + 5;
        });

    labels.append("defs").append("marker")
        .attr("id", "circ")
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("refX", 3)
        .attr("refY", 3)
        .append("circle")
        .attr("cx", 3)
        .attr("cy", 3)
        .attr("r", 3);

    labels.selectAll("path.pointer").data(piedata).enter()
        .append("path")
        .attr("class", "pointer")
        .style("fill", "none")
        .style("stroke", "#dedede")
        //.attr("marker-end", "url(#circ)")
        .attr("d", function (d) {
            if (d.cx > d.ox) {
                return "M" + d.sx + "," + d.sy + "L" + d.ox + "," + d.oy + " " + (d.cx - 9) + "," + (d.cy);
            } else {
                return "M" + d.ox + "," + d.oy + "L" + d.sx + "," + d.sy + " " + (d.cx + 9) + "," + (d.cy);
            }
        });


    return svg



}
