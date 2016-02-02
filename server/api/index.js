const express = require('express');

const migrate = require('./util/migrate');
const dbConnect = require('./db-connect');
const transactions = require('./pods/transactions');

migrate.up();

const router = express.Router();

router.use('/transactions', transactions);

module.exports = router;
