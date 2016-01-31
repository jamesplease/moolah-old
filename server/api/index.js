const express = require('express');
const pg = require('pg');

const errors = require('./errors');

const router = express.Router();

// SSL must be used to connect to the DB
const DB_URL = process.env.DATABASE_URL + '?ssl=true';

// Retrieve a list of every `test` resource
router.get('/tests', (req, res) => {
  pg.connect(DB_URL, (err, client, done) => {
    if (err) {
      res.send(500, {
        errors: [errors.generateGenericError()]
      });
      console.error(err);
      return;
    }
    client.query('SELECT * FROM test_table', (err, result) => {
      if (err) {
        console.error(err);
        res.send(500, {
          errors: [errors.generateGenericError()]
        });
      } else {
        res.send({
          data: result.rows
        });
      }
    });
  });
});

// Return a single `test` resource
router.get('/tests/:id', (req, res) => {
  pg.connect(DB_URL, (err, client, done) => {
    if (err) {
      res.send(500, {
        errors: [errors.generateGenericError()]
      });
      console.error(err);
      return;
    }
    client.query(`SELECT * FROM test_table WHERE id = ${req.params.id}`, (err, result) => {
      if (err) {
        console.error(err);
        res.send(500, {
          errors: [errors.generateGenericError()]
        });
      } else {
        if (!result.rows.length) {
          res.status(404).send({
            errors: [errors.generateNotFoundError()]
          });
        } else {
          res.send({
            data: result.rows[0]
          });
        }
      }
    });
  });
});

module.exports = router;
