const express = require('express');

const errors = require('./errors');
const dbConnect = require('./db-connect');

const router = express.Router();

// Our test resource
const tests = require('./tests');
router.use('/tests', tests);

module.exports = router;
