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
  var config = params.config;

  var fontFamily = "'Quicksand', sans-serif";
  var fontWeightBold = "bold";
  var fontWeightNormal = "normal";

  var div = "";
  var innerRadius = 90;

  var transformWidthG =
    parseInt(width) + parseInt(margin.left) + parseInt(margin.right) - 135; //+ parseInt(margin.left)
  var transformHeightG =
    parseInt(height) +
    parseInt(margin.top) +
    parseInt(margin.bottom - 20) -
    100; //+ parseInt(margin.left)

  var formattedData = [];

  var pie = d3.pie().value(function (d) {
    return d.measure_count;
  });

  if (d3.select("#toolTip").size() == 0) {
    var tooltip = d3.select("body").append("div").attr("id", "toolTip");
  } else {
    var tooltip = d3.select("#toolTip");
  }

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

  var existsDataValues = true; //alterar para false
  data.forEach(function (d) {
    existsDataValues = true;
  });

  var countTotalAttr = Array();
  var total_telefone = 0;
  var total_email = 0;
  var total_documento = 0;
  var total_maid = 0;
  var total_x_match = 0;
  var dataset = 0;

  var percentual_diff = 0;

  var testarFormato = [
    "[0]",
    "[1]",
    "[2]",
    "[0, 1]",
    "[0, 2]",
    "[1, 2]",
    "[0, 1, 2]",
  ];

  var nomenclatura = [
    "Email",
    "Documento",
    "Telefone",
    "Email e Documento",
    "Email e Telefone",
    "Documento e Telefone",
    "Email, Documento e Telefone",
  ];

  /*var nomenclatura = [
    "Email", //[0]
    "Documento", //[1]
    "Telefone", //[2]
    "Maid", //[3]
    "Email e Documento", //[0, 1]
    "Email e Telefone", //[0, 2]
    "Email e Maid", //[0, 3]
    "Documento e Telefone", //[1, 2]
    "Documento e Maid", //[1, 3]
    "Telefone e Maid", //[2, 3]
    "Email, Documento e Telefone", //[0, 1, 2]
    "Email, Documento e Maid", //[0, 1, 3]
    "Email, Telefone e Maid", //[0, 2, 3]
    "Documento, Telefone e Maid", //[1, 2, 3]
    "Email, Documento, Telefone e Maid", //[0, 1, 2, 3]
  ];*/

  /*var testarFormato = [
    "[0]", //email
    "[1]", //documento
    "[2]", //telefone
    "[3]", //maid
    "[0, 1]", //ok
    "[0, 2]", //ok
    "[0, 3]", //ok
    "[1, 2]", //ok
    "[1, 3]", //ok
    "[2, 3]", //ok
    "[0, 1, 2]", //ok
    "[0, 1, 3]", //ok
    "[0, 2, 3]", //ok
    "[1, 2, 3]", //ok
    "[0, 1, 2, 3]", //ok
  ];*/

  if (existsDataValues) {
    var percentual_match = 0;
    var num_rows = 0;
    var quantity_match = 0;

    data.forEach(function (d) {
      quantity_match = d[config.fourth_dimension].value;
      percentual_match = d[config.fifth_dimension].value;
      num_rows = d[config.sixth_dimension].value;
    });

    for (var i = 0; i < testarFormato.length; i++) {
      var check = isExists(data, testarFormato[i], config);
      if (!check) {
        data = gerarNodes(
          data,
          testarFormato[i],
          nomenclatura[i],
          percentual_match,
          num_rows,
          quantity_match,
          config
        );
      }
    }

    data.forEach(function (d) {
      var sets = JSON.parse(d[config.first_dimension]["value"]);

      try {
        if (sets.includes(0)) {
          total_email =
            total_email + parseInt(d[config.second_dimension]["value"]);
        }
      } catch (error) {}

      try {
        if (sets.includes(1)) {
          total_documento =
            total_documento + parseInt(d[config.second_dimension]["value"]);
        }
      } catch (error) {}

      try {
        if (sets.includes(2)) {
          total_telefone =
            total_telefone + parseInt(d[config.second_dimension]["value"]);
        }
      } catch (error) {}
      // try {
      //   if (sets.includes(3)) {
      //     total_maid =
      //       total_maid + parseInt(d[config.second_dimension]["value"]);
      //   }
      // } catch (error) {}

      dataset = parseInt(d[config.sixth_dimension]["value"]);
      total_x_match = parseInt(d[config.fourth_dimension]["value"]);
    });

    percentual_diff = total_x_match - total_email;

    percentual_diff = (percentual_diff / total_email) * 100;

    var percent_documento = (total_documento / dataset) * 100;
    var percent_email = (total_email / dataset) * 100;
    var percent_telefone = (total_telefone / dataset) * 100;
    //var percent_maid = (total_maid / dataset) * 100;
    var sets = Array();
    try {
      data.forEach(function (d) {
        //var sizes = JSON.parse(d[config.second_dimension]["value"]);
        var dados = d[config.first_dimension].value;
        var percent_indentification = 0;

        var symmetrical = dados == "[0]" || dados == "[2]" ? 100 : 80;

        percent_indentification =
          (d[config.second_dimension]["value"] / total_x_match) * 100;

        if (
          dados == "[0]" ||
          dados == "[1]" ||
          dados == "[2]" ||
          dados == "[3]"
        ) {
          sets = {
            sets: JSON.parse(d[config.first_dimension]["value"]),
            size: 100,
            size_normal: Intl.NumberFormat("pt-BR").format(
              percent_indentification
            ),
            label: parseFloat(percent_indentification).toFixed(2) + "%",
            data: d[config.third_dimension]["value"],
            data_label: d[config.third_dimension]["value"],
            total: d[config.fourth_dimension]["value"],
            total_percent: d[config.fifth_dimension]["value"],
          };
        } else {
          sets = {
            sets: JSON.parse(d[config.first_dimension]["value"]),
            size: 30,
            size_normal: Intl.NumberFormat("pt-BR").format(
              percent_indentification
            ),
            label: parseFloat(percent_indentification).toFixed(2) + "%",
            data: d[config.third_dimension]["value"],
            data_label: d[config.third_dimension]["value"],
            total: d[config.fourth_dimension]["value"],
            total_percent: d[config.fifth_dimension]["value"],
          };
        }

        formattedData.push(sets);
      });
    } catch (error) {
      sets = {
        sets: "",
        size: "",
        size_normal: "",
        label: "0%",
        data: "",
        data_label: "",
        total: "",
        total_percent: "",
      };
      formattedData.push(sets);
    }
  }

  console.log("formattedData", formattedData);

  d3.select("#chart").attr("style", "overflow:hidden")
    .html(`<h3 style="position:absolute; margin-left:10px;margin-top:8px;">
                    <span style="font-family: ${fontFamily}; font-weight:${fontWeightNormal} ;
                   ">     
                    ${titleChart}
                    </span>
                    </h3>`);

  var svgTitle = d3.select("#chart");

  d3.select("body").attr(
    "style",
    `
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;background-image: url("")`
  );

  if (existsDataValues) {
    svgTitle
      .append("span")
      .data(pie(formattedData))
      .html(function (d) {
        var percentual = parseFloat(d.data.total_percent).toFixed(2) + "%";
        return `
      <strong style="font-size:24px; color:#365FB2;">match</strong><br>
      <strong style=" font-size:30px;">${Intl.NumberFormat("pt-BR").format(
        d.data.total
      )}</strong><br>
      <strong style="font-size:18px; color:#365FB2;">${String(
        percentual
      ).replace(".", ",")}</strong>
      `;
      })
      .attr(
        "style",
        `text-align:end; float:right; right:40px; bottom:40px; position:absolute; font-family: ${fontFamily}; font-weight:${fontWeightBold}`
      );

    svgTitle
      .append("span")
      .attr("id", "dataset")
      .attr(
        "style",
        `margin-left:13px; margin-top: 60px; position:absolute; font-family: ${fontFamily}; font-weight:${fontWeightBold} ;font-size:12px`
      );

    svgTitle
      .append("span")
      .attr("id", "email")
      .attr(
        "style",
        `margin-left:13px; margin-top: 110px; position:absolute; font-family: ${fontFamily}; font-weight:${fontWeightBold} ;font-size:12px`
      );

    svgTitle
      .append("span")
      .attr("id", "documento")
      .attr(
        "style",
        `margin-left:13px; margin-top: 180px; position:absolute; font-family: ${fontFamily}; font-weight:${fontWeightBold} ;font-size:12px`
      );

    svgTitle
      .append("span")
      .attr("id", "telefone")
      .attr(
        "style",
        `margin-left:13px; margin-top: 250px; position:absolute; font-family: ${fontFamily}; font-weight:${fontWeightBold} ;font-size:12px`
      );

    // svgTitle
    //   .append("span")
    //   .attr("id", "maid")
    //   .attr(
    //     "style",
    //     `margin-left:13px; margin-top: 320px; position:absolute; font-family: ${fontFamily}; font-weight:${fontWeightBold} ;font-size:12px`
    //   );

    svgTitle
      .append("span")
      .attr("id", "crescimento")
      .attr(
        "style",
        `left:25px;bottom:40px;: 300px; position:absolute; font-family: ${fontFamily}; font-weight:${fontWeightBold} ;font-size:12px`
      );

    d3.selectAll("#dataset").html(
      `<span style="font-size:12px"><i class="fa-solid fa-file-csv"></i> dataset</span><br>  
    <span style="font-size:14px">${Intl.NumberFormat("pt-BR").format(
      dataset
    )}</span>`
    );

    d3.selectAll("#email").html(
      `<strong style="color:${
        config.first_color
      }; font-size:14px;"><i class="fa-solid fa-at"></i> email</strong><br> 
    <span style="font-size:14px">${Intl.NumberFormat("pt-BR").format(
      total_email
    )}</span><br>
    ${parseFloat(percent_email).toFixed(2)}%`
    );

    d3.selectAll("#documento").html(
      `<strong style="color:${
        config.second_color
      }; font-size:14px;"><i class="fa-solid fa-address-card"></i> documento</strong><br> 
    <span style="font-size:14px"> ${Intl.NumberFormat("pt-BR").format(
      total_documento
    )}</span><br>
    ${parseFloat(percent_documento).toFixed(2)}%`
    );

    d3.selectAll("#telefone").html(
      `<strong style="color:${
        config.third_color
      }; font-size:14px;"><i class="fa-solid fa-phone"> </i> telefone</strong><br>
    <span style="font-size:14px"> ${Intl.NumberFormat("pt-BR").format(
      total_telefone
    )}</span><br>
    ${parseFloat(percent_telefone).toFixed(2)}%`
    );

    // d3.selectAll("#maid").html(
    //   `<strong style="color:${
    //     config.fourth_color
    //   }; font-size:14px;"><i class="fa-solid fa-mobile-screen-button"></i> maid</strong><br>
    // <span style="font-size:14px">${Intl.NumberFormat("pt-BR").format(
    //   total_maid
    // )}</span><br>
    // ${parseFloat(percent_maid).toFixed(2)}%`
    // );

    // d3.selectAll("#crescimento").html(
    //   `<strong style="font-size:14px;">
    //   <i style="color:green;" class="fa-solid fa-arrow-trend-up"></i> Aumento de matching de  ${parseFloat(
    //     percentual_diff
    //   ).toFixed(2)}%</strong><br>
    //   utilizando novos identificadores<br>
    //   (telefone e cpf)`
    // );

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
    /*
    var svgContainer = d3
      .select("#chart")
      .select("#venngroup")
      .append("svg")
      .attr(
        "width",
        parseInt(width) + parseInt(margin.left) + parseInt(margin.right)
      ) //novo
      .attr(
        "height",
        parseInt(height) + parseInt(margin.top) + parseInt(margin.bottom)
      );*/

    d3.select("#chart")
      .append("g")
      .attr("transform", "translate(0,40)")
      .attr("id", "venngroup");
    // .html(customVenn());

    //svgContainer.append("div").attr("id", "tooltell");

    var chart = VennDiagram()
      .width(parseInt(width) + parseInt(margin.left) + parseInt(margin.right))
      .height(
        parseInt(height - 40) + parseInt(margin.top) + parseInt(margin.bottom)
      );
    // .styled(false);

    div = d3.select("#venngroup");
    div.datum(formattedData).call(chart);

    div
      .selectAll("g.venn-area")
      .attr("font-family", fontFamily)
      .attr("font-weight", fontWeightBold)
      .attr("font-size", "11px")
      .append("text")
      .attr("font-family", fontFamily)
      .attr("font-weight", fontWeightBold)
      .attr("font-size", "11px");

    div
      .selectAll("g")
      .selectAll("path")
      .style("fill", function (d, i, f, g) {
        //${config.first_color}
        if (d.data == "Email") {
          return config.first_color;
        }

        if (d.data == "Documento") {
          return config.second_color;
        }

        if (d.data == "Telefone") {
          return config.third_color;
        }

        if (d.data == "Maid") {
          return config.fourth_color;
        }
      });

    div
      .selectAll("g")
      .selectAll("text")
      .attr("font-family", fontFamily)
      .style("fill", function (d, i, f, g) {
        if (d.data == "Email") {
          return config.first_color;
        }

        if (d.data == "Documento") {
          return config.second_color;
        }

        if (d.data == "Telefone") {
          return config.third_color;
        }

        if (d.data == "Maid") {
          return config.fourth_color;
        }
      });

    div.selectAll("path").style("stroke-opacity", 0).style("stroke", "#fff");

    // add listeners to all the groups to display tooltip on mouseover
    div
      .selectAll("g")
      .on("mousemove", function (e, d) {
        try {
          sortAreas(div, d);
        } catch (error) {}
        try {
          var scaling_tooltip = formattedData.length > 3 ? 50 : 150;

          tooltip.style("left", e.pageX - scaling_tooltip + "px");
          tooltip.style("top", e.pageY - 100 + "px");
          tooltip.style("display", "inline-block");
          tooltip.style("position", "absolute");
          tooltip.style("font-family", fontFamily);
          tooltip.style("font-weight", fontWeightBold);
          tooltip.style("font-size", `11px`);
          tooltip.style("background-color", "#fff");
          tooltip.style("padding", "8px");
          tooltip.style("border", "1px solid #dedede");
          tooltip.html(
            `<span style="font-weight: ${fontWeightBold}; color:#333" > ${d.data_label}<br>${d.label}</span>`
          );
        } catch (error) {}
      })
      .on("mouseover", function (e, d) {
        try {
          sortAreas(div, d);
        } catch (error) {}

        d3.select(this).style("cursor", "pointer");

        tooltip.transition().duration(400).style("opacity", 0.9);
        tooltip.style("font-family", fontFamily);
        tooltip.style("font-weight", fontWeightBold);
        tooltip.style("font-size", `11px`);

        try {
          var selection = d3.select(this).transition("tooltip").duration(400);
          selection
            .select("path")
            .style("fill-opacity", d.sets.length == 1 ? 0.5 : 0.1)
            .style("stroke-width", 5)
            .style("stroke-opacity", 1);
        } catch (error) {}
      })
      .on("mouseout", function (e, d) {
        try {
          var selection = d3.select(this).transition("tooltip").duration(400);
          selection
            .select("path")
            .style("fill-opacity", d.sets.length == 1 ? 0.25 : 0.0)
            .style("stroke-width", 0)
            .style("stroke-opacity", 0);
        } catch (error) {}

        tooltip.style("position", "absolute");
        tooltip.style("display", "none");
      });
  }

  return div;
}

