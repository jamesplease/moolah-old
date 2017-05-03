/* eslint import/prefer-default-export: 'off' */

// If `str` is longer than `length`, then you'll get a version of the string
// that is truncated with ellipses. Useful for displaying user-entered data
// within sentences.
export function truncateAt(str, length) {
  if (str.length <= length) {
    return str;
  } else {
    return `${str.slice(0, length)}…`;
  }
}
