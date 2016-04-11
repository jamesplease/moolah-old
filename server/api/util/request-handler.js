const _ = require('lodash');

const baseSql = require('./base-sql');

// The options that can be passed into a Controller
const validOptions = ['table', 'store'];

// A RequestHandler manages access to the DB.
function RequestHandler(options) {
  Object.assign(this, _.pick(options, validOptions));
}

Object.assign(RequestHandler.prototype, {
  create(data) {
    const fields = Object.keys(data);
    const query = baseSql.create(this.table, fields);
    return this.store.one(query, data);
  },

  read(id) {
    // `singular` is whether or not we're looking for 1
    // or all. This coercion is fine because SERIALs start at 1
    const singular = Boolean(id);

    const query = baseSql.read(this.table, '*', {singular});

    const method = singular ? 'one' : 'any';
    return this.store[method](query, {id});
  },

  update(id, data) {
    // If we've got nothing to update, then we can just return
    // a GET for this resource
    if (!_.size(data)) {
      return this.read(id);
    }

    const fields = Object.keys(data);
    const query = baseSql.update(this.table, fields);

    const queryData = Object.assign({id}, data);

    return this.store.one(query, queryData);
  },

  delete(id) {
    if (!id) {
      return Promise.reject(new TypeError('id was undefined'));
    }

    const query = baseSql.delete(this.table);
    return this.store.one(query, {id});
  }
});

module.exports = RequestHandler;
