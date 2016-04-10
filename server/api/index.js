'use strict';

const express = require('express');
const cors = require('cors');

const migrate = require('./util/migrate');
const transactions = require('./resources/transactions');

migrate.up();

const router = express.Router();

router.all('*', cors());
router.use('/transactions', transactions);

module.exports = router;
