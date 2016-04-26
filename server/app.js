'use strict';

const pgp = require('pg-promise');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const exphbs = require('express-handlebars');
const compress = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const ConnectPgSimple = require('connect-pg-simple');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const dbConfig = require('../config/db-config');

const api = require('./api');

// Heroku sets NODE_ENV to production by default. So if we're not
// on Heroku, we assume that we're developing locally.
const NODE_ENV = process.env.NODE_ENV || 'development';
const BASE_DIR = __dirname;
const PROJECT_ROOT = path.normalize(`${BASE_DIR}/..`);
const ASSETS_PATH = path.join(PROJECT_ROOT, 'client-dist');
const VIEWS_DIR = path.join(BASE_DIR, 'views');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/callback'
}, (accessToken, refreshToken, profile, cb) => {
  // Eventually I will return the user profile from the DB
  return cb(null, profile);
}));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = function() {
  const app = express();

  app.set('env', NODE_ENV);
  app.set('GOOGLE_CLIENT_ID', process.env.GOOGLE_CLIENT_ID);

  app.use(expressSession({
    store: new (ConnectPgSimple(expressSession))({
      pg: pgp.pg,
      conString: dbConfig
    }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
  }));
  app.use(favicon(`${__dirname}/favicon.ico`));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(compress());
  app.use(express.static(ASSETS_PATH));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/api', api);

  // Configure the templating engine
  const hbsOptions = {
    extname: '.hbs',
    layoutsDir: `${VIEWS_DIR}/layouts`,
    partialsDir: `${VIEWS_DIR}/partials`,
    defaultLayout: 'main'
  };
  app.set('view engine', '.hbs');
  app.set('views', VIEWS_DIR);
  app.engine('.hbs', exphbs(hbsOptions));

  const port = process.env.PORT || 5000;
  app.set('port', port);

  app.get('/login/google',
    passport.authenticate('google', {scope: ['profile']}));

  app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });

  // Every route is served by our JS app
  app.get('*', (req, res) => {
    console.log(req.session);
    res.locals.devMode = res.app.get('env') === 'development';
    res.locals.googleClientId = res.app.get('GOOGLE_CLIENT_ID');
    res.locals.initialData = JSON.stringify({
      user: req.user
    });
    return res.render('index');
  });

  if (!global.TESTING) {
    app.listen(port, () => {
      console.log(`Node app is running at localhost:${port}`);
    });
  }

  return app;
};
