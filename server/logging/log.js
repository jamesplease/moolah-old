'use strict';

const bunyan = require('bunyan');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevEnv = NODE_ENV === 'development';

module.exports = bunyan.createLogger({
  name: 'Moolah',
  serializers: bunyan.stdSerializers,
  // This could be useful for local development, but it's too slow for
  // production. For more, see: https://github.com/trentm/node-bunyan#src
  src: isDevEnv
});
