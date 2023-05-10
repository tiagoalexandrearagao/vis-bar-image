import { max } from "d3";

export function donutChart(params) {
  //var animationDuration = 2500;

  var d3 = params.d3;
  var width = params.width;
  var margin = params.margin;
  var height = params.height;
  var data = params.data;
  var barNotSelected = params.barNotSelected;
  var queryResponse = params.queryResponse;
  var titleChart = params.titleGraphic;
  var details = params.details;
  var fontSizePercent = params.fontSizePercent;

  var strokeWidth = params.strokeWidth;
  var dimensionTitle = params.dimensionTitle;
  var measureTitle = params.measureTitle;

  var fontFamily = "'Quicksand', sans-serif";
  var fontWeightBold = "bold";
  var fontWeightNormal = "normal";

  // var innerRadius =  Math.min(width, height) / 1.2
  //ar radius = Math.min(width, height) / 2.2
  var innerRadius = 90;
  var radius = 100;

  var transformWidthG =
    parseInt(width) + parseInt(margin.left) + parseInt(margin.right) - 135; //+ parseInt(margin.left)
  var transformHeightG =
    parseInt(height) + parseInt(margin.top) + parseInt(margin.bottom) - 100; //+ parseInt(margin.left)

  var tweenDuration = 500;

  var strokeWidth = params.strokeWidth;

  var centerTitle = innerRadius == 0 ? "" : "";

  var formattedData = [];

  var pie = d3.pie().value(function (d) {
    return d.measure_count;
  });

  console.log("width", width);
  console.log("height", height);
  var colors = Array();

  colors = ["#FD8A64", "#1EC370", "#6A52FA", "#20B9FC"];

  try {
    if (details.crossfilters.length > 0) {
      var i = -1;

      data = data.filter(function (d) {
        i++;
        //console.log('d[queryResponse.fields.dimensions[0].name]["value"]', d[queryResponse.fields.dimensions[0].name]["value"])
        if (
          !details.crossfilters[0].values.includes(
            d[queryResponse.fields.dimensions[0].name]["value"]
          )
        ) {
          return (colors[i] = barNotSelected[0]);
        } else {
          return (colors[i] = colors[i]);
        }
      });
    }
  } catch (error) {}
  console.log("var data após o filtro", data);
  console.log("details", details);

  // format  data
  data.forEach(function (d) {
    formattedData.push({
      measure_count: d[queryResponse.fields.measures[0].name]["value"],
      dimension_values: d[queryResponse.fields.dimensions[0].name]["value"],
    });
  });

  var ordScale = d3.scaleOrdinal().domain(formattedData).range(colors);

  var div = d3.select("body").append("div").attr("class", "toolTip");

  d3.select("#chart").attr("style", "overflow:hidden")
    .html(`<h3 style="position:absolute; margin-left:10px;margin-top:8px;">
                        <span style="font-family: ${fontFamily}; font-weight:${fontWeightNormal} ;
                       ">     
                        ${titleChart}
                        </span>
                        </h3>`);

  var color = d3.scaleOrdinal().range(colors);

  var pie = d3
    .pie()
    .sort((a, b) => (a > b ? 50 : -100))
    .value(function (d) {
      return d.measure_count;
    });

  var pieData = pie(formattedData);
  var oldPieData = [];
  var filteredPieData = [];

  var isDount = false;
  var transitionSpeed = 2600;
  var outerRadius = height / 2 - 20;

  var svgTitle = d3.select("#chart");

  //texto lateral percentual
  svgTitle
    .append("span")
    .data(pie(formattedData))
    .attr("fill", "#333")
    .text(function (d) {
      return (
        String(
          parseFloat(
            ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100
          ).toFixed(0)
        ) + "%"
      );
    })
    .attr(
      "style",
      `margin-left:13px; margin-top:80px;position:absolute; font-family: ${fontFamily};font-weight:${fontWeightBold} ; font-size:18px; color:#333`
    );

  //texto lateral value
  svgTitle
    .append("span")
    .data(pie(formattedData))
    .text(function (d) {
      return d.data.dimension_values;
    })
    .attr(
      "style",
      `margin-left:13px; margin-top:100px;position:absolute; font-family: ${fontFamily};font-weight:${fontWeightNormal} ;font-size:12px`
    );

  var svg = d3
    .select("#chart")
    .append("svg")
    .attr("preserveAspectRatio", "xMaxYMax meet")
    .attr(
      "width",
      parseInt(width) + parseInt(margin.left) + parseInt(margin.right)
    ) //novo
    .attr(
      "height",
      parseInt(height) + parseInt(margin.top) + parseInt(margin.bottom)
    ) //novo
    .append("g")
    .append("g")
    .attr(
      "transform",
      "translate(" + transformWidthG + "," + transformHeightG + ")"
    ); //novo

  //novo
  svg.append("g").attr("class", "slices");
  svg.append("g").attr("class", "labels");
  svg.append("g").attr("class", "lines");
  //fimnovo

  //TODO: Novo

  var arc = d3
    .arc()
    .outerRadius(radius * 0.98)
    .innerRadius(isDount ? radius * 0.4 : 0);

  var arc2 = d3
    .arc()
    .outerRadius(radius * 0.8 - 10)
    .innerRadius(radius * 0.9);

  var circlesArc = d3
    .arc()
    .innerRadius(radius * 0.8)
    .outerRadius(radius * 0.8);

  var outerArc = d3
    .arc()
    .innerRadius(radius * 0.99)
    .outerRadius(radius * 0.99);

  var key = function (d) {
    return d.data.dimension_values;
  };

  var slice = svg
    .select(".slices")
    .selectAll("path.slice")
    .data(pie(formattedData), key);

  slice
    .enter()
    .insert("path")
    .style("fill", function (d) {
      return color(d.data.dimension_values);
    })
    .attr("class", "slice")
    .merge(slice)
    .transition()
    .duration(transitionSpeed)
    .attrTween("d", function (d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function (t) {
        return arc(interpolate(t));
      };
    });

  slice.exit().remove();

  svg.selectAll(".slice").on("mouseover", function (d) {
    d3.select(this).style("cursor", "pointer");
    d3.select(this).style("stroke-width", strokeWidth + 2);
    d3.select(this).style("stroke", "#dedede");
    d3.select(this).style("stroke-opacity", "0.5");
  });

  svg
    .selectAll(".slice")
    .on("mousemove", function (event, d) {
      div.style("left", event.pageX + 15 + "px");
      div.style("top", event.pageY - 50 + "px");

      var measure_count = Intl.NumberFormat("pt-BR").format(
        d.data.measure_count
      );

      div.style("display", "inline-block");
      div.style("position", "absolute");
      div.style("font-family", fontFamily);
      div.style("font-weight", fontWeightBold);
      div.style("font-size", `11px`);
      div.style("background-color", "#fff");
      div.style("padding", "8px");
      div.style("border", "1px solid #dedede");
      div.html(
        `${dimensionTitle}<br><span style="font-weight: ${fontWeightBold}; color:#333" > ${d.data.dimension_values}</span>` +
          "<br><br>" +
          `${measureTitle}<br><span style="font-weight: ${fontWeightBold}; color:#333" >${measure_count}</span>`
      );
    })
    .on("mouseout", function (d) {
      d3.select(this).style("stroke-width", strokeWidth);
      d3.select(this).style("stroke", "#fff");
      d3.select(this).style("stroke-opacity", "1");
      //tooltip
      div.style("position", "absolute");
      div.style("display", "none");
    });

  var dimension = Array();
  svg.selectAll(".slice").on("click", function (d) {
    try {
      div.style("position", "absolute");
      div.style("display", "none");

      dimension[queryResponse.fields.dimensions[0].name] = {
        field: queryResponse.fields.dimensions[0].name,
        value: d.target.__data__.data.dimension_values,
      };

      var payload = {
        event: d,
        row: dimension,
      };

      LookerCharts.Utils.toggleCrossfilter(payload);
    } catch (error) {
      console.log(error);
    }
  });

  var text = svg
    .select(".labels")
    .selectAll("text")
    .data(pie(formattedData), key);

  function midAngle(d) {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }

  text
    .enter()
    .append("text")
    .attr("dy", ".35em")
    .attr(
      "style",
      `margin-left:13px; margin-top:80px;position:absolute; font-family: ${fontFamily};font-weight:${fontWeightBold} ; font-size:18px; color:#333`
    )
    .text(function (d) {
      return (
        parseFloat(((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100).toFixed(
          0
        ) + "%"
      );
    })
    .merge(text)
    .transition()
    .duration(transitionSpeed)
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

  text.exit().remove();

  var polyline = svg
    .select(".lines")
    .selectAll("polyline")
    .data(pie(formattedData), key);

  polyline
    .enter()
    .append("polyline")
    .merge(polyline)
    .transition()
    .duration(transitionSpeed)
    .attrTween("points", function (d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function (t) {
        var d2 = interpolate(t);
        var pos = outerArc.centroid(d2);
        pos[0] = radius * 0.9 * (midAngle(d2) < Math.PI ? 1 : -1);
        return [arc2.centroid(d2), outerArc.centroid(d2), pos];
      };
    });

  polyline.exit().remove();

  var circles = svg.selectAll(".circles").data(pie(formattedData));

  circles = circles
    .enter()
    .append("circle")
    .attr("class", "circles")
    .attr("r", 3)
    .attr("fill", "none")
    .merge(circles);

  circles
    .transition()
    .duration(transitionSpeed)
    .attrTween("transform", function (d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function (t) {
        var d2 = interpolate(t);
        var pos = outerArc.centroid(d2);
        pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 9 : 9);
        return "translate(" + circlesArc.centroid(d2) + ")";
      };
    });
  circles.exit().remove();

  //novo fim

  return svg;
}
