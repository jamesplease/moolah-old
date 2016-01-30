# finance-app

Track your finances.

### Deploying

The preferred way to deploy this app is through Heroku. Just click the button below.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/jmeas/finance-app/tree/master)

### Developing

#### Installation

Clone this repository.

```sh
git clone git@github.com:jmeas/finance-app.git
```

Navigate to the root directory of this project, and install the [npm](https://www.npmjs.com/) dependencies.

```sh
cd finance-app && npm install
```

#### Developer Scripts

- `npm run work`: Starts a local development server. Automatically restarts the server if it dies.
- `npm run test`: Run the unit tests
- `npm run lint`: Lint the JavaScript files
- `npm run test-browser`: Builds the app to run the tests in a local browser
- `npm run watch-tests`: Run the tests in Node. Then start a watch task to re-run them if you make any changes.
- `npm run build`: Build a production version of the application
- `npm run coverage`: Generate a coverage report
