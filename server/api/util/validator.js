const validator = require('is-my-json-valid');
const requestErrorMap = require('./bad-request-map');

// This determines if a user's HTTP request to a particular endpoint is valid.
// It works by passing a `schema` from a Model's `validations` through
// `is-my-json-valid`.
module.exports = function(schema) {
  return function(req, res, next) {
    const validate = validator(schema, {greedy: true});
    if (validate(req)) {
      next();
    } else {
      res.status(400).send({
        errors: requestErrorMap(validate.errors)
      });
    }
  };
};
