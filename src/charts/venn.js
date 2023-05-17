import { max } from "d3";
import { venn } from "venn";
import $ from "jquery";

export function vennChart(params) {
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

  var vis = params.vis;

  var fontFamily = "'Quicksand', sans-serif";
  var fontWeightBold = "bold";
  var fontWeightNormal = "normal";

  // var innerRadius =  Math.min(width, height) / 1.2
  //ar radius = Math.min(width, height) / 2.2
  var innerRadius = 90;
  var radius = 100;

  console.log("formattedData", data);

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

  // format  data
  data.forEach(function (d) {
    formattedData.push({
      sets: d[queryResponse.fields.dimensions[0].name]["value"],
      label: d[queryResponse.fields.dimensions[1].name]["value"],
      size: d[queryResponse.fields.dimensions[2].name]["value"],
      data: d[queryResponse.fields.dimensions[3].name]["value"],
    });
  });

  console.log("formattedData", data);

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

  var svgTitle = d3.select("#chart");

  var sets = formattedData;

  var svgContainer = d3
    .select("#chart")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

  var venngroup = svgContainer.append("g").attr("id", "venngroup");

  var chart = venn.VennDiagram().width(width).height(height).styled(false);

  var div = d3.select("#venngroup");
  div.datum(sets).call(chart);
  var tooltip = d3
    .select("#tooltell")
    .append("div")
    .attr("class", "venntooltip");
  div
    .selectAll("path")
    .style("stroke-opacity", 0)
    .style("stroke", "rgba(22,22,22,1)")
    .style("stroke-width", 2)
    .style("transform-origin", "50% 50%");

  div
    .selectAll("g.venn-area")
    .on("mouseover", function (d, i) {
      // sort all the areas relative to the current item
      venn.sortAreas(div, d);
      // Display a tooltip with the current size
      tooltip.transition().duration(300).style("opacity", 1);
      tooltip.text(d.data);

      // highlight the current path
      var selection = d3.select(this).transition("tooltip").duration(300);
      selection
        .select("path")
        .style("fill-opacity", 1)
        .style("stroke-opacity", 1)
        .style("transform", "scale(1.01,1.01)")
        .style("transform-origin", "50% 50%");
    })

    .on("mouseout", function (d, i) {
      tooltip.transition().duration(500).style("opacity", 0);
      var selection = d3.select(this).transition("tooltip").duration(400);
      selection
        .select("path")
        .style("fill-opacity", d.sets.length == 1 ? 1 : 1)
        .style("stroke-opacity", 0)
        .style("transform", "scale(1,1)")
        .style("transform-origin", "50% 50%");
    });

  //

  // var myLabel = svg
  //   .append("foreignObject")
  //   .attr({
  //     height: 150,
  //     width: 100, // dimensions determined based on need
  //     transform: "translate(0,0)", // put it where you want it...
  //   })
  //   .html('<div class"style-me"><p>My label </p></div>');

  var stuffToBeWrapped = d3.selectAll("svg");

  stuffToBeWrapped.each(function () {
    d3.select(this.childNode)
      .insert("g", function () {
        return this;
      })
      .attr("class", "wrapper")
      .append(function () {
        return this;
      });
  });

  //novo fim
  return svgContainer;
}