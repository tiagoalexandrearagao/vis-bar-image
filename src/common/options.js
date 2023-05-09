export const baseOptions = {
  title_graphic: {
    type: "string",
    label: "Title"
  },
  title_font_size: {
    type: "string",
    label: "Title font size"
  },
  default_icon: {
    type: "string",
    label: "Title Icon <i>",
    default: "",
  },

  measure_title: {
    type: "string",
    label: "Measure title",
    default: "",
  },
  dimension_title: {
    type: "string",
    label: "Dimension title",
    default: "",
  },
  first_dimension: {
    type: "string",
    label: "Dimension values",
    default: "",
  },
  second_dimension: {
    type: "string",
    label: "Dimension color",
    default: "",
  },
  third_dimension: {
    type: "string",
    label:
      "Dimension with base64 image",
    default: "",
  },
  color_not_selected: {
    type: "array",
    display: "color",
    label:
      "Color when not selected",
    default: "#dedede",
  },
  side_margin: {
    type: "string",
    label: "Left and right margin of the chart",
    default: "40",
    display: "select",
    values: [
      { "0": "0" },
      { "10": "10" },
      { "20": "20" },
      { "30": "30" },
      { "40": "40" },
      { "50": "50" },
      { "60": "60" },
      { "70": "70" },
      { "80": "80" },
      { "90": "90" },
      { "100": "100" },
      { "120": "120" },
      { "140": "140" },
      { "160": "160" },
      { "180": "180" },
      { "200": "200" },
    ],
  },
  chart_type: {
    type: "string",
    label: "Chart type",
    default: "bar",
    display: "select",
    values: [
      { "Bar": "bar" },
      { "Simple Bar": "simple_bar" },
      { "Pie": "pie" },
      { "Donut": "donut" },
    ],
  },
  font_size_percent: {
    type: "string",
    label: "Percentage font size",
    default: "11"
  }
}
