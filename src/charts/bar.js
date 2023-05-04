export function bar(params) {

    var d3 = params.d3
    var width = params.width
    var margin = params.margin
    var height = params.height
    var data = params.data
    var barNotSelected = params.barNotSelected
    var queryResponse = params.queryResponse
    var titleGraphic = params.titleGraphic
    var details = params.details


    var svg = d3.select("#chart")
        .attr("style", "overflow:hidden")
        .html(`<h3 style="position:absolute; margin-left:10px;"><span style="font-family: Roboto, Helvetica, Arial, sans-serif;">${titleGraphic}</span></h3>`)
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

    try {
        if (details.crossfilters.length > 0) {
            data = data.filter(function (d) {
                if (!details.crossfilters[0].values.includes(d[queryResponse.fields.dimensions[0].name]["value"])) {
                //if (!details.crossfilters[0].values.includes(d["pug_product.ds_valor"].value)) {
                    return d["color"].value = barNotSelected
                } else {
                    return d["color"].value = d["color"].value
                }
            });
        }
    } catch (error) { }


    var formattedData = [];
    // format  data
    data.forEach(function (d) {
        formattedData.push({
            measure_count: d[queryResponse.fields.measures[0].name]["value"],
            dimension_values: d[queryResponse.fields.dimensions[0].name]["value"],
            style: d[queryResponse.fields.dimensions[1].name]["value"],
            image_base64: d[queryResponse.fields.dimensions[2].name]["value"],
        });
    });

    x.domain(
        formattedData.map(function (d) {
            return d.dimension_values;
        })
    );

    y.domain([
        0,
        d3.max(formattedData, function (d) {
            return d.measure_count;
        }),
    ]);

    var bars = svg.selectAll(".bar")
        .data(formattedData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("rx", "7")
        .attr("ry", "7")
        .attr("fill", function (d) { return d.style })
        .attr("x", function (d) { return x(d.dimension_values); })
        .attr("width", x.bandwidth())
        .attr("y", function (d) { return y(d.measure_count); })
        .attr("height", function (d) { return (height - y(d.measure_count)); })
        .on('mouseover', function () {
            d3.select(this).attr('fill', function (d) { return d.style });
            d3.select(this).style("cursor", "pointer");
            d3.select(this).style("stroke-width", "6");
            d3.select(this).style("stroke", function (d) { return d.style });
            d3.select(this).style("stroke-opacity", "0.5");
        })
        .on('mouseout', function () {
            d3.select(this).attr('fill', function (d) { return d.style });
            d3.select(this).style("stroke-width", "0");
            d3.select(this).style("stroke", "none");
            d3.select(this).style("stroke-opacity", "0");
        })
        .attr('transform', 'translate(0,-80)')

    //Cross filtering
    bars.on("click", function (d) {

        try {
            var payload = {
                event: d,
                row: {
                    "pug_product.ds_valor": {
                        field: queryResponse.fields.dimensions[0].name,
                        value: d.target.__data__.dimension_values
                    }
                }
            }

            LookerCharts.Utils.toggleCrossfilter(payload);

        } catch (error) {
            console.log(error)
        }

        done();

    })

    //posicionar os elementos no eixo X
    xAxisGroup.call(xAxis);
    //adicionar a imagem após o posicionamento do eixo X
    svg
        .selectAll(".tick")
        .data(formattedData)
        .append("g")
        //.attr("class", "image_logo")
        .html(function (d) {
            var transformX = 29
            if (width > 390 && width <= 550) {
                transformX = 23
            } else if (width >= 330 && width <= 390) {
                transformX = 17
            } else if (width > 220 && width <= 330) {
                transformX = 11
            } else if (width <= 220) {
                transformX = 7
            }
            var image = String(d.image_base64).replace("<image ", `<image class=\"image_logo\" transform=\"translate(-${transformX},-70)\" `)
            return image;
        });

    svg
        .selectAll(".image_logo")
        .attr("width", function (d) {
            var widthImg = 58

            if (width > 390 && width <= 550) {
                widthImg = 45
            } else if (width > 330 && width <= 390) {
                widthImg = 35
            } else if (width > 220 && width <= 330) {
                widthImg = 21
            } else if (width <= 220) {
                widthImg = 14
            }
            return widthImg
        })
    //.attr("height", x.bandwidth())

    //add o title com a measure após o posicionamento do eixo X
    svg
        .selectAll(".tick")
        .data(formattedData)
        .append("text")
        .text(function (d) { return Intl.NumberFormat("pt-BR").format(d.measure_count) })
        .attr("fill", function (d) {
            return d.style;
        })
        .attr("cx", "29")
        .attr("cy", "29")
        .attr("r", "30")
        .attr("transform", function (d) { return `translate(0,-${(height - y(d.measure_count)) + 95})`; });

    //posicionar os elementos no eixo Y
    //yAxisGroup.call(yAxis);   

    //remover as linhas do grafico
    d3.selectAll("path.line").remove();

    //limpar as colunas não usadas/filtradas
    bars.exit().remove();

    return svg;
}