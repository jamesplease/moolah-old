'use strict';

// const throng = require('throng');

const app = require('./app');
app();

// const WORKERS = process.env.WEB_CONCURRENCY || 1;
//
// throng(app, {
//   workers: WORKERS,
//   lifetime: Infinity
// });
