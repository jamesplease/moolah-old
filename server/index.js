'use strict';

const throng = require('throng');

const app = require('./app');

const WORKERS = process.env.WEB_CONCURRENCY || 1;

throng({
  workers: WORKERS,
  lifetime: Infinity,
  start: app
});
