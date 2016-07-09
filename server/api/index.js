'use strict';

const express = require('express');
const routeBuilder = require('express-routebuilder');

const migrate = require('./util/migrate');
const resources = require('./resources');

migrate.up();

const router = express.Router();

resources.forEach(resource => {
  router.use(routeBuilder(
    express.Router(),
    resource.routes,
    resource.location
  ));
});

router.get('/', (req, res) => {
  res.send({
    version: 'v1',
    endpoints: resources.map(resource => {
      return {
        route: resource.location,
        methods: Object.keys(resource.routes)
      };
    })
  });
});

module.exports = router;
