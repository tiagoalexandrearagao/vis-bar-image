Object.defineProperty(exports, "__esModule", { value: true });
exports.FlexBox = exports.JustifyContent = void 0;
var components_1 = require("./components");
var JustifyContent;
(function (JustifyContent) {
  JustifyContent[(JustifyContent["left"] = 0)] = "left";
  JustifyContent[(JustifyContent["right"] = 1)] = "right";
  JustifyContent[(JustifyContent["center"] = 2)] = "center";
  JustifyContent[(JustifyContent["spaceBetween"] = 3)] = "spaceBetween";
  JustifyContent[(JustifyContent["spaceAround"] = 4)] = "spaceAround";
  JustifyContent[(JustifyContent["spaceEvenly"] = 5)] = "spaceEvenly";
  JustifyContent[(JustifyContent["stretch"] = 6)] = "stretch";
})((JustifyContent = exports.JustifyContent || (exports.JustifyContent = {})));
var FlexBox = /** @class */ (function () {
  function FlexBox(flexProps) {
    this.flexProps = flexProps;
    this.html = [];
    this.width = flexProps.width || "auto";
    this.height = flexProps.height || "auto";
  }
  FlexBox.prototype.getFlexProps = function () {
    var props = [];
    var BACKGROUND_COLOR =
      this.flexProps.backgroundColor != null
        ? "background-color: ".concat(
            (0, components_1.getThemeShades)(this.flexProps.backgroundColor).l1
          )
        : "";
    var justifyContent = "";
    var flexDirection =
      this.flexProps.itemsHorizontal === false ? "column" : "row";
    switch (this.flexProps.alignItems) {
      case JustifyContent.left:
        justifyContent = "flex-start;";
        break;
      case JustifyContent.right:
        justifyContent = "flex-end;";
        break;
      case JustifyContent.center:
        justifyContent = "center;";
        break;
      case JustifyContent.spaceAround:
        justifyContent = "space-around;";
        break;
      case JustifyContent.spaceBetween:
        justifyContent = "space-between;";
        break;
      case JustifyContent.spaceEvenly:
        justifyContent = "space-evenly;";
        break;
      case JustifyContent.stretch:
        justifyContent = "stretch;";
        break;
    }
    props.push("display: flex;");
    props.push("flex-wrap: wrap;");
    props.push("flex-direction: ".concat(flexDirection, ";"));
    props.push("justify-content: ".concat(justifyContent));
    props.push("width: ".concat(this.width, ";"));
    props.push("height: ".concat(this.height, ";"));
    props.push("".concat(BACKGROUND_COLOR, ";"));
    props.push(this.flexProps.styles || "");
    props.push(";");
    return props.join("");
  };
  FlexBox.prototype.add = function (component) {
    this.html.push(component);
  };
  FlexBox.prototype.addDivider = function () {
    var width = "";
    var height = "";
    if (this.flexProps.itemsHorizontal === false) {
      width = "auto";
      height = "1px";
    } else {
      width = "1px";
      height = "auto";
    }
    var DIVIDER = "<div class='divider' style='width:"
      .concat(width, ";\n                                              height:")
      .concat(
        height,
        "; \n                                              display:block;\n                                              background-color: rgba(0,0,0,.12); \n                                              margin:4px;\n                    '>\n\n    </div>"
      );
    this.html.push(DIVIDER);
  };
  FlexBox.prototype.construct = function () {
    return "<div class='flex' style= '\n              "
      .concat(this.getFlexProps(), " '>  \n              ")
      .concat(this.html.join(""), "\n              </div>")
      .replace(/\n*\t*\r*\s+/g, " ");
  };
  return FlexBox;
})();
exports.FlexBox = FlexBox;
