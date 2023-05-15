import { max } from "d3";

export function barSimpleChart(params) {
  var toggleChart = function (type) {};

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
    parseInt(height) +
    parseInt(margin.top) +
    parseInt(margin.bottom - 20) -
    100; //+ parseInt(margin.left)

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

  if (d3.select("#toolTip").size() == 0) {
    var div = d3.select("body").append("div").attr("id", "toolTip");
  } else {
    var div = d3.select("#toolTip");
  }

  d3.select("#chart").attr("style", "overflow:hidden")
    .html(`<h3 style="position:absolute; margin-left:10px;margin-top:8px;">
                        <span style="font-family: ${fontFamily}; font-weight:${fontWeightNormal} ;
                       ">     
                        ${titleChart}
                        </span>
                        </h3>`);

  var color = d3.scaleOrdinal().range(colors);

  var colorScale = d3
    .scaleSequential(d3.interpolate("purple", "orange"))
    .domain([1, 4]);

  var svgTitle = d3.select("#chart");

  console.log("d3.max(formattedData)", d3.max(formattedData));
  console.log("d3.min(formattedData)", d3.min(formattedData));
  console.log("d3.min(formattedData) all", formattedData);

  const sortable = Object.fromEntries(
    Object.entries(formattedData).sort(([, a], [, b]) => a - b)
  );

  var formattedDataOrderBy = formattedData
    .slice()
    .sort((a, b) => d3.descending(a.measure_count, b.measure_count));

  //texto lateral percentual
  svgTitle
    .append("span")
    .data(pie(formattedDataOrderBy))
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
    .data(pie(formattedDataOrderBy))
    .text(function (d) {
      return d.data.dimension_values;
    })
    .attr(
      "style",
      `margin-left:13px; margin-top:100px;position:absolute; font-family: ${fontFamily};font-weight:${fontWeightNormal} ;font-size:12px`
    );

  svgTitle.exit().remove();

  var scale = d3.scaleLinear();

  scale(100);

  var xScale = d3.scaleBand().range([0, width]).padding(0.05);

  var yScale = d3.scaleLinear().range([0, height]);

  xScale.domain(d3.range(formattedData.length));

  yScale.domain([
    0,
    d3.max(formattedData, function (d) {
      return d.measure_count;
    }),
  ]);

  var barWidth = Math.max(1, 0.9 * xScale.bandwidth());
  var halfGap = Math.max(0, xScale.bandwidth() - barWidth) / 2;

  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + 60)
    .attr("transform", "translate(40,-150)");

  //build bars
  var dimension = Array();

  var bars = svg
    .append("g")
    .attr("transform", "translate(0,30)")
    .append("g")
    .attr("text-anchor", "middle")
    .selectAll("rect")
    .data(formattedData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("rx", "7")
    .attr("ry", "7")
    .attr("x", function (d, i) {
      return xScale(i);
    })
    .attr("width", xScale.bandwidth())
    // .attr("width", barWidth)
    .attr("y", function (d) {
      return height - yScale(d.measure_count);
    })

    .attr("height", function (d) {
      return yScale(d.measure_count);
    })
    .attr("fill", "#6A52FA")
    .on("click", function (d) {
      try {
        div.style("position", "absolute");
        div.style("display", "none");

        dimension[queryResponse.fields.dimensions[0].name] = {
          field: queryResponse.fields.dimensions[0].name,
          value: d.target.__data__.dimension_values,
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

  bars.exit().remove();
  //text labels on bars

  var text = svg
    .append("g")
    .attr("transform", "translate(0,30)")
    .append("g")
    .selectAll("text")
    .data(formattedData)
    .enter()
    .append("text")
    .text(function (d) {
      return Intl.NumberFormat("pt-BR").format(d.measure_count); //d.measure_count;
    })

    .attr("x", function (d, i) {
      return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function (d) {
      return height - yScale(d.measure_count) - 14;
    })
    .attr("font-family", fontFamily)
    .attr("font-weight", fontWeightBold)
    .attr("font-size", "11px")
    //.attr("fill", "#6A52FA")
    .attr("text-anchor", "middle");

  text.exit().remove();

  var text = svg
    .append("g")
    .attr("transform", "translate(0,45)")
    .selectAll("text")
    .data(formattedData)
    .enter()
    .append("text")
    // .attr("transform", "translate(-25,130) rotate(-45)")
    .text(function (d) {
      return d.dimension_values; //d.measure_count;
    })

    .attr("x", function (d, i) {
      return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", height)
    .attr("font-family", fontFamily)
    .attr("font-weight", fontWeightBold)
    .attr("font-size", "11px")
    // .attr("fill", "#6A52FA")
    .attr("text-anchor", "middle");

  text.exit().remove();

  //novo fim
  return svg;
}
