'use strict';

const controller = require('./controller');

exports.location = '/transactions';
exports.routes = {
  post: {
    '/': controller.create
  },

  get: {
    '/': controller.read,
    '/:id': controller.read
  },

  patch: {
    '/:id': controller.update
  },

  delete: {
    '/:id': controller.delete
  }
};
