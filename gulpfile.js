const gulp = require('gulp');
const {cleanDist, cleanTmp} = require('./gulp/clean');
const {lintJs, lintCss} = require('./gulp/lint');
const {buildCss, buildJavaScript, build, work} = require('./gulp/build');
const {test, coverage, watchTests, testBrowser} = require('./gulp/test');

gulp.task('clean', cleanDist);
gulp.task('clean-tmp', cleanTmp);

gulp.task('lint-js', lintJs);
gulp.task('lint-css', lintCss);
gulp.task('lint', ['lint-js', 'lint-css']);

// Build a production version of the application
gulp.task('build', build);
gulp.task('build-css', buildCss);
gulp.task('build-javascript', buildJavaScript);

// Set up the application to be developed
gulp.task('work', work);

// Runs the unit tests
gulp.task('test', ['lint'], test);
// Run the unit tests as you make changes.
gulp.task('watch-tests', ['lint'], watchTests);
// Generate a coverage report
gulp.task('coverage', ['lint'], coverage);
// Set up a livereload environment for our spec runner `test/runner.html`
gulp.task('test-browser', ['lint', 'clean-tmp'], testBrowser);

gulp.task('default', ['test']);
