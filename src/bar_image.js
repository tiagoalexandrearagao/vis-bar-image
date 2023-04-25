import { baseOptions } from "./common/options";
import "./common/styles.css";
import { select, selectAll } from "d3-selection";
export { select, selectAll };
import * as d3 from "d3";

import $ from "jquery";

looker.plugins.visualizations.add({
  options: {
    title_graphic: {
      type: "string",
      label: "Title",
      default: "Default title",
    },
    default_icon: {
      type: "string",
      label: "Icon (Image Base64)",
      default: "",
    },
    first_dimension: {
      type: "string",
      label: "Dimension values 'my_view.my_dimension'",
      default: "",
    },
    second_dimension: {
      type: "string",
      label: "Dimension color. Example: #FFFFFF - 'my_view.my_dimension'",
      default: "",
    },
    third_dimension: {
      type: "string",
      label:
        "Dimension with the path or image of an SVG - 'my_view.my_dimension'",
      default: "",
    },
  },
  create: function (element, config) {
    var container = element.appendChild(document.createElement("div"));
    container.id = "my-chart";

    return container;
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    var margin = { top: 20, right: 20, bottom: 30, left: 40 };
    var width = element.clientWidth - margin.left - margin.right;
    var height = element.clientHeight - margin.top - margin.bottom;

    console.log(data)

    d3.select("#my-chart").remove()

    var container = element.appendChild(document.createElement("div"));
    container.id = "my-chart";

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



    var formattedData = [];
    // format the data
    data.forEach(function (d) {
      //console.log(queryResponse)
      formattedData.push({
        count: d[queryResponse.fields.measures[0].name]["value"],
        my_dimension: d[queryResponse.fields.dimensions[0].name]["value"],
        style: d[queryResponse.fields.dimensions[1].name]["value"],
        patch_d: d[queryResponse.fields.dimensions[2].name]["value"],
      });
    });
    // Loop through the data and add to the chart data arrays

    x.domain(
      formattedData.map(function (d) {
        return d.my_dimension;
      })
    );
    y.domain([
      0,
      d3.max(formattedData, function (d) {
        return d.count;
      }),
    ]);

    // Add the bars to the chart
    var bars = svg.selectAll(".bar")
      .data(formattedData)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("fill", function (d) { return d.color })
      .attr("x", function (d) { return x(d.my_dimension); })
      .attr("width", x.bandwidth())
      .attr("y", function (d) { return y(d.count); })
      .attr("height", function (d) { return height - y(d.count); });

    // Set up the cross-filtering
    bars.on("click", function (d) {

      console.log("d", d)
      console.log("queryResponse.fields.dimension_like[0]", queryResponse.fields.dimension_like[0])
      console.log("d[queryResponse.fields.dimension_like[0].name]", d[queryResponse.fields.dimension_like[0].name])
      LookerCharts.Utils.toggleCrossfilter({
        add: true,
        field: queryResponse.fields.dimension_like[0],
        value: d[queryResponse.fields.dimension_like[0].name]
      });
    })

    // Update the axes
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    bars.exit().remove();

    // Tell Looker that the update is finished
    done();
  }
});
