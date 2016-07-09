'use strict';

const log = require('./log');

exports.uncaughtException = (err) => {
  log.fatal({err}, 'Uncaught exception');
};
