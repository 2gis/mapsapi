var log = require('fancy-log');
var gulp = require('gulp');

gulp.task('help', function() {
    log('Tasks list:');
    log('gulp lint        # Check JS files for errors with ESLint');
    log('gulp build       # Lint, combine and minify source files, update doc, copy assets');
    log('gulp doc         # Generate documentation from .md files');
    log('gulp test        # Rebuild source and run unit tests');
    log('gulp watch       # Starts watching private & leaflet/src folders');
});
