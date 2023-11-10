/**não remover */
import { options } from "./charts/venn/common/index";
import { css } from "./style/index";
import { head, titleChart } from "./head/index";
import * as d3 from "d3";
/**não remover */

import { venn } from "./charts/venn/index";

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

    titleChart(params);

    venn(params); //chamar o gráfico para construção passando os parâmetros necessários

    done(); // não remover
  },
});
