'use strict';

const log = require('./log');

exports.logoutError = (req, res) => {
  log.error({
    req, res,
    reqId: req.id
  }, 'Logout error: session save failed');
};

exports.loginError = (req, res) => {
  log.error({
    req, res,
    reqId: req.id
  }, 'Login error: session save failed');
};
