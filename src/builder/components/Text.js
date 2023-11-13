Object.defineProperty(exports, "__esModule", { value: true });
exports.getText = exports.TextType = void 0;
var Common_1 = require("./Common");
var TextType;
(function (TextType) {
  TextType[(TextType["h1"] = 0)] = "h1";
  TextType[(TextType["h2"] = 1)] = "h2";
  TextType[(TextType["h3"] = 2)] = "h3";
  TextType[(TextType["small"] = 3)] = "small";
  TextType[(TextType["footerText"] = 4)] = "footerText";
  TextType[(TextType["sub"] = 5)] = "sub";
})((TextType = exports.TextType || (exports.TextType = {})));
var FontSize;
(function (FontSize) {
  FontSize["h1"] = "40px";
  FontSize["h2"] = "30px";
  FontSize["h3"] = "20px";
  FontSize["small"] = "15px";
})(FontSize || (FontSize = {}));
var getText = function (text) {
  var CONFIG = getConfiguration(text);
  if (text.type === TextType.sub) {
    return "<sub class='subText' style= '"
      .concat(CONFIG.color, "'>\n                ")
      .concat(text.text, "\n                ")
      .concat(text.styles || "", ";\n              </sub>");
  }
  return "<div class='text' \n                style= '"
    .concat(CONFIG.fontSize, ";\n                        ")
    .concat(CONFIG.color, ";\n                        ")
    .concat(text.styles || "", ";\n            '>\n                ")
    .concat(text.text, "\n            </div>");
};
exports.getText = getText;
var getConfiguration = function (text) {
  var color =
    text.color != null
      ? "color: ".concat((0, Common_1.getThemeShades)(text.color).l3)
      : "color: #000";
  var fontSize = "";
  switch (text.type) {
    case TextType.h1:
      fontSize = "font-size: ".concat(FontSize.h1);
      break;
    case TextType.h2:
      fontSize = "font-size: ".concat(FontSize.h2);
      break;
    case TextType.h3:
      fontSize = "font-size: ".concat(FontSize.h3);
      break;
    case TextType.small:
      fontSize = "font-size: ".concat(FontSize.small);
      break;
  }
  var CONFIG = {
    fontSize: fontSize,
    color: color,
  };
  return CONFIG;
};
