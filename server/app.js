'use strict';

const pgp = require('pg-promise');
const path = require('path');
const helmet = require('helmet');
const express = require('express');
const passport = require('passport');
const addRequestId = require('express-request-id');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const compress = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const fortuneHTTP = require('fortune-http');
const jsonApiSerializer = require('fortune-json-api');
const pgSession = require('connect-pg-simple')(session);
const errorLogs = require('./logging/error-logs');
const infoLogs = require('./logging/info-logs');
const serveApp = require('./serve-app');
const store = require('./store');
const db = require('./utils/db');
const baseSql = require('./utils/base-sql');

const envPath = global.ENV_PATH ? global.ENV_PATH : '.env';
require('dotenv').config({path: envPath});

const configurePassport = require('./utils/configure-passport');
const dbConfig = require('../config/db-config');

// Heroku sets NODE_ENV to production by default. So if we're not
// on Heroku, we assume that we're developing locally.
const NODE_ENV = process.env.NODE_ENV || 'development';
const BASE_DIR = __dirname;
const PROJECT_ROOT = path.normalize(`${BASE_DIR}/..`);
const ASSETS_PATH = path.join(PROJECT_ROOT, 'client-dist');
const STATIC_PATH = path.join(BASE_DIR, 'static');

const isDevelopmentEnv = NODE_ENV === 'development';

module.exports = function() {
  const app = express();

  app.set('env', NODE_ENV);

  // We set up some security stuff first
  app.use(helmet({
    // This application should never appear in an iFrame
    frameguard: {action: 'deny'},
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [
          "'self'",
        ],
        scriptSrc: [
          "'self'",
          // Unsafe eval is used for Webpack source maps
          isDevelopmentEnv && "'unsafe-eval'",
          // Inline is used to set up the LiveReload script
          isDevelopmentEnv && "'unsafe-inline'",
          // The LiveReload server is located here
          isDevelopmentEnv && 'localhost:35729'
        ],
        connectSrc: [
          "'self'",
          // Allow connections to Livereload in development
          isDevelopmentEnv ? 'ws://localhost:35729/livereload' : ''
        ],
        styleSrc: [
          "'self'",
          // Normalize, Material design iconic font
          'cdnjs.cloudflare.com',
          // Google fonts
          'fonts.googleapis.com',
        ],
        imgSrc: [
          "'self'",
          // User profile pictures from Google
          '*.googleusercontent.com',
        ],
        fontSrc: [
          "'self'",
          // Material design iconic font
          'cdnjs.cloudflare.com',
          // Google fonts
          'fonts.gstatic.com',
        ]
      }
    }
  }));
  // We need cookie support before we can register CSRF
  app.use(cookieParser());
  app.use(csrf({cookie: true}));

  app.use((req, res, next) => {
    // We ensure the anti-CSRF token is sent along with all GET requests. We
    // don't read this cookie in write requests (that would defeat the purpose!),
    // but instead attach include it under the `x-csrf-token` header for write
    // requests.
    if (req.method === 'GET') {
      res.cookie('antiCsrfToken', req.csrfToken(), {sameSite: true, path: '/'});
    }

    return next();
  });

  // Alright, the security measures should be set up. Now for other configuration
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(compress());
  app.use(favicon(path.join(__dirname, 'favicon.ico')));
  app.use(express.static(ASSETS_PATH));
  app.use(express.static(STATIC_PATH));
  app.use(addRequestId({
    // We're using this middleware for logging purposes. Each request having
    // a unique ID can help filter many requests coming in. If we set it as a
    // header, we'd get the benefit of Bunyan automatically logging in. But
    // then we'd also be sending it over the wire unnecessarily. So we turn
    // that off, which means we must remember to attach the `req.id` to all logs
    // that are sent a request. i.e.; `log.info({reqId: req.id})`
    setHeader: false
  }));

  const sessionStore = new pgSession({
    pg: pgp.pg,
    conString: dbConfig,
    // Turn off interval pruning when testing, as it prevents the DB
    // connection from closing.
    pruneSessionInterval: !global.TESTING
  });

  app.use(session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // 30 day cookie
    cookie: {maxAge: 30 * 24 * 60 * 60 * 1000}
  }));

  configurePassport(db);

  app.use(passport.initialize());
  app.use(passport.session());

  const port = process.env.PORT || 5000;
  app.set('port', port);

  // Enforce HTTPS in production
  if (app.get('env') === 'production') {
    app.use((req, res, next) => {
      // Heroku will set this header
      if (req.headers['x-forwarded-proto'] === 'https') {
        return next();
      }

      // This catches non-Heroku environments
      else if (req.secure) {
        return next();
      }

      // If neither of those pass, then we must be using HTTP, so we redirect to
      // https
      else {
        res.redirect(`https://${req.hostname + req.url}`);
      }
    });
  }

  app.get('/login/google', passport.authenticate('google', {scope: ['profile']}));
  app.get('/login/twitter', passport.authenticate('twitter'));
  app.get('/login/github', passport.authenticate('github', {scope: ['user:email']}));
  app.get('/login/facebook', passport.authenticate('facebook', {scope: ['email']}));

  const redirects = {
    failureRedirect: '/login'
  };

  const socialMediaServices = [
    'google',
    'twitter',
    'facebook',
    'github'
  ];

  socialMediaServices.forEach(serviceName => {
    app.get(
      `/auth/${serviceName}/callback`,
      passport.authenticate(serviceName, redirects),
      (req, res) => {
        // Explicitly save the session before redirecting!
        req.session.save((err) => {
          if (err) {
            errorLogs.loginError(req, res, err);
            res.redirect('/login');
          } else {
            res.redirect('/');
          }
        });
      }
    );

    // This allows user to unlink their accounts
    app.post(`/unlink/${serviceName}`, (req, res, next) => {
      if (req.isAuthenticated()) {
        const {id} = req.user;
        const tokenField = `${serviceName}_token`;
        const query = baseSql.update('profile', [tokenField]);
        db.one(query, {
          // Delete the existing token, if there is one
          [tokenField]: '',
          id
        })
          .then(
            () => res.status(204).end(),
            () => res.status(500).end()
          );
      } else {
        next();
      }
    });
  });

  app.post('/logout', (req, res) => {
    req.logout();
    req.session.save((err) => {
      if (err) {
        errorLogs.logoutError(req, res, err);
        res.status(500).end();
      } else {
        res.status(204).end();
      }
    });
  });

  const listener = fortuneHTTP(store, {
    serializers: [
      [jsonApiSerializer]
    ]
  });

  app.use('/api', (request, response) => {
    return listener(request, response)
      .catch(err => console.log(err));
  });

  app.get('*', serveApp);

  if (!global.TESTING) {
    app.listen(port, () => {
      infoLogs.serverStart(port);
    });
  }

  return app;
};
