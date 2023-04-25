import { baseOptions } from "./common/options";
import "./common/styles.css";
import { select, selectAll } from "d3-selection";
export { select, selectAll };
import * as d3 from "d3";

import $ from "jquery";
looker.plugins.visualizations.add({
  create: function(element, config) {
    var container = element.appendChild(document.createElement("div"));
    container.id = "my-chart";

    return container;
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    var margin = { top: 20, right: 20, bottom: 30, left: 40 };
    var width = element.clientWidth - margin.left - margin.right;
    var height = element.clientHeight - margin.top - margin.bottom;

    console.log(data)

    var svg = d3.select("#my-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);

    var y = d3.scaleLinear()
      .range([height, 0]);

    var xAxis = d3.axisBottom(x);

    var yAxis = d3.axisLeft(y);

    var xAxisGroup = svg.append("g")
      .attr("transform", "translate(0," + height + ")");

    var yAxisGroup = svg.append("g");

    // Loop through the data and add to the chart data arrays
    var seriesData = d3.nest()
      .key(function(d) { return d["pug_product.ds_valor"].value; })
      .rollup(function(d) { return d3.sum(d, function(d) { return d["globo_id.count_id_audience"].value; }); })
      .entries(data);

    x.domain(seriesData.map(function(d) { return d.key; }));
    y.domain([0, d3.max(seriesData, function(d) { return d.value; })]);

    // Add the bars to the chart
    var bars = svg.selectAll(".bar")
      .data(seriesData)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.key); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

    // Set up the cross-filtering
    bars.on("click", function(d) {
      LookerCharts.Utils.openDrillMenu({
        links: d.values[0]["drilldown_links"],
        event: d3.event,
        element: svg.node()
      });
    });

    // Update the axes
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    // Tell Looker that the update is finished
    done();
  }
});
