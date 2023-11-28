import * as d3 from "d3";
import * as echarts from "echarts";
export function teste(params) {
  //BEGIN
  let dataKeys = Array();
  params.data.forEach(function (d) {
    dataKeys.push(d.name);
  });

  const chartData = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c}<br>{d}%",
    },
    legend: {
      orient: "horizontal",
      bottom: 0,
      icon: "circle",
      data: ["M", "F", "O", "N/A"],
    },
    series: [
      {
        name: "Gênero",
        type: "pie",
        radius: ["0%", "70%"],
        left: 110,
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: "#fff",
          borderWidth: 4,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "30",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: true,
        },
        data: [
          { value: 335, name: "M", itemStyle: { color: "#6a52fa" } },
          { value: 310, name: "F", itemStyle: { color: "#1ec370" } },
          { value: 234, name: "O", itemStyle: { color: "#20b9fc" } },
          { value: 135, name: "N/A", itemStyle: { color: "#fd8a64" } },
        ],
      },
    ],
  };
  //END
  return renderChart(params, chartData);
}

function renderChart(params, chartData) {
  let html = params.chart
    .select("#chart-content")
    .append("div")
    .html(function () {
      const chartDom = d3.select("#chart-content").node();
      const myChart = echarts.init(chartDom);
      myChart.setOption(chartData);

      myChart.on("click", function (d) {
        dimension[params.queryResponse.fields.dimensions[0].name] = {
          field: params.queryResponse.fields.dimensions[0].name,
          value: JSON.stringify(d.name),
        };

        LookerCharts.Utils.toggleCrossfilter({
          event: d.event.event,
          row: dimension,
        });
      });

      return myChart;
    });

  return html;
}
