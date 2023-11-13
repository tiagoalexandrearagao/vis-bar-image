Object.defineProperty(exports, "__esModule", { value: true });
exports.getChip = void 0;
var getChip = function (chip) {
  return "<div class='chip'><span class='chipText'>".concat(
    chip.text,
    "</span></div>"
  );
};
exports.getChip = getChip;
