/**não remover */
import { options } from "./charts/atributo/common/index";
import { css } from "./charts/atributo/style/index";
import { head, titleChart } from "./head/index";
/**não remover */

import { atributo } from "./charts/atributo/index";

looker.plugins.visualizations.add({
  id: "dev-atributo-marketplace",
  label: "atributo",
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

    atributo(params); //chamar o gráfico para construção passando os parâmetros necessários

    done(); // não remover
  },
});