function gerarNodes(
  data,
  sets,
  title,
  percentual_match,
  num_rows,
  quantity_match,
  config
) {
  var customArray = {};

  customArray[config.first_dimension] = {
    value: sets,
  };
  customArray[config.second_dimension] = {
    value: 0,
  };
  customArray[config.third_dimension] = {
    value: title,
  };
  customArray[config.fourth_dimension] = {
    value: quantity_match,
  };
  customArray[config.fifth_dimension] = {
    value: percentual_match,
    rendered: "0%",
  };
  customArray[config.sixth_dimension] = {
    value: num_rows,
  };

  data.push(customArray);
  return data;
}

function isExists(data, sets, config) {
  try {
    const found = data.some((el) => el[config.first_dimension].value === sets);
    if (found) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return true;
  }
}

function customVenn() {
  var vnn = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" height="400" viewBox="0 0 1080 1080" xml:space="preserve">
  <path fill="#ffffff" opacity="1.000000" stroke="none" d=" M627.000000,1081.000000   C418.024048,1081.000000 209.548126,1081.000000 1.036090,1081.000000   C1.036090,721.065613 1.036090,361.131195 1.036090,1.098403   C360.892853,1.098403 720.785706,1.098403 1080.839355,1.098403   C1080.839355,360.999939 1080.839355,720.999939 1080.839355,1081.000000   C929.797424,1081.000000 778.648743,1081.000000 627.000000,1081.000000  M492.359772,856.539734   C493.210449,856.721558 494.061127,856.903442 495.460052,857.640808   C497.865448,858.175781 500.253754,858.810364 502.679474,859.227051   C510.111816,860.503845 517.558594,861.696838 525.730591,863.250366   C528.181030,863.385681 530.631531,863.520996 533.857178,863.798340   C534.907471,863.844177 535.957703,863.889954 537.530151,864.602478   C544.029846,864.428833 550.529602,864.255249 557.935913,863.997437   C562.542236,863.647888 567.182068,863.536804 571.747620,862.896423   C579.848328,861.760376 587.903931,860.303223 596.840027,859.050476   C609.407837,856.028198 622.153076,853.595642 634.511902,849.878479   C681.184448,835.840637 724.123169,813.708801 765.177185,787.847534   C801.780701,764.789917 836.175781,738.609375 867.833984,709.185242   C890.196899,688.400574 911.732788,666.566101 932.034912,643.772583   C949.730835,623.905090 965.567139,602.326355 981.526978,580.981689   C999.843567,556.484985 1015.180054,530.059998 1028.998413,502.793579   C1041.647095,477.835144 1051.885254,451.911041 1059.575317,424.966522   C1065.059814,405.749908 1067.914429,386.098083 1069.803467,366.308289   C1071.246460,351.192047 1069.642090,336.035309 1066.702759,321.254883   C1058.196777,278.481323 1034.066040,248.651672 992.320557,233.943069   C972.393616,226.921997 951.783569,225.695801 930.493164,225.980408   C930.493164,225.980408 930.044495,225.888672 930.033691,225.068268   C926.306824,201.277084 916.783203,180.054626 899.994080,162.798203   C881.699341,143.994354 859.090637,133.208176 832.897461,129.893295   C816.439636,127.810440 800.083740,126.092308 783.422485,127.828003   C765.252014,129.720932 747.427246,132.871307 729.794922,137.736740   C698.410767,146.396835 668.688110,158.930756 639.852417,173.908569   C614.149231,187.259308 589.674805,202.547729 565.946350,219.078232   C560.121582,223.136078 554.630127,227.672318 548.479553,231.997131   C548.310852,232.001343 548.142151,232.005539 547.593994,231.466309   C539.183533,225.527481 530.871277,219.443558 522.344604,213.676529   C494.915833,195.125076 466.394012,178.490677 436.291504,164.595230   C415.426788,154.964005 393.981964,146.975250 371.955658,140.453308   C350.546814,134.114197 328.632111,130.665314 306.437622,129.158585   C290.469757,128.074539 274.566101,129.573822 258.923401,133.053055   C224.078781,140.803223 196.758102,159.076752 180.974777,191.723495   C175.479965,203.089142 172.865402,215.847244 168.009201,228.000336   C161.720367,228.333054 155.416321,229.121674 149.145599,228.912170   C131.016449,228.306519 113.842796,232.490158 97.261467,239.152710   C77.232124,247.200729 60.440075,259.754822 48.220310,277.751953   C33.109966,300.006348 27.332859,325.295502 26.200012,351.651337   C25.704430,363.181122 26.415249,374.961456 28.271646,386.352051   C32.061161,409.603973 37.771538,432.455536 46.032486,454.608276   C58.861000,489.009613 75.326637,521.647095 95.414673,552.277588   C109.505768,573.763794 124.615730,594.676575 140.559418,614.825623   C155.573853,633.800232 172.007706,651.684265 188.341751,669.568970   C197.302856,679.380920 207.079178,688.501160 216.964661,697.403992   C233.124283,711.957275 248.983490,726.981201 266.230133,740.156250   C288.496918,757.166382 311.613068,773.150208 335.066284,788.502258   C373.339539,813.555359 414.288574,833.380188 457.917053,847.348694   C468.780609,850.826965 480.023712,853.119690 491.502472,856.018250   C491.502472,856.018250 491.917969,856.045898 492.359772,856.539734  z"></path>
  <path fill="#C8EACF" opacity="1.000000" stroke="none" d=" M491.092346,855.957336   C480.023712,853.119690 468.780609,850.826965 457.917053,847.348694   C414.288574,833.380188 373.339539,813.555359 335.066284,788.502258   C311.613068,773.150208 288.496918,757.166382 266.230133,740.156250   C248.983490,726.981201 233.124283,711.957275 216.964661,697.403992   C207.079178,688.501160 197.302856,679.380920 188.341751,669.568970   C172.007706,651.684265 155.573853,633.800232 140.559418,614.825623   C124.615730,594.676575 109.505768,573.763794 95.414673,552.277588   C75.326637,521.647095 58.861000,489.009613 46.032486,454.608276   C37.771538,432.455536 32.061161,409.603973 28.271646,386.352051   C26.415249,374.961456 25.704430,363.181122 26.200012,351.651337   C27.332859,325.295502 33.109966,300.006348 48.220310,277.751953   C60.440075,259.754822 77.232124,247.200729 97.261467,239.152710   C113.842796,232.490158 131.016449,228.306519 149.145599,228.912170   C155.416321,229.121674 161.720367,228.333054 168.513916,228.033691   C169.018616,228.067032 169.104782,228.162064 169.048004,228.556091   C168.671448,230.405518 168.235214,231.846207 168.049683,233.318512   C165.908112,250.313416 165.911179,267.266510 167.835587,284.334473   C170.147568,304.839905 173.930115,325.039307 180.852890,344.408142   C188.158905,364.849213 196.109558,385.123749 205.044815,404.898895   C212.409332,421.197754 221.083878,436.977203 230.139740,452.422882   C244.994293,477.758820 261.676788,501.923859 280.002869,524.899353   C287.114960,533.815735 294.695984,542.358215 302.080536,551.327209   C302.118073,551.753418 302.138519,551.923340 302.100525,552.478638   C297.485901,572.708252 292.415100,592.453796 288.585724,612.437317   C286.603821,622.779907 286.150269,633.549988 286.241302,644.116333   C286.327911,654.170532 287.528229,664.289185 289.106750,674.241821   C293.001770,698.800354 303.016266,720.698364 320.369904,738.636719   C334.642212,753.389771 352.547882,762.423523 372.180206,767.971313   C387.475769,772.293518 403.150208,773.622986 419.122253,773.251221   C419.453979,773.726562 419.719788,773.913147 420.027893,774.424744   C420.699371,777.367371 421.309357,779.932861 422.071686,782.452393   C429.542969,807.145142 443.303040,827.458130 464.906952,841.798218   C473.140533,847.263428 482.335510,851.280396 491.092346,855.957336  z"></path>
  <path fill="#FECCB0" opacity="1.000000" stroke="none" d=" M930.938049,226.088821   C951.783569,225.695801 972.393616,226.921997 992.320557,233.943069   C1034.066040,248.651672 1058.196777,278.481323 1066.702759,321.254883   C1069.642090,336.035309 1071.246460,351.192047 1069.803467,366.308289   C1067.914429,386.098083 1065.059814,405.749908 1059.575317,424.966522   C1051.885254,451.911041 1041.647095,477.835144 1028.998413,502.793579   C1015.180054,530.059998 999.843567,556.484985 981.526978,580.981689   C965.567139,602.326355 949.730835,623.905090 932.034912,643.772583   C911.732788,666.566101 890.196899,688.400574 867.833984,709.185242   C836.175781,738.609375 801.780701,764.789917 765.177185,787.847534   C724.123169,813.708801 681.184448,835.840637 634.511902,849.878479   C622.153076,853.595642 609.407837,856.028198 596.634460,858.730469   C601.242249,856.670410 606.004333,854.769226 610.878601,853.220947   C624.935425,848.756104 636.856506,840.729065 647.538208,830.874329   C663.729858,815.936218 674.055542,797.488220 679.242554,776.001770   C679.483765,775.977356 679.964355,775.914551 680.432617,775.943115   C701.304871,776.088379 721.222412,773.055237 740.284790,765.729675   C770.645386,754.062134 791.618896,732.742004 803.259399,702.433777   C814.508911,673.143311 815.416809,642.666321 810.517395,612.272156   C807.239685,591.937805 800.918579,572.094116 795.980774,551.776855   C796.008789,551.353149 796.015381,551.183350 796.315430,550.853027   C809.424622,534.435608 822.512756,518.384827 834.995361,501.876190   C856.565125,473.349487 874.737427,442.653778 890.922852,410.824646   C904.339905,384.439789 915.414368,356.997040 922.593872,328.254028   C926.716492,311.749268 928.928101,294.767212 932.215332,277.851685   C932.301941,277.132904 932.173157,276.562469 932.094543,275.578552   C932.413696,273.038025 932.988037,270.898590 932.902466,268.785889   C932.325806,254.550385 931.609314,240.320511 930.938049,226.088821  z"></path>
  <path fill="#AFD5D0" opacity="1.000000" stroke="none" d=" M930.715576,226.034607   C931.609314,240.320511 932.325806,254.550385 932.902466,268.785889   C932.988037,270.898590 932.413696,273.038025 931.863159,275.720703   C931.721069,276.850891 931.860535,277.425446 932.000000,278.000000   C928.928101,294.767212 926.716492,311.749268 922.593872,328.254028   C915.414368,356.997040 904.339905,384.439789 890.922852,410.824646   C874.737427,442.653778 856.565125,473.349487 834.995361,501.876190   C822.512756,518.384827 809.424622,534.435608 796.036987,550.616943   C794.645935,548.203369 793.970337,545.802917 792.985229,543.536987   C785.193787,525.615356 777.798584,507.501312 769.361084,489.887329   C763.075989,476.766754 755.810669,464.066284 748.271484,451.608643   C739.186340,436.596436 729.847351,421.686249 719.704712,407.379547   C708.500183,391.574921 696.454712,376.349731 684.387146,361.181152   C678.729736,354.070007 672.160767,347.684113 666.009155,340.723816   C666.013367,340.478119 666.028809,339.986908 666.331787,339.843628   C673.916626,334.237976 680.879883,328.274414 688.539612,323.406708   C712.157837,308.397552 735.675842,293.171692 759.909668,279.204346   C795.130676,258.904388 832.746216,244.043121 872.172974,234.088745   C891.117126,229.305786 910.421570,226.272720 930.044495,225.888672   C930.044495,225.888672 930.493164,225.980408 930.715576,226.034607  z"></path>
  <path fill="#B0F3FE" opacity="1.000000" stroke="none" d=" M930.039062,225.478470   C910.421570,226.272720 891.117126,229.305786 872.172974,234.088745   C832.746216,244.043121 795.130676,258.904388 759.909668,279.204346   C735.675842,293.171692 712.157837,308.397552 688.539612,323.406708   C680.879883,328.274414 673.916626,334.237976 666.175049,339.549988   C660.747681,334.038239 655.965271,328.489899 650.777588,323.350494   C635.173218,307.891388 619.645264,292.341644 603.622742,277.323151   C593.963257,268.269012 583.494629,260.070312 573.285400,251.613022   C565.268188,244.971573 557.091370,238.522888 548.985413,231.988586   C554.630127,227.672318 560.121582,223.136078 565.946350,219.078232   C589.674805,202.547729 614.149231,187.259308 639.852417,173.908569   C668.688110,158.930756 698.410767,146.396835 729.794922,137.736740   C747.427246,132.871307 765.252014,129.720932 783.422485,127.828003   C800.083740,126.092308 816.439636,127.810440 832.897461,129.893295   C859.090637,133.208176 881.699341,143.994354 899.994080,162.798203   C916.783203,180.054626 926.306824,201.277084 930.039062,225.478470  z"></path>
  <path fill="#E1BDFD" opacity="1.000000" stroke="none" d=" M168.977020,228.018219   C172.865402,215.847244 175.479965,203.089142 180.974777,191.723495   C196.758102,159.076752 224.078781,140.803223 258.923401,133.053055   C274.566101,129.573822 290.469757,128.074539 306.437622,129.158585   C328.632111,130.665314 350.546814,134.114197 371.955658,140.453308   C393.981964,146.975250 415.426788,154.964005 436.291504,164.595230   C466.394012,178.490677 494.915833,195.125076 522.344604,213.676529   C530.871277,219.443558 539.183533,225.527481 547.596680,232.009186   C529.903748,247.050476 511.759796,261.042694 494.647156,276.199341   C479.595612,289.530426 465.591064,304.057251 451.336487,318.268951   C444.298889,325.285370 437.740540,332.782532 430.619690,340.011597   C416.138489,330.141388 402.154266,320.094696 387.834991,310.550690   C360.204102,292.134216 331.226776,276.031708 300.865417,262.615631   C277.548035,252.312134 253.621429,243.551239 228.801346,237.347183   C209.161270,232.437927 189.285980,229.388824 169.104782,228.162064   C169.104782,228.162064 169.018616,228.067032 168.977020,228.018219  z"></path>
  <path fill="#9FCDFD" opacity="1.000000" stroke="none" d=" M430.965393,340.062195   C437.740540,332.782532 444.298889,325.285370 451.336487,318.268951   C465.591064,304.057251 479.595612,289.530426 494.647156,276.199341   C511.759796,261.042694 529.903748,247.050476 547.786377,232.280884   C548.142151,232.005539 548.310852,232.001343 548.732483,231.992859   C557.091370,238.522888 565.268188,244.971573 573.285400,251.613022   C583.494629,260.070312 593.963257,268.269012 603.622742,277.323151   C619.645264,292.341644 635.173218,307.891388 650.777588,323.350494   C655.965271,328.489899 660.747681,334.038239 665.872070,339.693268   C666.028809,339.986908 666.013367,340.478119 665.661621,340.768005   C660.517090,344.849548 655.554321,348.446960 650.961121,352.466522   C631.505005,369.492676 611.778503,386.237885 592.906799,403.893738   C580.438232,415.558868 569.253723,428.596680 557.497375,441.022797   C554.661072,444.020782 551.836670,447.030090 548.707275,449.884521   C541.916931,442.640747 535.724854,435.242615 528.876038,428.512878   C512.400330,412.323730 496.031982,395.984222 478.834106,380.583374   C463.430573,366.789368 446.976654,354.168335 430.982483,340.787842   C430.978760,340.545929 430.965393,340.062195 430.965393,340.062195  z"></path>
  <path fill="#DEC094" opacity="1.000000" stroke="none" d=" M679.001404,776.026184   C674.055542,797.488220 663.729858,815.936218 647.538208,830.874329   C636.856506,840.729065 624.935425,848.756104 610.878601,853.220947   C606.004333,854.769226 601.242249,856.670410 596.203674,858.695435   C587.903931,860.303223 579.848328,861.760376 571.747620,862.896423   C567.182068,863.536804 562.542236,863.647888 557.197876,863.724731   C549.975830,863.613220 543.491943,863.774475 537.007996,863.935730   C535.957703,863.889954 534.907471,863.844177 533.335144,863.394775   C530.208679,862.968262 527.604187,862.945374 524.999756,862.922424   C517.558594,861.696838 510.111816,860.503845 502.679474,859.227051   C500.253754,858.810364 497.865448,858.175781 495.010193,857.072754   C493.679535,856.351746 492.798737,856.198792 491.917969,856.045898   C491.917969,856.045898 491.502472,856.018250 491.297424,855.987793   C482.335510,851.280396 473.140533,847.263428 464.906952,841.798218   C443.303040,827.458130 429.542969,807.145142 422.071686,782.452393   C421.309357,779.932861 420.699371,777.367371 420.482849,774.416870   C426.657410,773.340576 432.364868,772.644287 438.078888,772.007263   C445.627716,771.165833 453.395752,771.223633 460.692230,769.391785   C480.420319,764.439209 500.058899,759.051453 519.507874,753.100708   C528.625122,750.311096 537.223938,745.827332 546.377930,742.099060   C547.126221,742.091431 547.554443,742.096130 548.205566,742.359619   C589.954285,761.565613 633.120056,774.102722 679.001404,776.026184  z"></path>
  <path fill="#F0CDAE" opacity="1.000000" stroke="none" d=" M537.269043,864.269104   C543.491943,863.774475 549.975830,863.613220 556.744507,863.766846   C550.529602,864.255249 544.029846,864.428833 537.269043,864.269104  z"></path>
  <path fill="#F0CDAE" opacity="1.000000" stroke="none" d=" M525.365173,863.086426   C527.604187,862.945374 530.208679,862.968262 532.947510,863.323730   C530.631531,863.520996 528.181030,863.385681 525.365173,863.086426  z"></path>
  <path fill="#C8EACF" opacity="1.000000" stroke="none" d=" M492.138855,856.292847   C492.798737,856.198792 493.679535,856.351746 494.736053,856.794983   C494.061127,856.903442 493.210449,856.721558 492.138855,856.292847  z"></path>
  <path fill="#B8ADD9" opacity="1.000000" stroke="none" d=" M430.619720,340.011597   C430.965393,340.062195 430.978760,340.545929 430.682495,340.931732   C416.637024,358.125702 402.031830,374.316956 389.358612,391.900665   C374.056519,413.131897 359.911224,435.246521 346.152008,457.526428   C331.904877,480.596313 320.201904,505.032806 310.643341,530.461792   C308.026672,537.423035 304.936371,544.206116 302.063416,551.070984   C294.695984,542.358215 287.114960,533.815735 280.002869,524.899353   C261.676788,501.923859 244.994293,477.758820 230.139740,452.422882   C221.083878,436.977203 212.409332,421.197754 205.044815,404.898895   C196.109558,385.123749 188.158905,364.849213 180.852890,344.408142   C173.930115,325.039307 170.147568,304.839905 167.835587,284.334473   C165.911179,267.266510 165.908112,250.313416 168.049683,233.318512   C168.235214,231.846207 168.671448,230.405518 169.048004,228.556091   C189.285980,229.388824 209.161270,232.437927 228.801346,237.347183   C253.621429,243.551239 277.548035,252.312134 300.865417,262.615631   C331.226776,276.031708 360.204102,292.134216 387.834991,310.550690   C402.154266,320.094696 416.138489,330.141388 430.619720,340.011597  z"></path>
  <path fill="#87C3E8" opacity="1.000000" stroke="none" d=" M302.080536,551.327209   C304.936371,544.206116 308.026672,537.423035 310.643341,530.461792   C320.201904,505.032806 331.904877,480.596313 346.152008,457.526428   C359.911224,435.246521 374.056519,413.131897 389.358612,391.900665   C402.031830,374.316956 416.637024,358.125702 430.686218,341.173645   C446.976654,354.168335 463.430573,366.789368 478.834106,380.583374   C496.031982,395.984222 512.400330,412.323730 528.876038,428.512878   C535.724854,435.242615 541.916931,442.640747 548.703979,450.208923   C548.995667,451.116364 548.991089,451.549835 548.687622,452.132935   C546.954712,453.670013 545.331238,454.909698 544.116028,456.467773   C532.722046,471.076416 520.824402,485.337250 510.197754,500.488007   C496.642792,519.813782 483.664612,539.585754 471.342316,559.718994   C463.768127,572.094360 457.662506,585.396667 451.312225,598.484009   C446.253937,608.908752 441.308105,619.445190 437.250427,630.283264   C432.618378,642.655396 429.025330,655.416565 424.680145,667.859802   C418.948334,663.370483 413.384827,659.184387 408.110382,654.661194   C391.019989,640.004944 373.643097,625.648926 357.135529,610.357849   C344.110229,598.292480 332.093445,585.123901 319.849182,572.235840   C313.699066,565.762390 308.040039,558.822327 302.158936,552.093262   C302.138519,551.923340 302.118073,551.753418 302.080536,551.327209  z"></path>
  <path fill="#90E7E2" opacity="1.000000" stroke="none" d=" M302.100525,552.478638   C308.040039,558.822327 313.699066,565.762390 319.849182,572.235840   C332.093445,585.123901 344.110229,598.292480 357.135529,610.357849   C373.643097,625.648926 391.019989,640.004944 408.110382,654.661194   C413.384827,659.184387 418.948334,663.370483 424.691101,668.103027   C425.002655,668.495178 425.020782,668.982056 424.965454,669.366516   C419.182404,689.072510 416.295776,708.796814 415.915863,728.959106   C415.636780,743.768127 416.532013,758.444580 419.004822,773.035950   C403.150208,773.622986 387.475769,772.293518 372.180206,767.971313   C352.547882,762.423523 334.642212,753.389771 320.369904,738.636719   C303.016266,720.698364 293.001770,698.800354 289.106750,674.241821   C287.528229,664.289185 286.327911,654.170532 286.241302,644.116333   C286.150269,633.549988 286.603821,622.779907 288.585724,612.437317   C292.415100,592.453796 297.485901,572.708252 302.100525,552.478638  z"></path>
  <path fill="#9DCEC0" opacity="1.000000" stroke="none" d=" M419.122253,773.251221   C416.532013,758.444580 415.636780,743.768127 415.915863,728.959106   C416.295776,708.796814 419.182404,689.072510 425.312012,669.407654   C431.041229,672.988464 436.215149,677.144287 441.725067,680.792664   C457.456360,691.208862 473.137390,701.722595 489.203644,711.603699   C500.060242,718.280823 511.499207,724.019714 522.746155,730.050476   C530.455750,734.184448 538.283081,738.098816 546.057739,742.111389   C537.223938,745.827332 528.625122,750.311096 519.507874,753.100708   C500.058899,759.051453 480.420319,764.439209 460.692230,769.391785   C453.395752,771.223633 445.627716,771.165833 438.078888,772.007263   C432.364868,772.644287 426.657410,773.340576 420.492096,774.018433   C419.719788,773.913147 419.453979,773.726562 419.122253,773.251221  z"></path>
  <path fill="#9EB7DB" opacity="1.000000" stroke="none" d=" M548.986450,451.983276   C548.991089,451.549835 548.995667,451.116364 549.003540,450.358521   C551.836670,447.030090 554.661072,444.020782 557.497375,441.022797   C569.253723,428.596680 580.438232,415.558868 592.906799,403.893738   C611.778503,386.237885 631.505005,369.492676 650.961121,352.466522   C655.554321,348.446960 660.517090,344.849548 665.657349,341.013733   C672.160767,347.684113 678.729736,354.070007 684.387146,361.181152   C696.454712,376.349731 708.500183,391.574921 719.704712,407.379547   C729.847351,421.686249 739.186340,436.596436 748.271484,451.608643   C755.810669,464.066284 763.075989,476.766754 769.361084,489.887329   C777.798584,507.501312 785.193787,525.615356 792.985229,543.536987   C793.970337,545.802917 794.645935,548.203369 795.743469,550.777588   C796.015381,551.183350 796.008789,551.353149 795.684326,551.923523   C786.004211,562.623352 777.084045,573.371521 767.181580,583.122253   C750.043030,599.997986 732.612000,616.608643 714.697693,632.653931   C701.644043,644.345642 687.615906,654.949158 673.973511,665.658447   C671.457275,657.553406 669.247681,649.733765 666.474548,642.119385   C657.384827,617.160889 646.964478,592.736328 633.309448,569.930481   C620.407654,548.383057 606.848511,527.209229 592.968384,506.275665   C585.669983,495.268341 577.288940,484.946716 568.978943,474.652771   C562.656250,466.820618 555.674805,459.520264 548.986450,451.983276  z"></path>
  <path fill="#E097C2" opacity="1.000000" stroke="none" d=" M674.022217,666.037781   C687.615906,654.949158 701.644043,644.345642 714.697693,632.653931   C732.612000,616.608643 750.043030,599.997986 767.181580,583.122253   C777.084045,573.371521 786.004211,562.623352 795.662964,552.177490   C800.918579,572.094116 807.239685,591.937805 810.517395,612.272156   C815.416809,642.666321 814.508911,673.143311 803.259399,702.433777   C791.618896,732.742004 770.645386,754.062134 740.284790,765.729675   C721.222412,773.055237 701.304871,776.088379 680.442383,775.518372   C680.197632,773.268250 680.417664,771.472168 680.624023,769.674438   C681.751221,759.856995 683.653992,750.050720 683.799561,740.218506   C683.975220,728.360046 683.417542,716.373840 681.782837,704.637085   C680.016235,691.953186 676.640137,679.493530 673.979614,666.711426   C673.993103,666.486877 674.022217,666.037781 674.022217,666.037781  z"></path>
  <path fill="#C98EAE" opacity="1.000000" stroke="none" d=" M673.966125,666.936035   C676.640137,679.493530 680.016235,691.953186 681.782837,704.637085   C683.417542,716.373840 683.975220,728.360046 683.799561,740.218506   C683.653992,750.050720 681.751221,759.856995 680.624023,769.674438   C680.417664,771.472168 680.197632,773.268250 679.974121,775.489868   C679.964355,775.914551 679.483765,775.977356 679.242554,776.001770   C633.120056,774.102722 589.954285,761.565613 548.423584,742.076660   C562.726318,734.465027 577.451782,728.118408 591.241943,720.152710   C611.045166,708.713501 630.248230,696.222046 649.541687,683.919861   C657.896240,678.592712 665.837219,672.617065 673.966125,666.936035  z"></path>
  <path fill="#C8D2C6" opacity="1.000000" stroke="none" d=" M932.215332,277.851685   C931.860535,277.425446 931.721069,276.850891 931.812988,276.134155   C932.173157,276.562469 932.301941,277.132904 932.215332,277.851685  z"></path>
  <path fill="#91B1CF" opacity="1.000000" stroke="none" d=" M673.979614,666.711426   C665.837219,672.617065 657.896240,678.592712 649.541687,683.919861   C630.248230,696.222046 611.045166,708.713501 591.241943,720.152710   C577.451782,728.118408 562.726318,734.465027 548.200684,741.817871   C547.554443,742.096130 547.126221,742.091431 546.377930,742.099060   C538.283081,738.098816 530.455750,734.184448 522.746155,730.050476   C511.499207,724.019714 500.060242,718.280823 489.203644,711.603699   C473.137390,701.722595 457.456360,691.208862 441.725067,680.792664   C436.215149,677.144287 431.041229,672.988464 425.367340,669.023193   C425.020782,668.982056 425.002655,668.495178 424.991699,668.251953   C429.025330,655.416565 432.618378,642.655396 437.250427,630.283264   C441.308105,619.445190 446.253937,608.908752 451.312225,598.484009   C457.662506,585.396667 463.768127,572.094360 471.342316,559.718994   C483.664612,539.585754 496.642792,519.813782 510.197754,500.488007   C520.824402,485.337250 532.722046,471.076416 544.116028,456.467773   C545.331238,454.909698 546.954712,453.670013 548.687622,452.132935   C555.674805,459.520264 562.656250,466.820618 568.978943,474.652771   C577.288940,484.946716 585.669983,495.268341 592.968384,506.275665   C606.848511,527.209229 620.407654,548.383057 633.309448,569.930481   C646.964478,592.736328 657.384827,617.160889 666.474548,642.119385   C669.247681,649.733765 671.457275,657.553406 673.973511,665.658447   C674.022217,666.037781 673.993103,666.486877 673.979614,666.711426  z"></path>
  
  <!--Inicio label-->
  
  
  <g transform="matrix(1 0 0 1 296.27 370.56)" style="">
      <text xml:space="preserve" font-family="Lato" font-size="25" font-style="normal" font-weight="400" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;"><tspan x="-7.25" y="7.85">0</tspan></text>
  </g>
  <g transform="matrix(1 0 0 1 377.55 223.25)" style="">
      <text xml:space="preserve" font-family="Lato" font-size="25" font-style="normal" font-weight="400" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;"><tspan x="-7.25" y="7.85">0</tspan></text>
  </g>
  <g transform="matrix(1 0 0 1 545 336.5)" style="">
      <text xml:space="preserve" font-family="Lato" font-size="25" font-style="normal" font-weight="400" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;"><tspan x="-7.25" y="7.85">0</tspan></text>
  </g>
  <g transform="matrix(1 0 0 1 425.95 493.98)" style="">
      <text xml:space="preserve" font-family="Lato" font-size="25" font-style="normal" font-weight="400" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;"><tspan x="-7.25" y="7.85">0</tspan></text>
  </g>
  <g transform="matrix(1 0 0 1 681.75 494.14)" style="">
      <text xml:space="preserve" font-family="Lato" font-size="25" font-style="normal" font-weight="400" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;"><tspan x="-7.25" y="7.85">0</tspan></text>
  </g>
  <g transform="matrix(1 0 0 1 551 619.67)" style="">
      <text xml:space="preserve" font-family="Lato" font-size="25" font-style="normal" font-weight="400" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;"><tspan x="-7.25" y="7.85">0</tspan></text>
  </g>
  <g transform="matrix(1 0 0 1 360.67 686.21)" style="">
      <text xml:space="preserve" font-family="Lato" font-size="25" font-style="normal" font-weight="400" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;"><tspan x="-7.25" y="7.85">0</tspan></text>
  </g>
  <g transform="matrix(1 0 0 1 464.08 733.08)" style="">
      <text xml:space="preserve" font-family="Lato" font-size="25" font-style="normal" font-weight="400" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;"><tspan x="-7.25" y="7.85">0</tspan></text>
  </g>
  <g transform="matrix(1 0 0 1 625.25 736.92)" style="">
      <text xml:space="preserve" font-family="Lato" font-size="25" font-style="normal" font-weight="400" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;"><tspan x="-7.25" y="7.85">0</tspan></text>
  </g>
  <g transform="matrix(1 0 0 1 740.6 686.38)" style="">
      <text xml:space="preserve" font-family="Lato" font-size="25" font-style="normal" font-weight="400" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;"><tspan x="-7.25" y="7.85">0</tspan></text>
  </g>
  <g transform="matrix(1 0 0 1 543 808.6)" style="">
      <text xml:space="preserve" font-family="Lato" font-size="25" font-style="normal" font-weight="400" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;"><tspan x="-7.25" y="7.85">0</tspan></text>
  </g><g transform="matrix(1 0 0 1 911.6 540)" style="">
      <text xml:space="preserve" font-family="Lato" font-size="25" font-style="normal" font-weight="400" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;"><tspan x="-7.25" y="7.85">0</tspan></text>
  </g>
  <g transform="matrix(1 0 0 1 809.75 379.17)" style="">
      <text xml:space="preserve" font-family="Lato" font-size="25" font-style="normal" font-weight="400" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;"><tspan x="-7.25" y="7.85">0</tspan></text>
  </g>
  <g transform="matrix(1 0 0 1 720.2 222.03)" style="">
      <text xml:space="preserve" font-family="Lato" font-size="25" font-style="normal" font-weight="400" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;"><tspan x="-7.25" y="7.85">0</tspan></text>
  </g>  
      <g xmlns="http://www.w3.org/2000/svg" transform="matrix(1 0 0 1 200.24 540)" style="" id="261c9ae9-e77a-494b-803c-76da4f43501a">
      <text xml:space="preserve" font-family="Lato" font-size="25" font-style="normal" font-weight="400" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;"><tspan x="-7.25" y="7.85">0</tspan></text>
  </g>
  </svg>`;

  return vnn;
}
