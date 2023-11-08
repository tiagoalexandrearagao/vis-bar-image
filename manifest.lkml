project_name: "charts"

#este nome não pode se repetir
constant: VIS_ID {
  value: "id_unico" 
}

visualization: {
  id: "looker-@{VIS_ID}-marketplace"
  file: "bar.js"
  label: "Gráfico de barras"
  dependencies: [
    "https://code.jquery.com/jquery-2.2.4.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/d3-legend/1.13.0/d3-legend.min.js",
  ]
}