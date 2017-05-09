const loadPlugins = require('gulp-load-plugins');
const runSequence = require('run-sequence');
const {buildCss} = require('./build');

const $ = loadPlugins();

function startServer() {
  $.livereload.listen();
}

exports.css = () => {
  return $.watch('./client/**/*.css', () => {
    return buildCss();
  });
};

exports.js = () => {
  return $.watch('./client-dist/app.js', () => {
    $.livereload.reload();
  });
};

exports.all = (done) => {
  startServer();

  runSequence(['livereload-css', 'livereload-js'], done);
};
