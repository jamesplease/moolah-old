const _ = require('lodash');

// The options that can be passed into a Controller
const validOptions = ['table', 'store'];

// A controller represents an interface to the data
// stored in our database
function Controller(options) {
  Object.assign(this, _.pick(options, validOptions));
}

Object.assign(Controller.prototype, {
  create(data) {
    const query = `INSERT INTO ${this.table} (description, value, date) VALUES ($1, $2, $3) RETURNING *`;
    return this.store.one(query, [data.description, data.value, data.date]);
  },

  read(id) {
    // `singular` is whether or not we're looking for 1
    // or all. This coercion is fine because SERIALs start at 1
    const singular = Boolean(id);

    // Our base query
    var query = `SELECT * FROM ${this.table}`;

    // If we're looking for one, we modify the query string
    if (singular) {
      query += ' WHERE id = $1';
    }

    const method = singular ? 'oneOrNone' : 'any';
    return this.store[method](query, id);
  },

  update() {},

  delete(id) {
    if (!id) {
      return Promise.reject(new TypeError('id was undefined'));
    }

    const query = `DELETE FROM ${this.table} WHERE id = $1 RETURNING *`;
    return this.store.one(query, id);
  }
});

module.exports = Controller;
