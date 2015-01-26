
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var error = require('../util/error');

gulp.task('lintJS', function () {
    return gulp.src('src/**/src/**/*.js')
        .pipe(error.handle())
        .pipe($.cache($.jshint('.jshintrc')))
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});
