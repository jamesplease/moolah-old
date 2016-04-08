'use strict';

const _ = require('lodash');
const pgp = require('pg-promise')();
const express = require('express');
const validator = require('is-my-json-valid');

const Controller = require('./controller');
const generateErrors = require('../../errors/generate-errors');
const requestErrorMap = require('../../errors/bad-request-map');
const catchRejectedQuery = require('../../util/catch-rejected-query');
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
    .catch(_.partial(catchRejectedQuery, res));
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
    controller.create(body)
      .then(result => {
        res.status(201).send({
          data: formatTransaction(result)
        });
      })
      .catch(_.partial(catchRejectedQuery, res));
  }
});

// Return a single `transaction` resource
router.get('/:id', (req, res) => {
  controller.read(req.params.id)
    .then(result => {
      res.send({
        data: formatTransaction(result)
      });
    })
    .catch(_.partial(catchRejectedQuery, res));
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

  if (!validate(body)) {
    res.status(400).send({
      errors: requestErrorMap(validate.errors)
    });
  } else {
    controller.update(id, body)
      .then(result => {
        res.send({
          data: formatTransaction(result)
        });
      })
      .catch(_.partial(catchRejectedQuery, res));
  }
});

// Delete a `transaction` resource
router.delete('/:id', (req, res) => {
  controller.delete(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(_.partial(catchRejectedQuery, res));
});

module.exports = router;
