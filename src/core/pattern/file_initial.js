/**não remover */
import { options } from "./charts/toReplace/common/index";
import { css } from "./charts/toReplace/style/index";
import { head, titleChart } from "./head/index";
/**não remover */

import { toReplace } from "./charts/toReplace/index";

looker.plugins.visualizations.add({
  id: "dev-toReplace-marketplace",
  label: "toReplace",
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
      width: element.clientWidth - config.side_margin,
      height: element.clientHeight - config.bottom_margin - config.top_margin,
      margin: {
        top: config.top_margin,
        right: config.side_margin,
        bottom: config.bottom_margin,
        left: config.side_margin,
      },
    };

    titleChart(params); //instância do título

    toReplace(params); //chamar o gráfico para construção passando os parâmetros necessários

    done(); // não remover
  },
});
