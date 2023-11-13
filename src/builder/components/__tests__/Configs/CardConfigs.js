Object.defineProperty(exports, "__esModule", { value: true });
exports.CARD_CONFIGS = void 0;
var __1 = require("../..");
var HEAD = "Heading";
var Content = "This is the contents of the card...";
exports.CARD_CONFIGS = [
  {
    content: Content,
    heading: HEAD,
  },
  {
    content: Content,
    heading: HEAD,
    hasHeadingShadow: true,
  },
  {
    content: Content,
    heading: HEAD,
    hasHeadingShadow: true,
    isContentCenter: true,
    isHeadingCenter: true,
    headBackgroundColor: __1.Colors.green,
  },
  {
    content: Content,
    heading: HEAD,
    hasHeadingShadow: true,
    isContentCenter: true,
    isHeadingCenter: true,
    hasShadow: true,
  },
  {
    content: Content,
    heading: HEAD,
    isContentCenter: true,
    isHeadingCenter: true,
    borderColor: __1.Colors.blue,
    headBackgroundColor: __1.Colors.pink,
  },
];
