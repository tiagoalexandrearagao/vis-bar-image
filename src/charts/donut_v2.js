export function donutChartV2(params) {
  var toggleChart = function (type) {};

  var fontFamily = "'Quicksand', sans-serif";
  var fontSize = "28";
  var fontWeightBold = "bold";
  var fontWeightNormal = "normal";
  var fontColor = "#333";

  // var innerRadius =  Math.min(params.width, params.height) / 1.2
  //ar radius = Math.min(params.width, params.height) / 2.2
  var innerRadius = 85;
  var radius = 90;

  var transformWidthG =
    parseInt(params.width) +
    parseInt(params.margin.left) +
    parseInt(params.margin.right) -
    135; //+ parseInt(params.margin.left)
  var transformHeightG =
    parseInt(params.height) +
    parseInt(params.margin.top) +
    parseInt(params.margin.bottom - 20) -
    100; //+ parseInt(params.margin.left)

  var tweenDuration = 500;

  var centerTitle = innerRadius == 0 ? "" : "";

  var formattedData = [];

  var pie = params.d3.pie().value(function (d) {
    return d.measure_count;
  });

  console.log("params.width", params.width);
  console.log("params.height", params.height);
  var colors = Array();

  colors = ["#FD8A64", "#1EC370", "#6A52FA", "#20B9FC"];

  try {
    if (params.details.crossfilters.length > 0) {
      var i = -1;

      params.data = data.filter(function (d) {
        i++;
        //console.log('d[params.queryResponse.fields.dimensions[0].name]["value"]', d[params.queryResponse.fields.dimensions[0].name]["value"])
        if (
          !params.details.crossfilters[0].values.includes(
            d[params.queryResponse.fields.dimensions[0].name]["value"]
          )
        ) {
          return (colors[i] = params.barNotSelected[0]);
        } else {
          return (colors[i] = colors[i]);
        }
      });
    }
  } catch (error) {}
  //console.log("var params.data após o filtro", params.data);
  //console.log("params.details", params.details);

  // format  params.data
  params.data.forEach(function (d) {
    formattedData.push({
      measure_count: d[params.queryResponse.fields.measures[0].name]["value"],
      dimension_values:
        d[params.queryResponse.fields.dimensions[0].name]["value"],
    });
  });

  var ordScale = params.d3.scaleOrdinal().domain(formattedData).range(colors);

  if (params.d3.select("#toolTip").size() == 0) {
    var div = params.d3.select("body").append("div").attr("id", "toolTip");
  } else {
    var div = params.d3.select("#toolTip");
  }

  params.d3.select("#chart").attr("style", "overflow:hidden")
    .html(`<h3 style="position:absolute; params.margin-left:10px;params.margin-top:8px;">
                        <span style="font-family: ${fontFamily}; font-weight:${fontWeightNormal} ;
                       ">     
                        ${params.titleChart}
                        </span>
                        </h3>`);

  var color = params.d3.scaleOrdinal().range(colors);

  var colorScale = params.d3
    .scaleSequential(params.d3.interpolate("purple", "orange"))
    .domain([1, 4]);

  var pie = params.d3
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
  var outerRadius = params.height / 2 - 20;

  var svgTitle = params.d3.select("#chart");

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
      `params.margin-left:13px; 
       params.margin-top:80px;
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
      `params.margin-left:13px; params.margin-top: 100px; position:absolute; font-family: ${fontFamily}; font-weight:${fontWeightNormal} ;font-size:12px`
    );

  var svg = d3.select("#chart");

  var chartDonut = {
    buildPieStructure: function () {
      radius = Math.min(params.width, params.height) / 2;

      color = d3.scale.category20();

      pie = d3.layout.pie().sort(null);

      arc = d3.svg
        .arc()
        .innerRadius(0)
        .outerRadius(radius - 50);

      svg = d3
        .select("#chart")
        .append("svg")
        .attr("width", params.width)
        .attr("height", params.height)
        .append("g")
        .attr(
          "transform",
          "translate(" + params.width / 2 + "," + params.height / 2 + ")"
        );
    },
    oldPieData: "",
    pieTween: function (d, i) {
      var that = this;

      var theOldDataInPie = chartDonut.oldPieData;
      // Interpolate the arcs in data space

      var s0;
      var e0;

      if (theOldDataInPie[i]) {
        s0 = theOldDataInPie[i].startAngle;
        e0 = theOldDataInPie[i].endAngle;
      } else if (!theOldDataInPie[i] && theOldDataInPie[i - 1]) {
        s0 = theOldDataInPie[i - 1].endAngle;
        e0 = theOldDataInPie[i - 1].endAngle;
      } else if (!theOldDataInPie[i - 1] && theOldDataInPie.length > 0) {
        s0 = theOldDataInPie[theOldDataInPie.length - 1].endAngle;
        e0 = theOldDataInPie[theOldDataInPie.length - 1].endAngle;
      } else {
        s0 = 0;
        e0 = 0;
      }

      var i = d3.interpolate(
        {
          startAngle: s0,
          endAngle: e0,
        },
        {
          startAngle: d.startAngle,
          endAngle: d.endAngle,
        }
      );

      return function (t) {
        var b = i(t);
        return chartDonut.arc(b);
      };
    },
    removePieTween: function (d, i) {
      var that = this;
      s0 = 2 * Math.PI;
      e0 = 2 * Math.PI;
      var i = d3.interpolate(
        {
          startAngle: d.startAngle,
          endAngle: d.endAngle,
        },
        {
          startAngle: s0,
          endAngle: e0,
        }
      );

      return function (t) {
        var b = i(t);
        return chartDonut.arc(b);
      };
    },
    update: function (dataSet) {
      console.log("update pie", dataSet);

      var that = this;

      piedata = pie(dataSet);

      //create a marker element if it doesn't already exist
      var defs = svg.select("defs");
      if (defs.empty()) {
        defs = svg.append("defs");
      }
      var marker = defs.select("marker#circ");
      if (marker.empty()) {
        defs
          .append("marker")
          .attr("id", "circ")
          .attr("markerWidth", 6)
          .attr("markerHeight", 6)
          .attr("refX", 3)
          .attr("refY", 3)
          .append("circle")
          .attr("cx", 3)
          .attr("cy", 3)
          .attr("r", 3);
      }
      //Create/select <g> elements to hold the different types of graphics
      //and keep them in the correct drawing order
      var pathGroup = svg.select("g.piePaths");
      if (pathGroup.empty()) {
        pathGroup = svg.append("g").attr("class", "piePaths");
      }
      var pointerGroup = svg.select("g.pointers");
      if (pointerGroup.empty()) {
        pointerGroup = svg.append("g").attr("class", "pointers");
      }
      var labelGroup = svg.select("g.labels");
      if (labelGroup.empty()) {
        labelGroup = svg.append("g").attr("class", "labels");
      }

      path = pathGroup.selectAll("path.pie").data(piedata);

      path
        .enter()
        .append("path")
        .attr("class", "pie")
        .attr("fill", function (d, i) {
          return color(i);
        });

      path.transition().duration(300).attrTween("d", pieTween);

      path
        .exit()
        .transition()
        .duration(300)
        .attrTween("d", removePieTween)
        .remove();

      var labels = labelGroup.selectAll("text").data(
        piedata.sort(function (p1, p2) {
          return p1.startAngle - p2.startAngle;
        })
      );
      labels.enter().append("text").attr("text-anchor", "middle");
      labels.exit().remove();

      var labelLayout = d3.geom
        .quadtree()
        .extent([
          [-width, -height],
          [width, height],
        ])
        .x(function (d) {
          return d.x;
        })
        .y(function (d) {
          return d.y;
        })([]);

      //create an empty quadtree to hold label positions
      var maxLabelWidth = 0;
      var maxLabelHeight = 0;

      labels
        .text(function (d) {
          // Set the text *first*, so we can query the size
          // of the label with .getBBox()
          return d.dimension_values;
        })
        .each(function (d, i) {
          // Move all calculations into the each function.
          // Position values are stored in the data object
          // so can be accessed later when drawing the line

          /* calculate the position of the center marker */
          var a = (d.startAngle + d.endAngle) / 2;

          //trig functions adjusted to use the angle relative
          //to the "12 o'clock" vector:
          d.cx = Math.sin(a) * (radius - 75);
          d.cy = -Math.cos(a) * (radius - 75);

          /* calculate the default position for the label,
                 so that the middle of the label is centered in the arc*/
          var bbox = getBBox();
          //bbox.width and bbox.height will
          //describe the size of the label text
          var labelRadius = radius - 20;
          d.x = Math.sin(a) * labelRadius;
          d.l = d.x - bbox.width / 2 - 2;
          d.r = d.x + bbox.width / 2 + 2;
          d.y = -Math.cos(a) * (radius - 20);
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

      var pointers = pointerGroup.selectAll("path.pointer").data(piedata);
      pointers
        .enter()
        .append("path")
        .attr("class", "pointer")
        .style("fill", "none")
        .style("stroke", "black")
        .attr("marker-end", "url(#circ)");
      pointers.exit().remove();

      pointers.transition().attr("d", function (d) {
        if (d.cx > d.l) {
          return (
            "M" +
            (d.l + 2) +
            "," +
            d.b +
            "L" +
            (d.r - 2) +
            "," +
            d.b +
            " " +
            d.cx +
            "," +
            d.cy
          );
        } else {
          return (
            "M" +
            (d.r - 2) +
            "," +
            d.b +
            "L" +
            (d.l + 2) +
            "," +
            d.b +
            " " +
            d.cx +
            "," +
            d.cy
          );
        }
      });

      oldPieData = piedata;
    },
  };

  chartDonut.buildPieStructure();
  chartDonut.update(formattedData);
  //novo fim
  return svg;
}
