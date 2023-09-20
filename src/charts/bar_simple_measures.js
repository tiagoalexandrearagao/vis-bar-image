import { max } from "d3";

export function barSimpleMeasureChart(params) {
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
  var hideMeasure = params.hideMeasure;

  var fontFamily = "'Quicksand', sans-serif";
  var fontSize = "28px";
  var fontWeightBold = "bold";
  var fontWeightNormal = "normal";
  var fontColor = "#333";

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
  var colors = Array();

  var colorSelected = "#6A52FA";

  colors = [
    colorSelected,
    colorSelected,
    colorSelected,
    colorSelected,
    colorSelected,
    colorSelected,
    colorSelected,
    colorSelected,
    colorSelected,
    colorSelected,
    colorSelected,
  ];

  try {
    if (details.crossfilters.length > 0) {
      var i = -1;
    }
  } catch (error) {}

  var data_json = JSON.stringify(data);
  var data_object = JSON.parse(data_json.replace("[", "").replace("]", ""));

  var formattedData365Mais = [];
  var formattedNotNavegation = [];

  for (var val in data_object) {
    var titleDimension = traitLabel(val);
    console.log("titleDimension", titleDimension);

    if (titleDimension != "365+" && titleDimension != "Sem navegação") {
      formattedData.push({
        measure: data_object[val]["value"],
        dimension: titleDimension,
      });
    }

    if (titleDimension == "365+") {
      formattedData365Mais.push({
        measure: data_object[val]["value"],
        dimension: titleDimension,
      });
    }
    if (titleDimension == "Sem navegação") {
      formattedNotNavegation.push({
        measure: data_object[val]["value"],
        dimension: titleDimension,
      });
    }
  }

  var isHiddenEvenColumns = formattedData.length < 10 ? false : true;

  var ordScale = d3.scaleOrdinal().domain(formattedData).range(colors);

  if (d3.select("#toolTip").size() == 0) {
    var div = d3.select("body").append("div").attr("id", "toolTip");
  } else {
    var div = d3.select("#toolTip");
  }

  var color = d3.scaleOrdinal().range(colors);

  var colorScale = d3
    .scaleSequential(d3.interpolate("purple", "orange"))
    .domain([1, 4]);

  var svgTitle = d3.select("#chart");

  var formattedDataOrderBy = formattedData
    .slice()
    .sort((a, b) => d3.descending(a.measure, b.measure));

  var pie = d3
    .pie()
    .sort((a, b) => (a > b ? 50 : -100))
    .value(function (d) {
      return d.measure;
    });

  if (params.showIndicator == "yes") {
    svgTitle
      .append("span")
      .data(pie(formattedDataOrderBy))
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
        `margin-left:13px; 
          margin-top:80px;
          position:absolute; 
          font-family: ${fontFamily};
          font-weight: ${fontWeightBold}; 
          font-size: ${fontSize};
          px; color: ${fontColor};`
      );

    //texto lateral value
    svgTitle
      .append("span")
      .data(pie(formattedDataOrderBy))
      .text(function (d) {
        return d.data.dimension;
      })
      .attr(
        "style",
        `margin-left:15px; margin-top: 115px; position: absolute; font-family: ${fontFamily}; font-weight: ${fontWeightNormal} ;font-size:12px`
      );
  }

  try {
    if (formattedNotNavegation[0].measure) {
      formattedDataOrderBy =
        formattedNotNavegation.concat(formattedDataOrderBy);
    }
  } catch (error) {}

  try {
    if (formattedData365Mais[0].measure) {
      formattedDataOrderBy = formattedData365Mais.concat(formattedDataOrderBy);
    }
  } catch (error) {}

  var svg = d3
    .select("#chart")
    .attr("style", "overflow:hidden")
    .append("div")
    .html(
      `<h3 style="position:absolute; margin-left:10px; margin-top:5px;"><span style="font-family: 'Quicksand', sans-serif; font-weight: normal;">${titleChart}</span></h3>`
    )
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", function () {
      return height + margin.top + margin.bottom;
    })
    .append("g")
    .attr("transform", function () {
      if (isRotate == true) {
        return `translate(${margin.left}, ${margin.top - 150})`;
      }
      return `translate(${margin.left}, ${margin.top - 30})`;
    });

  svgTitle.exit().remove();

  var scale = d3.scaleLinear();

  scale(100);

  var xScale = d3.scaleBand().range([0, width]).padding(0.05);

  var yScale = d3.scaleLinear().range([0, height + 25]);

  xScale.domain(d3.range(formattedDataOrderBy.length));

  yScale.domain([
    0,
    d3.max(formattedDataOrderBy, function (d) {
      return d.measure;
    }),
  ]);

  var barWidth = Math.max(1, 0.9 * xScale.bandwidth());
  var halfGap = Math.max(0, xScale.bandwidth() - barWidth) / 2;

  //build bars
  var dimension = Array();
  var isRotate = false;

  var bars = svg
    .selectAll(".bar")
    .data(formattedDataOrderBy)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("rx", "7")
    .attr("ry", "7")
    .attr("x", function (d, i) {
      return xScale(i);
    })
    .attr("width", function () {
      isRotate = xScale.bandwidth() < 90 ? true : false;

      return xScale.bandwidth();
    })
    // .attr("width", barWidth)
    .attr("y", function (d) {
      return height - yScale(d.measure);
    })

    .attr("height", function (d) {
      return yScale(d.measure);
    })
    //.attr("fill", "#6A52FA")
    .style("fill", function (d) {
      if (d.dimension == "365+") {
        //return "#20b9fc";
      }
      return color(d.dimension);
    })
    .on("click", function (d) {
      try {
        div.style("position", "absolute");
        div.style("display", "none");

        dimension[queryResponse.fields.dimensions[0].name] = {
          field: queryResponse.fields.dimensions[0].name,
          value: d.target.__data__.dimension,
        };

        var payload = {
          event: d,
          row: dimension,
        };

        LookerCharts.Utils.toggleCrossfilter(payload);
      } catch (error) {}
    });

  svg
    .selectAll(".bar")
    .on("mousemove", function (event, d) {
      var scaling_tooltip = formattedData.length > 3 ? 50 : 150;

      div.style("left", event.pageX - scaling_tooltip + "px");
      div.style("top", event.pageY - 100 + "px");

      var measure = Intl.NumberFormat("pt-BR").format(d.measure);
      var percent_value = 0;

      try {
        percent_value =
          String(
            parseFloat(
              ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100
            ).toFixed(0)
          ) + "%";
      } catch (error) {}

      div.style("display", "inline-block");
      div.style("position", "absolute");
      div.style("font-family", fontFamily);
      div.style("font-weight", fontWeightBold);
      div.style("font-size", `11px`);
      div.style("background-color", "#fff");
      div.style("padding", "8px");
      div.style("border", "1px solid #dedede");
      div.html(
        `${dimensionTitle}<br><span style="font-weight: ${fontWeightBold}; color:#333" > ${d.dimension}</span>` +
          "<br><br>" +
          `${measureTitle}<br><span style="font-weight: ${fontWeightBold}; color:#333" >${measure}</span><br>`
      );
    })
    .on("mouseover", function (d) {
      d3.select(this).style("cursor", "pointer");
      d3.select(this).style("stroke-width", strokeWidth + 7);
      d3.select(this).style("stroke", "#dedede");
      d3.select(this).style("stroke-opacity", "0.5");
    })
    .on("mouseout", function (d) {
      d3.select(this).style("stroke-width", strokeWidth);
      d3.select(this).style("stroke", "#fff");
      d3.select(this).style("stroke-opacity", "1");
      //tooltip
      div.style("position", "absolute");
      div.style("display", "none");
    });

  bars.exit().remove();
  //text labels on bars

  var countHiddenEvenColumns = 0;
  var textPercent = svg
    .append("g")
    .attr("transform", "translate(0,0)")
    .selectAll("text")
    .data(formattedDataOrderBy)
    .enter()
    .append("text")
    .text(function (d) {
      if (hideMeasure == "no") {
        countHiddenEvenColumns++;
        if (isHiddenEvenColumns == true) {
          if (countHiddenEvenColumns % 2 == 0) {
            return "";
          } else {
            return Intl.NumberFormat("pt-BR").format(d.measure);
          }
        } else {
          return Intl.NumberFormat("pt-BR").format(d.measure);
        }
      }
      //d.measure;
    })
    .attr("x", function (d, i) {
      return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function (d) {
      return height - yScale(d.measure) - 14;
    })
    .attr("font-family", fontFamily)
    .attr("font-weight", fontWeightBold)
    .attr("font-size", function () {
      if (isRotate == true) {
        return "9px";
      }
      return "11px";
    })
    //.attr("fill", "#6A52FA")
    .attr("text-anchor", "middle");

  textPercent.exit().remove();

  var rotate_range = 0;

  var textLabel = svg
    .append("g")
    .attr("transform", "translate(0,15)")
    .selectAll("text")
    .data(formattedDataOrderBy)
    .enter()
    .append("g")
    .append("text")
    .attr("class", "text-rotate")
    //.attr("style", "transform:rotate(-45deg)")
    //.attr("transform", "translate(-25,130) rotate(-45)")
    .text(function (d) {
      return d.dimension; //d.measure;
    })
    .attr("x", function (d, i) {
      return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", height)
    .attr("font-family", fontFamily)
    .attr("font-weight", fontWeightBold)
    .attr("font-size", function () {
      if (isRotate == true) {
        return "9px";
      }

      return "11px";
    })
    .attr("text-anchor", function () {
      if (isRotate == true) {
        return "end";
      }
      return "middle";
    })
    .attr("transform", function (d, i) {
      if (isRotate == true) {
        var new_x = xScale(i);
        var new_y = yScale(i);

        if (d.dimension.length > 3 && d.dimension.length < 6) {
          new_y = yScale(i) + 150;
        } else if (d.dimension.length <= 3) {
          new_y = yScale(i) + 50;
        }

        return `rotate(-10,${new_x},${new_y})`;
      }
    });

  textLabel.exit().remove();

  return svg;
}

function traitLabel(value) {
  var newValue = "";
  switch (value) {
    case "interaction.total_ultimos_30":
      newValue = "Últimos 30 dias";
      break;
    case "interaction.total_ultimos_60":
      newValue = "Últimos 60 dias";
      break;
    case "interaction.total_ultimos_90":
      newValue = "Últimos 90 dias";
      break;
    case "interaction.total_ultimos_120":
      newValue = "Últimos 120 dias";
      break;
    case "interaction.total_ultimos_180":
      newValue = "Últimos 180 dias";
      break;
    case "interaction.total_ultimos_365":
      newValue = "Últimos 365 dias";
      break;
    case "interaction.total_mais_365":
      newValue = "365+";
      break;
    case "interaction.total_sem_navegacao":
      newValue = "Sem navegação";
      break;
    case "interacoes_por_periodo.ultimos_30":
      newValue = "Últimos 30 dias";
      break;
    case "interacoes_por_periodo.ultimos_60":
      newValue = "Últimos 60 dias";
      break;
    case "interacoes_por_periodo.ultimos_90":
      newValue = "Últimos 90 dias";
      break;
    case "interacoes_por_periodo.ultimos_120":
      newValue = "Últimos 120 dias";
      break;
    case "interacoes_por_periodo.ultimos_180":
      newValue = "Últimos 180 dias";
      break;
    case "interacoes_por_periodo.ultimos_365":
      newValue = "Últimos 365 dias";
      break;
    case "interacoes_por_periodo.mais_365":
      newValue = "365+";
      break;
    case "interacoes_por_periodo.total_sem_navegacao":
      newValue = "Sem navegação";
      break;
  }
  return newValue;
}
