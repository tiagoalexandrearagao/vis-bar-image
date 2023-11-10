let route = "/api/data"; //alterar a rota de acordo com os dados necessários

/**Não alterar */
import * as d3 from "https://cdn.skypack.dev/d3@7";
import axios from "https://cdn.skypack.dev/axios";
/*const dataSet = async function getData() {
  return await axios.get(route);
};*/
/**Não alterar */

class Dev {
  constructor() {
    this.d3 = d3;
    this.route = route;
  }

  async dataBase() {
    let data = await axios.get(this.route);
    data.data.sort();
    return data;
  }

  svg() {
    return this.d3.select("#chart").append("svg");
  }
}

class Graphic extends Dev {
  async init() {
    /**Não alterar */
    const data = await this.dataBase();
    const svg = this.svg();
    /**Não alterar */

    /** Início - Altere a partir daqui com o seu código */
    const margin = 80;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(data.data.map((s) => s.dimension))
      .padding(0.4);

    const yScale = d3.scaleLinear().range([height, 0]).domain([0, 100]);

    const makeYLines = () => d3.axisLeft().scale(yScale);

    chart
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    chart.append("g").call(d3.axisLeft(yScale));

    chart
      .append("g")
      .attr("class", "grid")
      .call(makeYLines().tickSize(-width, 0, 0).tickFormat(""));

    const barGroups = chart.selectAll().data(data.data).enter().append("g");

    barGroups
      .append("rect")
      .attr("class", "bar")
      .attr("x", (g) => xScale(g.dimension))
      .attr("y", (g) => yScale(g.measure))
      .attr("height", (g) => height - yScale(g.measure))
      .attr("width", xScale.bandwidth())
      .on("mousemove", function (actual, i) {
        d3.selectAll(".value").attr("opacity", 1);

        d3.select(this)
          .transition()
          .duration(300)
          .attr("opacity", 0.6)
          .attr("x", (a) => xScale(a.dimension) - 5)
          .attr("width", xScale.bandwidth() + 10);

        const y = yScale(actual.measure);

        chart.selectAll("#limit").remove();

        chart
          .append("line")
          .attr("id", "limit")
          .attr("x1", 0)
          .attr("x2", width)
          .attr("y1", actual.y - 150)
          .attr("y2", actual.y - 150);
      })
      .on("mouseleave", function () {
        d3.selectAll(".value").attr("opacity", 0.5);

        d3.select(this)
          .transition()
          .duration(300)
          .attr("opacity", 1)
          .attr("x", (a) => xScale(a.dimension))
          .attr("width", xScale.bandwidth());

        chart.selectAll("#limit").remove();
        chart.selectAll(".divergence").remove();
      })
      .on("click", function (e, d) {
        console.log("DATA", d);
        console.log("EVENT", e);
      });

    barGroups
      .append("text")
      .attr("class", "value")
      .attr("x", (a) => xScale(a.dimension) + xScale.bandwidth() / 2)
      .attr("y", (a) => yScale(a.measure) + 30)
      .attr("text-anchor", "middle")
      .text((a) => `${a.measure}%`);

    svg
      .append("text")
      .attr("class", "label")
      .attr("x", -(height / 2) - margin)
      .attr("y", margin / 2.4)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Measures");

    svg
      .append("text")
      .attr("class", "title")
      .attr("x", width / 2 + margin)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .text("Ambiente de desenvolvimento");
    /** Fim  */
  }
}

new Graphic().init();
