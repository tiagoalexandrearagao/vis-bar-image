Object.defineProperty(exports, "__esModule", { value: true });
exports.LIST_CONFIGS = void 0;
var __1 = require("../..");
var TITLE = "List Title";
var DATA = ["item 1", "items 2", "item 3"];
exports.LIST_CONFIGS = [
  {
    data: DATA,
    title: TITLE,
  },
  {
    data: DATA,
    title: TITLE,
    sideLineColor: __1.Colors.blue,
    hasShadow: false,
    backgroundColor: __1.Colors.teal,
  },
  {
    data: DATA,
    title: TITLE,
    sideLineColor: __1.Colors.blue,
    hasShadow: true,
    backgroundColor: __1.Colors.indigo,
    hasSeparatorLines: false,
  },
  {
    data: DATA,
    title: TITLE,
    sideLineColor: __1.Colors.blue,
    hasShadow: true,
    backgroundColor: __1.Colors.indigo,
    hasSeparatorLines: true,
  },
  {
    data: DATA,
    title: "",
    sideLineColor: __1.Colors.blue,
    hasShadow: true,
    backgroundColor: __1.Colors.indigo,
    hasSeparatorLines: true,
  },
];
