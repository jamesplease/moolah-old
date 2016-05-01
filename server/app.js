'use strict';

const _ = require('lodash');
const pg = require('pg');
const path = require('path');
const express = require('express');
const passport = require('passport');
const favicon = require('serve-favicon');
const exphbs = require('express-handlebars');
const compress = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const configurePassport = require('./utils/configure-passport');
const PgSessionFactory = require('connect-pg-simple');
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

module.exports = function() {
  const app = express();
  const PgSession = PgSessionFactory(session);
  const sessionStore = new PgSession({
    pg,
    conString: dbConfig
  });

  app.set('env', NODE_ENV);

  app.use(session({
    store: sessionStore,
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

  configurePassport();
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

  const googleSettings = {scope: ['profile']};
  app.get('/login/google', passport.authenticate('google', googleSettings));

  const redirects = {
    successRedirect: '/success',
    failureRedirect: '/failure'
  };
  app.get('/auth/google/callback', passport.authenticate('google', redirects));

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });

  // Every route is served by our JS app
  app.get('*', (req, res) => {
    const authenticated = _.result(req, 'isAuthenticated');
    console.log(`route: ${req.path} authenticated: ${authenticated}`);
    res.locals.devMode = res.app.get('env') === 'development';
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
