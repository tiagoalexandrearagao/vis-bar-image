import { VennDiagram, venn, sortAreas } from "venn.js";

export function vennChart(params) {
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
  var config = params.config;

  var strokeWidth = params.strokeWidth;
  var dimensionTitle = params.dimensionTitle;
  var measureTitle = params.measureTitle;

  var vis = params.vis;

  var fontFamily = "'Quicksand', sans-serif";
  var fontWeightBold = "bold";
  var fontWeightNormal = "normal";

  // var innerRadius =  Math.min(width, height) / 1.2
  //ar radius = Math.min(width, height) / 2.2
  var innerRadius = 90;
  var radius = 100;

  var transformWidthG =
    parseInt(width) + parseInt(margin.left) + parseInt(margin.right) - 135; //+ parseInt(margin.left)
  var transformHeightG =
    parseInt(height) +
    parseInt(margin.top) +
    parseInt(margin.bottom - 20) -
    100; //+ parseInt(margin.left)

  var tweenDuration = 500;
  var strokeWidth = params.strokeWidth;
  var centerTitle = innerRadius == 0 ? "" : "";
  var formattedData = [];

  var pie = d3.pie().value(function (d) {
    return d.measure_count;
  });

  console.log("width", width);
  console.log("height", height);
  var colors = Array();

  colors = ["#FD8A64", "#1EC370", "#6A52FA", "#20B9FC"];

  try {
    if (details.crossfilters.length > 0) {
      var i = -1;

      data = data.filter(function (d) {
        i++;
        //console.log('d[queryResponse.fields.dimensions[0].name]["value"]', d[queryResponse.fields.dimensions[0].name]["value"])
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
    var sizes = JSON.parse(d[config.first_dimension]["value"]);
    if (sizes.length == 1) {
      var sets = {
        sets: JSON.parse(d[config.first_dimension]["value"]),
        size: 100,
        label: parseFloat(
          (d[config.second_dimension]["value"] /
            d[config.fourth_dimension]["value"]) *
            100
        ).toFixed(2),
        data: d[config.third_dimension]["value"],
        total: d[config.fourth_dimension]["value"],
        total_percent: d[config.fifth_dimension]["value"],
      };
    } else {
      var sets = {
        sets: JSON.parse(d[config.first_dimension]["value"]),
        size: parseFloat(
          parseFloat(
            (d[config.second_dimension]["value"] /
              d[config.fourth_dimension]["value"]) *
              100
          ).toFixed(2)
        ),
        label: parseFloat(
          (d[config.second_dimension]["value"] /
            d[config.fourth_dimension]["value"]) *
            100
        ).toFixed(2),
        data: "",
        total: d[config.fourth_dimension]["value"],
        total_percent: d[config.fifth_dimension]["value"],
      };
    }

    formattedData.push(sets);
  });

  console.log("formattedData", formattedData);

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
    .attr("fill", "blue")
    .text(function (d) {
      return `match`;
    })
    .attr(
      "style",
      `margin-left:13px; 
       margin-top:80px;
       position:absolute; 
       font-family: ${fontFamily};
       font-weight: ${fontWeightBold}; 
       font-size: 12px;
       color:blue;`
    );

  //texto lateral value
  svgTitle
    .append("span")
    .data(pie(formattedData))
    .text(function (d) {
      return Intl.NumberFormat("pt-BR").format(d.data.total);
    })
    .attr(
      "style",
      `margin-left:13px; margin-top: 100px; position:absolute; font-family: ${fontFamily}; font-weight:${fontWeightBold} ;font-size:14px`
    );

  svgTitle
    .append("span")
    .data(pie(formattedData))
    .text(function (d) {
      var percentual = parseFloat(d.data.total_percent).toFixed(2) + "%";

      return String(percentual).replace(".", ",");
    })
    .attr(
      "style",
      `margin-left:13px; margin-top: 120px; position:absolute; font-family: ${fontFamily}; font-weight:${fontWeightNormal} ;font-size:12px`
    );

  // if (d3.select("#toolTip").size() == 0) {
  //   var div = d3.select("body").append("div").attr("id", "toolTip");
  // } else {
  //   var div = d3.select("#toolTip");
  // }

  // draw venn diagram

  var xScale = d3.scaleBand().range([0, width]).padding(0.05);

  var yScale = d3.scaleLinear().range([0, height]);

  xScale.domain(d3.range(formattedData.length));

  yScale.domain([
    0,
    d3.max(formattedData, function (d) {
      return d.label;
    }),
  ]);

  var svgContainer = d3
    .select("#chart")
    .append("svg")
    .attr(
      "width",
      parseInt(width) + parseInt(margin.left) + parseInt(margin.right)
    ) //novo
    .attr(
      "height",
      parseInt(height) + parseInt(margin.top) + parseInt(margin.bottom)
    );

  var venngroup = svgContainer
    .append("g")
    .attr("transform", "translate(0,40)")
    .attr("id", "venngroup");
  svgContainer.append("div").attr("id", "tooltell");

  var chart = VennDiagram()
    .width(parseInt(width) + parseInt(margin.left) + parseInt(margin.right))
    .height(
      parseInt(height - 40) + parseInt(margin.top) + parseInt(margin.bottom)
    );
  // .styled(false);

  var div = d3.select("#venngroup");
  div.datum(formattedData).call(chart);

  div
    .selectAll("g.venn-area")
    .attr("font-family", fontFamily)
    .attr("font-weight", fontWeightBold)
    .attr("font-size", "11px")
    .append("text")
    .attr("font-family", fontFamily)
    .attr("font-weight", fontWeightBold)
    .attr("font-size", "11px")
    .attr("x", function (d, i) {
      console.log("d", d);
      console.log("i", i);

      if (d.sets.length == 1 && d.sets[0] == 1) {
        //documento
        return (
          (parseInt(width) +
            parseInt(margin.left) +
            parseInt(margin.right) -
            40) /
          2
        );
      } else if (d.sets.length == 1 && d.sets[0] == 2) {
        //telefone
        return 30;
      } else if (d.sets.length == 1 && d.sets[0] == 0) {
        //email
        return (
          parseInt(width) + parseInt(margin.left) + parseInt(margin.right) - 70
        );
      }
    })
    .attr("y", function (d, i) {
      const widthClient = document
        .getElementById("chart")
        .getBoundingClientRect();

      if (d.sets.length == 1 && d.sets[0] == 1) {
        return 10;
      } else if (d.sets.length == 1 && d.sets[0] == 2) {
        return 220;
      } else if (d.sets.length == 1 && d.sets[0] == 0) {
        return 220;
      }
    })
    .text(function (d) {
      return d.data;
    });

  return div;
}
