const express = require('express');

const generateErrors = require('../generate-errors');
const dbConnect = require('../db-connect');

const router = express.Router();

const TABLE_NAME = 'test_table';

// Retrieve a list of every `test` resource
router.get('/', (req, res) => {
  dbConnect(res, (client, done) => {
    client.query(`SELECT * FROM ${TABLE_NAME}`, (err, result) => {
      done();
      if (err) {
        console.error(err);
        res.status(500).send({
          errors: [generateErrors.generateGenericError()]
        });
      } else {
        res.send({
          data: result.rows
        });
      }
    });
  });
});

// Create a new "test" resource
router.post('/', (req, res) => {
  const id = req.body.id;
  const name = req.body.name;

  // Ensure that the user has submitted the required fields
  var errors = [];
  if (!id) {
    errors.push({
      title: "Missing Field",
      description: "An id attribute is required."
    });
  }
  if (!name) {
    errors.push({
      title: "Missing Field",
      description: "A name attribute is required."
    });
  }

  if (errors.length) {
    res.status(400).send({
      errors
    });
  } else {
    dbConnect(res, (client, done) => {
      console.log('wat', id, name);
      client.query(`INSERT INTO ${TABLE_NAME} VALUES (${id}, '${name}')`, (err, result) => {
        done();
        if (err) {
          console.error(err);
          res.status(500).send({
            errors: [generateErrors.generateGenericError()]
          });
        } else {
          res.send({
            data: result.rows[0]
          });
        }
      });
    });
  }
});

// Return a single `test` resource
router.get('/:id', (req, res) => {
  dbConnect(res, (client, done) => {
    client.query(`SELECT * FROM ${TABLE_NAME} WHERE id = ${req.params.id}`, (err, result) => {
      done();
      if (err) {
        console.error(err);
        res.status(500).send({
          errors: [generateErrors.generateGenericError()]
        });
      } else {
        if (!result.rows.length) {
          res.status(404).send({
            errors: [generateErrors.generateNotFoundError()]
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
