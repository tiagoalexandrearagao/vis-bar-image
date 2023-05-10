import { max } from "d3";

export function banner(params) {
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

  var svgTitle = d3.select("#chart");

  // d3.select("#vis").attr(
  //   "style",
  //   `background-position: center;
  //   background-repeat: no-repeat;
  //   background-size: cover;
  //   background: linear-gradient(210.38deg, #2FE1EC -23.6%, rgba(47, 187, 236, 0) 62.05%), linear-gradient(149.62deg, #2573E9 -34.04%, #C006DE 147.39%);`
  // );

  d3.select("body").attr(
    "style",
    `background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background: linear-gradient(210.38deg, #2FE1EC -23.6%, rgba(47, 187, 236, 0) 62.05%), linear-gradient(149.62deg, #2573E9 -34.04%, #C006DE 147.39%);`
  );

  svgTitle
    .append("div")
    .attr("style", "position:absolute; float:right; ")
    .html(
      `<svg id="svg-logo" width="562" height="512" viewBox="0 0 562 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M281.001 117.633C217.761 117.633 167.05 168.941 167.05 231.584C167.05 294.227 217.761 345.535 281.001 345.535C344.241 345.535 395.549 294.227 395.549 231.584C394.952 168.344 344.241 117.633 281.001 117.633ZM281.001 117.633C217.761 117.633 167.05 168.941 167.05 231.584C167.05 294.227 217.761 345.535 281.001 345.535C344.241 345.535 395.549 294.227 395.549 231.584C394.952 168.344 344.241 117.633 281.001 117.633ZM472.499 364.04C411.645 370.603 344.229 371.796 280.989 371.796C217.749 371.796 150.333 370.603 89.4797 364.04C72.1782 362.25 62.6325 358.074 60.2461 338.983C56.6665 303.783 56.6665 267.987 56.6665 231.594C56.6665 195.201 56.6665 158.809 60.2461 124.206C62.0359 105.114 71.5816 100.938 89.4797 99.1484C150.333 92.5858 217.749 91.3926 280.989 91.3926C344.229 91.3926 411.645 92.5858 472.499 99.1484C490.397 100.938 499.943 105.114 501.732 124.206C505.312 159.405 505.312 195.201 505.312 231.594C505.312 267.987 505.312 303.783 501.732 338.983C499.346 357.477 489.8 362.25 472.499 364.04ZM281 -50C125.883 -50 0 76.4798 0 231C0 385.52 125.883 512 281 512C436.117 512 562 385.52 562 231C562 76.4798 436.117 -50 281 -50ZM281.001 117.633C217.761 117.633 167.05 168.941 167.05 231.584C167.05 294.227 217.761 345.535 281.001 345.535C344.241 345.535 395.549 294.227 395.549 231.584C394.952 168.344 344.241 117.633 281.001 117.633Z" fill="white"/>
    </svg>    `
    );

  d3.select("#svg-logo").attr("transform", function () {
    var x = 50;

    const widthClient = document
      .getElementById("legend")
      .getBoundingClientRect();
    //const resize = width * 0.25 + widthClient.width / 2;
    const resize = width / 2 + 300;
    return `translate(${resize},0)`;
  });

  //novo fim
  return svgTitle;
}
