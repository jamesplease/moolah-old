const gulp = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const precss = require('precss');
const cssnano = require('cssnano');
const postcssSass = require('postcss-scss');
const easyImport = require('postcss-easy-import');
const runSequence = require('run-sequence');

const $ = loadPlugins();
const productionMode = process.env.NODE_ENV === 'production';

exports.buildCss = () => {
  const processors = [
    easyImport({glob: true}),
    precss({import: {prefix: ''}}),
  ];

  if (productionMode) {
    processors.push(cssnano());
  }

  return gulp.src('./client/css/index.css')
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

exports.build = done => {
  runSequence(
    ['lint', 'clean'],
    ['build-css'],
    done
  );
};

exports.work = done => {
  runSequence('build', done);
};
