const express = require("express");
const path = require("path");

const app = express();
app.use(express.static("public"));
app.engine(".html", require("ejs").__express);
app.set("view engine", "html");
app.set("views", "./views");

const config = require("./data/config.json");
const data = require("./data/dimension_measure.json");
const queryResponse = require("./data/queryResponse.json");
const details = require("./data/details.json");

app.get("/data", (req, res) => {
  res.json(data);
});

app.get("/queryResponse", (req, res) => {
  res.json(queryResponse);
});

app.get("/config", (req, res) => {
  res.json(config);
});

app.get("/details", (req, res) => {
  res.json(details);
});

app.get("/", (req, res) => {
  res.render("chart");
});

app.listen(80);
