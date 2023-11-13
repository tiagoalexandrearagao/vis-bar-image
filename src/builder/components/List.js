Object.defineProperty(exports, "__esModule", { value: true });
exports.getList = void 0;
var Common_1 = require("./Common");
var getList = function (list) {
  var listHtml = [];
  var CONFIG = getConfiguration(list);
  listHtml.push(
    " <div class='listCard "
      .concat(
        CONFIG.ShadowClass,
        "' \n                        style='\n                                "
      )
      .concat(
        (0, Common_1.getCommonProps)(list),
        ";\n                                "
      )
      .concat(CONFIG.ListBackgroundColor, ";\n                                ")
      .concat(CONFIG.SideLine, ";\n                                ")
      .concat(
        list.cardStyles,
        ";\n                                '\n                    > "
      )
  );
  listHtml.push(
    "<div class = 'listTitle' \n                        style=' "
      .concat(list.listTitleStyles || "", ";\n                                ")
      .concat(
        list.listTitleStyles,
        ";' \n                        >\n                     "
      )
      .concat(list.title, "\n                    </div> ")
  );
  for (var i = 0; i < list.data.length; i++) {
    listHtml.push(
      "<div class='listItems'\n                          style=' "
        .concat(CONFIG.SeperatorLine, ";\n                                  ")
        .concat(
          list.listItemStyles,
          ";\n                                '\n                      >\n                     "
        )
        .concat(list.data[i], "\n                    </div>")
    );
  }
  listHtml.push("</div>");
  return listHtml.join("");
};
exports.getList = getList;
var getConfiguration = function (list) {
  var LIST_BACKGROUND_COLOR =
    list.backgroundColor != null
      ? "background-color: ".concat(
          (0, Common_1.getThemeShades)(list.backgroundColor).l1
        )
      : "background-color: #fff";
  var SIDE_LINE =
    list.sideLineColor != null
      ? "border-left: 2px solid ".concat(
          (0, Common_1.getThemeShades)(list.sideLineColor).l3
        )
      : "";
  var SHADOW_CLASS = list.hasShadow ? "shadow" : "";
  var SEPERATOR_LINE = "";
  if (list.hasSeparatorLines) {
    SEPERATOR_LINE =
      list.backgroundColor != null
        ? " border-bottom: 1px solid ".concat(
            (0, Common_1.getThemeShades)(list.backgroundColor).l2
          )
        : "";
  }
  var CONFIG = {
    ListBackgroundColor: LIST_BACKGROUND_COLOR,
    SeperatorLine: SEPERATOR_LINE,
    ShadowClass: SHADOW_CLASS,
    SideLine: SIDE_LINE,
  };
  return CONFIG;
};
