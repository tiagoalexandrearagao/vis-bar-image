import { baseOptions } from "./common/options";
import "./common/styles.css";
import { select, selectAll } from "d3-selection";
export { select, selectAll };
import * as d3 from "d3";

import $ from "jquery";
looker.plugins.visualizations.add({
  create: function (element, config) {
    element.innerHTML = `
      <style>
        .my-chart {
          height: 400px;
        }
      </style>
      <div class="my-chart"></div>
    `;
  },

  update: function (data, element, config, queryResponse, details, done) {
    const x = d3.scaleBand().range([0, element.clientWidth - 50]).padding(0.1);
    const y = d3.scaleLinear().range([element.clientHeight - 50, 0]);
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select(element).select('.my-chart');
    const bars = svg.selectAll('.bar').data(data);

    // Remove as barras que não possuem mais dados
    bars.exit().remove();

    // Cria novas barras para os novos dados
    const newBars = bars.enter().append('rect')
      .attr('class', 'bar')
      .attr('fill', d => color(d.dimension))
      .attr('x', d => x(d.dimension))
      .attr('width', x.bandwidth())
      .attr('y', y(0))
      .attr('height', 0);

    // Atualiza a posição e altura das barras existentes ou novas
    newBars.merge(bars)
      .transition().duration(300)
      .attr('x', d => x(d.dimension))
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.measure))
      .attr('height', d => y(0) - y(d.measure));

    // Atualiza os eixos
    x.domain(data.map(d => d.dimension));
    y.domain([0, d3.max(data, d => d.measure)]);

    svg.select('.x-axis')
      .transition().duration(300)
      .call(d3.axisBottom(x));

    svg.select('.y-axis')
      .transition().duration(300)
      .call(d3.axisLeft(y));

    // Adiciona os eixos se ainda não existirem
    if (svg.selectAll('.x-axis').empty()) {
      svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${element.clientHeight - 50})`)
        .call(d3.axisBottom(x));
    }

    if (svg.selectAll('.y-axis').empty()) {
      svg.append('g')
        .attr('class', 'y-axis')
        .attr('transform', 'translate(50, 0)')
        .call(d3.axisLeft(y));
    }

    done();
  }
});