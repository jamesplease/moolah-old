const validator = require('is-my-json-valid');
const requestErrorMap = require('../../../errors/bad-request-map');

module.exports = function(schema) {
  return function(req, res, next) {
    const validate = validator(schema, {greedy: true});
    if (validate(req.body)) {
      next();
    } else {
      res.status(400).send({
        errors: requestErrorMap(validate.errors)
      });
    }
  };
};
