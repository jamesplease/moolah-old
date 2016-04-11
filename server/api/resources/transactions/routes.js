'use strict';

const controller = require('./controller');
const validator = require('../../util/validator');
const validations = require('./validations');

exports.location = '/transactions';
exports.routes = {
  post: {
    '/': [
      validator(validations.create),
      controller.create
    ]
  },

  get: {
    '/': controller.read,
    '/:id': controller.read
  },

  patch: {
    '/:id': [
      validator(validations.update),
      controller.update
    ]
  },

  delete: {
    '/:id': controller.delete
  }
};
