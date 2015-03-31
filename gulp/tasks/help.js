var util = require('gulp-util');
var gulp = require('gulp');

gulp.task('help', function () {
    util.log('Tasks list:');
    util.log('gulp lint        # Check JS files for errors with ESLint');
    util.log('gulp build       # Lint, combine and minify source files, update doc, copy assets');
    util.log('gulp doc         # Generate documentation from .md files');
    util.log('gulp test        # Rebuild source and run unit tests');
    util.log('gulp watch       # Starts watching private & leaflet/src folders');
});
