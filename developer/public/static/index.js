let endpointData = "/api/dataAtributo"; //alterar no arquivo server.js
let endpointConfig = "/api/config"; //alterar no arquivo server.js

/**Não alterar */
import * as d3 from "https://cdn.skypack.dev/d3@5";
import axios from "https://cdn.skypack.dev/axios";

class LookerCharts {
  static Utils = {
    toggleCrossfilter: function (payload) {
      console.log("toggleCrossfilter - payload:", payload);
    },
  };
}

class Api {
  static dataBase() {
    return axios.get(endpointData);
  }
  static dataConfig() {
    return axios.get(endpointConfig);
  }
}

class Graphic extends Api {
  async init() {
    /**Não alterar */
    let data = await Api.dataBase();
    let dataConfig = await Api.dataConfig();
    let params = Object();
    params.config = dataConfig.data;
    params.data = data.data;
    params.queryResponse = {
      fields: {
        dimensions: [
          {
            name: "Morango",
          },
        ],
      },
    };

    params.details = {
      crossfilters: [
        {
          values: "Limão",
        },
      ],
    };

    const chart = d3.select("body").append("div").attr("id", "#chart");
    /**Não alterar */

    //DEPLOY - BEGIN
    let formattedData = Array();
    let colorSelected = params.config.bar_color_selected;
    let dimension = Array();

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

        let payload = {
          event: e,
          row: (dimension[params.queryResponse.fields.dimensions[0].name] = {
            field: params.queryResponse.fields.dimensions[0].name,
            value: JSON.stringify(d.dimension),
          }),
        };

        LookerCharts.Utils.toggleCrossfilter(payload);
      });

    return html;
    //DEPLOY - END
  }
}

/**Não alterar aqui */
new Graphic().init();
/**Não alterar aqui */
