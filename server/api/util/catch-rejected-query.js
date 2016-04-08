'use strict';

const generateErrors = require('../errors/generate-errors');

// Our generic `.catch()` for failed promises from pg-query
function catchRejectedQuery(res, e) {
  if (e.message === 'No data returned from the query.') {
    res.status(404).send({
      errors: [generateErrors.notFoundError()]
    });
  } else {
    res.status(500).send({
      errors: [generateErrors.genericError()]
    });
  }
}

module.exports = catchRejectedQuery;
