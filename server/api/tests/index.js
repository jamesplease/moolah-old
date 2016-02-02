const express = require('express');
const validator = require('is-my-json-valid');

const generateErrors = require('../errors/generate-errors');
const requestErrorMap = require('../errors/bad-request-map');
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
          errors: [generateErrors.genericError()]
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

  var validate = validator({
    type: 'object',
    properties: {
      id: {
        required: true,
        type: 'number'
      },
      name: {
        required: true,
        type: 'string'
      }
    }
  }, {
    greedy: true
  });

  if (!validate(req.body)) {
    res.status(400).send({
      errors: requestErrorMap(validate.errors)
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
            errors: [generateErrors.genericError()]
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
          errors: [generateErrors.genericError()]
        });
      } else {
        if (!result.rows.length) {
          res.status(404).send({
            errors: [generateErrors.notFoundError()]
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

  var validate = validator({
    type: 'object',
    properties: {
      name: {
        required: true,
        type: 'string'
      }
    }
  }, {
    greedy: true
  });

  if (!validate(req.body)) {
    res.status(400).send({
      errors: requestErrorMap(validate.errors)
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
            errors: [generateErrors.genericError()]
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
          errors: [generateErrors.genericError()]
        });
      } else {
        res.end();
      }
    });
  });
});

module.exports = router;
