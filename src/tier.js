/**não remover */
import { options } from "./charts/tier/common/index";
import { css } from "./charts/tier/style/index";
import { head, titleChart } from "./head/index";
/**não remover */

import { tier } from "./charts/tier/index";

looker.plugins.visualizations.add({
  id: "dev-tier-marketplace",
  label: "tier",
  options: options,
  create: function (element, config) {
    let container = head(element, css);
    return container;
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    const params = {
      vis: this,
      config: config,
      data: data,
      queryResponse: queryResponse,
      element: element,
      details: details,
      width: element.clientWidth - margin.left - margin.right,
      height: element.clientHeight - margin.top - margin.bottom,
      margin: {
        top: config.top_margin,
        right: config.side_margin,
        bottom: config.bottom_margin,
        left: config.side_margin,
      },
    };

    titleChart(params); //instância do título

    tier(params); //chamar o gráfico para construção passando os parâmetros necessários

    done(); // não remover
  },
});
