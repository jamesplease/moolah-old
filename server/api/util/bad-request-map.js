'use strict';

const _ = require('lodash');
const Kapow = require('kapow');

// All of these errors are "Bad Request" errors
const code = 400;

// These are the attrs we want from the Kapow Objects
const kapowAttrs = ['message', 'title', 'httpStatus'];

function createTitle(originalError) {
  originalError = originalError ? originalError : {};
  return `"${originalError.field.slice(5)}" ${originalError.message}`;
}

// Maps an error from `is-my-json-valid` to a message for `Kapow`
function mapErrors(originalErrors) {
  return originalErrors.map(e => createTitle(e));
}

function createErrors(originalErrors) {
  if (!originalErrors) { return []; }
  var mappedErrors = mapErrors(originalErrors);
  return mappedErrors.map(message => {
    var kapowError = _.pick(Kapow(code, message), kapowAttrs);
    return {
      title: kapowError.title,
      detail: kapowError.message
    };
  });
}

module.exports = createErrors;
