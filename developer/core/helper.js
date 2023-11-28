const d3 = Object.assign({}, require("d3"));
const MyCustomChart = require("../chart");

const { JSDOM } = require("jsdom");
const document = new JSDOM().window.document;
const window = document.defaultView;

function getChart(params) {
  const chart = new MyCustomChart(params);

  d3.select(document.body)
    .append("div")
    .attr("id", "chart")
    .call(chart.render.bind(chart));

  const svg = d3.select(document.getElementById("chart")).node().outerHTML;
  d3.select(document.getElementById("chart")).remove(); //remover se já existir

  return svg;
}

module.exports = {
  getChart,
};
