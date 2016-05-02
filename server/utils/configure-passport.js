'use strict';

const _ = require('lodash');
const pgp = require('pg-promise');
const baseSql = require('../api/util/base-sql');
const db = require('../api/services/db');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

function createPerson(google_id) {
  baseSql.create('user_account', {google_id});
}

function findUser(googleId) {
  return db.one(`SELECT * FROM user_account WHERE google_id=$[googleId]`, {googleId});
}

module.exports = function() {
  function passportCallback(accessToken, refreshToken, profile, done) {
    const googleId = profile.id;

    findUser(googleId)
      .then(
        result => {
          done(null, result);
        },
        err => {
          const queryErrorCode = pgp.errors.queryResultErrorCode;
          const errorKey = _.findKey(queryErrorCode, c => c === err.code);

          if (errorKey === 'noData') {
            console.log('no data –– time to create one');
            const query = baseSql.create('user_account', ['google_id']);
            db.one(query, {google_id: googleId})
              .then(result => {
                console.log('created one!', result);
                return done(null, result);
              }, err => {
                console.log('fucked up while making an account', err);
                return done(null, false);
              })
          } else {
            console.log('General query error..doing nothing', err);
            return done(null, false);
          }
        }
      );
  }

  const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback'
  }, passportCallback);

  passport.use('google', googleStrategy);

  // Takes a `user_account` from the DB, and maps it to just the ID
  passport.serializeUser((user, done) => {
    console.log('serializing');
    done(null, user.id);
  });

  // Retrieves a user account from the DB
  passport.deserializeUser((id, done) => {
    const readQuery = baseSql.read('user_account', ['id'], {
      singular: true
    });
    db.one(readQuery, {id})
      .then(
        result => {
          console.log('successful deserialize');
          done(null, result)
        },
        err => {
          console.log('failed deserialize');
          done(null, false)
        }
      );
  });
};
