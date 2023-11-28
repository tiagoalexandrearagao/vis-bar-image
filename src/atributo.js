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
    let container = head(element, css(config));
    return container;
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    head(element, css(config));
    d3.select("#chart").remove();
    let container = element.appendChild(document.createElement("div"));
    container.id = "chart";

    let width = element.clientWidth;
    let height =
      element.clientHeight - config.top_margin - config.bottom_margin;

    let title = titleChart(config);
    let chart = d3;

    chart
      .select("#chart")
      .html(function () {
        return title;
      })
      .append("div")
      .attr("id", "chart-content");

    const params = {
      vis: this,
      config: config,
      data: data,
      chart: chart,
      queryResponse: queryResponse,
      element: element,
      details: details,
      width: width,
      height: height,
      margin: {
        top: config.top_margin,
        bottom: config.bottom_margin,
        right: config.right_margin,
        left: config.left_margin,
      },
    };

    atributo(params);
    done();
  },
});
