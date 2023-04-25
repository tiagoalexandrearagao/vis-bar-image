import { baseOptions } from "./common/options";
import "./common/styles.css";
import { select, selectAll } from "d3-selection";
export { select, selectAll };
import * as d3 from "d3";

import $ from "jquery";
looker.plugins.visualizations.add({
  create: function(element, config) {
    element.innerHTML = `
      <style>
        .my-chart {
          height: 300px;
          width: 100%;
        }
      </style>
      <div id="my-chart" class="my-chart"></div>
    `;

    const container = d3.select(element).select('#my-chart');
    const svg = container.append('svg');
    const chart = svg.append('g');

    this.updateAsync = function(data, element, config, queryResponse, details, done) {
      const xField = config.x_field;
      const yField = config.y_field;

      const xScale = d3.scaleBand().padding(0.1);
      const yScale = d3.scaleLinear();

      const xDomain = data.map(d => d[xField].value);
      const yDomain = [0, d3.max(data, d => d[yField].value)];

      xScale.domain(xDomain);
      xScale.range([0, container.node().getBoundingClientRect().width]);
      yScale.domain(yDomain);
      yScale.range([container.node().getBoundingClientRect().height, 0]);

      const bars = chart.selectAll('.bar')
        .data(data, d => d[xField].value);

      bars.enter()
        .append('rect')
        .classed('bar', true)
        .attr('x', d => xScale(d[xField].value))
        .attr('y', container.node().getBoundingClientRect().height)
        .attr('height', 0)
        .attr('width', xScale.bandwidth())
        .merge(bars)
        .transition()
        .duration(500)
        .attr('x', d => xScale(d[xField].value))
        .attr('y', d => yScale(d[yField].value))
        .attr('height', d => container.node().getBoundingClientRect().height - yScale(d[yField].value))
        .attr('width', xScale.bandwidth());

      bars.exit().remove();

      // Adicionando um filtro ao gráfico
      const filter = details.filters[0];
      if (filter) {
        const filteredData = data.filter(d => d[xField].value === filter.value);
        const total = d3.sum(filteredData, d => d[yField].value);
        const filterInfo = `Filtered by ${xField}: ${filter.value} (${total})`;

        svg.selectAll('.filter-info').remove();
        svg.append('text')
          .classed('filter-info', true)
          .attr('x', 5)
          .attr('y', 15)
          .text(filterInfo);
      } else {
        svg.selectAll('.filter-info').remove();
      }

      done();
    }
  }
});
