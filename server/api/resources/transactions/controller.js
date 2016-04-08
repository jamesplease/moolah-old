const _ = require('lodash');
const pgp = require('pg-promise')();
const validator = require('is-my-json-valid');

const RequestHandler = require('./lib/request-handler');
const requestErrorMap = require('../../errors/bad-request-map');
const catchRejectedQuery = require('../../util/catch-rejected-query');
const dbConfig = require('../../../../config/db-config');

const db = pgp(dbConfig);
const TABLE_NAME = 'transaction';

// The options that can be passed into a Controller
const validOptions = ['table', 'store'];

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

// `query` is an async function that attempts to hit the store. If it fails,
// the correct HTTP response will be configured and this method will return the
// Error object. Otherwise, on a success the results of the query will be
// returned.
async function attemptQuery(query, res) {
  let result;
  try {
    result = await query();
  } catch (e) {
    catchRejectedQuery(res, e);
    result = e;
  }
  return result;
}

// A controller represents an interface to the data
// stored in our database. Eventually, this might be
// turned into a separate library, rather than part of this
// app specifically
function Controller(options) {
  Object.assign(this, _.pick(options, validOptions));
  this._requestHandler = new RequestHandler({
    store: this.store,
    table: TABLE_NAME
  });

  _.bindAll(this, ['create', 'read', 'update', 'delete']);
}

Object.assign(Controller.prototype, {
  create: async function(req, res) {
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
      let query = () => this._requestHandler.create(body);
      let result = await attemptQuery(query, res);
      if (result instanceof Error) { return; }
      res.status(201).send({
        data: formatTransaction(result)
      });
    }
  },

  read: async function(req, res) {
    let query = () => this._requestHandler.read(req.params.id);
    let result = await attemptQuery(query, res);

    if (result instanceof Error) { return; }

    var formattedResult;
    if (!Array.isArray(result)) {
      formattedResult = formatTransaction(result);
    } else {
      formattedResult = _.map(result, formatTransaction);
    }
    res.send({
      data: formattedResult
    });
  },

  update: async function(req, res) {
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
      let query = () => this._requestHandler.update(id, body);
      let result = await attemptQuery(query, res);
      if (result instanceof Error) { return; }
      res.send({
        data: formatTransaction(result)
      });
    }
  },

  delete: async function(req, res) {
    let query = () => this._requestHandler.delete(req.params.id);
    let result = await attemptQuery(query, res);
    if (result instanceof Error) { return; }
    res.status(204).end();
  }
});

module.exports = new Controller({
  store: db,
  table: TABLE_NAME
});
