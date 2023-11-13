import * as d3 from "d3";
export function atributo(params) {
  let html = d3
    .select("#chart")
    .append("div")
    .html(function (d, e) {
      return `<div>Chart</div>`;
    });

  return html;
}
