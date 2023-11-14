import * as d3 from "d3";
export function atributo(params) {
  let colorSelected = params.config.bar_color_selected;
  let dimension = Array();
  let formattedData = Array();

  params.data.forEach(function (d) {
    let color = "";
    try {
      if (params.details.crossfilters.length > 0) {
        let filter = params.details.crossfilters[0].values;
        color = filter == d.dimension ? colorSelected : "";
      }
    } catch (error) {}

    formattedData.push({
      dimension: d.dimension,
      color: color,
    });
  });

  let html = chart
    .attr(
      "style",
      `
    padding: ${params.config.padding};    
    margin-top: ${params.config.top_margin};
    margin-bottom: ${params.config.bottom_margin};
    margin-left: ${params.config.side_margin};
    margin-right: ${params.config.side_margin};        
    `
    )
    .append("div")
    .append("table")
    .attr("id", "table-main")
    .attr(
      "style",
      `
      font-size: ${params.config.font_size};
      font-family: ${params.config.font_family};
      width: ${params.config.width};
      `
    );

  html
    .selectAll("#table-main")
    .data(formattedData)
    .enter()
    .append("tr")
    .attr("onmouseover", function () {
      return `this.style.background='${params.config.cursor_pointer_color}'`;
    })
    .attr("onmouseout", `this.style.background='#ffffff'`)
    .html(function (d, e) {
      let color = d.color != "" ? `background:${d.color};` : "";
      let td = `<td style="${color}     
      border-radius: ${params.config.border_radius};
      padding: ${params.config.td_padding}">${d.dimension}
      </td>`;
      return td;
    })
    .on("click", function (d, e) {
      d3.select(this).attr(
        "style",
        `background: ${params.config.background_onclick};`
      );

      dimension[params.queryResponse.fields.dimensions[0].name] = {
        field: params.queryResponse.fields.dimensions[0].name,
        value: JSON.stringify(d.dimension),
      };

      let payload = {
        event: e,
        row: dimension,
      };

      LookerCharts.Utils.toggleCrossfilter(payload);
    });

  return html;
}
