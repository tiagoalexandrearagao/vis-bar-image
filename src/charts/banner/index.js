import * as d3 from "d3";
export function banner(params) {
  let html = params.chart
    .select("#chart")
    .append("div")
    .html(function (d, e) {
      return `<div>Chart</div>`;
    });

  return html;
}
