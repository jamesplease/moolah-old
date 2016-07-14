'use strict';

const log = require('./log');

exports.logoutError = (req, res, err) => {
  log.error({
    req, res, err,
    reqId: req.id
  }, 'Logout error: session save failed');
};

exports.loginError = (req, res, err) => {
  log.error({
    req, res, err,
    reqId: req.id
  }, 'Login error: session save failed');
};
