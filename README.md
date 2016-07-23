# moolah

[![Travis build status](http://img.shields.io/travis/jmeas/moolah.svg?style=flat)](https://travis-ci.org/jmeas/moolah)
[![Code Climate](https://codeclimate.com/github/jmeas/moolah/badges/gpa.svg)](https://codeclimate.com/github/jmeas/moolah)
[![Test Coverage](https://codeclimate.com/github/jmeas/moolah/badges/coverage.svg)](https://codeclimate.com/github/jmeas/moolah)
[![Dependency Status](https://david-dm.org/jmeas/moolah.svg)](https://david-dm.org/jmeas/moolah)
[![devDependency Status](https://david-dm.org/jmeas/moolah/dev-status.svg)](https://david-dm.org/jmeas/moolah#info=devDependencies)

Track your finances.

### Deploying

#### The Production App

The [production version](https://moolah-app-prod.herokuapp.com/) of this app is
deployed as part of a Heroku pipeline. Only users with access to the Heroku
app will be able to deploy it.

The release flow is as follows:

- Opening a PR automatically creates a [Review App](https://devcenter.heroku.com/articles/github-integration-review-apps)
- Merging to the `master` branch will automatically deploy the staging app
- Running `npm run release` will promote the staging app to production\*

\* _Note: the name of the Heroku remote must be `staging` for this command to work._

#### Custom

You can deploy your own version of Moolah, too. This app is in very early
development, so it doesn't fully function. Keep that in mind if you wish to
deploy it!

The preferred method to deploy this app is through Heroku. To enable logging in,
you'll need to set up a Google project with
[the Google+ API](https://developers.google.com/+/web/api/rest/?hl=en_US) enabled.

Once you've got your Google ClientID and Secret, just click the button below:

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/jmeas/moolah/tree/master)

### Developing

#### Pre-requisites

- [Node](https://nodejs.org/en/) v6.3.0+
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

Running this project locally requires a Postgres database. The easiest way to do
this is to create a Heroku application with
[the Postgres Heroku add-on](https://elements.heroku.com/addons/heroku-postgresql). Then,
we can just use that project's database. If you're comfortable setting up your
own database, then feel free to do that.

To use the Heroku method, begin by deploying the app by following [the instructions above](#deploying).

Once that's done, you'll need to hook up your local repository with the Heroku app that you just created by adding the app
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
- `npm run test`: Lint JS & CSS, then run all unit tests
- `npm run lint`: Lint the JavaScript and CSS files
- `npm run test-browser`: Builds the app to run the tests in a local browser
- `npm run watch-tests`: Run the tests in Node. Then start a watch task to re-run them if you make any changes.
- `npm run build`: Build a production version of the application
- `npm run coverage`: Generate a coverage report
- `npm run migrate:up`: Applies migrations
- `npm run migrate:down`: Reverts migrations
- `npm run migrate:create`: Create a new migration
- `npm run release`: Release a new version of the production app by syncing
  production with staging
- `npm run minify-emoji`: Compress the file located at `server/static/sheet_apple_64.png`

### Target browser support

Evergreen browsers (including Microsoft Edge). No Internet Explorer support.

### Updating the Emoji

This application uses [js-emoji](https://github.com/iamcal/js-emoji), the same
library that [Slack](https://www.slack.com) uses, for emoji rendering. Sometimes
when updating that dependency, the emoji will change. When that happens, we need
to manually update image files in this project.

This is because `js-emoji` doesn't minify the spritesheets. To minify them, this
project uses `imagemin`.

First, download the updated assets from `js-emoji`. Then, copy the
`sheet_apple_64.png` file into the `server/assets` directly. Lastly, run:

`npm run minify-emoji`

##### Acknowledgements

I'll be trying out using [BrowserStack](https://www.browserstack.com/)'s free
account for open source projects to run this application's integration tests.
