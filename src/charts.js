import { baseOptions } from "./common/options";
import { bar } from "./charts/bar";
import { pieChart } from "./charts/pie";
import { donutChart } from "./charts/donut";
import { donutToggleChart } from "./charts/donut_toggle";
import { banner } from "./charts/banner";
import { barSimpleChart } from "./charts/bar_simple";
import { insightsChart } from "./charts/insights";
import "./common/styles.css";

import * as d3 from "d3";

looker.plugins.visualizations.add({
  id: "viz-bar_image-marketplace",
  label: "Gráfico de Barras com logo",
  options: baseOptions,

  create: function (element, config) {
    var vis = this;
    var container = element.appendChild(document.createElement("div"));
    container.id = "chart";

    const style = document.createElement("style");
    style.innerHTML = `
    body{
      overflow: hidden !important;
    }
    .bar:hover {
      border: 1px solid #333
    }
    react:hover{
      border: 1px solid #333;
      cursor:pointer;
    }
    .x.axis>.tick> line {
      stroke-opacity: 1;
    }
    .arc path {
      stroke: #fff;
    }

    
    polyline {
      opacity: .3;
      stroke: black;
      stroke-width: 1px;
      fill: none;
    }

    .labels text {
      font-size: 12px;
    }
    
    `;
    document.head.appendChild(style);

    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.crossorigin = "anonymous";
    link.referrerpolicy = "no-referrer";
    document.head.appendChild(link);
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css";

    //Google Fonts
    var linkFontPreConnectApis = document.createElement("link");
    linkFontPreConnectApis.rel = "preconnect";
    document.head.appendChild(linkFontPreConnectApis);
    linkFontPreConnectApis.href = "https://fonts.googleapis.com";

    var linkFontPreConnectGstatic = document.createElement("link");
    linkFontPreConnectGstatic.rel = "preconnect";
    linkFontPreConnectGstatic.crossorigin = "anonymous";
    document.head.appendChild(linkFontPreConnectGstatic);
    linkFontPreConnectGstatic.href = "https://fonts.gstatic.com";

    var linkFont = document.createElement("link");
    linkFont.type = "text/css";
    linkFont.rel = "stylesheet";
    document.head.appendChild(linkFont);
    linkFont.href =
      "https://fonts.googleapis.com/css2?family=Josefin+Sans&family=Quicksand:wght@300;700&family=Roboto&display=swap";

    //javascript
    var linkFontAwesome = document.createElement("script");
    linkFontAwesome.crossorigin = "anonymous";
    document.head.appendChild(linkFontAwesome);
    linkFontAwesome.src = "https://kit.fontawesome.com/9e8face2b6.js";

    return container;
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    //  try {
    var side_margin = config.side_margin == undefined ? 1 : config.side_margin;
    var margin = {
      top: 170,
      right: side_margin,
      bottom: -10,
      left: side_margin,
    };
    var height = element.clientHeight - margin.top - margin.bottom;

    const params = {
      barNotSelected:
        config.color_not_selected == undefined
          ? "#dedede"
          : config.color_not_selected,
      titleGraphic:
        config.title_graphic == undefined
          ? ""
          : config.default_icon + " " + config.title_graphic,
      vis: this,
      d3: d3,
      data: data,
      queryResponse: queryResponse,
      config: config,
      element: element,
      details: details,
      width: element.clientWidth - margin.left - margin.right,
      height: height,
      margin: margin,
      sideMargin: side_margin,
      fontSizePercent: config.font_size_percent,
      strokeWidth: config.stroke_width,
      dimensionTitle: config.dimension_title,
      measureTitle: config.measure_title,
    };

    //remover para reconstruir
    d3.select("#chart").remove();

    //reconstruir o nó principal
    var container = element.appendChild(document.createElement("div"));
    container.id = "chart";

    switch (config.chart_type) {
      case "bar":
        bar(params);
        break;
      case "pie":
        pieChart(params);
        break;
      case "donut":
        donutChart(params);
        break;
      case "donut_toggle":
        donutToggleChart(params);
        break;
      case "banner":
        banner(params);
        break;
      case "bar_simple":
        barSimpleChart(params);
        break;
      case "insights":
        insightsChart(params);
        break;
    }
    // } catch (error) {
    //   console.log('Error', error)
    // }

    done();
  },
});
