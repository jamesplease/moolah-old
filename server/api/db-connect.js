const pg = require('pg');

const generateErrors = require('./errors/generate-errors');
const dbConfig = require('./util/db-config');

// Retrieve a client connection from the pg pool. An error response
// will automatically be sent if there's an error.
module.exports = function(res, cb) {
  pg.connect(dbConfig(), (err, client, done) => {
    if (err) {
      if (res) {
        res.status(500).send({
          errors: [generateErrors.genericError()]
        });
      }
      console.error(err);
    } else {
      cb(client, done);
    }
  });
};
