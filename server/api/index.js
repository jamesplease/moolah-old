const express = require('express');

const dbConnect = require('./db-connect');

const router = express.Router();

// Our test resource
const tests = require('./tests');
router.use('/tests', tests);

module.exports = router;
