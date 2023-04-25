import { baseOptions } from "./common/options";
import "./common/styles.css";
import { select, selectAll } from "d3-selection";
export { select, selectAll };
import * as d3 from "d3";

import $ from "jquery";

looker.plugins.visualizations.add({
  id: 'my_bar_chart',
  label: 'My Bar Chart',
  options: {
    font_size: {
      type: 'number',
      label: 'Font Size',
      default: 12,
      section: 'Style',
      placeholder: 'Enter font size (pixels)'
    },
    bar_color: {
      type: 'string',
      label: 'Bar Color',
      default: '#0077c8',
      section: 'Style',
      placeholder: 'Enter bar color in hex'
    }
  },
  create: function (element, config) {
    // Create a new SVG element
    var svg = d3.select(element)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%');

    // Add axes and labels
    var xScale = d3.scaleBand()
      .range([0, element.clientWidth])
      .padding(0.1);

    var yScale = d3.scaleLinear()
      .range([element.clientHeight, 0]);

    var xAxis = svg.append('g')
      .attr('transform', 'translate(0,' + element.clientHeight + ')');

    var yAxis = svg.append('g');

    svg.append('text')
      .attr('transform', 'translate(' + (element.clientWidth / 2) + ',' + (element.clientHeight + 30) + ')')
      .style('text-anchor', 'middle')
      .text('X Axis Label');

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - 40)
      .attr('x', 0 - (element.clientHeight / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Y Axis Label');

    // Return the chart instance
    return {
      updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
        // Filter the data based on the selected filters
        var selectedValues = [];
        var filters = queryResponse.filters;
        var dimensions = queryResponse.fields.dimension_like;
        var measures = queryResponse.fields.measure_like;
        var measuresQueryNames = [];

        measures.forEach(function (measure) {
          measuresQueryNames.push(measure.name);
        });

        dimensions.forEach(function (dimension) {
          var filter = filters[dimension.name];
          if (filter && filter.field && filter.field.is_timeframe) {
            var value = filter.field.timeframe;
            selectedValues.push(value);
          } else if (filter && filter.value) {
            var values = filter.value;
            values.forEach(function (value) {
              selectedValues.push(value);
            });
          }
        });

        var filteredData = data.filter(function (d) {
          var keepRow = true;
          dimensions.forEach(function (dimension) {
            var value = d[dimension.name].value;
            if (selectedValues.indexOf(value) === -1) {
              keepRow = false;
            }
          });
          return keepRow;
        });

        // Group the data by dimension
        var dimensionName = dimensions[0].name;
        var measureName = measuresQueryNames[0];
        var groupedData = d3.nest()
          .key(function (d) { return d[dimensionName].value; })
          .rollup(function (v) { return d3.sum(v, function (d) { return d[measureName].value; }); })
          .entries
      }
    }
  }
})