/**não remover */
import { options } from "./charts/banner/common/index";
import { css } from "./style/index";
import { head, titleChart } from "./head/index";
/**não remover */

import { banner } from "./charts/banner/index";

looker.plugins.visualizations.add({
  id: "dev-banner-marketplace",
  label: "Banner",
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
      width: element.clientWidth - config.side_margin * 2,
      height: element.clientHeight - config.top_margin - config.bottom_margin,
      margin: {
        top: config.top_margin,
        right: config.side_margin,
        bottom: config.bottom_margin,
        left: config.side_margin,
      },
    };

    titleChart(params); //instância do título

    banner(params); //chamar o gráfico para construção passando os parâmetros necessários

    done(); // não remover
  },
});
