'use strict';

const _ = require('lodash');
const pgp = require('pg-promise');

const serverErrors = require('./server-errors');

const queryErrorCode = pgp.errors.queryResultErrorCode;

const pgPromiseErrors = {
  noData: serverErrors.notFound,
  notEmpty: serverErrors.generic,
  multiple: serverErrors.generic
};

// Pass in a `codeToFind` (a code sent back from pg-promise),
// and you'll get back an `errorDefinition` from `serverErrors`.
module.exports = function(codeToFind) {
  var key = _.findKey(queryErrorCode, c => c === codeToFind);
  return pgPromiseErrors[key];
};
