export const mapOptions = {
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
  measure_title: {
    section: "1. Main",
    type: "string",
    label: "Measure title",
    default: "",
  },
  dimension_title: {
    section: "1. Main",
    type: "string",
    label: "Dimension title",
    default: "",
  },
  chart_description: {
    section: "2. Layout",
    type: "string",
    label: "Chart description",
    default: "",
  },

  color_not_selected: {
    section: "2. Layout",
    type: "array",
    display: "color",
    label: "Color when not selected",
    default: "#dedede",
  },
  side_margin: {
    section: "2. Layout",
    type: "string",
    label: "Left and right margin of the chart",
    default: "40",
    display: "select",
    values: [
      { 0: "0" },
      { 10: "10" },
      { 20: "20" },
      { 30: "30" },
      { 40: "40" },
      { 50: "50" },
      { 60: "60" },
      { 70: "70" },
      { 80: "80" },
      { 90: "90" },
      { 100: "100" },
      { 120: "120" },
      { 140: "140" },
      { 160: "160" },
      { 180: "180" },
      { 200: "200" },
    ],
  },

  font_size_percent: {
    section: "2. Layout",
    type: "string",
    label: "Percentage font size",
    default: "11",
  },
  begin_color_map: {
    section: "2. Layout",
    type: "array",
    display: "color",
    label: "First map color",
    default: "#005954",
  },
  end_color_map: {
    section: "2. Layout",
    type: "array",
    display: "color",
    label: "Last map color",
    default: "#78f0ea",
  },
};