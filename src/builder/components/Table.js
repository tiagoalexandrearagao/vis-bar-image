Object.defineProperty(exports, "__esModule", { value: true });
exports.getTable = void 0;
var Common_1 = require("./Common");
var getTable = function (table) {
  var tableHtml = [];
  var CONFIG = getConfiguration(table);
  tableHtml.push(
    "\n      <div \n        class ='tableCard "
      .concat(CONFIG.shadowClassCard, "'\n        style='")
      .concat((0, Common_1.getCommonProps)(table), "\n               ")
      .concat(CONFIG.cardBorder, ";\n               ")
      .concat(table.cardStyles || "", ";' \n      >\n    ")
  );
  if (table.title) {
    tableHtml.push(
      "\n        <div class='tableTitle' style=' "
        .concat(CONFIG.titleCenter, "; '> \n          ")
        .concat(table.title, "\n        </div>\n      ")
    );
  }
  tableHtml.push(
    "<table class='table "
      .concat(CONFIG.shadowClassTable, "' style='")
      .concat(CONFIG.tableBorder, "; ")
      .concat(table.tableStyles || "", ";'>")
  );
  // headings
  if (table.headings) {
    tableHtml.push(
      "\n      <thead class='tableHead'\n        style=' "
        .concat(CONFIG.headBackground, "; \n                ")
        .concat(table.headStyles || "", "; \n        '>\n    ")
    );
    for (var i = 0; i < table.headings.length; i++) {
      tableHtml.push(
        "<th class='tableHeadings' style='"
          .concat(CONFIG.headCenter, "; '> \n                   ")
          .concat(table.headings[i], "\n         </th>")
      );
    }
    tableHtml.push("</thead>");
  }
  // rows
  tableHtml.push("<tbody>");
  for (var i = 0; i < table.data.length; i++) {
    if (i % 2 == 0 && table.hasShadedLines) {
      tableHtml.push(
        "<tr class ='tableRowEven' style='".concat(
          table.rowEvenStyles || "",
          ";'>"
        )
      );
    } else {
      tableHtml.push(
        "<tr class ='tableRowOdd' style='".concat(
          table.rowOddStyles || "",
          ";'>"
        )
      );
    }
    // columns
    for (var j = 0; j < table.data[i].length; j++) {
      tableHtml.push(
        "<td class='tableCell' style= '"
          .concat(
            table.cellStyles || "",
            ";\n                                                    text-align: "
          )
          .concat(
            CONFIG.dataCenter,
            ";  \n                        '>\n                         "
          )
          .concat(table.data[i][j], "\n                        </td>")
      );
    }
    tableHtml.push("</tr>");
  }
  tableHtml.push("</tbody>");
  tableHtml.push("</table>");
  tableHtml.push("</div>");
  return tableHtml.join("");
};
exports.getTable = getTable;
var getConfiguration = function (table) {
  var SHADOW_CLASS_CARD = table.hasCardShadow ? "shadow" : "";
  var SHADOW_CLASS_TABLE = table.hasTableShadow ? "shadow" : "";
  var CARD_BORDER =
    table.cardBorderColor != null
      ? " border: 1px solid  ".concat(
          (0, Common_1.getThemeShades)(table.cardBorderColor).l3
        )
      : "";
  var TABLE_BORDER =
    table.tableBorderColor != null
      ? " border: 1px solid  ".concat(
          (0, Common_1.getThemeShades)(table.tableBorderColor).l3
        )
      : "";
  var TITLE_CENTER = table.isTitleCenter
    ? "text-align: center"
    : "text-align: left";
  var HEAD_CENTER = table.isHeadingsCenter
    ? "text-align: center"
    : "text-align: left";
  var DATA_CENTER = table.isDataCenter ? "center" : "left";
  var HEAD_BACKGROUND =
    table.headingColor != null
      ? "background-color: ".concat(
          (0, Common_1.getThemeShades)(table.headingColor).l3
        )
      : "background-color: #000";
  var CONFIG = {
    shadowClassCard: SHADOW_CLASS_CARD,
    shadowClassTable: SHADOW_CLASS_TABLE,
    cardBorder: CARD_BORDER,
    tableBorder: TABLE_BORDER,
    titleCenter: TITLE_CENTER,
    headCenter: HEAD_CENTER,
    dataCenter: DATA_CENTER,
    headBackground: HEAD_BACKGROUND,
  };
  return CONFIG;
};
