// Takes a JS Date object, and returns it in the format
// "2016-10-05"
module.exports = function(date) {
  if (!date) { return date; }
  return date.toISOString().substring(0, 10);
};
