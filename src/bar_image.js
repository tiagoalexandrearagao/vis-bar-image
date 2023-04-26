import { baseOptions } from "./common/options";
import "./common/styles.css";
import { select, selectAll } from "d3-selection";
export { select, selectAll };
import $ from "jquery";
import * as d3 from "d3";
import * as crossfilter from "crossfilter2";


looker.plugins.visualizations.add({
  id: 'viz-bar_image-marketplace',
  label: 'Gráfico de Barras com logo',
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
    var vis = this
    var container = element.appendChild(document.createElement("div"));
    container.id = "my-chart";

    const style = document.createElement('style');
    style.innerHTML = `
    .bar:hover {
      border: 1px solid #333
    }
    react:hover{
      border: 1px solid #333;
      cursor:pointer;
    }
    .x.axis>.tick> line {
      stroke-opacity: 0;
    }
    `;
    document.head.appendChild(style);
    return container;
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    var margin = { top: 120, right: 20, bottom: -10, left: 40 };
    var width = element.clientWidth - margin.left - margin.right;
    var height = element.clientHeight - margin.top - margin.bottom;
    var vis = this

    //const ndx = crossfilter(data);
    //console.log("ndx",ndx)
    //const categoryDim = ndx.dimension(d => d);

    //console.log("categoryDim", categoryDim)


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


    if (details.crossfilters.length > 0) {
      data = data.filter(function (d) {
        if (!details.crossfilters[0].values.includes(d["pug_product.ds_valor"].value)) {
          return d["color"].value = "gray"
        } else {
          return d["color"].value = d["color"].value
        }
        //return details.crossfilters[0].values.includes(d["pug_product.ds_valor"].value);
      });
    }

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
      .attr("rx", "10")
      .attr("ry", "10")
      .attr("fill", function (d) { return d.style })
      .attr("x", function (d) { return x(d.my_dimension); })
      .attr("width", x.bandwidth())
      .attr("y", function (d) { return y(d.count); })
      .attr("height", function (d) { return (height - y(d.count)); })
      .on('mouseover', function () {
        d3.select(this).attr('fill', '#dedede');
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', function (d) { return d.style });
      })
      .attr('transform', 'translate(0,-80)')

    // Set up the cross-filtering
    bars.on("click", function (d) {

      console.log("field ", queryResponse.fields.dimensions[0].name)
      console.log("value ", d.target.__data__.my_dimension)

      try {
        console.log("d", d)
        console.log("LookerCharts", LookerCharts)
        console.log("LookerCharts.Utils.getCrossfilterSelection()", LookerCharts.Utils.getCrossfilterSelection())
        console.log("looker", looker)
        console.log("vis", vis)
        console.log("config", config)
        console.log("queryResponse", queryResponse)
        console.log("formattedData", formattedData)
        console.log("details", details)
      } catch (error) {
        console.log(error)
      }

      var options = {
        filters: [
          {
            field: 'pug_product.ds_valor',
            value: 'G1',
          },
        ],
      };

      vis.trigger('updateFilters', [options]);


      try {
        LookerCharts.Utils.toggleCrossfilter({
          add: true,
          field: queryResponse.fields.dimensions[0].name,
          value: d.target.__data__.my_dimension
        });
      } catch (error) {
        console.log(error)
      }

      try {
        LookerCharts.Utils.toggleCrossfilter({
          'pug_product.ds_valor': 'G1'
        });
      } catch (error) {
        console.log(error)
      }

      try {
        LookerCharts.Utils.toggleCrossfilter({
          'pug_product.ds_valor': 'G1',
          'event': 'updateFilters'
        });
      } catch (error) {
        console.log(error)
      }

      try {
        LookerCharts.Utils.toggleCrossfilter({
          name: 'toggleCrossfilterEvent',
          type: 'crossfilterChanged',
          filters: ['pug_product.ds_valor']
        });
      } catch (error) {
        console.log(error)
      }


      var filter = {
        field: queryResponse.fields.dimensions[0].name,
        value: d.target.__data__.my_dimension,
      };


      // looker.updateFilters({ "add": [filter] });

      var teste =
      {
        type: 'updateFilters',
        data: {
          field: queryResponse.fields.dimensions[0].name,
          filters: [
            {
              field: queryResponse.fields.dimensions[0].name,
              value: d.target.__data__.my_dimension,
            },
          ],
        },
      }

      try {
        LookerCharts.Utils.toggleCrossfilter(teste);

      } catch (error) {
        console.log(error)
      }

      vis.trigger('updateFilters', teste);
      vis.trigger('updateFilters', [filter]);

      vis.trigger("filter",
        {
          field: queryResponse.fields.dimensions[0].name,
          value: d.target.__data__.my_dimension,
          run: true,
        },
      );

      var options = {
        filters: [
          {
            field: queryResponse.fields.dimensions[0].name,
            value: d.target.__data__.my_dimension,
          },
        ],
      };


      vis.trigger('updateFilters', [options]);
      vis.trigger('updateFilters', options);


      var options = {
        filters: {
          'pug_product.ds_valor': 'G1'
        }
      };

      vis.trigger('updateFilters', options);


    })

    //posicionar os elementos no eixo X
    xAxisGroup.call(xAxis);

    //add circle após o posicionamento do eixo X
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

    //add image após o posicionamento do eixo X
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


    //add o title om a measure após o posicionamento do eixo X
    svg
      .selectAll(".tick")
      .data(formattedData)
      .append("text")
      .text(function (d) { return d.count; })
      .attr("fill", function (d) {
        return d.style;
      })
      .attr("cx", "29")
      .attr("cy", "29")
      .attr("r", "30")
      .attr("transform", function (d) { return `translate(0,-${(height - y(d.count)) + 95})`; });

    //posicionar os elementos no eixo Y
    //yAxisGroup.call(yAxis);   

    //remover as linhas do grafico
    d3.selectAll("path.line").remove();

    //limpar as colunas não usadas/filtradas
    bars.exit().remove();

    done();
  }
});
