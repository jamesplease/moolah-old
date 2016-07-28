const gulp = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const del = require('del');
const glob = require('glob');
const path = require('path');
const {Instrumenter} = require('isparta');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const runSequence = require('run-sequence');
const precss = require('precss');
const cssnano = require('cssnano');
const postcssSass = require('postcss-scss');
const easyImport = require('postcss-easy-import');

const mochaGlobals = require('./test/setup/.globals');
const manifest = require('./package.json');

// Load all of our Gulp plugins
const $ = loadPlugins();

const productionMode = process.env.NODE_ENV === 'production';

// Gather the library data from `package.json`
const config = manifest.babelBoilerplateOptions;
const mainFile = manifest.main;
const destinationFolder = path.dirname(mainFile);
const exportFileName = path.basename(mainFile, path.extname(mainFile));

var working = false;

function lintCss() {
  return gulp.src('./client-src/**/*.css')
    .pipe($.stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ],
      syntax: 'scss'
    }));
}

function css() {
  const processors = [
    easyImport({glob: true}),
    precss({import: {prefix: ''}}),
  ];

  if (productionMode) {
    processors.push(cssnano());
  }

  return gulp.src('./client-src/css/index.css')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.postcss(processors, {parser: postcssSass}))
    .pipe($.concat('style.css'))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('client-dist'))
    // Ensure that only the CSS files, and not source maps, are sent to
    // livereload, otherwise there will be a hard page refresh. Note that
    // this causes the source mapped file to drift from what you're working on.
    // I'm still using source maps because the file name itself rarely changes,
    // and is useful for debugging.
    .pipe($.filter('**/*.css'))
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
  return lint(['client-src/**/*.js', '!client-src/vendor/**/*.js']);
}

function lintTest() {
  return lint('test/**/*.js');
}

function lintGulpfile() {
  return lint('gulpfile.babel.js');
}

function watch() {
  return $.watch([
    // Just in case the CSS task changes
    'gulpfile.babel.js',
    './client-src/**/*.css'
  ], css);
}

function buildJavaScript() {
  var firstBuild = true;

  const webpackPlugins = [];
  if (productionMode) {
    webpackPlugins.push(new webpack.EnvironmentPlugin(['NODE_ENV']));
  }

  return gulp.src(path.join('client-src', `${config.entryFileName}.js`))
    .pipe($.plumber())
    .pipe(webpackStream({
      watch: working,
      output: {
        filename: `${exportFileName}.js`
      },
      module: {
        loaders: [
          {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
      },
      plugins: webpackPlugins,
      devtool: 'source-map'
    }, null, () => {
      if (!working) {
        return;
      }

      if (firstBuild) {
        $.livereload.listen({port: 35729, host: 'localhost', start: true});
        watch();
      } else {
        $.livereload.reload('http://localhost:5000');
      }
      firstBuild = false;
    }))
    // We need to remove the source maps so that Uglify doesn't explode on them.
    .pipe($.if(productionMode, $.filter('**/*.js')))
    .pipe($.if(productionMode, $.sourcemaps.init({loadMaps: true})))
    .pipe($.if(productionMode, $.uglify()))
    .pipe($.if(productionMode, $.sourcemaps.write('./')))
    .pipe(gulp.dest(destinationFolder));
}

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
const integrationTestFiles = [
  'test/integration/**/*.js'
];

function testUnit() {
  _registerBabelForTests();
  return runMochaTests([].concat(setupTestFile, clientTestFiles));
}

function testApiIntegration() {
  _registerBabelForTests();
  return runMochaTests([].concat(setupTestFile, integrationTestFiles));
}

function test() {
  _registerBabelForTests();
  return runMochaTests([].concat(setupTestFile, clientTestFiles, integrationTestFiles));
}

function coverage(done) {
  _registerBabelForTests();
  gulp.src(['client-src/**/*.js', 'server/**/*.js', '!client-src/vendor/**/*.js'])
    .pipe($.istanbul({
      instrumenter: Instrumenter,
      includeUntested: true
    }))
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
  $.watch(watchFiles, test);
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
        $.watch(watchFiles, lint);
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
    ['css', 'build-javascript'],
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

gulp.task('lint-css', lintCss);

// Lint everything
gulp.task('lint', ['lint-client', 'lint-server', 'lint-test', 'lint-gulpfile', 'lint-css']);

// Build *just* the JavaScript app
gulp.task('build-javascript', buildJavaScript);

// Build a production version of the application
gulp.task('build', build);

// Set up the application to be developed
gulp.task('work', work);

// Builds the CSS
gulp.task('css', css);

// Lint and run our tests
gulp.task('test', ['lint'], test);

// Lint and run our API integration tests
gulp.task('test:unit', testUnit);

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
