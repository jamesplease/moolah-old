const express = require('express');
const pg = require('pg');

const router = express.Router();

// SSL must be used to connect to the DB
const DB_URL = process.env.DATABASE_URL + '?ssl=true';

router.get('/db', (req, res) => {
  pg.connect(DB_URL, (err, client, done) => {
    if (err) {
      console.error(err);
      return;
    }
    client.query('SELECT * FROM test_table', (err, result) => {
      if (err) {
        console.error(err);
        res.send("Error " + err);
      } else {
        res.send(result.rows);
      }
    });
  });
})

module.exports = router;
