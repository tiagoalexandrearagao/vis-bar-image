import { max } from "d3";

export function donutChart(params) {
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

  var fontFamily = "'Quicksand', sans-serif";
  var fontSize = "28";
  var fontWeightBold = "bold";
  var fontWeightNormal = "normal";
  var fontColor = "#333";

  // var innerRadius =  Math.min(width, height) / 1.2
  //ar radius = Math.min(width, height) / 2.2
  var innerRadius = 85;
  var radius = 90;

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
  //console.log("var data após o filtro", data);
  //console.log("details", details);

  // format  data
  data.forEach(function (d) {
    formattedData.push({
      measure_count: d[queryResponse.fields.measures[0].name]["value"],
      dimension_values: d[queryResponse.fields.dimensions[0].name]["value"],
    });
  });

  var ordScale = d3.scaleOrdinal().domain(formattedData).range(colors);

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

  var color = d3.scaleOrdinal().range(colors);

  var colorScale = d3
    .scaleSequential(d3.interpolate("purple", "orange"))
    .domain([1, 4]);

  var pie = d3
    .pie()
    .sort((a, b) => (a > b ? 50 : -100))
    .value(function (d) {
      return d.measure_count;
    });

  var pieData = pie(formattedData);
  var oldPieData = [];
  var filteredPieData = [];

  var isDount = false;
  var transitionSpeed = 2600;
  var outerRadius = height / 2 - 20;

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
    .data(pie(formattedData))
    .text(function (d) {
      return d.data.dimension_values;
    })
    .attr(
      "style",
      `margin-left:13px; margin-top: 100px; position:absolute; font-family: ${fontFamily}; font-weight:${fontWeightNormal} ;font-size:12px`
    );

  var svg = d3
    .select("#chart")
    .append("svg")
    .attr("preserveAspectRatio", "xMaxYMax meet")
    .attr(
      "width",
      parseInt(width) + parseInt(margin.left) + parseInt(margin.right)
    ) //novo
    .attr(
      "height",
      parseInt(height + 40) + parseInt(margin.top) + parseInt(margin.bottom)
    ) //novo
    .append("g")
    .append("g")
    .attr(
      "transform",
      "translate(" + transformWidthG + "," + transformHeightG + ")"
    ); //novo

  //novo
  svg.append("g").attr("id", "slices");
  svg.append("g").attr("class", "labels");
  svg.append("g").attr("class", "lines");
  svg.append("g").attr("id", "legend");
  //fim novo

  //TODO: Permitir customização
  var arc = d3
    .arc()
    .outerRadius(radius * 0.98)
    .innerRadius(isDount ? radius * 0.4 : 0);

  var arc2 = d3
    .arc()
    .outerRadius(radius * 0.8 - 10)
    .innerRadius(radius * 0.9);

  var circlesArc = d3
    .arc()
    .innerRadius(radius * 0.8)
    .outerRadius(radius * 0.8);

  var outerArc = d3
    .arc()
    .innerRadius(radius * 0.99)
    .outerRadius(radius * 0.99);

  var key = function (d) {
    return d.data.dimension_values;
  };

  var slice = svg
    .select("#slices")
    .selectAll("path.slices")
    .data(pie(formattedData), key);

  slice
    .enter()
    .insert("path")
    .style("fill", function (d) {
      return color(d.data.dimension_values);
    })
    // .attr("fill", (d) => colorScale(d.dimension_values))
    .attr("class", "slices")
    .merge(slice)
    .transition()
    .duration(transitionSpeed)
    .attrTween("d", function (d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function (t) {
        return arc(interpolate(t));
      };
    });

  slice.exit().remove();

  slice.attr("transform", function () {
    x += 40;

    const widthClient = document
      .getElementById("legend")
      .getBoundingClientRect();
    //const resize = width * 0.25 + widthClient.width / 2;
    const resize = width / 2 + widthClient.width / 2;
    return `translate(${-resize},${0})`;
  });

  svg.selectAll(".slices").on("mouseover", function (d) {
    d3.select(this).style("cursor", "pointer");
    d3.select(this).style("stroke-width", strokeWidth + 2);
    d3.select(this).style("stroke", "#dedede");
    d3.select(this).style("stroke-opacity", "0.5");
  });

  svg
    .selectAll(".slices")
    .on("mousemove", function (event, d) {
      div.style("left", event.pageX + 15 + "px");
      div.style("top", event.pageY - 50 + "px");

      var measure_count = Intl.NumberFormat("pt-BR").format(
        d.data.measure_count
      );

      div.style("display", "inline-block");
      div.style("position", "absolute");
      div.style("font-family", fontFamily);
      div.style("font-weight", fontWeightBold);
      div.style("font-size", `11px`);
      div.style("background-color", "#fff");
      div.style("padding", "8px");
      div.style("border", "1px solid #dedede");
      div.html(
        `${dimensionTitle}<br><span style="font-weight: ${fontWeightBold}; color:#333" > ${d.data.dimension_values}</span>` +
          "<br><br>" +
          `${measureTitle}<br><span style="font-weight: ${fontWeightBold}; color:#333" >${measure_count}</span>`
      );
    })
    .on("mouseout", function (d) {
      d3.select(this).style("stroke-width", strokeWidth);
      d3.select(this).style("stroke", "#fff");
      d3.select(this).style("stroke-opacity", "1");
      //tooltip
      div.style("position", "absolute");
      div.style("display", "none");
    });

  //svg.selectAll("#slices").attr("transform", "rotate(9deg)");

  var dimension = Array();
  svg.selectAll(".slices").on("click", function (d) {
    try {
      div.style("position", "absolute");
      div.style("display", "none");

      dimension[queryResponse.fields.dimensions[0].name] = {
        field: queryResponse.fields.dimensions[0].name,
        value: d.target.__data__.data.dimension_values,
      };

      var payload = {
        event: d,
        row: dimension,
      };

      console.log("payload", payload);
      LookerCharts.Utils.toggleCrossfilter(payload);
    } catch (error) {
      console.log(error);
    }
  });

  var text = svg
    .select(".labels")
    .selectAll("text")
    .data(pie(formattedData), key);

  function midAngle(d) {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }

  text
    .enter()
    .append("text")
    .attr("dy", ".35em")
    .attr(
      "style",
      `margin-left:13px; margin-top:80px;position:absolute; font-family: ${fontFamily};font-weight:${fontWeightBold} ; font-size:18px; color:#333`
    )
    .text(function (d) {
      return (
        parseFloat(((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100).toFixed(
          0
        ) + "%"
      );
    })
    .merge(text)
    .transition()
    .duration(transitionSpeed)
    .attrTween("transform", function (d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function (t) {
        var d2 = interpolate(t);
        var pos = outerArc.centroid(d2);
        pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
        return "translate(" + pos + ")";
      };
    })
    .styleTween("text-anchor", function (d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function (t) {
        var d2 = interpolate(t);
        return midAngle(d2) < Math.PI ? "start" : "end";
      };
    });

  ///novo

  var that = this;

  var labelLayout = d3
    .quadtree()
    .extent([
      [-that.width, -that.height],
      [that.width, that.height],
    ])
    .x(function (d) {
      return d.x;
    })
    .y(function (d) {
      return d.y;
    })([]);

  text
    .text(function (d) {
      // Set the text *first*, so we can query the size
      // of the label with .getBBox()
      return d.value;
    })
    .each(function (d, i) {
      // Move all calculations into the each function.
      // Position values are stored in the data object
      // so can be accessed later when drawing the line

      /* calculate the position of the center marker */
      var a = (d.startAngle + d.endAngle) / 2;

      //trig functions adjusted to use the angle relative
      //to the "12 o'clock" vector:
      d.cx = Math.sin(a) * (that.radius - 75);
      d.cy = -Math.cos(a) * (that.radius - 75);

      /* calculate the default position for the label,
         so that the middle of the label is centered in the arc*/
      var bbox = this.getBBox();
      //bbox.width and bbox.height will
      //describe the size of the label text
      var labelRadius = that.radius - 20;
      d.x = Math.sin(a) * labelRadius;
      d.l = d.x - bbox.width / 2 - 2;
      d.r = d.x + bbox.width / 2 + 2;
      d.y = -Math.cos(a) * (that.radius - 20);
      d.b = d.oy = d.y + 5;
      d.t = d.y - bbox.height - 5;

      /* check whether the default position 
         overlaps any other labels*/
      var conflicts = [];
      labelLayout.visit(function (node, x1, y1, x2, y2) {
        //recurse down the tree, adding any overlapping
        //node is the node in the quadtree,
        //node.point is the value that we added to the tree
        //x1,y1,x2,y2 are the bounds of the rectangle that
        //this node covers

        if (
          x1 > d.r + maxLabelWidth / 2 ||
          //left edge of node is to the right of right edge of label
          x2 < d.l - maxLabelWidth / 2 ||
          //right edge of node is to the left of left edge of label
          y1 > d.b + maxLabelHeight / 2 ||
          //top (minY) edge of node is greater than the bottom of label
          y2 < d.t - maxLabelHeight / 2
        )
          //bottom (maxY) edge of node is less than the top of label

          return true; //don't bother visiting children or checking this node

        var p = node.point;
        var v = false,
          h = false;
        if (p) {
          //p is defined, i.e., there is a value stored in this node
          h =
            (p.l > d.l && p.l <= d.r) ||
            (p.r > d.l && p.r <= d.r) ||
            (p.l < d.l && p.r >= d.r); //horizontal conflict

          v =
            (p.t > d.t && p.t <= d.b) ||
            (p.b > d.t && p.b <= d.b) ||
            (p.t < d.t && p.b >= d.b); //vertical conflict

          if (h && v) conflicts.push(p); //add to conflict list
        }
      });

      if (conflicts.length) {
        console.log(d, " conflicts with ", conflicts);
        var rightEdge = d3.max(conflicts, function (d2) {
          return d2.r;
        });

        d.l = rightEdge;
        d.x = d.l + bbox.width / 2 + 5;
        d.r = d.l + bbox.width + 10;
      } else console.log("no conflicts for ", d);

      /* add this label to the quadtree, so it will show up as a conflict
         for future labels.  */
      labelLayout.add(d);
      var maxLabelWidth = Math.max(maxLabelWidth, bbox.width + 10);
      var maxLabelHeight = Math.max(maxLabelHeight, bbox.height + 10);
    })
    .transition() //we can use transitions now!
    .attr("x", function (d) {
      return d.x;
    })
    .attr("y", function (d) {
      return d.y;
    });

  text.exit().remove();

  var polyline = svg
    .select(".lines")
    .selectAll("polyline")
    .data(pie(formattedData), key);

  polyline
    .enter()
    .append("polyline")
    .merge(polyline)
    .transition()
    .duration(transitionSpeed)
    .attrTween("points", function (d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function (t) {
        var d2 = interpolate(t);
        var pos = outerArc.centroid(d2);
        pos[0] = radius * 0.9 * (midAngle(d2) < Math.PI ? 1 : -1);
        return [arc2.centroid(d2), outerArc.centroid(d2), pos];
      };
    });

  polyline.exit().remove();

  var circles = svg.selectAll(".circles").data(pie(formattedData));

  circles = circles
    .enter()
    .append("circle")
    .attr("class", "circles")
    .attr("r", 3)
    .attr("fill", "none")
    .merge(circles);

  circles
    .transition()
    .duration(transitionSpeed)
    .attrTween("transform", function (d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function (t) {
        var d2 = interpolate(t);
        var pos = outerArc.centroid(d2);
        pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 9 : 9);
        return "translate(" + circlesArc.centroid(d2) + ")";
      };
    });
  circles.exit().remove();

  var x = 0;

  const legend = svg.selectAll("#legend");

  const lgs = legend.selectAll("g").data(formattedData).enter().append("g");

  lgs
    .append("circle")
    .attr("fill", function (d) {
      return color(d.dimension_values);
    })
    .attr("cx", 5)
    .attr("cy", 5)
    .attr("r", 5)
    .attr("width", 10)
    .attr("height", 10);

  lgs
    .append("text")
    .style("font-family", `${fontFamily}`)
    .style("font-weight", `${fontWeightBold}`)
    .style("font-size", "13px")
    .attr("x", 17.5)
    .attr("y", 10)
    .text(function (d) {
      return d.dimension_values;
    });

  //TODO: tornar responsivo
  var offset = 0;
  lgs.attr("transform", function (d, i) {
    x += 70; //100 tornar responsivo
    var y = 120;
    return `translate(${x},${y})`;
  });

  legend.attr("transform", function () {
    x += 50;

    const widthClient = document
      .getElementById("legend")
      .getBoundingClientRect();
    //const resize = width * 0.25 + widthClient.width / 2;
    const resize = width / 2 + widthClient.width / 2 - 30;
    return `translate(${-resize},0)`;
  });

  //novo fim
  return svg;
}
