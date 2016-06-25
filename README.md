# moolah

[![Travis build status](http://img.shields.io/travis/jmeas/moolah.svg?style=flat)](https://travis-ci.org/jmeas/moolah)
[![Code Climate](https://codeclimate.com/github/jmeas/moolah/badges/gpa.svg)](https://codeclimate.com/github/jmeas/moolah)
[![Test Coverage](https://codeclimate.com/github/jmeas/moolah/badges/coverage.svg)](https://codeclimate.com/github/jmeas/moolah)
[![Dependency Status](https://david-dm.org/jmeas/moolah.svg)](https://david-dm.org/jmeas/moolah)
[![devDependency Status](https://david-dm.org/jmeas/moolah/dev-status.svg)](https://david-dm.org/jmeas/moolah#info=devDependencies)

Track your finances.

### Deploying

> **Note:** This app is in very early development, so it might not even deploy
  to Heroku properly. Don't expect to see anything if you deploy it!

If you've read the above caveat, and _still_ want to deploy it, just
[click here](https://heroku.com/deploy?template=https://github.com/jmeas/moolah/tree/master).

### Developing

#### Pre-requisites

- [Node](https://nodejs.org/en/) v5+
- [npm](https://docs.npmjs.com/getting-started/installing-node) v3+
- [Postgres](https://wiki.postgresql.org/wiki/Detailed_installation_guides) v9.4
  - Make sure that a superuser named `postgres` exists (this is required for running the API integration tests locally).
- [Heroku](heroku.com) account
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command)
  - Be sure to [log in!](https://devcenter.heroku.com/articles/heroku-command#logging-in)

#### Installation

Clone this repository.

```sh
git clone git@github.com:jmeas/moolah.git
```

Navigate to the root directory of this project, and install the [npm](https://www.npmjs.com/) dependencies.

```sh
cd moolah && npm install
```

#### Setting up the Database

This project uses the same database in production as it does for developing locally ([for now](https://github.com/jmeas/moolah/issues/50)). Therefore, you must first deploy the
application before you can begin developing on it. To deploy the app, follow the [instructions above](#deploying).

Next, you'll need to hook up your local repository with the Heroku app that you just created by adding the app
as a remote. [This guide](https://devcenter.heroku.com/articles/git#creating-a-heroku-remote) can help you
do that.

Lastly, run `heroku config -s` from the project's root directory. Copy and paste the entire line beginning with `DATABASE_URL=` into a file
in the root directory of this project called `.env`. This will allow you to connect to the remote database when you run `npm run work`.

#### Local development

Once you've followed the installation and database setup instructions above,
you're ready to run the app locally. Follow these steps:

1. Start up Postgres
2. Run `npm run local-server` to start the Express app
2. Run `npm run work` to build the local assets, and set up the file watcher

The app should now be available in your browser at `http://localhost:5000`.

#### Developer Scripts

- `npm run work`: Builds the client-side assets, and sets up a watcher for them.
- `npm run local-server`: Starts the development web server. Restarts the server if it dies.
- `npm run test`: Run the unit tests
- `npm run lint`: Lint the JavaScript files
- `npm run test-browser`: Builds the app to run the tests in a local browser
- `npm run watch-tests`: Run the tests in Node. Then start a watch task to re-run them if you make any changes.
- `npm run build`: Build a production version of the application
- `npm run coverage`: Generate a coverage report
- `npm run migrate:up`: Applies migrations
- `npm run migrate:down`: Reverts migrations
- `npm run migrate:create`: Create a new migration

### Target browser support

Evergreen browsers (including Microsoft Edge). No Internet Explorer support.

##### Acknowledgements

I'll be trying out using [BrowserStack](https://www.browserstack.com/)'s free
account for open source projects to run this application's integration tests.
