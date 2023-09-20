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

  var colors = Array();

  colors = ["#FD8A64", "#1EC370", "#6A52FA", "#20B9FC"];

  if (queryResponse.fields.measures[1]) {
    data.forEach(function (d) {
      formattedData.push({
        measure_count: d[queryResponse.fields.measures[0].name]["value"],
        measure_count_2: d[queryResponse.fields.measures[1].name]["value"],
      });
    });
  } else {
    data.forEach(function (d) {
      formattedData.push({
        measure_count: d[queryResponse.fields.measures[0].name]["value"],
        measure_count_2: "",
      });
    });
  }

  // format  data

  if (d3.select("#toolTip").size() == 0) {
    var div = d3.select("body").append("div").attr("id", "toolTip");
  } else {
    var div = d3.select("#toolTip");
  }

  d3.select("#chart").attr("style", `overflow:hidden; `)
    .html(`<h3 style="position:absolute; margin-left:13px;margin-top:8px;">
                        <span style="color:#8038FB;font-size:48px; font-family: ${fontFamily}; font-weight:${fontWeightNormal} ;
                       ">     
                        ${iconInsights}
                        </span>
                        </h3>`);

  var svgTitle = d3.select("#chart");

  var isComment = "";
  if (params.chartDescription != "") {
    isComment = "*";
  }

  //texto lateral percentual
  svgTitle
    .append("span")
    .attr("fill", "#333")
    .text(titleInsights + isComment)
    .attr(
      "style",
      `margin-left:13px; 
      margin-top:80px;
      position:absolute; 
      font-family: ${fontFamily};
      font-weight: ${fontWeightNormal} ; 
      font-size:17px; 
      height:20px;
      overflow: hidden;
      text-overflow: ellipsis;
      color:#333`
    );

  var new_width = 33;

  if (transformWidthG < 219) {
    new_width = 23;
  }

  svgTitle
    .append("span")
    .data(formattedData)
    .attr("fill", "#333")
    .text(function (d) {
      if (numberFormat == "percent") {
        var percentage = parseFloat(d.measure_count).toFixed(2);
        percentage = String(percentage).replace(".", ",");
        return percentage + "%";
      }

      if (d.measure_count_2 != "") {
        var percentage = parseFloat(d.measure_count_2).toFixed(2);
        percentage = String(percentage).replace(".", ",");
        var percent_format = percentage + "%";

        var value_format = Intl.NumberFormat("pt-BR").format(d.measure_count);

        var value_percent =
          String(value_format) + " | " + String(percent_format);

        return value_percent;
      }
      var value_format = Intl.NumberFormat("pt-BR").format(d.measure_count);

      return value_format;
    })
    .attr(
      "style",
      `margin-left:13px; margin-top:110px;position:absolute; font-family: ${fontFamily};font-weight:${fontWeightBold} ; font-size:${new_width}px; color:#333`
    );

  d3.select("#chart")
    .on("mousemove", function (event, d) {
      if (params.chartDescription != "") {
        div.style("left", event.pageX + 15 + "px");
        div.style("top", event.pageY - 50 + "px");
        div.style("display", "inline-block");
        div.style("position", "absolute");
        div.style("font-family", fontFamily);
        div.style("font-weight", fontWeightBold);
        div.style("font-size", `11px`);
        div.style("background-color", "#fff");
        div.style("z-index", "9999999999");
        div.style("padding", "8px");
        div.style("border", "1px solid #dedede");
        div.html(
          `<span style="font-weight: ${fontWeightBold}; color:#333" > ${params.chartDescription}</span>`
        );
      }
    })
    .on("mouseover", function (d) {
      d3.select(this).style("cursor", "pointer");
      d3.select(this).style("stroke", "#333");
      d3.select(this).style("stroke-width", "1");
    })
    //remove styling when the mouse leaves.
    .on("mouseout", function (d, i) {
      d3.select(this).style("stroke", "#fff");
      div.style("display", "none");
      d3.select(this).style("stroke-width", "1");
    });

  //novo fim
  return svgTitle;
}
