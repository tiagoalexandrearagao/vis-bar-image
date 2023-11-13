import * as d3 from "d3";
import * as html from "../../builder/index";
export function banner(params) {
  //https://github.com/RubinderS/HTMLBuilder

  const page = new html.Page({
    width: "100%",
    backgroundColor: "red",
  });

  const header = html.getText({
    text: "Este é um texto de teste",
    type: html.TextType.h3,
  });

  const flex = new html.FlexBox({
    alignItems: html.JustifyContent.spaceBetween,
    itemsHorizontal: true,
  });

  let data = [
    ["Java", "228"],
    ["JAVASCRIPT", "857"],
    ["PYTHON", "560"],
  ];

  const table = html.getTable({
    data: data,
    headings: ["Linguagem", "Desenvolvedores"],
  });

  flex.add(header);
  flex.addDivider();

  page.add(flex.construct());
  page.add(table);

  let div = d3
    .select("#chart")
    .append("div")
    .html(function (d, e) {
      return `${page.construct()}`;
    });

  return div;
}
