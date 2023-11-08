import { options } from "./charts/caracteristica_enviada/table_and/common/index";
import { table_and } from "./charts/caracteristica_enviada/table_and/index";
import { table_or } from "./charts/caracteristica_enviada/table_or/index";
import { slider } from "./charts/caracteristica_enviada/table_and/components/slider";
import { css } from "./style/index";
import { head } from "./head/index";

import * as d3 from "d3";

looker.plugins.visualizations.add({
  id: "viz-bar_image-marketplace",
  label: "Carecterística enviada",
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

    d3.select("#chart").remove();
    //reconstruir o nó principal
    var container = element.appendChild(document.createElement("div"));
    container.id = "chart";

    let currentSlider = slider(params);

    d3.select("#chart").html(currentSlider);

    this.trigger("registerOptions", options);
    let store = require("store");
    let currentTable = "AND";

    try {
      currentTable = store.get("toggle_filter").name;
    } catch (error) {}

    let oneClick = true;
    d3.select("#toggle_filter").on("click", function (e, d) {
      if (oneClick) {
        let oldValue = d3.select(this).attr("data-condition");

        let newValue = oldValue == "OR" ? "AND" : "OR";
        d3.select(this).attr("data-condition", newValue);

        store.set("toggle_filter", {
          name: newValue,
        });

        let payload = {
          event: {
            ctrlKey: false,
            metaKey: false,
          },
          row: "",
        };

        LookerCharts.Utils.toggleCrossfilter(payload);

        oneClick = false;
      } else {
        oneClick = true;
      }
    });

    if (currentTable == "AND") {
      table_and(params);
    } else {
      table_or(params);
    }

    done();
  },
});
