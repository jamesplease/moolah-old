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
  create(req, res) {
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
      this._requestHandler.create(body)
        .then(result => {
          res.status(201).send({
            data: formatTransaction(result)
          });
        })
        .catch(_.partial(catchRejectedQuery, res));
    }
  },

  read(req, res) {
    this._requestHandler.read(req.params.id)
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
      .catch(_.partial(catchRejectedQuery, res));
  },

  update(req, res) {
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
      this._requestHandler.update(id, body)
        .then(result => {
          res.send({
            data: formatTransaction(result)
          });
        })
        .catch(_.partial(catchRejectedQuery, res));
    }
  },

  delete(req, res) {
    this._requestHandler.delete(req.params.id)
      .then(result => {
        res.status(204).end();
      })
      .catch(_.partial(catchRejectedQuery, res));
  }
});

module.exports = new Controller({
  store: db,
  table: TABLE_NAME
});
