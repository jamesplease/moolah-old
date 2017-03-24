'use strict';

const fs = require('fs');
const path = require('path');

const wipeDbPath = path.join(__dirname, 'wipe-db.sql');
const wipeDb = fs.readFileSync(wipeDbPath, 'utf-8');

// Wipes the database.
// Returns a Promise that resolves if the wipe succeeds, and rejects if it
// fails.
module.exports = function(db) {
  return db.query(wipeDb);
};
