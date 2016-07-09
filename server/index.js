'use strict';

const throng = require('throng');
const app = require('./app');
const fatalLogs = require('./logging/fatal-logs');
const warnLogs = require('./logging/warn-logs');

const WORKERS = process.env.WEB_CONCURRENCY || 1;

throng({
  workers: WORKERS,
  lifetime: Infinity,
  start: app
});

process.on('uncaughtException', (err) => {
  fatalLogs.uncaughtException(err);
  process.exit(1);
});

process.on('unhandledRejection', warnLogs.unhandledRejection);
