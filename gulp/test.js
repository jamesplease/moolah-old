const gulp = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const glob = require('glob');
const {Instrumenter} = require('isparta');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const mochaGlobals = require('../test/setup/.globals');
const {lintJs} = require('./lint');

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
    '!mock-server/**/*.js',
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

exports.testBrowser = () => {
  // Our testing bundle is made up of our unit tests, which
  // should individually load up pieces of our application.
  // We also include the browser setup file.
  const testFiles = glob.sync('./test/unit/**/*.js');
  const allFiles = ['./test/setup/browser.js'].concat(testFiles);

  // Lets us differentiate between the first build and subsequent builds
  var firstBuild = true;

  // This empty stream might seem like a hack, but we need to specify all of our files through
  // the `entry` option of webpack. Otherwise, it ignores whatever file(s) are placed in here.
  return gulp.src('')
    .pipe($.plumber())
    .pipe(webpackStream({
      watch: true,
      entry: allFiles,
      output: {
        filename: '__spec-build.js'
      },
      module: {
        loaders: [
          // This is what allows us to author in future JavaScript
          {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
          // This allows the test setup scripts to load `package.json`
          {test: /\.json$/, exclude: /node_modules/, loader: 'json-loader'}
        ]
      },
      plugins: [
        // By default, webpack does `n=>n` compilation with entry files. This concatenates
        // them into a single chunk.
        new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1})
      ],
      devtool: 'inline-source-map'
    }, null, () => {
      if (firstBuild) {
        $.livereload.listen({port: 35729, host: 'localhost', start: true});
        $.watch(watchFiles, lintJs);
      } else {
        $.livereload.reload('./tmp/__spec-build.js');
      }
      firstBuild = false;
    }))
    .pipe(gulp.dest('./tmp'));
};
