var jshint = require('gulp-jshint');
var cache = require('gulp-cache');
var gulp = require('gulp');

var error = require('../util/error');

gulp.task('lint', function () {
    return gulp.src('src/**/src/**/*.js')
        .pipe(error.handle())
        .pipe(cache(jshint('.jshintrc')))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});
