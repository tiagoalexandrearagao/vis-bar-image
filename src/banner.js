/**não remover */
import { css } from "./style/index";
import { head } from "./head/index";
import * as d3 from "d3";
/**não remover */

import { banner } from "./charts/banner/index";

looker.plugins.visualizations.add({
  id: "viz-looker-marketplace",
  label: "",
  options: options,
  create: function (element, config) {
    let container = head(element, css);
    return container;
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    let margin = {
      top: 170,
      right: config.side_margin,
      bottom: -10,
      left: config.side_margin,
    };

    let width = element.clientWidth - margin.left - margin.right;
    let height = element.clientHeight - margin.top - margin.bottom;

    const params = {
      vis: this,
      d3: d3,
      config: config,
      data: data,
      queryResponse: queryResponse,
      element: element,
      details: details,
      width: width,
      height: height,
      margin: margin,
    };

    d3.select("#chart").remove(); //garantir a reconstrução do gráfico
    //inserir a div principal do gráfico com o ID charts
    var container = element.appendChild(document.createElement("div"));
    container.id = "chart";

    banner(params); //chamar o gráfico para construção passando os parâmetros necessários

    done(); // não remover
  },
});
