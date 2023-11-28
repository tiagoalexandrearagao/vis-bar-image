import * as d3 from "d3";
export function atributo(params) {
  let dimension = Array();
  let formattedData = Array();

  let filterExists = false;
  let arrayPrimary = [];
  let arraySecondary = [];

  params.data.forEach(function (d) {
    let dimension = d[params.queryResponse.fields.dimensions[0].name]["value"];
    formattedData.push({
      dimension: dimension,
    });
  });

  formattedData.forEach(function (d) {
    let isExists = false;
    try {
      if (params.details.crossfilters.length > 0) {
        let filter = params.details.crossfilters[0].values;

        if (typeof filter == "object") {
          for (let i = 0; i < filter.length; i++) {
            if (filter[i].replace(/\"/gm, "") == d.dimension) {
              isExists = true;
              filterExists = true;
            }
          }
        }
      }
    } catch (error) {}

    if (isExists) {
      arrayPrimary.push(d);
    } else {
      arraySecondary.push(d);
    }
  });

  if (filterExists) {
    formattedData = [...arrayPrimary, ...arraySecondary];
  }

  let table = d3
    .select("#chart-content")
    .append("table")
    .attr("id", "table-main");

  let html = table
    .selectAll("#table-main")
    .data(formattedData)
    .enter()
    .append("tr")
    .html(function (d, e) {
      let color = "";
      let paddingLeft = "";
      let background = "";

      if (params.details.crossfilters.length > 0) {
        let filter = params.details.crossfilters[0].values;

        if (typeof filter == "object") {
          for (let i = 0; i < filter.length; i++) {
            if (filter[i].replace(/\"/gm, "") == d.dimension) {
              color = `color:${params.config.value_color_selected};`;
              paddingLeft = `padding-left:12px;`;
              background = `background: ${params.config.value_background_selected};`;
            }
          }
        }
      }

      let td = `<td style="${background}  ${color}  ${paddingLeft}
      border-radius: ${params.config.border_radius}px;
      padding-top: ${params.config.td_padding}px;
      padding-bottom: ${params.config.td_padding}px;
      overflow:hidden;"
      >
      ${d.dimension}
      </td>`;
      return td;
    })
    .on("click", function (e, d) {
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
