const express = require('express');

const migrate = require('./util/migrate');
const dbConnect = require('./db-connect');

migrate.up();

const router = express.Router();

// Our test resource
const tests = require('./pods/tests');
router.use('/tests', tests);

module.exports = router;
