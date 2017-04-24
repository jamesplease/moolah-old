'use strict';

const _ = require('lodash');
const pgp = require('pg-promise');
const baseSql = require('./base-sql');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

// This is copy+pasted from Fortune's source, for now
function createId() {
  // eslint-disable-next-line
  return Date.now() + '-' + ('00000000' + Math.floor(Math.random() * Math.pow(2, 32)).toString(16)).slice(-8);
}

function findUser(db, idType, id) {
  return db.one(`SELECT * FROM profile WHERE ${idType}=$[id]`, {id});
}

module.exports = function(db) {
  function generateCallback(service) {
    return function(req, accessToken, refreshToken, profile, done) {
      const id = profile.id;
      const idField = `${service}_id`;
      const tokenField = `${service}_token`;

      // If ther user is already logged in, then we add this service to their
      // account.
      if (req.isAuthenticated()) {
        const {user} = req;
        const query = baseSql.update('profile', [idField, tokenField, 'name']);

        db.one(query, {
          [tokenField]: accessToken,
          [idField]: id,
          // Add a name if there isn't already one
          name: user.name || profile.displayName,
          id: user.id
        })
          .then(
            (result) => done(null, result),
            () => done(null, false)
          );
      }

      // This handles if the user is not logged in
      else {
        // Start by trying to find the user by their service's ID
        findUser(db, idField, id)
          .then(
            // This handles the situation where the user has already logged in
            // with this social account before.
            result => {
              // If we have a user by the serviceID, but no token, then that
              // means that this account has been disconnected. We reconnect it,
              // then log them back in.
              if (!result[tokenField]) {
                const query = baseSql.update('profile', [tokenField, 'name']);
                db.one(query, {
                  [tokenField]: accessToken,
                  name: result.name || profile.displayName,
                  id: result.id
                })
                  .then(
                    (result) => done(null, result),
                    () => done(null, false)
                  );
              }
              // This means we have an account, and a token, so this is a
              // existing and already-connected account.
              else {
                done(null, result);
              }
            },
            // Let's handle errors with that search for the user...
            err => {
              const queryErrorCode = pgp.errors.queryResultErrorCode;
              const errorKey = _.findKey(queryErrorCode, c => c === err.code);

              // This means the user does not exist. We create a new user.
              if (errorKey === 'noData') {
                const query = baseSql.create('profile', ['id', idField, tokenField, 'name']);
                db.one(query, {
                  [tokenField]: accessToken,
                  [idField]: id,
                  name: profile.displayName,
                  id: createId()
                })
                  .then(
                    (result) => done(null, result),
                    () => done(null, false)
                  );
              }
              // This handles generic query errors. Maybe the DB is down, or
              // something.
              else {
                return done(null, false);
              }
            }
          );
      }
    };
  }

  // These should be configurable via env variables
  const appUrlBase = process.env.APP_DOMAIN ? process.env.APP_DOMAIN : 'http://localhost:5000';

  const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${appUrlBase}/auth/google/callback`,
    passReqToCallback: true
  }, generateCallback('google'));

  const twitterStrategy = new TwitterStrategy({
    consumerKey: process.env.TWITTER_CLIENT_ID,
    consumerSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: `${appUrlBase}/auth/twitter/callback`,
    passReqToCallback: true
  }, generateCallback('twitter'));

  const facebookStrategy = new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${appUrlBase}/auth/facebook/callback`,
    passReqToCallback: true
  }, generateCallback('facebook'));

  const gitHubStrategy = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${appUrlBase}/auth/github/callback`,
    passReqToCallback: true
  }, generateCallback('github'));

  passport.use('google', googleStrategy);
  passport.use('twitter', twitterStrategy);
  passport.use('facebook', facebookStrategy);
  passport.use('github', gitHubStrategy);

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Retrieves a user account from the DB
  passport.deserializeUser((id, done) => {
    const readQuery = baseSql.read('profile', ['id', 'name', 'email'], {
      singular: true
    });
    db.one(readQuery, {id})
      .then(
        (result) => done(null, result),
        () => done(null, false)
      );
  });
};
