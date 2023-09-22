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

  var colors = Array();

  var colorSelected = "#6A52FA";

  colors = [colorSelected];

  for (var i = 0; i < 100; i++) {
    colors.push(colorSelected);
  }

  try {
    if (details.crossfilters.length > 0) {
      var i = -1;

      data = data.filter(function (d) {
        i++;
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

  var measureExists = false;

  data.forEach(function (d) {
    try {
      formattedData.push({
        measure_count: d[queryResponse.fields.measures[0].name]["value"],
        dimension_values: d[queryResponse.fields.dimensions[0].name]["value"],
      });

      measureExists = true;
    } catch (error) {
      formattedData.push({
        measure_count: "",
        dimension_values: d[queryResponse.fields.dimensions[0].name]["value"],
      });
    }
  });

  // format  data
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

  var svg = d3
    .select("#chart")
    .html(
      `<div style="position:absolute; margin-left:10px; margin-top:-10px;"><h3><span style="font-family: 'Quicksand', sans-serif; font-weight: normal;">${titleChart}</span></h3></div>`
    )
    .append("div")
    .attr(
      "style",
      `
      position:absolute;
      margin-top:50px;
      overflow-y:scroll;
      overflow-x:hidden;
      width:98%; 
      height:${height + margin.top + margin.bottom - 40}px`
    )
    .append("table")
    .attr("id", "box")
    .attr(
      "style",
      `
      width:98%;
      margin-left:10px;      
      margin-right:10px;      
      font-family: ${fontFamily};
      font-weight: ${fontWeightBold};
      font-size: 11px;
      px; color: ${fontColor};
       `
    );

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

  var sizeClient = document.getElementById("chart").getBoundingClientRect();
  var widthClient = sizeClient.width;

  var dimension = Array();
  var isRotate = false;

  svg
    .selectAll("table")
    .attr("id", "table_horizontal")
    .data(formattedData)
    .enter()
    .append("tr")
    .attr("data-value", function (d) {
      return d.dimension_values;
    })
    .attr("class", "filtered-table-value")
    .html(function (d, i) {
      var html = "";

      if (measureExists) {
        var percent = (d.measure_count / max) * 100;
        var color = "";
        var scale_percent = (d.measure_count / max) * 100;

        try {
          if (details.crossfilters.length > 0) {
            var i = -1;

            if (!details.crossfilters[0].values.includes(d.dimension_values)) {
              color = barNotSelected[0];
            } else {
              //criar uma função que retorne as cores
              if (percent >= 75) {
                color = "#1EC370";
              } else if (percent < 75 && percent >= 50) {
                color = "#6A52FA";
              } else if (percent < 50 && percent >= 25) {
                color = "#20B9FC";
              } else {
                color = "#FD8A64";
              }
            }
          } else {
            //criar uma função que retorne as cores
            if (percent >= 75) {
              color = "#1EC370";
            } else if (percent < 75 && percent >= 50) {
              color = "#6A52FA";
            } else if (percent < 50 && percent >= 25) {
              color = "#20B9FC";
            } else {
              color = "#FD8A64";
            }
          }
        } catch (error) {}

        color = params.config.color_table;

        scale_percent = scale_percent < 5 ? 3 : scale_percent;

        html = `<td width="110">${d.dimension_values}</td> 
        <td>       
          <div  style="border-radius:0px 7px 7px 0px; height:25px; width:${scale_percent}%; background:${color}" data-value="${
          d.dimension_values
        }"></div>        
        </td> 
        <td align="right" width="70">
          ${Intl.NumberFormat("pt-BR").format(d.measure_count)}
        </td>`;
      } else {
        try {
          if (details.crossfilters.length > 0) {
            var i = -1;

            if (!details.crossfilters[0].values.includes(d.dimension_values)) {
              //color = barNotSelected[0];
            } else {
              //criar uma função que retorne as cores
              if (percent >= 75) {
                color = "#7fdffe";
              } else if (percent < 75 && percent >= 50) {
                color = "#7fdffe";
              } else if (percent < 50 && percent >= 25) {
                color = "#7fdffe";
              } else {
                color = "#7fdffe";
              }
            }
          } else {
            //criar uma função que retorne as cores
            if (percent >= 75) {
              color = "#7fdffe";
            } else if (percent < 75 && percent >= 50) {
              color = "#7fdffe";
            } else if (percent < 50 && percent >= 25) {
              color = "#7fdffe";
            } else {
              //color = "#FD8A64";
            }
          }
        } catch (error) {}
        html = `<td>        
        <div style="background:${color}; border-radius:0px 7px 7px 0px; height:30px; width:100%;" data-value="15" > ${d.dimension_values}</div>          
        </td>`;
      }
      return html;
    });

  svg.selectAll(".filtered-table-value").on("click", function (e, d) {
    // try {
    //   const scroller = document.querySelector("body");
    //   console.log("scroll", scroller.scrollTop);
    //   window.scrollTo(100, 5);
    // } catch (error) {}

    try {
      div.style("position", "absolute");
      div.style("display", "none");

      dimension[queryResponse.fields.dimensions[0].name] = {
        field: queryResponse.fields.dimensions[0].name,
        value: `${String(d.dimension_values)}`,
      };

      console.log("tem virgula", `${String(d.dimension_values)}`);

      var payload = {
        event: e,
        row: dimension,
      };

      LookerCharts.Utils.toggleCrossfilter(payload);
    } catch (error) {}

    return false;
  });

  return svg;
}
