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
    return function(accessToken, refreshToken, profile, done) {
      const id = profile.id;
      const idField = `${service}_id`;
      const tokenField = `${service}_token`;

      findUser(db, idField, id)
        .then(
          result => {
            done(null, result);
          },
          err => {
            const queryErrorCode = pgp.errors.queryResultErrorCode;
            const errorKey = _.findKey(queryErrorCode, c => c === err.code);

            if (errorKey === 'noData') {
              const query = baseSql.create('profile', ['id', idField, tokenField]);
              db.one(query, {
                [tokenField]: accessToken,
                [idField]: id,
                id: createId()
              })
                .then(result => {
                  return done(null, result);
                }, () => {
                  return done(null, false);
                });
            } else {
              return done(null, false);
            }
          }
        );
    };
  }

  // These should be configurable via env variables
  const appUrlBase = process.env.APP_DOMAIN ? process.env.APP_DOMAIN : 'http://localhost:5000';

  const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${appUrlBase}/auth/google/callback`
  }, generateCallback('google'));

  const twitterStrategy = new TwitterStrategy({
    consumerKey: process.env.TWITTER_CLIENT_ID,
    consumerSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: `${appUrlBase}/auth/twitter/callback`
  }, generateCallback('twitter'));

  const facebookStrategy = new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${appUrlBase}/auth/facebook/callback`
  }, generateCallback('facebook'));

  const gitHubStrategy = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${appUrlBase}/auth/github/callback`
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
    const readQuery = baseSql.read('profile', ['id'], {
      singular: true
    });
    db.one(readQuery, {id})
      .then(
        result => {
          done(null, result);
        },
        () => {
          done(null, false);
        }
      );
  });
};
