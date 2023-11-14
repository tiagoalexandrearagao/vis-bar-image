const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
app.use(express.static("public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/api/config", (req, res) => {
  const data = {
    title_graphic: "Teste",
    default_icon: "<i></i>",
    font_size: "11px",
    font_weight: "normal",
    font_family: "'Quicksand', sans-serif",
    font_color: "#20B9FC",
    top_margin: "10px",
    bottom_margin: "30px",
    side_margin: "40px",
    border_radius: "5px",
    padding: "10px",
    margin: "5px",
    cursor_pointer_color: "#dedede",
    background_onclick: "#20B9FC",
    width: "100%",
    td_padding: "10px",
    bar_color_selected: "#20B9FC",
    bar_color_unselected: "#fff",
  };
  res.json(data);
});

app.get("/api/data", (req, res) => {
  const data = [
    {
      dimension: "Python",
      measure: 95.0,
    },
    {
      dimension: "JavaScript",
      measure: 85.0,
    },
    {
      dimension: "Go",
      measure: 75.0,
    },
    {
      dimension: "VB",
      measure: 65.0,
    },
    {
      dimension: "Java",
      measure: 55.0,
    },
    {
      dimension: "C++",
      measure: 45.0,
    },
    {
      dimension: "C#",
      measure: 35.0,
    },
  ];

  res.json(data);
});

app.get("/api/dataMeasures", (req, res) => {
  const data = [
    {
      measure1: 41,
      measure2: 68.0,
    },
    {
      measure1: 78,
      measure2: 67.0,
    },
    {
      measure1: 41,
      measure2: 65.6,
    },
    {
      measure1: 78,
      measure2: 65.1,
    },
    {
      measure1: 14,
      measure2: 61.9,
    },
    {
      measure1: 12,
      measure2: 60.4,
    },
  ];

  res.json(data);
});

app.get("/api/dataMeasure", (req, res) => {
  const data = [
    {
      measure: 41,
    },
  ];

  res.json(data);
});

app.get("/api/dataVenn", (req, res) => {
  const data = [
    {
      set: [1],
      label: "Documento",
      measure: 20.0,
    },
    {
      set: [2],
      label: "Email",
      measure: 20.0,
    },
    {
      set: [3],
      label: "Telefone",
      measure: 50.0,
    },
    {
      set: [1, 2],
      label: "",
      measure: 26.0,
    },
    {
      set: [1, 3],
      label: "",
      measure: 1.0,
    },
    {
      set: [2, 3],
      label: "",
      measure: 74.0,
    },
    {
      set: [1, 2, 3],
      label: "",
      measure: 5.0,
    },
  ];

  res.json(data);
});

app.get("/api/dataAtributo", (req, res) => {
  const data = [
    {
      dimension: "Chocolate",
    },
    {
      dimension: "Morango",
    },
    {
      dimension: "Creme",
    },
    {
      dimension: "Baunilha",
    },
    {
      dimension: "Maracuja",
    },
    {
      dimension: "Limão",
    },
    {
      dimension: "Abacaxi",
    },
  ];

  res.json(data);
});
app.get("/api/qrcode", (req, res) => {
  const data = [
    {
      measure1: 250,
      measure2: 300,
      measure3: 500,
    },
  ];

  res.json(data);
});

app.listen(80);
