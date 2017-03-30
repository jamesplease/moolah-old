const gulp = require('gulp');
const loadPlugins = require('gulp-load-plugins');

const $ = loadPlugins();

exports.lintCss = () => gulp.src('./client-src/**/*.css')
  .pipe($.stylelint({
    reporters: [
      {formatter: 'string', console: true}
    ],
    syntax: 'scss'
  }));

exports.lintJs = () => gulp.src([
  'client-src/**/*.js', '!client-src/vendor/**/*.js',
  'server/**/*.js', 'test/**/*.js', 'gulpfile.js',
  'gulp/**/*.js'
])
  .pipe($.eslint())
  .pipe($.eslint.format())
  .pipe($.eslint.failAfterError());
