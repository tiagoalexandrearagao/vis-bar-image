Object.defineProperty(exports, "__esModule", { value: true });
var Components = require("..");
var Configs_1 = require("./Configs");
var ListConfigs_1 = require("./Configs/ListConfigs");
describe("Test Table", function () {
  Configs_1.TABLE_CONFIGS.forEach(function (config, index) {
    it("Table Config ".concat(index), function () {
      var TABLE = Components.getTable(config);
      expect(TABLE.replace(/\n*\t*\r*\s+/g, " ")).toMatchSnapshot();
    });
  });
});
describe("Test Card", function () {
  Configs_1.CARD_CONFIGS.forEach(function (config, index) {
    it("Card Config ".concat(index), function () {
      var CARD = Components.getCard(config);
      expect(CARD.replace(/\n*\t*\r*\s+/g, " ")).toMatchSnapshot();
    });
  });
});
describe("Test Container", function () {
  Configs_1.CONATINER_CONFIGS.forEach(function (config, index) {
    it("Card Config ".concat(index), function () {
      var CONTAINER = Components.getContainer(config);
      expect(CONTAINER.replace(/\n*\t*\r*\s+/g, " ")).toMatchSnapshot();
    });
  });
});
describe("Test Chip", function () {
  Configs_1.CHIP_CONFIGS.forEach(function (config, index) {
    it("Card Config ".concat(index), function () {
      var CHIP = Components.getChip(config);
      expect(CHIP.replace(/\n*\t*\r*\s+/g, " ")).toMatchSnapshot();
    });
  });
});
describe("Test List", function () {
  ListConfigs_1.LIST_CONFIGS.forEach(function (config, index) {
    it("List Config ".concat(index), function () {
      var LIST = Components.getList(config);
      expect(LIST.replace(/\n*\t*\r*\s+/g, " ")).toMatchSnapshot();
    });
  });
});
describe("Test Progress Bar", function () {
  Configs_1.PROGRESSBAR_CONFIGS.forEach(function (config, index) {
    it("Progress Bar Config ".concat(index), function () {
      var BAR = Components.getProgressBar(config);
      expect(BAR.replace(/\n*\t*\r*\s+/g, " ")).toMatchSnapshot();
    });
  });
});
describe("Test Text", function () {
  Configs_1.TEXT_CONFIGS.forEach(function (config, index) {
    it("Text Config ".concat(index), function () {
      var TEXT = Components.getText(config);
      expect(TEXT.replace(/\n*\t*\r*\s+/g, " ")).toMatchSnapshot();
    });
  });
});
