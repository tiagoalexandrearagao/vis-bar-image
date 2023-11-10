import * as d3 from "d3";
export function relicario(params) {
  let html = d3
    .select("#chart")
    .append("div")
    .html(function (d, e) {
      return "<label>adicionando um novo gráfico</label>";
    });

  return html;
}
