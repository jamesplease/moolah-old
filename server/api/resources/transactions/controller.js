// A controller represents an interface to the data
// stored in our database
function Controller(options) {
  this.options = options;
}

Object.assign(Controller.prototype, {
  create() {},

  read(id) {
    // `singular` is whether or not we're looking for 1
    // or all. This coercion is fine because SERIALs start at 1
    const singular = Boolean(id);

    // Our base query
    var query = `SELECT * FROM ${this.options.table}`;

    // If we're looking for one, we modify the query string
    if (singular) {
      query += ' WHERE id = $1';
    }

    const method = singular ? 'oneOrNone' : 'any';
    return this.options.store[method](query, id);
  },

  update() {},

  delete(id) {
    if (!id) {
      return Promise.reject(new TypeError('id was undefined'));
    }

    const query = `DELETE FROM ${this.options.table} WHERE id = $1 RETURNING *`;
    return this.options.store.one(query, id);
  }
});

module.exports = Controller;
