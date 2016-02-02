# finance-app

[![Travis build status](http://img.shields.io/travis/jmeas/finance-app.svg?style=flat)](https://travis-ci.org/jmeas/finance-app)
[![Code Climate](https://codeclimate.com/github/jmeas/finance-app/badges/gpa.svg)](https://codeclimate.com/github/jmeas/finance-app)
[![Test Coverage](https://codeclimate.com/github/jmeas/finance-app/badges/coverage.svg)](https://codeclimate.com/github/jmeas/finance-app)
[![Dependency Status](https://david-dm.org/jmeas/finance-app.svg)](https://david-dm.org/jmeas/finance-app)
[![devDependency Status](https://david-dm.org/jmeas/finance-app/dev-status.svg)](https://david-dm.org/jmeas/finance-app#info=devDependencies)

Track your finances.

### Deploying

> This app is in very early development, so there's not much to see if you deploy it right now.

The preferred way to deploy this app is through Heroku. Just click the button below.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/jmeas/finance-app/tree/master)

### Developing

#### Pre-requisites

- [Node](https://nodejs.org/en/) v5+
- [npm](https://docs.npmjs.com/getting-started/installing-node) v3+
- [Postgres](https://wiki.postgresql.org/wiki/Detailed_installation_guides) v9.4

You must also make sure that a superuser named `postgres` exists (this is required for running the API integration tests locally).

#### Installation

Clone this repository.

```sh
git clone git@github.com:jmeas/finance-app.git
```

Navigate to the root directory of this project, and install the [npm](https://www.npmjs.com/) dependencies.

```sh
cd finance-app && npm install
```

#### Setting up the Database

This project uses the same database in production as it does for developing locally ([for now](https://github.com/jmeas/finance-app/issues/50)). Therefore, you must first deploy the
application before you can begin developing on it. To deploy the app, follow the [instructions above](#deploying).

Next, run `heroku config -s` from the project's root directory. Copy and paste the entire line beginning with `DATABASE_URL=` into a file
in the root directory of this project called `.env`. This will allow you to connect to the remote database when you run `npm run work`.

#### Developer Scripts

- `npm run work`: Starts a local development server. Automatically restarts the server if it dies.
- `npm run test`: Run the unit tests
- `npm run lint`: Lint the JavaScript files
- `npm run test-browser`: Builds the app to run the tests in a local browser
- `npm run watch-tests`: Run the tests in Node. Then start a watch task to re-run them if you make any changes.
- `npm run build`: Build a production version of the application
- `npm run coverage`: Generate a coverage report
