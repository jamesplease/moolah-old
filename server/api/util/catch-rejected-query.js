'use strict';

const generateErrors = require('../errors/generate-errors');

const errors = require('pg-promise').errors;

const QueryResultError = errors.QueryResultError;
const qrec = errors.queryResultErrorCode;

// Our generic `.catch()` for failed promises from pg-query
function catchRejectedQuery(res, e) {
  // The only error that gets special treatment is `0`, which is when we expect
  // data but get nothing back. This means that the resource wasn't found.
  // These codes are defined here:
  // https://github.com/vitaly-t/pg-promise/blob/402283eef41e8788f56f59511d3cb1053decbfee/lib/errors.js#L5-L28
  if (e instanceof QueryResultError && e.code === qrec.noData) {
    res.status(404).send({
      errors: [generateErrors.notFoundError()]
    });
  }
  // The two other error codes are for when we expect nothing, and get
  // something, or when we wanted a single row and instead were returned
  // multiple. These are indicative of app-level errors, so we return a generic
  // 500 response.
  else {
    res.status(500).send({
      errors: [generateErrors.genericError()]
    });
  }
}

module.exports = catchRejectedQuery;
