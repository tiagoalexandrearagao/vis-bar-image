import { max } from "d3";
import { orderByFilterPosition, setColor } from "../functions/index";

export function table_or(params) {
  let toggleChart = function (type) {};

  let d3 = params.d3;
  let formattedData = Array();
  var dimension = Array();

  if (d3.select("#toolTip").size() == 0) {
    var div = d3.select("body").append("div").attr("id", "toolTip");
  } else {
    var div = d3.select("#toolTip");
  }

  formattedData = orderByFilterPosition(params, formattedData);

  var svg = d3
    .select("#chart")
    .append("div")
    .attr(
      "style",
      `
      position: absolute;
      margin-top: 50px;
      overflow-y: scroll;
      overflow-x: hidden;
      width: 98%; 
      height:${params.height + params.margin.top + params.margin.bottom - 40}px`
    )
    .append("table")
    .attr("id", "box")
    .attr(
      "style",
      `
      width: 98%;
      margin-left: 10px;      
      margin-right: 10px;      
      font-family: ${params.config.table_font_family};
      font-weight: ${params.config.table_font_weight};
      font-size: ${params.config.table_font_size}px;
      color: ${params.config.table_font_color};
       `
    );

  var max = d3.max(formattedData, function (d) {
    return d.measure;
  });

  svg
    .selectAll("table")
    .attr("id", "table_horizontal")
    .data(formattedData)
    .enter()
    .append("tr")
    .attr("data-value", function (d) {
      return d.dimension;
    })
    .attr("class", "filtered-table-value")
    .html(function (d, e) {
      let html = "";
      let color = d.color;
      let scale_percent = (d.measure / max) * 100;

      scale_percent = scale_percent < 5 ? 3 : scale_percent;

      html = `<td width="110">${d.dimension}</td> 
        <td>       
          <div style="border-radius:0px 7px 7px 0px; height:25px; width: ${scale_percent}%; background:${color}" data-value="${
        d.dimension
      }"></div>        
        </td> 
        <td align="right" width="70">
          ${Intl.NumberFormat("pt-BR").format(d.measure)}
        </td>`;

      return html;
    })
    .on("click", function (e, d) {
      try {
        div.style("position", "absolute");
        div.style("display", "none");

        dimension[params.queryResponse.fields.dimensions[0].name] = {
          field: params.queryResponse.fields.dimensions[0].name,
          value: JSON.stringify(d.dimension),
        };

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
