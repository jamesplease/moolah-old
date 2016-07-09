'use strict';

const log = require('./log');

exports.serverStart = (port) => {
  log.info({port}, 'Node app running');
};
