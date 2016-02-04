const _ = require('lodash');
const pgp = require('pg-promise')();
const express = require('express');
const validator = require('is-my-json-valid');

const generateErrors = require('../../errors/generate-errors');
const requestErrorMap = require('../../errors/bad-request-map');
const dbConfig = require('../../../../config/db-config');

const router = express.Router();

const TABLE_NAME = 'transaction';

// Retrieve a list of every `transaction` resource
router.get('/', (req, res) => {
  const query = {
    name: 'transactions_get_all',
    text: `SELECT * FROM ${TABLE_NAME}`
  };

  pgp(dbConfig)
    .any(query)
    .then(result => {
      res.send({
        data: result
      });
    })
    .catch(e => {
      console.error(e);
      res.status(500).send({
        errors: [generateErrors.genericError()]
      });
    });
});

// Create a new `transaction` resource
router.post('/', (req, res) => {
  const body = _.pick(req.body, [
    'description', 'value', 'date',
  ]);

  var validate = validator({
    type: 'object',
    properties: {
      value: {
        required: true
      },
      date: {
        format: 'date'
      }
    }
  }, {
    greedy: true
  });

  if (!validate(body)) {
    res.status(400).send({
      errors: requestErrorMap(validate.errors)
    });
  } else {
    const query = {
      name: 'transactions_create_one',
      text: `INSERT INTO ${TABLE_NAME} (description, value, date) VALUES ($1, $2, $3)`,
      values: [body.description, body.value, body.date]
    };

    pgp(dbConfig)
      .none(query)
      .then(result => {
        res.status(204).end();
      })
      .catch(e => {
        console.error(e);
        res.status(500).send({
          errors: [generateErrors.genericError()]
        });
      });
  }
});

// Return a single `transaction` resource
router.get('/:id', (req, res) => {
  const query = {
    name: 'transactions_get_one',
    text: `SELECT * FROM ${TABLE_NAME} WHERE id = $1`,
    values: [req.params.id]
  };

  pgp(dbConfig)
    .oneOrNone(query)
    .then(result => {
      if (!result) {
        res.status(404).send({
          errors: [generateErrors.notFoundError()]
        });
      } else {
        res.send({
          data: result
        });
      }
    })
    .catch(e => {
      console.error(e);
      res.status(500).send({
        errors: [generateErrors.genericError()]
      });
    });
});

// Update a `transaction` resource
router.patch('/:id', (req, res) => {
  const id = req.params.id;

  const body = _.pick(req.body, [
    'description', 'value', 'date',
  ]);

  var validate = validator({
    type: 'object',
    properties: {
      date: {
        format: 'date'
      }
    }
  }, {
    greedy: true
  });

  if (!validate(body)) {
    res.status(400).send({
      errors: requestErrorMap(validate.errors)
    });
  } else {
    const query = {
      name: 'transactions_update_one',
      text: `UPDATE ${TABLE_NAME} SET description = $1, value = $2, date = $3 WHERE id = $4`,
      values: [body.description, body.value, body.date, id]
    };

    pgp(dbConfig)
      .one(query)
      .then(result => {
        res.send({
          data: result
        });
      })
      .catch(e => {
        console.error(e);
        res.status(500).send({
          errors: [generateErrors.genericError()]
        });
      });
  }
});

// Delete a `transaction` resource
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const query = {
    name: 'transactions_delete_one',
    text: `DELETE FROM ${TABLE_NAME} WHERE id = $1`,
    values: [id]
  };

  pgp(dbConfig)
    .none(query)
    .then(result => {
      res.status(204).end();
    })
    .catch(e => {
      console.error(e);
      res.status(500).send({
        errors: [generateErrors.genericError()]
      });
    });
});

module.exports = router;
