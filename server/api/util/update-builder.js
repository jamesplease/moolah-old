'use strict';

const _ = require('lodash');

// This is the secret to the below method's power
// pg-promise supports named values in the query, which is
// what this util takes advantage of. For more, see:
// https://github.com/vitaly-t/pg-promise#named-parameters
function buildValue(key) {
  return `${key[0]} = $<${key[0]}>`;
}

// Builds an UPDATE query
// Pass in an object like: {
//   tableName: 'pasta',
//   validValues: ['name', 'description'],
//   values: {name: 'sam'},
//   id: 10
// }
//
// and you will get back:
//
// [
//   "UPDATE  SET description = $1, value = $2, date = $3 WHERE id = $4",
//   {
//     name: 'sam',
//     id: 10
//   }
// ];
//
// which can then be passed to pg-promise as a query. This is
// useful for PATCHing a resource.
function updateBuilder(options) {
  // The start of our query
  const queryStart = `UPDATE ${options.tableName} SET`;

  const values = _.pick(options.values, options.validValues);

  const updateString = _.chain(values)
    .toPairs()
    .map(v => buildValue(v))
    .join(', ')
    .value();

  // This ensures that the UPDATE returns the updated resource,
  // rather than the number of rows updated
  const returnString = `RETURNING *`;

  const queryString = `${queryStart} ${updateString} WHERE id = $<id> ${returnString}`;

  return [queryString, _.assign(values, {id: options.id})];
}

module.exports = updateBuilder;
