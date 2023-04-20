import { baseOptions } from "./common/options";
import "./common/styles.css";
import { select, selectAll } from "d3-selection";
export { select, selectAll };
import * as d3 from "d3";

import $ from "jquery";

const visObject = {
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

  /**
   * The create function gets called when the visualization is mounted but before any
   * data is passed to it.
   **/
  create: function (element, config) {
    element.innerHTML = "";
    element.innerHTML = ` 
    <style>  
    #vis > svg > g > g:nth-child(12){
      color:#fff;
      display:none;
    }
    #vis{
      display: inline-block;
      margin: 0 auto;
   }
    </style> `;
  },

  /**
   * UpdateAsync is the function that gets called (potentially) multiple times. It receives
   * the data and should update the visualization with the new data.
   **/
  updateAsync: function (
    data,
    element,
    config,
    queryResponse,
    details,
    doneRendering
  ) {

    this.clearErrors();


    if (data.length === 0) {
      element.innerHTML = "<h1>No Results</h1>";
      this.addError({ title: "No Results" });
      done();
      return;
    }

    if (queryResponse.fields.dimensions.length != 3) {
      element.innerHTML =
        "<h1>There is a problem with your dimensions</h1><br>this chart requires three dimensions";
      this.addError({
        title: "There is a problem with your dimensions",
        message: "this chart requires three dimensions",
      });
      return;
    }

    if (queryResponse.fields.measures.length != 1) {
      element.innerHTML =
        "<h1>No Dimensions</h1><br>This chart requires a measure.";
      this.addError({
        title: "No measure",
        message: "This chart requires a measure.",
      });
      return;
    }

    var vis = this;
    var i = 0;

    const bar_color = "#FFCB65";
    var default_title = `<img style="width:150px; height:auto;" src="${config.default_icon}">${config.title_graphic}`;
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("padding", "15px")
      .style("background", "rgba(0,0,0,0.6)")
      .style("border-radius", "5px")
      .style("color", "#fff")
      .text("a simple tooltip");

    // set the dimensions and margins of the graph
    //var margin = { top: 140, right: 20, bottom: 30, left: 20 },
    var margin = { top: 180, right: 20, bottom: 150, left: 20 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand().range([0, width]).padding(0.1);
    var y = d3.scaleLinear().range([height, 0]);

    var svg = d3
      .select("#vis")
      .attr("style", "overflow:hidden")
      .append("svg")
      .attr("id", "resize")
      .attr("width", '100%')
      .attr("height", height + margin.top + margin.bottom)
      .attr("style", "margin:auto; margin-left:auto; margin-right:auto")
      .append("g")
      .attr("class", "main")
      .attr("id", "main")
      .attr("width", '100%')
      .attr("y", "50")
      .attr("alignment-baseline", "middle")
      .attr("style", "margin:auto; margin-left:auto; margin-right:auto")
      .attr("transform", "translate(50," + margin.top + ")");

    var formattedData = [];
    data.forEach(function (d) {
      formattedData.push({
        count: d[queryResponse.fields.measures[0].name]["value"],
        my_dimension: d[queryResponse.fields.dimensions[0].name]["value"],
        style: d[queryResponse.fields.dimensions[1].name]["value"],
        patch_d: d[queryResponse.fields.dimensions[2].name]["value"],
      });
    });

    formattedData.sort(function (x, y) {
      return d3.ascending(x.index, y.index);
    })

    // Scale the range of the data in the domains
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

    svg
      .selectAll(".bar")
      .data(formattedData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("rx", "10")
      .attr("ry", "10")
      .attr("width", x.bandwidth())
      .attr("style", function (d) {
        return "fill: " + d.style + ";";
      })
      .attr("title", function (d) {
        return d.my_dimension;
      })
      .attr("x", function (d) {
        return x(d.my_dimension);
      })
      .attr("y", function (d) {
        return y(d.count) - 80;
      })
      .attr("height", function (d) {
        return height - y(d.count);
      })
      .on('mouseover', function (d) {
        return "Teste " + height - y(d.count);
      })
      .on('mouseout', function (d) {
        return "Teste " + height - y(d.count);
      });

    // add the x Axis
    svg
      .append("g")
      .attr("class", "append_text")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg
      .selectAll(".tick")
      .data(formattedData)
      .append("text")
      .attr("class", "count")
      .attr("fill", "#333");

    svg
      .selectAll(".count")
      .data(formattedData)
      .html(function (d) {
        return d.count;
      })
      .attr("width", x.bandwidth())
      .attr("height", "100%")
      .attr("transform", function (d) {
        return `translate(0,-${height - y(d.count) + 90})`;
      });


    svg
      .selectAll(".tick")
      .data(formattedData)
      .append("circle")
      .attr("fill", function (d) {
        return d.style;
      })
      .attr("cx", "29")
      .attr("cy", "29")
      .attr("r", "30")
      .attr("transform", "translate(-29,-70)");

    //add image
    svg
      .selectAll(".tick")
      .data(formattedData)
      .append("g")
      .attr("class", "image_logo")
      .html(function (d) {
        var image = String(d.patch_d);
        image = image.replace(
          "<image ",
          `<circle transform=\"translate(-29,-70)\" xmlns=\"http://www.w3.org/2000/svg\" r=\"29\" fill=\"${d.style}\" cy=\"29\" cx=\"29\"/><image transform=\"translate(-29,-70)\" `
        );
        image = image.replace(
          "<path ",
          `<circle transform=\"translate(-29,-70)\" xmlns=\"http://www.w3.org/2000/svg\" r=\"29\" fill=\"${d.style}\" cy=\"29\" cx=\"29\"/><path transform=\"translate(-29,-70)\" `
        );
        return image;
      });

    //begin remove
    svg.selectAll(".tick").selectAll("line").remove();
    svg.selectAll(".domain").attr("stroke", "#fff");
    svg.selectAll(".tick").selectAll("text").attr("fill", "#fff");
    svg.selectAll(".tick")
      .selectAll(".count")
      .attr("fill", "#333")
      .attr("style", "font-size:12px");
    //end remove

    svg.append("g").call(d3.axisLeft(y)); //antes era y

    var svg_width = d3.select("#main").node().getBoundingClientRect().width * 1.15

    d3.select("body")
      .style("display", "block")
      .style("margin", "auto")
      .attr("style", `display: block; margin:auto; width:${svg_width}px; overflow:hidden;position: relative; `)


      d3.select(".bar")
      .on("click", function (d) {
        console.log(d)
        vis.trigger("filter", [
          {
            field: String(queryResponse.fields.dimensions[0].name),
           // value: `${d.delegateTarget.__data__.my_dimension}`,
            value: `teste`,
            run: true,
          },
        ]);

      })
    

    // $(element)
    //   .find(".bar")
    //   .on('click', function (d) {
    //     console.log(queryResponse.fields.dimensions[0].name, d.delegateTarget.__data__.my_dimension)

    //     var cell = data[queryResponse.fields.dimensions[0].name];
    //     var cellElement = myBuildElementFunction(cell);
    //     cellElement.onclick = function (event) {
    //       LookerCharts.Utils.openDrillMenu({
    //         links: cell.links,
    //         event: event
    //       });
    //     };

    //     vis.trigger("filter", [
    //       {
    //         field: String(queryResponse.fields.dimensions[0].name),
    //         value: `${d.delegateTarget.__data__.my_dimension}`,
    //         run: true,
    //       },
    //     ]);
    //   });

    //this.trigger("limit", [20]);

    doneRendering();
  },
};

looker.plugins.visualizations.add(visObject);
