import { baseOptions } from "./common/options";
import { bannerOptions } from "./common/options_banner";
import { barOptions } from "./common/options_bar";
import { insightsOptions } from "./common/options_insights";
import { mapOptions } from "./common/options_map";
import { pieOptions } from "./common/options_pie";
import { tableOptions } from "./common/options_table";
import { vennOptions } from "./common/options_venn";
import { bar } from "./charts/bar";
import { pieChart } from "./charts/pie";
import { donutChart } from "./charts/donut";
import { donutToggleChart } from "./charts/donut_toggle";
import { banner } from "./charts/banner";
import { barSimpleChart } from "./charts/bar_simple";
import { barSimpleMeasureChart } from "./charts/bar_simple_measures";
import { barHorizontalChart } from "./charts/bar_horizontal";
import { insightsChart } from "./charts/insights";
import { insightsMeasuresChart } from "./charts/insights_measures";
import { vennChart } from "./charts/venn_chart";
import { mapChart } from "./charts/map";
import { donutChartV2 } from "./charts/donut_v2";
import { btnSegmentChart } from "./charts/btn_segment";
//import "./common/css/styles.css";

//import "./scss/app.scss";

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
    //TODO: ajustar o CSS
    style.innerHTML = `
    html: {
      height: 110%;
    }
    body {
      overflow: hidden !important;
    }
    .bar:hover {
      border: 1px solid #333;
    }
    react:hover {
      border: 1px solid #333;
      cursor: pointer;
    }
    .x.axis > .tick > line {
      stroke-opacity: 1;
    }
    .arc path {
      stroke: #fff;
    }
    polyline {
      opacity: 0.3;
      stroke: black;
      stroke-width: 1px;
      fill: none;
    }
    
    .labels text {
      font-size: 12px;
    }
    .button-filter-active {
      float: left;
      margin: 5px;
      box-sizing: border-box;
    
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    
      gap: 10px;
    
      padding-left: 13px;
      padding-right: 13px;
      height: 29px;
    
      background: #ffffff;
      border: 1px solid #ffffff;
      border-radius: 56px;
    
      /* Inside auto layout */
    
      flex: none;
      order: 0;
      flex-grow: 0;
    
      /* font */
      color: #6943e4;
      font-size: 11px;
      cursor: pointer;
    }
    
    .button-filter:hover {
      -webkit-box-shadow: -2px 1px 14px 5px rgba(47, 187, 236, 0);
      box-shadow: -2px 1px 14px 5px rgba(47, 187, 236, 0);
    }
    .button-filter {
      float: left;
      margin: 5px;
      box-sizing: border-box;
    
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    
      gap: 10px;
    
      padding-left: 13px;
      padding-right: 13px;
      height: 29px;
    
      background: none;
      border: 1px solid #ffffff;
      border-radius: 56px;
    
      /* Inside auto layout */
    
      flex: none;
      order: 0;
      flex-grow: 0;
    
      /* font */
      color: #fff;
      font-size: 11px;
      cursor: pointer;
    }
    #filters {
      float: left;
      position: abosolute;
      margin-top: 230px;
      margin-left: 65px;
    }
    
    .button-filter-selected {
      float: left;
      margin: 5px;
      box-sizing: border-box;
    
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    
      gap: 10px;
    
      padding-left: 13px;
      padding-right: 13px;
      height: 29px;
    
      background: #fff;
      border: 1px solid #ffffff;
      border-radius: 56px;
    
      /* Inside auto layout */
    
      flex: none;
      order: 0;
      flex-grow: 0;
    
      /* font */
      color: #6943e4;
      font-size: 10px;
      cursor: pointer;
    }
    
    #filters-selected {
      float: left;
      position: abosolute;
      margin-top: 285px;
      margin-left: -490px;
    }
    
    .brasil {
      stroke-width: 1;
      stroke: #333;
      fill: #dedede;
      transition: all 0.25s ease-in-out;
    }
    
    .brasil:hover {
      cursor: pointer;
      fill: #555555;
    }
    
    * {
      box-shadow: 0px 0px #fffffff;
    }
    .visualization-container {
      box-shadow: 0px 0px #fffffff;
    }
    
    /* width */
    ::-webkit-scrollbar {
      width: 10px;
    }
    
    /* ===== Scrollbar CSS ===== */
    
    * {
      scrollbar-width: auto;
      scrollbar-color: #ababab #ffffff;
    }
    
    /* Chrome, Edge, and Safari */
    *::-webkit-scrollbar {
      width: 12px;
    }
    
    *::-webkit-scrollbar-track {
      background: #ffffff;
    }
    
    *::-webkit-scrollbar-thumb {
      background-color: #ababab;
      border-radius: 10px;
      border: 3px solid #ffffff;
    }
    
    table {
      border-spacing: 0;
      border-collapse: collapse;
    }
    
    td:hover {
      cursor: pointer;
    }
    tr:hover {
      border-radius: 10px;
      background: #dedede;
    }
    
    [data-venn-sets="0"] {
      fill: #ffa500;
    }
    [data-venn-sets="1"] {
      fill: #1f77b4;
    }
    [data-venn-sets="2"] {
      fill: #2ca02c;
    }
    
    [data-venn-sets="0_1"] {
      fill: #fce917;
    }
    [data-venn-sets="0_2"] {
      fill: #9244a6;
    }
    [data-venn-sets="1_2"] {
      fill: #2c4a68;
    }
    [data-venn-sets="0_1_2"] {
      fill: #44a691;
    }
    .region{
      font-family: 'Quicksand', sans-serif;
      font-weight: bold;
      color:#000;
      font-size: 10px;
      float: right;
      margin: 3px;
      background: white;
      border-radius: 10px;
      padding: 5px;
      border: 1px solid #dedede;
      min-width: 82px;
    }
    .region:hover{
      background:#dedede;
      color:#333;
      cursor:pointer;
    }

    .region-selected {
      background:#dedede;
      color:#333;
      cursor:pointer;
    }

    .no-background:hover{
      background:#fff !important;
    }
    
    .wrapper-looker {
      display: grid;
      background: #fff;
      grid-template-columns: 1fr 1fr; 
    }
    
    .container-no-content {
      height: 100vh;
      display: grid; 
      grid-template-columns: 1fr; 
      grid-template-rows: 1fr 1fr 1fr; 
      gap: 0px 0px; 
      grid-template-areas: 
        "."
        "icon-no-content"
        "."; 
    }
    .icon-no-content { grid-area: icon-no-content; }
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

    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.crossorigin = "anonymous";
    link.referrerpolicy = "no-referrer";
    document.head.appendChild(link);
    link.href =
      "https://tiagoalexandrearagao.github.io/viz-bar_image-marketplace/public/font/css/all.min.css";

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

    //javascript

    return container;
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    var side_margin = config.side_margin == undefined ? 1 : config.side_margin;
    var margin = {
      top: 170,
      right: side_margin,
      bottom: -10,
      left: side_margin,
    };
    var height = element.clientHeight - margin.top - margin.bottom;

    const params = {
      hideMeasure: config.hide_measure,
      showIndicator: config.show_indicator,
      chartDescription: config.chart_description,
      chartDescription2: config.chart_description_2,
      bannerFilterEnabled: config.banner_filter_enabled,
      beginColorMap: config.begin_color_map,
      endColorMap: config.end_color_map,
      numberFormat: config.number_format,
      iconInsights: config.default_icon,
      iconInsights2: config.default_icon_2,
      iconInsights3: config.default_icon_3,
      titleInsights: config.title_graphic,
      titleInsights2: config.title_graphic_2,
      barNotSelected:
        config.color_not_selected == undefined
          ? "#dedede"
          : config.color_not_selected,
      titleGraphic: config.default_icon + " " + config.title_graphic,
      titleChart: config.default_icon + " " + config.title_graphic,
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
      firstColor: config.first_color,
      secondColor: config.second_color,
      thirdColor: config.third_color,
      fourthColor: config.fourth_color,
    };

    //remover para reconstruir
    d3.select("#chart").remove();

    //reconstruir o nó principal
    var container = element.appendChild(document.createElement("div"));
    container.id = "chart";

    if (
      data.length == 0 &&
      config.chart_type != "banner" &&
      config.chart_type != "insights"
    ) {
      done();
      return d3.select("#chart").html(
        `<div style=" position:absolute; margin-left:10px; margin-top:-10px;"><h3 style="font-family: 'Quicksand', sans-serif; font-weight: normal;">${config.default_icon} ${config.title_graphic}</h3></div>
            <div class="container-no-content" style="text-align:center;">
            <div class="icon-no-content"><h5 style="font-family: 'Quicksand', sans-serif; font-weight: normal; color:#ababab"><i class="fa-solid fa-database"></i> Sem dados para exibir</h5></div>
          </div>
          `
      );
    }

    //Temporário - Remover
    switch (config.chart_type) {
      case "banner":
        this.trigger("registerOptions", bannerOptions); //ok
        break;
      case "bar":
        this.trigger("registerOptions", barOptions); //ok
        break;
      case "venn":
        this.trigger("registerOptions", vennOptions); //ok
        break;
      case "insights":
        this.trigger("registerOptions", insightsOptions); //ok
        break;
      case "map":
        this.trigger("registerOptions", mapOptions); //ok
        break;
      case "bar_horizontal":
        this.trigger("registerOptions", tableOptions); //ok
        break;
      default:
        this.trigger("registerOptions", baseOptions);
    }

    switch (config.chart_type) {
      case "bar":
        this.trigger("registerOptions", barOptions);
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
        this.trigger("registerOptions", bannerOptions);
        banner(params);
        break;
      case "bar_simple":
        barSimpleChart(params);
        break;
      case "insights":
        this.trigger("registerOptions", insightsOptions);
        insightsChart(params);
        break;
      case "insights_measures":
        insightsMeasuresChart(params);
        break;
      case "venn":
        this.trigger("registerOptions", vennOptions);
        vennChart(params);
        break;
      case "map":
        this.trigger("registerOptions", mapOptions);
        mapChart(params);
        break;
      case "donut_v2":
        donutChartV2(params);
        break;
      case "bar_horizontal":
        this.trigger("registerOptions", tableOptions);
        barHorizontalChart(params);
        break;
      case "bar_simple_measure":
        barSimpleMeasureChart(params);
        break;
      case "btn_segment":
        btnSegmentChart(params);
        break;
    }

    // } catch (error) {
    //   console.log('Error', error)
    // }

    done();
  },
});
