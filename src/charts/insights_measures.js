import { max } from "d3";

export function insightsMeasuresChart(params) {
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

  var titleInsights = params.titleInsights;
  var numberFormat = params.numberFormat;

  var fontFamily = "'Quicksand', sans-serif";
  var fontWeightBold = "bold";
  var fontWeightNormal = "normal";

  // var innerRadius =  Math.min(width, height) / 1.2
  //ar radius = Math.min(width, height) / 2.2
  var innerRadius = 85;
  var radius = 90;

  var transformWidth =
    parseInt(width) + parseInt(margin.left) + parseInt(margin.right); //+ parseInt(margin.left)
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

  data.forEach(function (d) {
    formattedData.push({
      measure_count: queryResponse.fields.measures[0].name
        ? String(d[queryResponse.fields.measures[0].name]["value"])
        : "",
      measure_count_2: queryResponse.fields.measures[1]
        ? String(d[queryResponse.fields.measures[1].name]["value"])
        : "",
      measure_count_3: queryResponse.fields.measures[2]
        ? String(d[queryResponse.fields.measures[2].name]["value"])
        : "",
    });
  });

  if (d3.select("#toolTip").size() == 0) {
    var div = d3.select("body").append("div").attr("id", "toolTip");
  } else {
    var div = d3.select("#toolTip");
  }

  var chart = d3.select("#chart");

  d3.select("#chart").attr("style", `overflow:hidden; `).html(``);

  var isComment = "";
  if (params.chartDescription != "") {
    isComment = "*";
  }

  var isComment2 = "";
  if (params.chartDescription2 != "") {
    isComment2 = "*";
  }

  chart
    .append("main")
    .data(formattedData)
    .attr("style", `width:${transformWidth}px`)
    .html(function (d) {
      var m1 = d.measure_count.includes(".")
        ? parseFloat(d.measure_count).toFixed(2) + "%"
        : Intl.NumberFormat("pt-BR").format(d.measure_count);
      var m2 = d.measure_count_2.includes(".")
        ? parseFloat(d.measure_count_2).toFixed(2) + "%"
        : Intl.NumberFormat("pt-BR").format(d.measure_count_2);
      var m3 = d.measure_count_3.includes(".")
        ? parseFloat(d.measure_count_3).toFixed(2) + "%"
        : Intl.NumberFormat("pt-BR").format(d.measure_count_3);

      //var m4 = Intl.NumberFormat("pt-BR").format(d.measure_count)
      //var m5 = Intl.NumberFormat("pt-BR").format(d.measure_count)

      Intl.NumberFormat("pt-BR").format(d.measure_count);

      var grp1 = `<div id="grp1" style="height:${transformHeightG}">
        <h3 style="position:absolute; margin-left:13px;margin-top:8px;">
        <span style="color:#8038FB;font-size:48px; font-family: ${fontFamily}; font-weight:${fontWeightNormal} ;">     
          ${params.iconInsights}
        </span><br>
        <span style="color:#333;font-size:17px; font-family: ${fontFamily}; font-weight:${fontWeightNormal} ;">     
          ${params.titleInsights + isComment}
        </span><br>
        <span style="color:#333;font-size:33px; font-family: ${fontFamily}; font-weight:${fontWeightBold} ;">
          ${m1}
        </span>
        
        </h3>      
      </div>`;

      var grp2 = `<div id="grp2" style="height:${transformHeightG}">
      <h3 style="position:absolute; margin-left:13px;margin-top:8px;">
        <span style="color:#8038FB;font-size:48px; font-family: ${fontFamily}; font-weight:${fontWeightNormal};">     
        ${params.iconInsights2}   </span>
        <br>
        <span style="color:#333;font-size:17px; font-family: ${fontFamily}; font-weight:${fontWeightNormal} ;">  
        ${params.titleInsights2 + isComment2}
        </span><br>
        <span style="color:#333;font-size:33px; font-family: ${fontFamily}; font-weight:${fontWeightBold} ;">
        ${m2}  ${m3 == 0 ? "" : " | " + m3}
        </span>
        </h3>
      </div>`;

      var html = `
      <div class="wrapper-looker">
        ${grp1}
        ${grp2}        
      </div>`;

      return html;
    });

  // chart.selectAll("#grp1").data(formattedData);

  //chart.selectAll("#grp2").data(formattedData);

  //novo fim
  return chart;
}
