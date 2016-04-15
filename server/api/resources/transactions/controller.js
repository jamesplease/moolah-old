'use strict';

const _ = require('lodash');
const pgp = require('pg-promise');

const db = require('../../services/db');
const dateToDayString = require('../../util/date-to-day-string');
const baseSql = require('../../util/base-sql');
const serverErrors = require('../../util/server-errors');
const mapPgError = require('../../util/map-pg-error');

const TABLE_NAME = 'transaction';

// The options that can be passed into a Controller
const validOptions = ['table', 'store'];

// This transforms the data from the format that it is in the
// database to the one we need for our endpoint
function formatTransaction(t) {
  return _.chain(t)
    .pick(['id', 'description', 'value', 'date'])
    .transform((result, val, key) => {
      if (key === 'date') {
        result[key] = dateToDayString(val);
      } else {
        result[key] = val;
      }
    }, {})
    .value();
}

// This is the function called when a query fails.
function handleQueryError(res, e) {
  var serverError;

  // First, check to see if it's a pgp QueryResultError. If it
  // is, we generate the appropriate server error.
  if (e instanceof pgp.errors.QueryResultError) {
    serverError = mapPgError(e.code);
  }

  // If it's not a pgp QueryResultError, we send over tbe generic server error.
  else {
    serverError = serverErrors.generic;
  }

  res.status(serverError.code).send({
    errors: [serverError.body()]
  });
}

// A controller represents an interface to the data
// stored in our database. Eventually, this might be
// turned into a separate library, rather than part of this
// app specifically
function Controller(options) {
  Object.assign(this, _.pick(options, validOptions));
  _.bindAll(this, ['create', 'read', 'update', 'delete']);
}

Object.assign(Controller.prototype, {
  create(req, res) {
    const body = _.pick(req.body, [
      'description', 'value', 'date',
    ]);

    const fields = Object.keys(body);
    const query = baseSql.create(this.table, fields);

    this.store.one(query, body)
      .then(result => {
        res.status(201).send({
          data: formatTransaction(result)
        });
      })
      .catch(_.partial(handleQueryError, res));
  },

  read(req, res) {
    const id = req.params.id;

    // `singular` is whether or not we're looking for 1
    // or all. This coercion is fine because SERIALs start at 1
    const singular = Boolean(id);
    const query = baseSql.read(this.table, '*', {singular});
    const method = singular ? 'one' : 'any';

    this.store[method](query, {id})
      .then(result => {
        var formattedResult;
        if (!Array.isArray(result)) {
          formattedResult = formatTransaction(result);
        } else {
          formattedResult = _.map(result, formatTransaction);
        }
        res.send({
          data: formattedResult
        });
      })
      .catch(_.partial(handleQueryError, res));
  },

  update(req, res) {
    const id = req.params.id;
    const body = _.pick(req.body, [
      'description', 'value', 'date',
    ]);

    const fields = Object.keys(body);

    let query;

    // If there's nothing to update, we can use a read query
    if (!fields.length) {
      query = baseSql.read(this.table, '*', {singular: true});
    }

    // Otherwise, we get the update query.
    else {
      query = baseSql.update(this.table, fields);
    }

    const queryData = Object.assign({id}, body);

    this.store.one(query, queryData)
      .then(result => {
        res.send({
          data: formatTransaction(result)
        });
      })
      .catch(_.partial(handleQueryError, res));
  },

  delete(req, res) {
    const id = req.params.id;
    if (!id) {
      return Promise.reject(new TypeError('id was undefined'));
    }

    const query = baseSql.delete(this.table);

    this.store.one(query, {id})
      .then(() => {
        res.status(204).end();
      })
      .catch(_.partial(handleQueryError, res));
  }
});

module.exports = new Controller({
  store: db,
  table: TABLE_NAME
});
