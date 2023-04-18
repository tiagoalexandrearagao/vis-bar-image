project_name: "viz-bar-image"

constant: VIS_LABEL {
  value: "Viz bar image"
  export: override_optional
}

constant: VIS_ID {
  value: "viz-bar-image"
  export:  override_optional
}

visualization: {
  id: "@{VIS_ID}"
  url: "https://raw.githubusercontent.com/tiagoalexandrearagao/viz-bar-image/main/histogram.js"
  label: "@{VIS_LABEL}"
}