const gulp = require('gulp');
const {cleanDist, cleanTmp} = require('./gulp/clean');
const {lintJs, lintCss} = require('./gulp/lint');
const {buildCss, build, work} = require('./gulp/build');
const {test, coverage, watchTests} = require('./gulp/test');

gulp.task('clean', cleanDist);
gulp.task('clean-tmp', cleanTmp);

gulp.task('lint-js', lintJs);
gulp.task('lint-css', lintCss);
gulp.task('lint', ['lint-js', 'lint-css']);

// Build a production version of the application
gulp.task('build', build);
gulp.task('build-css', buildCss);

// Set up the application to be developed
gulp.task('work', work);

// Runs the unit tests
gulp.task('test', ['lint'], test);
// Run the unit tests as you make changes.
gulp.task('watch-tests', ['lint'], watchTests);
// Generate a coverage report
gulp.task('coverage', ['lint'], coverage);
gulp.task('pre-test-browser', ['lint', 'clean-tmp']);

gulp.task('default', ['test']);
