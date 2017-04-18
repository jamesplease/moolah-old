'use strict';

const fortune = require('fortune');
const postgresAdapter = require('fortune-postgres');
const dbConfig = require('../config/db-config');

const resources = {
  category: {
    label: String,
    emoji: String,
    transactions: [Array('transaction'), 'category'],
    user: ['user_account']
  },
  transaction: {
    description: String,
    value: Number,
    date: String,
    category: ['category', 'transactions'],
    user: ['user_account']
  },
  user_account: {
    google_id: String
  }
};

const options = {
  adapter: [postgresAdapter, {url: dbConfig}]
};

module.exports = fortune(resources, options);
