import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import del from 'del';
import glob from 'glob';
import path from 'path';
import {Instrumenter} from 'isparta';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import runSequence from 'run-sequence';

import mochaGlobals from './test/setup/.globals';
import manifest from './package.json';

// Load all of our Gulp plugins
const $ = loadPlugins();

const productionMode = process.env.NODE_ENV === 'production';

// Gather the library data from `package.json`
const config = manifest.babelBoilerplateOptions;
const mainFile = manifest.main;
const destinationFolder = path.dirname(mainFile);
const exportFileName = path.basename(mainFile, path.extname(mainFile));

var working = false;

const stylusPaths = [
  // Load our entrypoint first. This gives us an opportunity to load 3rd-party libraries,
  // or whatever else needs to be loaded first
  './client-src/index.styl',
  // Next, we load the common stylus files. These might be depended upon by other files
  './client-src/common/components/stylus/**/*.styl',
  // Lastly, we pull in the stylus out of every pod. Variables are always loaded first, so
  // that each pod can define its own variables
  './client-src/**/variables.styl',
  './client-src/**/*.styl',
  // Ensure that we don't load up the variables file itself, which will error
  // when it tries to import itself
  '!./client-src/variables.styl'
];

function stylus() {
  return gulp.src(stylusPaths)
    .pipe($.sourcemaps.init())
    .pipe($.stylus({
      'include css': true,
      paths: ['node_modules'],
      import: ['nib/index', 'variables'],
      compress: productionMode
    }))
    .pipe($.concat('style.css'))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('client-dist'))
    .pipe($.livereload());
}

function cleanDist(done) {
  del([destinationFolder]).then(() => done());
}

function cleanTmp(done) {
  del(['tmp']).then(() => done());
}

// Lint a set of files
function lint(files) {
  return gulp.src(files)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
}

function lintServer() {
  return lint('server/**/*.js');
}

function lintClient() {
  return lint('client-src/**/*.js');
}

function lintTest() {
  return lint('test/**/*.js');
}

function lintGulpfile() {
  return lint('gulpfile.babel.js');
}

function watch() {
  gulp.watch('./client-src/**/*.styl', ['stylus']);
  $.livereload.listen();
}

function buildJavaScript() {
  var firstBuild = true;

  return gulp.src(path.join('client-src', `${config.entryFileName}.js`))
    .pipe($.plumber())
    .pipe(webpackStream({
      watch: working,
      output: {
        filename: `${exportFileName}.js`
      },
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
      },
      devtool: 'source-map'
    }, null, () => {
      if (!working) { return; }
      if (firstBuild) {
        $.livereload.listen({port: 35729, host: 'localhost', start: true});
        watch();
      } else {
        $.livereload.reload('http://localhost:5000');
      }
      firstBuild = false;
    }))
    .pipe($.if(productionMode, $.sourcemaps.init({ loadMaps: true })))
    .pipe($.if(productionMode, $.uglify()))
    .pipe($.if(productionMode, $.sourcemaps.write('./')))
    .pipe(gulp.dest(destinationFolder));
}

function _mochaApiIntegration() {
  return gulp.src([
      'test/setup/node.js',
      'test/integration/api/index.js',
      'test/integration/**/*.js'
    ], {read: false})
    .pipe($.mocha({
      reporter: 'dot',
      globals: Object.keys(mochaGlobals.globals),
      ignoreLeaks: false
    }));
}

function _mocha() {
  return gulp.src(['test/setup/node.js', 'test/unit/**/*.js'], {read: false})
    .pipe($.mocha({
      reporter: 'dot',
      globals: Object.keys(mochaGlobals.globals),
      ignoreLeaks: false
    }));
}

function _registerBabel() {
  require('babel-register');
}

function testApiIntegration() {
  _registerBabel();
  return _mochaApiIntegration();
}

function test() {
  _registerBabel();
  return _mocha();
}

function coverage(done) {
  _registerBabel();
  gulp.src(['client-src/**/*.js', 'server/**/*.js'])
    .pipe($.istanbul({ instrumenter: Instrumenter }))
    .pipe($.istanbul.hookRequire())
    .on('finish', () => {
      return test()
        .pipe($.istanbul.writeReports())
        .on('end', done);
    });
}

const watchFiles = ['client-src/**/*', 'test/**/*', 'package.json', '**/.eslintrc'];

// Run the headless unit tests as you make changes.
function watchTests() {
  gulp.watch(watchFiles, ['test']);
}

function testBrowser() {
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
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
          // This allows the test setup scripts to load `package.json`
          { test: /\.json$/, exclude: /node_modules/, loader: 'json-loader' }
        ]
      },
      plugins: [
        // By default, webpack does `n=>n` compilation with entry files. This concatenates
        // them into a single chunk.
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
      ],
      devtool: 'inline-source-map'
    }, null, () => {
      if (firstBuild) {
        $.livereload.listen({port: 35729, host: 'localhost', start: true});
        gulp.watch(watchFiles, ['lint']);
      } else {
        $.livereload.reload('./tmp/__spec-build.js');
      }
      firstBuild = false;
    }))
    .pipe(gulp.dest('./tmp'));
}

function build(done) {
  runSequence(
    ['lint', 'clean'],
    ['stylus', 'build-javascript'],
    done
  );
}

function work(done) {
  working = true;
  runSequence('build', done);
}

// Remove the built files
gulp.task('clean', cleanDist);

// Remove our temporary files
gulp.task('clean-tmp', cleanTmp);

// Lint our client source code
gulp.task('lint-client', lintClient);

// Lint the server code
gulp.task('lint-server', lintServer);

// Lint our test code
gulp.task('lint-test', lintTest);

// Lint this file
gulp.task('lint-gulpfile', lintGulpfile);

// Lint everything
gulp.task('lint', ['lint-client', 'lint-server', 'lint-test', 'lint-gulpfile']);

// Build *just* the JavaScript app
gulp.task('build-javascript', buildJavaScript);

// Build a production version of the application
gulp.task('build', build);

// Set up the application to be developed
gulp.task('work', work);

// Builds the CSS
gulp.task('stylus', stylus);

// Lint and run our tests
gulp.task('test', ['lint'], test);

gulp.task('watch:test', ['lint'], watchTests);

// Lint and run our API integration tests
gulp.task('test:api:integration', testApiIntegration);

// Set up coverage and run tests
gulp.task('coverage', ['lint'], coverage);

// Set up a livereload environment for our spec runner `test/runner.html`
gulp.task('test-browser', ['lint', 'clean-tmp'], testBrowser);

// Run the headless unit tests as you make changes.
gulp.task('watch-tests', watch);

// An alias of test
gulp.task('default', ['test']);
