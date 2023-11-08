import { max } from "d3";

import { html_table } from "./components/html_table";
import { orderByFilterPosition } from "../functions/index";

export function table_and(params) {
  var d3 = params.d3;
  let store = require("store");

  var width = params.width;
  var margin = params.margin;
  var height = params.height;
  var queryResponse = params.queryResponse;

  var formattedData = [];
  let payload = Array();
  let div = "";

  if (d3.select("#toolTip").size() == 0) {
    div = d3.select("body").append("div").attr("id", "toolTip");
  } else {
    div = d3.select("#toolTip");
  }

  formattedData = orderByFilterPosition(params, formattedData);

  var svg = d3
    .select("#chart")
    .append("div")
    .attr(
      "style",

      `
      position: absolute;
      margin-top: 50px;
      overflow-y: scroll;
      overflow-x: hidden;
      width: 98%; 
      height: ${height + margin.top + margin.bottom - 40}px`
    )
    .append("table")
    .attr("id", "box")
    .attr(
      "style",

      `
      margin-top: 20px;
      width: 98%;
      margin-left:10px;  
      margin-right:10px;   
      font-family: ${params.config.table_font_family};
      font-weight: ${params.config.table_font_weight};
      font-size: ${params.config.table_font_size}px;
      color: ${params.config.table_font_color};
      `
    );

  var max = d3.max(formattedData, function (d) {
    return d.measure;
  });

  var dimension = Array();
  var count = 0;

  svg
    .selectAll("table")
    .attr("id", "table_horizontal")
    .data(formattedData)
    .enter()
    .append("tr")
    .attr("data-value", function (d) {
      return d.dimension;
    })
    .attr("class", "filtered-table-value")
    .on("click", function (e, d) {
      let dimension_filtered = d.dimension;
      let event = e;
      let log = "";

      if (params.config.merge_selected_filters == "yes" && e.ctrlKey == true) {
        try {
          dimension_filtered = traitFilter(
            params.details.crossfilters[0].values,
            d.dimension
          );
        } catch (error) {}

        try {
          dimension_filtered = JSON.parse(dimension_filtered)
            .split(" | ")
            .sort()
            .join(" | ");

          log = dimension_filtered;
        } catch (error) {
          log = error;
        }

        event = {
          ctrlKey: false,
          metaKey: false,
        };
      }

      dimension[queryResponse.fields.dimensions[0].name] = {
        field: queryResponse.fields.dimensions[0].name,
        value: JSON.stringify(dimension_filtered),
      };

      payload = {
        event: event,
        row: dimension,
      };

      console.log("Dados ordenados", log);

      LookerCharts.Utils.toggleCrossfilter(payload);

      setData(d3, "or", dimension_filtered, "data-or", store);
      setData(d3, "and", dimension_filtered, "data-and", store);

      return false;
    })
    .html(function (d, e) {
      let table = html_table(d, params, count, max);
      count++;
      return table;
    });

  return svg;
}

function setData(d3, type, value, dataType, store) {
  try {
    value = value.replace(/\\"/gm, "").replace(/\"/gm, "");
    if (type == "or") {
      value = value.replace(" | ", ",");
      value = value.replace(/\[/gm, "").replace(/\]/gm, "");
    }
  } catch (error) {
    console.log("setData", error);
  }

  d3.select("#toggle_filter").attr(dataType, value);

  try {
    store.set(dataType, {
      name: value,
    });
  } catch (error) {
    console.log("setData", error);
  }

  return value;
}

function traitFilter(old_filter, current_filter) {
  let new_filter = "";
  old_filter = old_filter.reverse();
  new_filter = old_filter[old_filter.length - 1] + " | " + current_filter;
  new_filter = JSON.stringify(new_filter.replace(/"/gm, ""));
  return new_filter;
}
