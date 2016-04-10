'use strict';

const serverErrors = require('./server-errors');

// This maps pg-promise error codes to our server error responses
module.exports = {
  0: serverErrors.notFound,
  1: serverErrors.generic,
  2: serverErrors.generic
};
