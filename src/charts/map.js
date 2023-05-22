import { max } from "d3";
import $ from "jquery";
import { geoEqualEarth, geoPath, geoMercator } from "d3-geo";

import * as topojson from "topojson";

export async function mapChart(params) {
  var toggleChart = function (type) {};

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
    parseInt(width) + parseInt(margin.left) + parseInt(margin.right) - 135; //+ parseInt(margin.left)
  var transformHeightG =
    parseInt(height) +
    parseInt(margin.top) +
    parseInt(margin.bottom - 20) -
    100;

  var tweenDuration = 500;

  var strokeWidth = params.strokeWidth;

  var centerTitle = innerRadius == 0 ? "" : "";

  var formattedData = [];

  var pie = d3.pie().value(function (d) {
    return d.measure_count;
  });

  var colors = Array();

  colors = ["#FD8A64", "#1EC370", "#6A52FA", "#20B9FC"];

  try {
    if (details.crossfilters.length > 0) {
      var i = -1;

      data = data.filter(function (d) {
        i++;
        if (
          !details.crossfilters[0].values.includes(
            d[queryResponse.fields.dimensions[0].name]["value"]
          )
        ) {
          return (colors[i] = barNotSelected[0]);
        } else {
          return (colors[i] = colors[i]);
        }
      });
    }
  } catch (error) {}

  // format  data
  data.forEach(function (d) {
    formattedData.push({
      measure_count: d[queryResponse.fields.measures[0].name]["value"],
      dimension_values: d[queryResponse.fields.dimensions[0].name]["value"],
    });
  });

  console.log("formattedData", formattedData);

  if (d3.select("#toolTip").size() == 0) {
    var div = d3.select("body").append("div").attr("id", "toolTip");
  } else {
    var div = d3.select("#toolTip");
  }

  d3.select("#chart").attr("style", "overflow:hidden")
    .html(`<h3 style="position:absolute; margin-left:10px;margin-top:8px;">
                        <span style="font-family: ${fontFamily}; font-weight:${fontWeightNormal} ;
                       ">     
                        ${titleChart}
                        </span>
                        </h3>`);

  var svgTitle = d3.select("#chart");

  //texto lateral percentual
  svgTitle
    .append("span")
    .data(pie(formattedData))
    .attr("fill", "#333")
    .text(function (d) {
      return (
        String(
          parseFloat(
            ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100
          ).toFixed(0)
        ) + "%"
      );
    })
    .attr(
      "style",
      `
      margin-left:13px; 
      margin-top:80px;
      position:absolute; 
      font-family: ${fontFamily};
      font-weight: ${fontWeightBold}; 
      font-size: ${fontSize}; color: ${fontColor};
      `
    );

  //texto lateral value
  svgTitle
    .append("span")
    .data(pie(formattedData))
    .text(function (d) {
      return d.data.dimension_values;
    })
    .attr(
      "style",
      `margin-left:13px; margin-top: 100px; position:absolute; font-family: ${fontFamily}; font-weight:${fontWeightNormal} ;font-size:12px`
    );

  //request
  var url =
    "https://tiagoalexandrearagao.github.io/viz-bar_image-marketplace/public/brasil.json";

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send(); //A execução do script pára aqui até a requisição retornar do servidor

  console.log(xhttp.responseText);

  var brasil = JSON.parse(xhttp.responseText);

  var br = topojson.feature(brasil, brasil.objects.uf);
  console.log("topojson", br);

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
  var div = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  color.domain([0, 1, 2, 3, 4]);

  let sampleMap = formattedData.map((item) => {
    return Number(item.measure_count);
  });

  let domain = selectDivisionNumber(sampleMap).sort();
  // var domain = [100000000, 500000000];

  var range = ["#845EC2", "#A178DF", "#BE93FD", "#DCB0FF", "#FACCFF"];
  //var colorScale = d3.scaleThreshold().domain(domain).range(range);

  let max = d3.max(formattedData, function (d, i) {
    return d.measure_count;
  });

  let min = d3.min(formattedData, function (d, i) {
    return d.measure_count;
  });

  const colorScale = d3
    .scaleLinear()
    .domain([min, max])
    .range(["#00806D", "#00BC4C", "#00F200", "#85FB44"].reverse());
  console.log("Obtendo a topologia", brasil.objects.uf);

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
      let uRate = d.measure_count;
      return colorScale(uRate);
      // console.log("dentro do fill ", d.properties.name);
      // var value = d.properties.name;
      // if (value) {
      //   return colorScale(value);
      // } else {
      //   return "rgb(213,222,217)";
      // }
      // console.log("formattedData.get(d.name)", formattedData.get(d.name));
      // d.total = formattedDatad.name) || 0;
      // return colorScale(d.total);
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

  // var legend = d3
  //   .select("body")
  //   .append("svg")
  //   .attr("class", "legend")
  //   .attr("width", 140)
  //   .attr("height", 200)
  //   .selectAll("g")
  //   .data(color.domain().slice().reverse())
  //   .enter()
  //   .append("g")
  //   .attr("transform", function (d, i) {
  //     return "translate(0," + i * 20 + ")";
  //   });

  // legend
  //   .append("rect")
  //   .attr("width", 18)
  //   .attr("height", 18)
  //   .style("fill", color);

  // legend
  //   .append("text")
  //   .data(legendText)
  //   .attr("x", 24)
  //   .attr("y", 9)
  //   .attr("dy", ".35em")
  //   .text(function (d) {
  //     return d;
  //   });

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
