# moolah

[![Travis build status](http://img.shields.io/travis/jamesplease/moolah.svg?style=flat)](https://travis-ci.org/jamesplease/moolah)
[![Test Coverage](https://codeclimate.com/github/jmeas/moolah/badges/coverage.svg)](https://codeclimate.com/github/jmeas/moolah)
[![Dependency Status](https://david-dm.org/jamesplease/moolah.svg)](https://david-dm.org/jamesplease/moolah)
[![devDependency Status](https://david-dm.org/jamesplease/moolah/dev-status.svg)](https://david-dm.org/jamesplease/moolah#info=devDependencies)

Track your finances.

### Developing

#### Pre-requisites

- [Node](https://nodejs.org/en/) v6.3.0+
- [npm](https://docs.npmjs.com/getting-started/installing-node) v3+
- [Postgres](https://wiki.postgresql.org/wiki/Detailed_installation_guides) v9.4
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

#### `.env` file

For local development, secrets are stored in an `.env` file in the project root.
The values are:

- `DATABASE_URL`: the DB URL to connect to (see below for how to get this)
- `SESSION_SECRET`: the secret used by [express-session](https://github.com/expressjs/session#secret)
- `GOOGLE_CLIENT_ID`: the ClientID of [a Google project](https://console.developers.google.com/)
- `GOOGLE_CLIENT_SECRET`: the secret of the above project
- `GITHUB_CLIENT_ID`: the ClientID of a GitHub application
- `GITHUB_CLIENT_SECRET`: the secret of the above project
- `FACEBOOK_CLIENT_ID`: the ClientID of a Facebook application
- `FACEBOOK_CLIENT_SECRET`: the secret of the above project
- `TWITTER_CLIENT_ID`: the ClientID of a Twitter application
- `TWITTER_CLIENT_SECRET`: the secret of the above project

The different social media IDs and Secrets enable logging in via those social
networks. Right now, they are *all* necessary to run this app locally.

An example snippet from an `.env` file is:

```
DATABASE_URL='postgres://whatevs'
SESSION_SECRET='cookies_are_delicious'
```

The `.env` file is not used when deploying the app to Heroku. Instead, use the
Heroku Dashboard to modify the environment variables of the deployed webapp.

#### Getting the database URL

If you followed the instructions above for setting up the local DB, then you can
get the database URL by running `heroku config -s` from the project's root
directory.

#### Local development

Once you've followed the installation and database setup instructions above,
you're ready to run the app locally. Follow these steps:

1. Start up Postgres
2. Run `npm run local-server` to start the Express app
2. Run `npm run watch` to build the JS & CSS, and set up the file watcher

The app should now be available in your browser at `http://localhost:5000`.

#### Developer Scripts

- `npm run watch`: Build the JavaScript & CSS, and set up a watcher
- `npm run local-server`: Starts the development web server. Restarts the server if it dies.
- `npm run test`: Lint JS & CSS, then run all unit tests
- `npm run lint`: Lint the JavaScript and CSS files
- `npm run test-browser`: Builds the app to run the tests in a local browser
- `npm run watch-tests`: Run the tests in Node. Then start a watch task to re-run them if you make any changes.
- `npm run build`: Build a production version of the application
- `npm run coverage`: Generate a coverage report
- `npm run sync`: Run the SQL scripts in `./migrations`
- `npm run release`: Release a new version of the production app by syncing
  production with staging
- `npm run minify-emoji`: Compress the file located at `server/static/sheet_apple_64.png`

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

You'll then need to a similar process for Twitter, Facebook, and GitHub.

Once you've gotten all of your ClientIDs and Secrets, click the button below:

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/jmeas/moolah/tree/master)

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
