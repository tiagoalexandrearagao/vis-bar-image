Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgressBar = void 0;
var Common_1 = require("./Common");
var getProgressBar = function (bar) {
  var themeShades = (0, Common_1.getThemeShades)(bar.color);
  var BAR_HEIGHT = bar.itemsHorizontal ? "4px" : "100%";
  var BAR_WIDTH = bar.itemsHorizontal ? "100%" : "4px";
  var FILL_HEIGHT = bar.itemsHorizontal
    ? "4px"
    : "".concat(bar.percentFull, "%");
  var FILL_WIDTH = bar.itemsHorizontal
    ? "".concat(bar.percentFull, "%")
    : "4px";
  return "\n              <div class='bar' style=' \n                                      background-color:"
    .concat(themeShades.l1, " ;\n                                      width: ")
    .concat(BAR_WIDTH, "; \n                                      height: ")
    .concat(
      BAR_HEIGHT,
      ";\n                                        '> \n                 <div class='barFill' style='\n                                      background-color: "
    )
    .concat(themeShades.l3, ";\n                                      width:")
    .concat(FILL_WIDTH, "; \n                                      height: ")
    .concat(
      FILL_HEIGHT,
      "; '>\n                 </div>\n              </div>\n    "
    );
};
exports.getProgressBar = getProgressBar;
