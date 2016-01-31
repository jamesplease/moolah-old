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

// Create a new `test` resource
router.post('/', (req, res) => {
  const id = req.body.id;
  const name = req.body.name;

  // Ensure that the user has submitted the required fields
  var errors = [];
  if (typeof id === 'undefined') {
    errors.push({
      title: "Missing Field",
      description: "An id attribute is required."
    });
  }
  if (typeof name === 'undefined') {
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
      client.query(`INSERT INTO ${TABLE_NAME} VALUES (${id}, '${name}')`, (err, result) => {
        done();
        if (err) {
          console.error(err);
          res.status(500).send({
            errors: [generateErrors.generateGenericError()]
          });
        } else {
          res.end();
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

// Update a `test` resource
router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  if (typeof name === 'undefined') {
    res.status(400).send({
      errors: [{
        title: "Missing Field",
        description: "An name attribute is required."
      }]
    });
  }

  dbConnect(res, (client, done) => {
    client.query(`UPDATE ${TABLE_NAME} SET name = '${name}' WHERE id = ${id}`, (err, result) => {
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
});

// Delete a `test` resource
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  dbConnect(res, (client, done) => {
    client.query(`DELETE FROM ${TABLE_NAME} WHERE id = ${id}`, (err, result) => {
      done();
      if (err) {
        console.error(err);
        res.status(500).send({
          errors: [generateErrors.generateGenericError()]
        });
      } else {
        res.end();
      }
    });
  });
});

module.exports = router;
