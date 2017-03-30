const gulp = require('gulp');
const path = require('path');
const loadPlugins = require('gulp-load-plugins');
const precss = require('precss');
const cssnano = require('cssnano');
const postcssSass = require('postcss-scss');
const easyImport = require('postcss-easy-import');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const runSequence = require('run-sequence');
const manifest = require('../package.json');

// Gather the library data from `package.json`
const config = manifest.babelBoilerplateOptions;
const mainFile = manifest.main;
const destinationFolder = path.dirname(mainFile);
const exportFileName = path.basename(mainFile, path.extname(mainFile));

const $ = loadPlugins();
const productionMode = process.env.NODE_ENV === 'production';

var working = false;

exports.buildCss = () => {
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
};

function watch() {
  return $.watch([
    // Just in case the CSS task changes
    'gulpfile.babel.js',
    './client-src/**/*.css'
  ], exports.buildCss);
}

exports.buildJavaScript = () => {
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
};

exports.build = done => {
  runSequence(
    ['lint', 'clean'],
    ['build-css', 'build-javascript'],
    done
  );
};

exports.work = done => {
  working = true;
  runSequence('build', done);
};
