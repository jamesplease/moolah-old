const pg = require('pg');

const generateErrors = require('./errors/generate-errors');

// SSL must be used to connect to the DB
const DB_URL = process.env.DATABASE_URL + '?ssl=true';

// Retrieve a client connection from the pg pool. An error response
// will automatically be sent if there's an error.
module.exports = function(res, cb) {
  pg.connect(DB_URL, (err, client, done) => {
    if (err) {
      res.send(500, {
        errors: [generateErrors.genericError()]
      });
      console.error(err);
    } else {
      cb(client, done);
    }
  });
};
