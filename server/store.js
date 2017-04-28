'use strict';

const fortune = require('fortune');
const postgresAdapter = require('fortune-postgres');
const dbConfig = require('../config/db-config');

const resources = {
  category: {
    label: String,
    emoji: String,
    transactions: [Array('transaction'), 'category'],
    user: 'profile'
  },
  transaction: {
    description: String,
    value: Number,
    date: String,
    category: ['category', 'transactions'],
    user: 'profile'
  },
  profile: {
    // Just for display purposes. Whether or not they have a name doesn't really
    // matter.
    name: String,
    email: String,
    // This is only set if the user has configured a local login
    password: String,

    // Our social login fields
    google_id: String,
    google_token: String,
    twitter_id: String,
    twitter_token: String,
    facebook_id: String,
    facebook_token: String,
    github_id: String,
    github_token: String,
  }
};

const hooks = {
  profile: [
    (context, record, update) => {
      const {method} = context.request;
      // Only allow updates to name and email
      if (method === 'update') {
        if (update.replace) {
          const {name, email} = update.replace;

          // Because we're PATCHing, we only append the updates that the user
          // sent over. If we set a value as an empty string or null, it might
          // override a previously-set value.
          update.replace = {};
          if (name) {
            update.replace.name = name;
          }
          if (email) {
            update.replace.email = email;
          }
        }
      }
    },
    // Output hook: ensures only "name" and "email" are returned for the user
    (context, record) => {
      delete record.password;
      delete record.google_id;
      delete record.google_token;
      delete record.facebook_id;
      delete record.facebook_token;
      delete record.twitter_id;
      delete record.twitter_token;
      delete record.github_id;
      delete record.github_token;
    }
  ]
};

const options = {
  adapter: [postgresAdapter, {url: dbConfig}],
  hooks
};

const store = fortune(resources, options);

var originalRequest = store.request;
store.request = function(options) {
  const {type, method, ids} = options;

  const isReadOne = method === 'find' && ids;
  const isUpdateOne = method === 'update' && ids && ids.length === 1;
  // Users are only permitted to read or update a single profile at a time –
  // their own!
  if (type === 'profile' && (!isReadOne && !isUpdateOne)) {
    const err = new fortune.errors.MethodError('Method not permitted.');
    return Promise.reject(err);
  }

  return originalRequest.call(this, options);
};

module.exports = store;
