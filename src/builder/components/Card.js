Object.defineProperty(exports, "__esModule", { value: true });
exports.getCard = void 0;
var Common_1 = require("./Common");
var getCard = function (card) {
  var CONFIG = getConfiguration(card);
  var cardHtml = [];
  cardHtml.push(
    " <div class='paper card "
      .concat(CONFIG.shadowClass, "' style='\n                          ")
      .concat((0, Common_1.getCommonProps)(card), " ")
      .concat(card.cardStyles || "", "; \n                          ")
      .concat(CONFIG.cardBorder, ";\n          '>  ")
  );
  if (card.heading) {
    cardHtml.push(
      "<div class='cardHead "
        .concat(CONFIG.headShadow, "' style= ' ")
        .concat(
          CONFIG.headBackgroundColor,
          ";\n                                                    "
        )
        .concat(
          CONFIG.headColor,
          ";\n                                                    "
        )
        .concat(
          CONFIG.headCenter,
          ";\n                                                    "
        )
        .concat(
          card.headStyles || "",
          ";\n                  '>\n                  "
        )
        .concat(card.heading || "", "\n              </div>")
    );
  }
  cardHtml.push(
    "  <div class='cardContents' style= '"
      .concat(
        CONFIG.contentCenter,
        "; \n                                                      "
      )
      .concat(
        card.contentStyles || "",
        ";\n                    '>\n                    "
      )
      .concat(card.content, "\n                </div>\n              </div>  ")
  );
  return cardHtml.join("");
};
exports.getCard = getCard;
var getConfiguration = function (card) {
  var HEAD_CENTER = card.isHeadingCenter
    ? "text-align: center"
    : "text-align: left";
  var CONTENT_CENTER = card.isContentCenter
    ? "text-align: center"
    : "text-align:left";
  var SHADOW_CLASS = card.hasShadow ? "shadow" : "";
  var HEAD_SHADOW_CLASS = card.hasHeadingShadow ? "shadow" : "";
  var CARD_BORDER =
    card.borderColor != null
      ? " border: 1px solid  ".concat(
          (0, Common_1.getThemeShades)(card.borderColor).l3
        )
      : "";
  var headBackgroundColor = "";
  var headColor = "";
  if (card.headBackgroundColor == undefined) {
    headBackgroundColor = "background: rgba(0,0,0,.03)";
    headColor = "color: rgba(0,0,0,.54)";
  } else {
    headBackgroundColor = "background: ".concat(
      (0, Common_1.getThemeShades)(card.headBackgroundColor).l3
    );
    headColor = "color: #fff";
  }
  var CONFIG = {
    headCenter: HEAD_CENTER,
    cardBorder: CARD_BORDER,
    contentCenter: CONTENT_CENTER,
    shadowClass: SHADOW_CLASS,
    headBackgroundColor: headBackgroundColor,
    headColor: headColor,
    headShadow: HEAD_SHADOW_CLASS,
  };
  return CONFIG;
};
