Object.defineProperty(exports, "__esModule", { value: true });
exports.TABLE_CONFIGS = void 0;
var __1 = require("../..");
var HEADINGS = ["Name", "Year", "scores "];
var DATA = [
  ["Dave", "10", "90"],
  ["Sophie", "9", "85"],
  ["Ronaldo", "12", "45"],
];
var TITLE = "Student Details";
exports.TABLE_CONFIGS = [
  {
    data: DATA,
  },
  {
    data: DATA,
    headings: HEADINGS,
  },
  {
    data: DATA,
    headings: HEADINGS,
    title: TITLE,
  },
  {
    data: DATA,
    title: TITLE,
    cardBorderColor: __1.Colors.green,
  },
  {
    data: DATA,
    headings: HEADINGS,
    title: TITLE,
  },
  {
    data: DATA,
    headings: HEADINGS,
    title: TITLE,
    hasShadedLines: false,
    isTitleCenter: false,
    isHeadingsCenter: false,
    isDataCenter: false,
    height: "400px",
    width: "400px",
    headingColor: __1.Colors.green,
  },
  {
    data: DATA,
    headings: HEADINGS,
    title: TITLE,
    hasShadedLines: false,
    isTitleCenter: false,
    isHeadingsCenter: false,
    isDataCenter: false,
    height: "400px",
    width: "400px",
  },
  {
    data: DATA,
    headings: HEADINGS,
    title: TITLE,
    hasShadedLines: true,
    isTitleCenter: true,
    isHeadingsCenter: false,
    isDataCenter: false,
    cardBorderColor: __1.Colors.grey,
  },
  {
    data: DATA,
    headings: HEADINGS,
    title: TITLE,
    hasShadedLines: true,
    isTitleCenter: true,
    headingColor: __1.Colors.indigo,
    hasCardShadow: true,
  },
  {
    data: DATA,
    headings: HEADINGS,
    title: TITLE,
    hasShadedLines: true,
    isTitleCenter: true,
    isHeadingsCenter: true,
    isDataCenter: true,
    cardBorderColor: __1.Colors.blue,
    hasCardShadow: true,
  },
  {
    data: DATA,
    headings: HEADINGS,
    title: TITLE,
    hasShadedLines: true,
    isTitleCenter: true,
    isHeadingsCenter: true,
    isDataCenter: true,
    tableBorderColor: __1.Colors.blue,
  },
  {
    data: DATA,
    headings: HEADINGS,
    title: TITLE,
    hasShadedLines: true,
    isTitleCenter: true,
    isHeadingsCenter: true,
    isDataCenter: true,
    hasTableShadow: true,
  },
];
