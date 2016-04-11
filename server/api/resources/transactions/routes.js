'use strict';

const controller = require('./controller');
const validator = require('../../util/validator');
const validations = require('./validations');

exports.location = '/v1/transactions';
exports.routes = {
  post: {
    '/': [
      validator(validations.create),
      controller.create
    ]
  },

  get: {
    '/': controller.read,
    '/:id': [
      validator(validations.readOne),
      controller.read
    ]
  },

  patch: {
    '/:id': [
      validator(validations.update),
      controller.update
    ]
  },

  delete: {
    '/:id': [
      validator(validations.destroy),
      controller.delete
    ]
  }
};
