import { max } from "d3";

export function barHorizontalChart(params) {
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
  var fontSize = "28";
  var fontWeightBold = "bold";
  var fontWeightNormal = "normal";
  var fontColor = "#333";

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

  console.log("width", width);
  console.log("height", height);
  var colors = Array();

  var colorSelected = "#6A52FA";

  colors = [
    colorSelected,
    colorSelected,
    colorSelected,
    colorSelected,
    colorSelected,
    colorSelected,
    colorSelected,
    colorSelected,
    colorSelected,
    colorSelected,
    colorSelected,
  ];

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

  // format  data
  data.forEach(function (d) {
    formattedData.push({
      measure_count: d[queryResponse.fields.measures[0].name]["value"],
      dimension_values: d[queryResponse.fields.dimensions[0].name]["value"],
    });
  });

  var ordScale = d3.scaleOrdinal().domain(formattedData).range(colors);

  if (d3.select("#toolTip").size() == 0) {
    var div = d3.select("body").append("div").attr("id", "toolTip");
  } else {
    var div = d3.select("#toolTip");
  }

  var color = d3.scaleOrdinal().range(colors);

  var colorScale = d3
    .scaleSequential(d3.interpolate("purple", "orange"))
    .domain([1, 4]);

  var svgTitle = d3.select("#chart");

  var formattedDataOrderBy = formattedData
    .slice()
    .sort((a, b) => d3.descending(a.measure_count, b.measure_count));

  var pie = d3
    .pie()
    .sort((a, b) => (a > b ? 50 : -100))
    .value(function (d) {
      return d.measure_count;
    });

  //texto lateral percentual
  // svgTitle
  //   .append("span")
  //   .data(pie(formattedDataOrderBy))
  //   .attr("fill", "#333")
  //   .text(function (d) {
  //     return (
  //       String(
  //         parseFloat(
  //           ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100
  //         ).toFixed(0)
  //       ) + "%"
  //     );
  //   })

  //   .attr(
  //     "style",
  //     `margin-left:13px;
  //      margin-top:80px;
  //      position:absolute;
  //      font-family: ${fontFamily};
  //      font-weight: ${fontWeightBold};
  //      font-size: ${fontSize};
  //      px; color: ${fontColor};`
  //   );

  // texto lateral value
  // svgTitle
  //   .append("span")
  //   .data(pie(formattedDataOrderBy))
  //   .text(function (d) {
  //     return d.data.dimension_values;
  //   })
  //   .attr(
  //     "style",
  //     `margin-left:13px; margin-top:100px;position:absolute; font-family: ${fontFamily};font-weight:${fontWeightNormal} ;font-size:12px;`
  //   );

  var svg = d3
    .select("#chart")
    .attr("style", "overflow:hidden")
    .append("span")
    .html(
      `<h3 style="position:absolute; margin-left:10px; margin-top:5px;"><span style="font-family: 'Quicksand', sans-serif; font-weight: normal;">${titleChart}</span></h3>`
    )
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", function () {
      return height + margin.top + margin.bottom;
    })
    .append("g")
    .attr("id", "box")
    .attr("transform", function () {
      return `translate(20,50)`;
    });

  svgTitle.exit().remove();

  var scale = d3.scaleLinear();

  scale(100);

  var max = d3.max(formattedData, function (d) {
    return d.measure_count;
  });

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

  //build bars
  var dimension = Array();

  var isRotate = false;

  var bar_height = 20,
    left_width = 100,
    gap = 2,
    extra_width = 100;

  var yRangeBand = bar_height + 2 * gap;

  var newY = function (i) {
    return yRangeBand * i;
  };

  var newX = d3.scaleLinear().domain([0, max]).range([0, width]);

  var chart = d3
    .select("#chart")
    .append("svg")
    .attr("class", "horizontal")
    .attr("width", left_width + width + 40 + extra_width)
    .attr("height", (bar_height + gap * 2) * (formattedData.length + 1))
    .append("g")
    .attr("transform", "translate(20, 20)");

  console.log("newX", newX);

  svg
    .selectAll("rect")
    .data(formattedData)
    .enter()
    .append("rect")
    .attr("x", left_width)
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("y", function (d, i) {
      console.log("y(i)", newY(i));
      return newY(i) + gap;
    })
    .attr("width", function (d) {
      return yScale(d.measure_count) + 20;
    })
    .attr("height", bar_height)
    .attr("fill", function (d, i) {
      var percent = (d.measure_count / max) * 100;

      if (percent >= 75) {
        return "#1EC370";
      } else if (percent < 75 && percent >= 50) {
        return "#6A52FA";
      } else if (percent < 50 && percent >= 25) {
        return "#20B9FC";
      } else {
        return "#FD8A64";
      }
    });

  const widthClient = document.getElementById("box").getBoundingClientRect();

  svg
    .selectAll("text.score")
    .data(formattedData)
    .enter()
    .append("text")
    .attr("x", width + 30)
    .attr("y", function (d, i) {
      return newY(i) + yRangeBand / 2;
    })

    .attr("dx", -5)
    .attr("dy", ".36em")
    .attr("text-anchor", "end")
    .attr("class", "score")
    .text(function (d) {
      return d.measure_count;
    })
    .attr(
      "style",
      `margin-left:13px; 
       margin-top:80px;
       position:absolute; 
       font-family: ${fontFamily};
       font-weight: ${fontWeightNormal}; 
       font-size: 11px;
       px; color: ${fontColor};`
    );

  svg
    .selectAll("text.name")
    .data(formattedData)
    .enter()
    .append("text")
    .attr("x", -10)
    .attr("y", function (d, i) {
      return newY(i) + yRangeBand / 2;
    })
    .attr("dy", ".36em")
    .attr("text-anchor", "start")
    .attr("class", "name")
    .text(function (d) {
      return d.dimension_values;
    })
    .attr(
      "style",
      `margin-left:13px; 
       margin-top:80px;
       position:absolute; 
       font-family: ${fontFamily};
       font-weight: ${fontWeightBold}; 
       font-size: 11px;
       px; color: ${fontColor};`
    );

  return svg;
}
