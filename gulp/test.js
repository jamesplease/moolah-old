const gulp = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const {Instrumenter} = require('isparta');
const mochaGlobals = require('../test/setup/.globals');

const $ = loadPlugins();

const watchFiles = ['client/**/*', 'test/**/*', 'package.json', '**/.eslintrc'];

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
    'client/**/*.js',
    'server/**/*.js',
    '!client/vendor/**/*.js',
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
