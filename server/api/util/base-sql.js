'use strict';

const pgp = require('pg-promise');
const _ = require('lodash');

// These are functions that return the "base"
// queries to be passed into pg-promise. The CRUD methods
// of most controllers will likely use these, though they may
// also author their own, more complex versions.

exports.create = function(table, fields) {
  const columns = fields.map(pgp.as.name).join(',');
  const setters = fields.map(field => `$[${field}]`).join(',');
  const tableName = pgp.as.name(table);
  return `INSERT INTO ${tableName} (${columns}) VALUES (${setters}) RETURNING *`;
};

// `columns` are the columns to return
exports.read = function(table, fields, options) {
  options = options ? options : {};

  const tableName = pgp.as.name(table);

  var singular = options.singular;
  singular = _.isUndefined(singular) ? true : singular;
  fields = fields ? fields : '*';

  var columns;
  if (Array.isArray(fields)) {
    columns = fields.map(pgp.as.name).join(',');
  } else {
    columns = fields;
  }

  // Our base query
  var query = `SELECT ${columns} FROM ${tableName}`;

  // If we're looking for one, we modify the query string
  if (singular) {
    query += ' WHERE id = $[id]';
  }

  return query;
};

exports.update = function(table, fields) {
  const setters = fields.map(field => {
    return `${pgp.as.name(field)}=$[${field}]`;
  }).join(', ');
  return `UPDATE ${pgp.as.name(table)} SET ${setters} WHERE id=$[id] RETURNING *`;
};

exports.delete = function(table) {
  const tableName = pgp.as.name(table);
  return `DELETE FROM ${tableName} WHERE id=$[id] RETURNING *`;
};
