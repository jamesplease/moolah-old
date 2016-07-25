// Returns `true` is `str` contains only a number.
export default function stringIsNumeric(str) {
  return !isNaN(parseFloat(str)) && isFinite(str);
}
