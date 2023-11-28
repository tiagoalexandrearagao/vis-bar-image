class Chart {
  constructor() {
    this.chartData = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c}<br>({d}%)",
      },
      legend: {
        orient: "horizontal",
        bottom: 0,

        icon: "circle",
        data: ["M", "F", "O", "N/A", "Teste", "Teste2", "Teste3"],
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
  }

  getChartData() {
    return this.chartData;
  }

  // Atualiza os dados do gráfico com os novos dados recebidos
  updateChartData(newData) {
    this.chartData = newData;
  }
}

module.exports = Chart;
