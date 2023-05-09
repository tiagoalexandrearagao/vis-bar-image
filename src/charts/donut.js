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
    var fontSizePercent = params.fontSizePercent

    var strokeWidth = params.strokeWidth
    var dimensionTitle = params.dimensionTitle
    var measureTitle = params.measureTitle

    var fontFamily = "'Quicksand', sans-serif"
    var fontWeightBold = "bold"
    var fontWeightNormal = "normal"

    // var innerRadius =  Math.min(width, height) / 1.2
    //ar radius = Math.min(width, height) / 2.2
    var innerRadius = 90
    var radius = 125

    var transformWidthG = (parseInt(width) + parseInt(margin.left) + parseInt(margin.right)) - 135 //+ parseInt(margin.left)
    var transformHeightG = (parseInt(height) + parseInt(margin.top) + parseInt(margin.bottom)) - 100 //+ parseInt(margin.left)

    var tweenDuration = 500;

    var strokeWidth = params.strokeWidth

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
            var i = -1;

            data = data.filter(function (d) {
                i++;
                //console.log('d[queryResponse.fields.dimensions[0].name]["value"]', d[queryResponse.fields.dimensions[0].name]["value"])
                if (!details.crossfilters[0].values.includes(d[queryResponse.fields.dimensions[0].name]["value"])) {
                    return colors[i] = barNotSelected[0]
                } else {
                    return colors[i] = colors[i]
                }

            });
        }
    } catch (error) {
    }
    console.log("var data após o filtro", data)
    console.log("details", details)

    // format  data
    data.forEach(function (d) {
        formattedData.push({
            measure_count: d[queryResponse.fields.measures[0].name]["value"],
            dimension_values: d[queryResponse.fields.dimensions[0].name]["value"]
        });
    });

    var ordScale = d3.scaleOrdinal()
        .domain(formattedData)
        .range(colors);

    var div = d3.select("body").append("div").attr("class", "toolTip");

    d3.select("#chart")
        .attr("style", "overflow:hidden")
        .html(`<h3 style="position:absolute; margin-left:10px;margin-top:8px;">
                        <span style="font-family: ${fontFamily}; font-weight:${fontWeightNormal} ;
                       ">     
                        ${titleChart}
                        </span>
                        </h3>`)


    var color = d3.scaleOrdinal()
        .range(colors);

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

    var pieData = pie(data);
    var oldPieData = [];
    var filteredPieData = [];

    var svgTitle = d3.select("#chart")


    //texto lateral percentual
    svgTitle.append("span")
        .data(pie(formattedData))
        .attr("fill", "#333")
        .text(function (d) {
            return String(parseFloat((d.endAngle - d.startAngle) / (2 * Math.PI) * 100).toFixed(0)) + "%"
        })
        .attr("style", `margin-left:13px; margin-top:80px;position:absolute; font-family: ${fontFamily};font-weight:${fontWeightBold} ; font-size:18px; color:#333`)


    //texto lateral value
    svgTitle.append("span")
        .data(pie(formattedData))
        .text(function (d) {
            return d.data.dimension_values
        })
        .attr("style", `margin-left:13px; margin-top:100px;position:absolute; font-family: ${fontFamily};font-weight:${fontWeightNormal} ;font-size:12px`)


    var svg = d3.select("#chart").append("svg")
        .attr("preserveAspectRatio", "xMaxYMax meet")
        .attr("width", parseInt(width) + parseInt(margin.left) + parseInt(margin.right))//novo
        .attr("height", parseInt(height) + parseInt(margin.top) + parseInt(margin.bottom))//novo
        .append("g")
        //  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")//antigo
        .attr("transform", "translate(" + transformWidthG + "," + transformHeightG + ")");//novo


    //novo 
    svg.append("g")
        .attr("class", "slices");
    svg.append("g")
        .attr("class", "labels");
    svg.append("g")
        .attr("class", "lines");
    //fimnovo


    var piedata = pie(formattedData);

    var g = svg.selectAll(".arc")
        .data(piedata)
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("class", "event")
        .attr("stroke-width", strokeWidth)
        .attr("stroke", "#fff")
        .attr("stroke-opacity", "1")
        .attr("d", function (d) {

            // if (d.data.dimension_values == "Biggest") {
            //     return biggestarc(d);
            // } else if (d.data.dimension_values == "Big") {
            //     return bigarc(d);
            // } else {
            return smallarc(d);
            // }
        }).style("fill", function (d) {
            return color(d.data.dimension_values);
        })
        //novo
        .on('mouseover', function (d) {
            d3.select(this).style("cursor", "pointer");
            d3.select(this).style("stroke-width", strokeWidth + 2);
            d3.select(this).style("stroke", "#dedede")
            // d3.select(this).style("stroke", function (d) {
            //     return ordScale(d.data.dimension_values);
            // });
            d3.select(this).style("stroke-opacity", "0.5");

        })
        .on('mousemove', function (event, d) {
            //tooltip
            console.log("event", event)
            console.log("d", d)

            div.style("left", event.pageX + 15 + "px");
            div.style("top", event.pageY - 50 + "px");

            var measure_count = Intl.NumberFormat("pt-BR").format(d.data.measure_count)

            div.style("display", "inline-block");
            div.style("position", "absolute");
            div.style("font-family", fontFamily)
            div.style("font-weight", fontWeightBold)
            div.style("font-size", `11px`)
            div.style("background-color", "#fff")
            div.style("padding", "8px")
            div.style("border", "1px solid #dedede")
            div.html(
                `${dimensionTitle}<br><span style="font-weight: ${fontWeightBold}; color:#333" > ${d.data.dimension_values}</span>` +
                "<br><br>" +
                `${measureTitle}<br><span style="font-weight: ${fontWeightBold}; color:#333" >${measure_count}</span>`
            );

        })
        .on('mouseout', function (d) {
            d3.select(this).style("stroke-width", strokeWidth);
            d3.select(this).style("stroke", "#fff");
            d3.select(this).style("stroke-opacity", "1");
            //tooltip
            div.style("position", "absolute");
            div.style("display", "none");
        });



    ///animação
    var pieTween = function (d, i) {
        var s0;
        var e0;
        if (oldPieData[i]) {
            s0 = oldPieData[i].startAngle;
            e0 = oldPieData[i].endAngle;
        } else if (!(oldPieData[i]) && oldPieData[i - 1]) {
            s0 = oldPieData[i - 1].endAngle;
            e0 = oldPieData[i - 1].endAngle;
        } else if (!(oldPieData[i - 1]) && oldPieData.length > 0) {
            s0 = oldPieData[oldPieData.length - 1].endAngle;
            e0 = oldPieData[oldPieData.length - 1].endAngle;
        } else {
            s0 = 0;
            e0 = 0;
        }
        var i = d3.interpolate({ startAngle: s0, endAngle: e0 }, { startAngle: d.startAngle, endAngle: d.endAngle });
        return function (t) {
            var b = i(t);
            return smallarc(b);
        };
    }


    var removePieTween = function (d, i) {
        s0 = 2 * Math.PI;
        e0 = 2 * Math.PI;
        var i = d3.interpolate({ startAngle: d.startAngle, endAngle: d.endAngle }, { startAngle: s0, endAngle: e0 });
        return function (t) {
            var b = i(t);
            return smallarc(b);
        };
    }

    var paths = g.selectAll("path");

    paths.transition()
        .duration(tweenDuration)
        .attrTween("d", pieTween);

    paths
        .transition()
        .duration(tweenDuration)
        .attrTween("d", pieTween);

    paths.exit()
        .transition()
        .duration(tweenDuration)
        .attrTween("d", removePieTween)
        .remove();


    var dimension = Array()
    svg.selectAll(".event")
        .on("click", function (d) {
            try {
                div.style("position", "absolute");
                div.style("display", "none");

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

    g.append("text")
        .attr("transform", function (d) {
            var [x, y] = smallarc.centroid(d);
            var maxX = 1
            var maxY = 1

            var checkPercentSize = parseFloat((d.endAngle - d.startAngle) / (2 * Math.PI) * 100).toFixed(0)

            if (checkPercentSize < 10) {
                //maxX = Math.floor(Math.random() * 20)
                maxY = Math.floor(Math.random() * 30)
                console.log("Alterando a posição do percentual menor que 10")
            }

            return `translate(${x - maxX},${y + maxY})`;
        })
        .attr("text-anchor", "middle")
        .attr("font-size", `${fontSizePercent}px`)
        .attr("style", `font-family: ${fontFamily}; font-weight: ${fontWeightBold}; font-size:${fontSizePercent}px`)
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
        .attr("style", `font-family: ${fontFamily}; font-weight:${fontWeightNormal} ; font-size:11px`)
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





    //novo inicio 
    var key = function (d) {
        return d.data.dimension_values;
    };

    var text = svg.select(".labels").selectAll("text")
        .data(pie(data), key);

    function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    text.enter()
        .append("text")
        .attr("dy", ".35em")
        .text(function (d) {
            console.log(d3.format('.3f')(d.data.measure_count))
            var showValue = true;
            return showValue ? d3.format('.3f')(d.data.measure_count) : d.data.dimension_values;
        })
        .merge(text)
        .transition().duration(transitionSpeed)
        .attrTween("transform", function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                return "translate(" + pos + ")";
            };
        })
        .styleTween("text-anchor", function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                var d2 = interpolate(t);
                return midAngle(d2) < Math.PI ? "start" : "end";
            };
        });

    text.exit()
        .remove();

    var polyline = svg.select(".lines").selectAll("polyline")
        .data(pie(data), key);

    polyline.enter()
        .append("polyline")
        .merge(polyline)
        .transition().duration(transitionSpeed)
        .attrTween("points", function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * 0.90 * (midAngle(d2) < Math.PI ? 1 : -1);
                return [arc2.centroid(d2), outerArc.centroid(d2), pos];
            };
        });

    polyline.exit()
        .remove();

    var circles = svg.selectAll(".circles")
        .data(pie(data));

    circles = circles.enter()
        .append("circle")
        .attr("class", "circles")
        .attr("r", 3)
        .attr("fill", "#999")
        .merge(circles)

    circles.transition().duration(transitionSpeed)
        .attrTween("transform", function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * .95 * (midAngle(d2) < Math.PI ? 1 : -1);
                return "translate(" + circlesArc.centroid(d2) + ")";
            };
        })
    circles.exit().remove();

    //novo fim

    return svg

}
