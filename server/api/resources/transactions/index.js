'use strict';

const _ = require('lodash');
const express = require('express');
const routeBuilder = require('express-routebuilder');

const controller = require('./controller');

const router = express.Router();

const routes = {
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

module.exports = routeBuilder(router, routes);
