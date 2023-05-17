import { VennDiagram, venn } from "venn.js";

export function vennChart(params) {
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
  var config = params.config;

  var strokeWidth = params.strokeWidth;
  var dimensionTitle = params.dimensionTitle;
  var measureTitle = params.measureTitle;

  var vis = params.vis;

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
  var sets = [];

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

  // format  data
  data.forEach(function (d) {
    sets.push({
      sets: JSON.parse(d[config.first_dimension]["value"]),
      set: JSON.parse(d[config.first_dimension]["value"]),
      size: d[config.second_dimension]["value"],
      label: d[config.third_dimension]["value"],
    });
  });

  console.log("formattedData", sets);

  // if (d3.select("#toolTip").size() == 0) {
  //   var div = d3.select("body").append("div").attr("id", "toolTip");
  // } else {
  //   var div = d3.select("#toolTip");
  // }

  d3.select("#chart").attr("style", "overflow:hidden")
    .html(`<h3 style="position:absolute; margin-left:10px;margin-top:8px;">
                      <span style="font-family: ${fontFamily}; font-weight:${fontWeightNormal} ;
                     ">     
                      ${titleChart}
                      </span>
                      </h3>`);

  // draw venn diagram

  d3.select("#chart").append("div").attr("id", "venn");

  const div = d3.select("#venn");
  div.datum(sets).call(VennDiagram());

  // add a tooltip
  const tooltip = d3.select("body").append("div").attr("class", "venntooltip");

  // add listeners to all the groups to display tooltip on mouseenter
  div
    .selectAll("g")
    .on("mouseenter", function (d) {
      // sort all the areas relative to the current item
      venn.sortAreas(div, d);

      // Display a tooltip with the current size
      tooltip.transition().duration(400).style("opacity", 0.9);
      tooltip.text(d.size + " match");

      // highlight the current path
      const selection = d3.select(this).transition("tooltip").duration(400);
      selection
        .select("path")
        .style("stroke-width", 3)
        .style("fill-opacity", d.sets.length == 1 ? 0.4 : 0.1)
        .style("stroke-opacity", 1);
    })

    .on("mousemove", function () {
      tooltip
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })

    .on("mouseleave", function (d) {
      tooltip.transition().duration(400).style("opacity", 0);
      const selection = d3.select(this).transition("tooltip").duration(400);
      selection
        .select("path")
        .style("stroke-width", 0)
        .style("fill-opacity", d.sets.length == 1 ? 0.25 : 0.0)
        .style("stroke-opacity", 0);
    });

  //novo fim
  return div;
}
