import * as d3 from "d3";
const htmlCreator = require("html-creator");
export function toReplace(params) {
  const div = new htmlCreator([
    {
      type: "div",
      content: [
        {
          type: "div",
          content: "Renderizando meu gráfico",
          attributes: { id: "cool-text", class: "cool-text" },
        },
        {
          type: "a",
          content: "Link de teste",
          attributes: { href: "/looker", target: "_blank" },
        },
      ],
    },
  ]);
  const result = div.renderHTML();

  let html = d3
    .select("#chart")
    .append("div")
    .html(function (d, e) {
      return `${result}`;
    });

  return html;
}
