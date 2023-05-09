import { max } from "d3"

export function pieChart(params) {



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

    var innerRadius = 90
    console.log("innerRadius", innerRadius)
    var transformWidthG = (parseInt(width) + parseInt(margin.left) + parseInt(margin.right)) - 105 //+ parseInt(margin.left)
    var transformHeightG = (parseInt(height) + parseInt(margin.top) + parseInt(margin.bottom)) - 100 //+ parseInt(margin.left)


    var radius = 90
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



    data.forEach(function (d) {
        formattedData.push({
            measure_count: d[queryResponse.fields.measures[0].name]["value"],
            dimension_values: d[queryResponse.fields.dimensions[0].name]["value"]
        });
    });


    var pie = d3.pie()
        .sort(null)
        .value(function (d) {
            return d.measure_count;
        });




    /* ------- PIE SLICES -------*/
    var slice = svg.select(".slices").selectAll("path.slice")
        .data(pie(formattedData), key);

    slice.enter()
        .insert("path")
        .style("fill", function (d) {
            return color(d.data.label);
        })
        .attr("class", "slice")
        .merge(slice)
        .transition().duration(transitionSpeed)
        .attrTween("d", function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        })

    slice.exit()
        .remove();

    /* ------- TEXT LABELS -------*/

    var text = svg.select(".labels").selectAll("text")
        .data(pie(formattedData), key);

    function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    text.enter()
        .append("text")
        .attr("dy", ".35em")
        .text(function (d) {
            console.log(d3.format('.3f')(d.data.value))
            var showValue = true;
            return showValue ? d3.format('.3f')(d.data.value) : d.data.label;
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

    /* ------- SLICE TO TEXT POLYLINES -------*/

    var polyline = svg.select(".lines").selectAll("polyline")
        .data(pie(formattedData), key);

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
                pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                return [arc2.centroid(d2), outerArc.centroid(d2), pos];
            };
        });

    polyline.exit()
        .remove();

    var circles = svg.selectAll(".circles")
        .data(pie(formattedData));

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

    return slice;

}


