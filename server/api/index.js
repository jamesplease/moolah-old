'use strict';

const express = require('express');

const migrate = require('./util/migrate');
const transactions = require('./resources/transactions');

migrate.up();

const router = express.Router();

router.use('/transactions', transactions);

module.exports = router;
