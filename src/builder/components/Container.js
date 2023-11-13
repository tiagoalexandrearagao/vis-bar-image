Object.defineProperty(exports, "__esModule", { value: true });
exports.getContainer = exports.Position = void 0;
var Common_1 = require("./Common");
var Position;
(function (Position) {
  Position[(Position["topCenter"] = 0)] = "topCenter";
  Position[(Position["bottomCenter"] = 1)] = "bottomCenter";
  Position[(Position["center"] = 2)] = "center";
  Position[(Position["rightTop"] = 3)] = "rightTop";
  Position[(Position["rightCenter"] = 4)] = "rightCenter";
  Position[(Position["rightBottom"] = 5)] = "rightBottom";
  Position[(Position["leftTop"] = 6)] = "leftTop";
  Position[(Position["leftCenter"] = 7)] = "leftCenter";
  Position[(Position["leftBottom"] = 8)] = "leftBottom";
})((Position = exports.Position || (exports.Position = {})));
var getContainer = function (container) {
  var fAlignProps = "";
  var dAlignProps = "";
  var BACKGROUND_COLOR = container.backgroundColor
    ? (0, Common_1.getThemeShades)(container.backgroundColor).l1
    : "#fff";
  switch (container.alignItems) {
    case Position.leftTop:
      fAlignProps = "justify-content:flex-start;";
      dAlignProps = "margin-bottom: auto;";
      break;
    case Position.leftCenter:
      fAlignProps = "justify-content:flex-start;";
      dAlignProps += "margin-bottom: auto;";
      dAlignProps += "margin-top: auto;";
      break;
    case Position.leftBottom:
      fAlignProps = "justify-content:flex-start;";
      dAlignProps = "margin-top: auto;";
      break;
    case Position.rightTop:
      fAlignProps = "justify-content:flex-end;";
      dAlignProps = "margin-bottom: auto;";
      break;
    case Position.rightCenter:
      fAlignProps = "justify-content:flex-end;";
      dAlignProps += "margin-bottom: auto;";
      dAlignProps += "margin-top: auto;";
      break;
    case Position.rightBottom:
      fAlignProps = "justify-content:flex-end;";
      dAlignProps = "margin-top: auto;";
      break;
    case Position.topCenter:
      fAlignProps = "justify-content:center;";
      dAlignProps += "margin-bottom: auto;";
      break;
    case Position.bottomCenter:
      fAlignProps = "justify-content:center;";
      dAlignProps += "margin-top: auto;";
      break;
    case Position.center:
      fAlignProps = "justify-content:center;";
      dAlignProps += "margin-bottom: auto;";
      dAlignProps += "margin-top: auto;";
      break;
  }
  return "\n           <div class='container' style='\n                                  "
    .concat(
      fAlignProps,
      "\n                                  background-color: "
    )
    .concat(BACKGROUND_COLOR, ";\n                                  width: ")
    .concat(
      container.width || "auto",
      ";\n                                  height: "
    )
    .concat(container.height || "auto", ";\n                                  ")
    .concat(
      container.styles || "",
      ";\n            '> \n              <div style='"
    )
    .concat(dAlignProps, "'> ")
    .concat(container.contents, "</div>\n          </div>  \n    ");
};
exports.getContainer = getContainer;
