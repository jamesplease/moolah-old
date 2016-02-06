'use strict';

const _ = require('lodash');
const pgp = require('pg-promise')();
const express = require('express');
const validator = require('is-my-json-valid');

const Controller = require('./controller');
const generateErrors = require('../../errors/generate-errors');
const requestErrorMap = require('../../errors/bad-request-map');
const updateBuilder = require('../../util/update-builder');
const dbConfig = require('../../../../config/db-config');

const TABLE_NAME = 'transaction';

const db = pgp(dbConfig);
const router = express.Router();
const controller = new Controller({
  store: db,
  table: TABLE_NAME
});

// Takes a JS Date object, and returns it in the format
// "2016-10-05"
function formatDate(d) {
  if (!d) { return d; }
  return d.toISOString().substring(0, 10);
}

// This transforms the data from the format that it is in the
// database to the one we need for our endpoint
function formatTransaction(t) {
  return _.chain(t)
    .pick(['id', 'description', 'value', 'date'])
    .transform((result, val, key) => {
      if (key === 'date') {
        result[key] = formatDate(val);
      } else {
        result[key] = val;
      }
    }, {})
    .value();
}

// Retrieve a list of every `transaction` resource
router.get('/', (req, res) => {
  controller.read()
    .then(result => {
      res.send({
        data: _.map(result, r => formatTransaction(r))
      });
    })
    .catch(e => {
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
      text: `INSERT INTO ${TABLE_NAME} (description, value, date) VALUES ($1, $2, $3) RETURNING *`,
      values: [body.description, body.value, body.date]
    };

    db.one(query)
      .then(result => {
        res.status(201).send({
          data: formatTransaction(result)
        });
      })
      .catch(e => {
        res.status(500).send({
          errors: [generateErrors.genericError()]
        });
      });
  }
});

// Return a single `transaction` resource
router.get('/:id', (req, res) => {
  controller.read(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).send({
          errors: [generateErrors.notFoundError()]
        });
      } else {
        res.send({
          data: formatTransaction(result)
        });
      }
    })
    .catch(e => {
      res.status(500).send({
        errors: [generateErrors.genericError()]
      });
    });
});

// Update a `transaction` resource
router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const validValues = ['description', 'value', 'date'];

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

  // If there is no body, then we can just retrieve the
  // current resource, as no update will be made. This is
  // copy + pasted from the GET middleware for this endpoint...
  // so we absolutely need to abstract it to DRY things up.
  if (!_.size(body)) {
    controller.read(id)
      .then(result => {
        if (!result) {
          res.status(404).send({
            errors: [generateErrors.notFoundError()]
          });
        } else {
          res.send({
            data: formatTransaction(result)
          });
        }
      })
      .catch(e => {
        res.status(500).send({
          errors: [generateErrors.genericError()]
        });
      });
  } else if (!validate(body)) {
    res.status(400).send({
      errors: requestErrorMap(validate.errors)
    });
  } else {
    const query = updateBuilder({
      tableName: TABLE_NAME,
      validValues: validValues,
      values: body,
      id: id
    });

    db.one(query[0], query[1])
      .then(result => {
        res.status(200).send({
          data: formatTransaction(result)
        });
      })
      .catch(e => {
        if (e.message === 'No data returned from the query.') {
          return res.status(404).send({
            errors: [generateErrors.notFoundError()]
          });
        } else {
          res.status(500).send({
            errors: [generateErrors.genericError()]
          });
        }
      });
  }
});

// Delete a `transaction` resource
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const query = {
    name: 'transactions_delete_one',
    text: `DELETE FROM ${TABLE_NAME} WHERE id = $1 RETURNING *`,
    values: [id]
  };

  db.one(query)
    .then(result => {
      res.status(204).end();
    })
    .catch(e => {
      if (e.message === 'No data returned from the query.') {
        return res.status(404).send({
          errors: [generateErrors.notFoundError()]
        });
      } else {
        res.status(500).send({
          errors: [generateErrors.genericError()]
        });
      }
    });
});

module.exports = router;
