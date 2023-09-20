import { max } from "d3";
import $ from "jquery";
import { geoEqualEarth, geoPath, geoMercator } from "d3-geo";

import * as topojson from "topojson";
import tinycolor from "tinycolor2";

export async function mapChart(params) {
  var toggleChart = function (type) {};
  var _ = require("lodash");

  var d3 = params.d3;
  var width = params.width;
  var margin = params.margin;
  var height = params.height;
  var data = params.data;
  var barNotSelected = params.barNotSelected;
  var queryResponse = params.queryResponse;
  var titleChart = params.titleGraphic;
  var details = params.details;
  var fontSizePercent = params.fontSizePercent;

  var strokeWidth = params.strokeWidth;
  var dimensionTitle = params.dimensionTitle;
  var measureTitle = params.measureTitle;

  var vis = params.vis;

  var fontFamily = "'Quicksand', sans-serif";
  var fontSize = "28";
  var fontWeightBold = "bold";
  var fontWeightNormal = "normal";
  var fontColor = "#333";

  var innerRadius = 90;
  var radius = 100;

  var transformWidthG =
    parseInt(width) + parseInt(margin.left) + parseInt(margin.right) - 135;

  var transformWidthG2 =
    parseInt(width) + parseInt(margin.left) + parseInt(margin.right) - 130;

  var transformHeightG =
    parseInt(height) + parseInt(margin.top) + parseInt(margin.bottom - 20);
  var tweenDuration = 500;

  var strokeWidth = params.strokeWidth;

  var centerTitle = innerRadius == 0 ? "" : "";

  var formattedData = [];

  var pie = d3.pie().value(function (d) {
    return d.measure_count;
  });

  var colors = Array();

  colors = ["#FD8A64", "#1EC370", "#6A52FA", "#20B9FC"];

  // try {
  //   if (details.crossfilters.length > 0) {
  //     var i = -1;

  //     data = data.filter(function (d) {
  //       i++;
  //       if (
  //         !details.crossfilters[0].values.includes(
  //           d[queryResponse.fields.dimensions[0].name]["value"]
  //         )
  //       ) {
  //         return (colors[i] = barNotSelected[0]);
  //       } else {
  //         return (colors[i] = colors[i]);
  //       }
  //     });
  //   }
  // } catch (error) {}

  // format  data
  data.forEach(function (d) {
    formattedData.push({
      measure_count: d[queryResponse.fields.measures[0].name]["value"],
      dimension_values: d[queryResponse.fields.dimensions[0].name]["value"],
    });
  });

  //console.log("formattedData", formattedData);

  d3.select("#chart").attr("style", "overflow:hidden")
    .html(`<h3 style="position:absolute; margin-left:10px;margin-top:8px;">
                        <span style="font-family: ${fontFamily}; font-weight:${fontWeightNormal} ;
                       ">     
                        ${titleChart}
                        </span>
                        </h3>`);

  var svgTitle = d3.select("#chart");

  var regionSelected = "region-selected";

  var nordeste = `Maranhão,Maranhao,Piauí,Piaui,Ceará,Ceara,Rio Grande do Norte,Pernambuco,Paraíba,Paraiba,Sergipe,Alagoas,Bahia`;
  var norte = `Amazonas,Roraima,Amapa,Amapá,Pará,Para,Tocantins,Rondônia,Rondonia,Acre`;
  var centro_oeste = `Mato Grosso,Mato Grosso do Sul,Goiás,Goias,Distrito Federal,DF`;
  var sudeste = `São Paulo,Sao Paulo,Rio de Janeiro,Espírito Santo,Espirito Santo,Minas Gerais`;
  var sul = `Paraná,Parana,Rio Grande do Sul,Santa Catarina`;

  var regionsTitle = Array();
  regionsTitle = ["x", "Nordeste", "Norte", "Centro-oeste", "Sudeste", "Sul"];

  var regions = Array();
  regions = [
    ``,
    `Maranhão,Maranhao,Piauí,Piaui,Ceará,Ceara,Rio Grande do Norte,Pernambuco,Paraíba,Paraiba,Sergipe,Alagoas,Bahia`,
    `Amazonas,Roraima,Amapa,Amapá,Pará,Para,Tocantins,Rondônia,Rondonia,Acre`,
    `Mato Grosso,Mato Grosso do Sul,Goiás,Goias,Distrito Federal,DF`,
    `São Paulo,Sao Paulo,Rio de Janeiro,Espírito Santo,Espirito Santo,Minas Gerais`,
    `Paraná,Parana,Rio Grande do Sul,Santa Catarina`,
  ];

  var current_filters = "";
  try {
    var valuesFilters = details.crossfilters[0].values;
  } catch (error) {
    var valuesFilters = [];
  }

  svgTitle
    .append("div")
    .attr("id", "btn_region")
    .attr(
      "style",
      `position:absolute; bottom: 20px; margin-right:20px; margin-left:${transformWidthG2}px;`
    )
    .html(function (d) {
      var htmlInicial = `<table style="float:right;z-index:1">`;
      var htmlFinal = "</table>";

      for (var i = 0; i < 6; i++) {
        var filtrado = "";

        try {
          var currentRegionArray = String(regions[i]).split(",");
          var r3 = [];
          var r4 = [];

          valuesFilters.forEach(function (element, index, array) {
            if (currentRegionArray.indexOf(element) == -1) {
              r3.push(element);
            } else {
              r4.push(element);
            }
          });

          if (JSON.stringify(currentRegionArray) === JSON.stringify(r4)) {
            filtrado = "region-selected";
          }
        } catch (error) {}

        current_filters =
          current_filters +
          `<tr><td class="no-background">
            <button ${
              regionsTitle[i] == "x" ? 'style="background:#dedede"' : ""
            } class="region ${filtrado}" data-value="${regions[i]}">${
            regionsTitle[i]
          }</button>
          </td></tr>`;
      }

      return htmlInicial + current_filters + htmlFinal;
    });

  var dimension = Array();

  d3.selectAll(".region").on("click", function (d) {
    try {
      var selectedItems = d3.select(this).attr("data-value");

      selectedItems = selectedItems == "" ? [] : selectedItems;

      if (selectedItems != "") {
        dimension[queryResponse.fields.dimensions[0].name] = {
          field: queryResponse.fields.dimensions[0].name,
          value: selectedItems,
        };
      }

      var payload = {
        event: d,
        row: dimension,
      };

      LookerCharts.Utils.toggleCrossfilter(payload);
    } catch (error) {}
  });

  svgTitle
    .append("span")
    .attr("id", "scaleMap")
    .data(formattedData)
    .html(function (d) {
      return `<div style="position:absolute;margin-left:30px; top:0px;">${Intl.NumberFormat(
        "pt-BR"
      ).format(d.measure_count)}</div>
        <div style="position:absolute;margin-left:30px; bottom:0px;">0</div>
        `;
    })
    .attr(
      "style",
      `     
      background:${params.beginColorMap};
      background: -moz-linear-gradient(top, ${params.beginColorMap} 0%,${
        params.endColorMap
      } 100%);
      background: -webkit-linear-gradient(top, ${params.beginColorMap} 0%,${
        params.endColorMap
      } 100%);
      background: linear-gradient(to bottom, ${params.beginColorMap} 0%,${
        params.endColorMap
      } 100%);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${
        params.beginColorMap
      }', endColorstr='${params.endColorMap}',GradientType=0);
      
      margin-left:13px; margin-top: ${
        transformHeightG - 100
      }px; height:120px; width:20px; position: absolute; font-family: ${fontFamily}; font-weight:${fontWeightNormal} ;font-size:12px`
    );

  if (d3.select("#toolTip").size() == 0) {
    var div = d3.select("#chart").append("div").attr("id", "toolTip");
  } else {
    var div = d3.select("#toolTip");
  }

  //request
  var url =
    "https://tiagoalexandrearagao.github.io/viz-bar_image-marketplace/public/brasil.json";

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send(); //A execução do script pára aqui até a requisição retornar do servidor

  var brasil = JSON.parse(xhttp.responseText);

  var br = topojson.feature(brasil, brasil.objects.uf);

  var projection = geoMercator()
    .scale(500)
    .center([-52, -15])
    .translate([width / 2, height / 2]);
  // Define path generator
  var path = geoPath() // path generator that will convert GeoJSON to SVG paths
    .projection(projection); // tell path generator to use albersUsa projection

  // Define linear scale for output

  var color = d3
    .scaleLinear()
    .range([
      "rgb(213,222,217)",
      "rgb(69,173,168)",
      "rgb(84,36,55)",
      "rgb(217,91,67)",
      "rgb(217,91,67)",
    ]);

  var legendText = ["Sul", "Sudeste", "Centro-oeste", "Norte", "Nordeste"];

  //Create SVG element and append map to the SVG
  var svg = d3
    .select("#chart")
    .append("svg")
    .attr(
      "width",
      parseInt(width) + parseInt(margin.left) + parseInt(margin.right)
    ) //novo
    .attr(
      "height",
      parseInt(height + 40) + parseInt(margin.top) + parseInt(margin.bottom)
    );

  // Append Div for tooltip to SVG

  color.domain([0, 1, 2, 3, 4]);

  let sampleMap = formattedData.map((item) => {
    return Number(item.measure_count);
  });

  let domain = selectDivisionNumber(formattedData).sort();
  // var domain = [100000000, 500000000];

  var range = [params.beginColorMap, params.endColorMap]; //verde - amarelo - vermelho"#dc143c"

  //var colorScale = d3.scaleThreshold().domain(domain).range(range);

  let max = d3.max(formattedData, function (d, i) {
    return d.measure_count;
  });

  let min = d3.min(formattedData, function (d, i) {
    return d.measure_count;
  });

  const colorScale = d3
    .scaleSequential(d3.interpolateRdYlBu)
    .domain([min, max])
    .range(range.reverse());

  var teste = _(br.features)
    .keyBy("properties.name")
    .merge(_.keyBy(formattedData, "dimension_values"))
    .values()
    .value();

  svg
    .append("g")
    .attr("transform", "translate(0,90)")
    .selectAll("path")
    .data(br.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("class", "brasil")
    .style("stroke", "#fff")
    .style("stroke-width", "1")
    .style("fill", function (d) {
      try {
        if (details.crossfilters.length > 0) {
          var i = -1;

          if (!details.crossfilters[0].values.includes(d.dimension_values)) {
            return barNotSelected[0];
          } else {
            return colorScale(d.measure_count);
          }
        }
      } catch (error) {}

      return colorScale(d.measure_count);
    })
    .on("click", function (d) {
      try {
        div.style("position", "absolute");
        div.style("display", "none");

        dimension[queryResponse.fields.dimensions[0].name] = {
          field: queryResponse.fields.dimensions[0].name,
          value: d.target.__data__.dimension_values,
        };

        var payload = {
          event: d,
          row: dimension,
        };

        LookerCharts.Utils.toggleCrossfilter(payload);
      } catch (error) {}
    })
    .on("mousemove", function (event, d) {
      div.style("left", event.pageX + 15 + "px");
      div.style("top", event.pageY - 50 + "px");

      var measure_count = Intl.NumberFormat("pt-BR").format(d.measure_count);

      div.style("display", "inline-block");
      div.style("position", "absolute");
      div.style("font-family", fontFamily);
      div.style("font-weight", fontWeightBold);
      div.style("font-size", `11px`);
      div.style("background-color", "#fff");
      div.style("z-index", "9999999999");
      div.style("padding", "8px");
      div.style("border", "1px solid #dedede");
      div.html(
        `${dimensionTitle}<br><span style="font-weight: ${fontWeightBold}; color:#333" > ${d.dimension_values}</span>` +
          "<br><br>" +
          `${measureTitle}<br><span style="font-weight: ${fontWeightBold}; color:#333" >${measure_count}</span>`
      );
    })
    .on("mouseover", function (d) {
      d3.select(this).style("cursor", "pointer");
      d3.select(this).style("stroke", "#333");
      d3.select(this).style("stroke-width", "1");
    })
    //remove styling when the mouse leaves.
    .on("mouseout", function (d, i) {
      d3.select(this).style("stroke", "#fff");
      div.style("display", "none");
      d3.select(this).style("stroke-width", "1");
    })
    .style("opacity", 0.7);

  svg
    .selectAll("circle")
    .data(formattedData)
    .enter()
    .append("circle")
    .style("fill", "rgb(217,91,67)")
    .style("opacity", 0.85)
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", 0.9);
      div
        .text(d.dimension_values)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseout", function (d) {
      div.transition().duration(500).style("opacity", 0);
    });

  return svg;
}

function selectDivisionNumber(array) {
  let arraySize = array.length,
    halfArray = Math.round(arraySize / 2);
  let newArr = [];
  //Take first and last item and push them to the array
  newArr.push(array[0]);
  newArr.push(array[arraySize - 1]);
  //Don't mind the order, they will be sorted later.
  //Divide the array in two
  let firstHalf = array.slice(0, halfArray);
  let firstHalfSelection = firstHalf[Math.round(firstHalf.length / 2)];
  newArr.push(firstHalfSelection);

  let secondHalf = array.slice(halfArray, arraySize);
  let secondHalfSelection = secondHalf[Math.round(secondHalf.length / 2)];
  newArr.push(secondHalfSelection);
  return newArr;
}
