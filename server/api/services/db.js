'use strict';

const pgp = require('pg-promise')();
const dbConfig = require('../../../config/db-config');

const db = pgp(dbConfig);

module.exports = db;
