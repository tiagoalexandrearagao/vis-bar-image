import { max } from "d3";

export function barHorizontalDMPChart(params) {
  var toggleChart = function (type) {};

  var d3 = params.d3;
  var width = params.width;
  var margin = params.margin;
  var height = params.height;
  var data = params.data;
  var queryResponse = params.queryResponse;
  var titleChart = params.titleGraphic;
  var details = params.details;

  var fontFamily = "'Quicksand', sans-serif";
  var fontWeightBold = "bold";
  var fontWeightNormal = "normal";
  var fontColor = "#333";

  var formattedData = [];
  console.log("dados", data);
  console.log("dados fields", queryResponse.fields);

  var total_consumers = 0;
  var everyone = 0;
  var overlap = 0;
  var affinity = 0;
  var score = 0;

  if (d3.select("#toolTip").size() == 0) {
    var div = d3.select("body").append("div").attr("id", "toolTip");
  } else {
    var div = d3.select("#toolTip");
  }

  if (params.config.measure_or_calculation == "measure") {
    data.forEach(function (d) {
      try {
        everyone = d[queryResponse.fields.measures[0].name]["value"];
        total_consumers = d[queryResponse.fields.measures[2].name]["value"];
      } catch (error) {}
    });

    data.forEach(function (d) {
      var line_consumers = d[queryResponse.fields.measures[1].name]["value"];
      overlap = line_consumers / total_consumers;

      affinity = overlap / (total_consumers / everyone);

      score = affinity * (total_consumers / everyone);

      try {
        formattedData.push({
          measure_1: overlap * 100,
          measure_2: affinity * 100,
          measure_3: score,
          dimension_values: d[queryResponse.fields.dimensions[0].name]["value"],
        });
      } catch (error) {}
    });
  } else {
    data.forEach(function (d) {
      try {
        formattedData.push({
          measure_1:
            d[queryResponse.fields.table_calculations[0].name]["value"],
          measure_2:
            d[queryResponse.fields.table_calculations[1].name]["value"],
          measure_3:
            d[queryResponse.fields.table_calculations[2].name]["value"],
          dimension_values: d[queryResponse.fields.dimensions[0].name]["value"],
        });
      } catch (error) {}
    });
  }

  var svg = d3
    .select("#chart")
    .html(
      `<div style="position:absolute; margin-left:10px; margin-top:-10px;"><h3><span style="font-family: 'Quicksand', sans-serif; font-weight: normal;">${titleChart}</span></h3></div>`
    )
    .append("div")
    .attr(
      "style",
      `
      position: absolute;
      margin-top: 50px;
      overflow-y: scroll;
      overflow-x: hidden;
      width: 98%; 
      height: ${height + margin.top + margin.bottom - 40}px`
    )
    .append("table")
    .attr("id", "box")
    .attr(
      "style",
      `
      margin-top:20px;
      width:98%;
      margin-left:10px;      
      margin-right:10px;      
      font-family: ${fontFamily};
      font-weight: ${fontWeightBold};
      font-size: 11px;
      color: ${fontColor};
      `
    );

  var max = d3.max(formattedData, function (d) {
    return d.measure_1;
  });

  var dimension = Array();
  var c = 0;

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
      var td = "";
      var dim = d.dimension_values;
      var det = details;
      var p = params;

      var appendTitle = "";

      if (c == 0) {
        appendTitle = `<div style="position:absolute; margin-top:-20px; left:0; margin-left:10px;">Tier</div> `;
      }

      html = `<td width="70">${appendTitle}<div>${d.dimension_values}</div></td>`;
      td = td + createTD(p, det, max, dim, d.measure_1, c, "Overlap", "%");
      td = td + createTD(p, det, max, dim, d.measure_2, c, "Afinidade");
      td = td + createTD(p, det, max, dim, d.measure_3, c, "Score");

      c++;
      return html + td;
    });

  svg.selectAll(".filtered-table-value").on("click", function (e, d) {
    console.log("click", d);
    div.style("position", "absolute");
    div.style("display", "none");

    dimension[queryResponse.fields.dimensions[0].name] = {
      field: queryResponse.fields.dimensions[0].name,
      value: `${String(d.dimension_values)}`,
    };

    var payload = {
      event: e,
      row: dimension,
    };

    LookerCharts.Utils.toggleCrossfilter(payload);

    return false;
  });

  return svg;
}

function createTD(
  params,
  details,
  max,
  dimension,
  measure,
  counter = 1,
  title = "",
  percentString = ""
) {
  var percent = (measure / max) * 100;
  var color = params.config.color_table;
  var scale_percent_width = percent < 5 ? 5 : percent;
  var scale_percent_width = percent > 50 ? 50 : scale_percent_width;
  var fixed = measure;

  try {
    if (details.crossfilters.length > 0) {
      if (!details.crossfilters[0].values.includes(dimension)) {
        color = params.config.color_not_selected;
      }
    }
  } catch (error) {}

  try {
    fixed = measure.toFixed(2);
  } catch (error) {}
  var appendTitle = "";

  if (counter == 0) {
    appendTitle = `<div style="position:absolute; margin-top:-20px;left:0; margin-left:0px;"> ${title}</div> `;
  }

  var td = `
        <td style="position:relative"> 
              ${appendTitle}    
            <div  
            style="margin-right:5px; float:left; border-radius:0px 7px 7px 0px; height:25px; width:${scale_percent_width}%; background:${color}" 
            data-value="${dimension}">
            </div>   
            <div style="overflow:hidden;margin-top: 8px;"> 
              ${Intl.NumberFormat("pt-BR").format(fixed)}${percentString}
            </div>                 
        </td>         
        `;

  return td;
}

function scalePercent(scale, color) {}

function setColor(percent, isFiltered = true) {
  var color = "";
  if (percent >= 75) {
    color = "#1EC370";
  } else if (percent < 75 && percent >= 50) {
    color = "#6A52FA";
  } else if (percent < 50 && percent >= 25) {
    color = "#20B9FC";
  } else {
    color = "#FD8A64";
  }
  if (isFiltered) {
    return color;
  } else {
    return "#7fdffe";
  }
}
