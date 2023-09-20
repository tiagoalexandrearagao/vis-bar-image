export const insightsOptions = {
  chart_type: {
    section: "1. Main",
    type: "string",
    label: "1. Chart type",
    default: "bar",
    display: "select",
    values: [
      { Bar: "bar" },
      { "Simple Bar": "bar_simple" },
      { "Pie|Donut": "donut" },
      { Banner: "banner" },
      { Insights: "insights" },
      { "Insights Measures": "insights_measures" },
      { Venn: "venn" },
      { Map: "map" },
      { Table: "bar_horizontal" },
      { "Bar measures only": "bar_simple_measure" },
      { "Button segment": "btn_segment" },
    ],
  },
  title_graphic: {
    section: "1. Main",
    type: "string",
    label: "Title",
  },
  title_graphic_2: {
    section: "1. Main",
    type: "string",
    label: "Title 2",
  },
  chart_description: {
    section: "1 - Main",
    type: "string",
    label: "Chart description",
    default: "",
  },
  title_font_size: {
    section: "1. Main",
    type: "string",
    label: "Title font size",
  },
  default_icon: {
    section: "1. Main",
    type: "string",
    label: "Title Icon <i>",
    default: "",
  },
  font_size_percent: {
    section: "2. Layout",
    type: "string",
    label: "Percentage font size",
    default: "11",
  },

  number_format: {
    section: "4. Format",
    type: "string",
    label: "Number format",
    display: "select",
    default: "normal",
    values: [{ Percent: "percent" }, { Normal: "normal" }],
  },
};
