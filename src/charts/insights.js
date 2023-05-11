import { max } from "d3";

export function insightsChart(params) {
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

  var iconInsights = params.iconInsights;
  var titleInsights = params.titleInsights;
  var numberFormat = params.numberFormat;

  var fontFamily = "'Quicksand', sans-serif";
  var fontWeightBold = "bold";
  var fontWeightNormal = "normal";

  // var innerRadius =  Math.min(width, height) / 1.2
  //ar radius = Math.min(width, height) / 2.2
  var innerRadius = 85;
  var radius = 90;

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

  console.log("var data após o filtro", data);
  console.log("details", details);

  // format  data
  data.forEach(function (d) {
    formattedData.push({
      measure_count: d[queryResponse.fields.measures[0].name]["value"],
    });
  });

  if (d3.select("#toolTip").size() == 0) {
    var div = d3.select("body").append("div").attr("id", "toolTip");
  } else {
    var div = d3.select("#toolTip");
  }

  d3.select("#chart").attr("style", "overflow:hidden")
    .html(`<h3 style="position:absolute; margin-left:13px;margin-top:8px;">
                        <span style="color:#8038FB;font-size:48px; font-family: ${fontFamily}; font-weight:${fontWeightNormal} ;
                       ">     
                        ${iconInsights}
                        </span>
                        </h3>`);

  var svgTitle = d3.select("#chart");

  //texto lateral percentual
  svgTitle
    .append("span")
    .attr("fill", "#333")
    .text(titleInsights)
    .attr(
      "style",
      `margin-left:13px; margin-top:80px;position:absolute; font-family: ${fontFamily};font-weight:${fontWeightNormal} ; font-size:17px; color:#333`
    );

  svgTitle
    .append("span")
    .data(formattedData)
    .attr("fill", "#333")
    .text(function (d) {
      if (numberFormat == "percent") {
        var options = {
          style: "percent",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        };
        //return Intl.NumberFormat("pt-BR", options).format(d.measure_count);
        return (
          String(parseFloat(d.measure_count).toFixed(2)) + "%".replace(".", ",")
        );
      }

      return Intl.NumberFormat("pt-BR").format(d.measure_count);
    })
    .attr(
      "style",
      `margin-left:13px; margin-top:110px;position:absolute; font-family: ${fontFamily};font-weight:${fontWeightBold} ; font-size:38px; color:#333`
    );

  //novo fim
  return svgTitle;
}
