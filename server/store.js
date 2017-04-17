'use strict';

const fortune = require('fortune');

module.exports = fortune({
  category: {
    label: String,
    emoji: String,
    transactions: [Array('transaction'), 'category']
  },
  transaction: {
    description: String,
    value: Number,
    date: String,
    category: ['category', 'transactions']
  }
});
