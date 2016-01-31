const express = require('express');

const generateErrors = require('../generate-errors');
const dbConnect = require('../db-connect');

const router = express.Router();

const TABLE_NAME = 'test_table';

// Retrieve a list of every `test` resource
router.get('/', (req, res) => {
  const query = {
    name: 'tests_get_all',
    text: `SELECT * FROM ${TABLE_NAME}`
  };

  dbConnect(res, (client, done) => {
    client.query(query, (err, result) => {
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
    errors.push(generateErrors.generateMissingAttribute('id'));
  }
  if (typeof name === 'undefined') {
    errors.push(generateErrors.generateMissingAttribute('name'));
  }

  if (errors.length) {
    res.status(400).send({
      errors
    });
  } else {
    const query = {
      name: 'tests_create_one',
      text: `INSERT INTO ${TABLE_NAME} VALUES ($1, $2)`,
      values: [id, name]
    };

    dbConnect(res, (client, done) => {
      client.query(query, (err, result) => {
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
  const query = {
    name: 'tests_get_one',
    text: `SELECT * FROM ${TABLE_NAME} WHERE id = $1`,
    values: [req.params.id]
  };

  dbConnect(res, (client, done) => {
    client.query(query, (err, result) => {
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
      errors: [generateErrors.generateMissingAttribute('name')]
    });
  } else {
    const query = {
      name: 'tests_update_one',
      text: `UPDATE ${TABLE_NAME} SET name = $1 WHERE id = $2`,
      values: [name, id]
    };

    dbConnect(res, (client, done) => {
      client.query(query, (err, result) => {
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

// Delete a `test` resource
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const query = {
    name: 'tests_delete_one',
    text: `DELETE FROM ${TABLE_NAME} WHERE id = $1`,
    values: [id]
  };

  dbConnect(res, (client, done) => {
    client.query(query, (err, result) => {
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
