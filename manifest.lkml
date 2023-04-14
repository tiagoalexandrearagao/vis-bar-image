project_name: "viz-bar-image"

constant: VIS_LABEL {
  value: "Viz bar image"
  export: override_optional
}

constant: VIS_ID {
  value: "bar-image-marketplace"
  export:  override_optional
}

visualization: {
  id: "@{VIS_ID}"
  url: "https://marketplace-api.looker.com/viz-dist/bar_image.js"
  label: "@{VIS_LABEL}"
}