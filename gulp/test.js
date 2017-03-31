const gulp = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const {Instrumenter} = require('isparta');
const easySauce = require('easy-sauce');
const mochaGlobals = require('../test/setup/.globals');

const $ = loadPlugins();

const watchFiles = ['client-src/**/*', 'test/**/*', 'package.json', '**/.eslintrc'];

function _registerBabelForTests() {
  require('babel-register')({
    plugins: ['babel-plugin-rewire']
  });
}

function runMochaTests(files) {
  return gulp.src(files, {read: false})
    .pipe($.mocha({
      reporter: 'dot',
      globals: Object.keys(mochaGlobals.globals),
      ignoreLeaks: false
    }));
}

const setupTestFile = 'test/setup/node.js';
const clientTestFiles = 'test/unit/**/*.js';

exports.test = () => {
  _registerBabelForTests();
  return runMochaTests([].concat(setupTestFile, clientTestFiles));
};

exports.coverage = (done) => {
  _registerBabelForTests();
  gulp.src([
    'client-src/**/*.js',
    'server/**/*.js',
    '!client-src/vendor/**/*.js',
  ])
    .pipe($.istanbul({
      instrumenter: Instrumenter,
      includeUntested: true
    }))
    .pipe($.istanbul.hookRequire())
    .on('finish', () => {
      return exports.test()
        .pipe($.istanbul.writeReports())
        .on('end', done);
    });
};

// Run the headless unit tests as you make changes.
exports.watchTests = () => {
  $.watch(watchFiles, exports.test);
};

const sauceConf = {
  name: 'Moolah',
  username: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  testPath: '/test/runner.html',
  port: '8080',
  framework: 'mocha',
  platforms: [
    ['Windows 10', 'MicrosoftEdge', 'latest'],
    ['Windows 10', 'chrome', 'latest'],
    ['OS X 10.11', 'chrome', 'latest'],
    ['OS X 10.11', 'firefox', 'latest'],
    ['OS X 10.11', 'safari', '9.0']
  ],
  service: 'sauce-connect',
  serviceOptions: {
    verbose: true
  }
};

exports.sauceRunner = () => {
  easySauce(sauceConf)
    .on('message', message => {
      // A message has been emitted, inform the user.
      console.log(message);
    })
    .on('update', job => {
      // A job's status has been updated
      console.log(job.status);
    })
    .on('done', (passed, jobs) => {
      // All tests have completed!
      if (passed) {
        console.log('All tests passed!');
      } else {
        console.log(`Oops, there were failures:\n${jobs}`);
      }
    })
    .on('error', error => {
      // An error occurred at some point running the tests.
      throw new Error(error.message);
    });
};
