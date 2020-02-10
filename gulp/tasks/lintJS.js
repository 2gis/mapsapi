var eslint = require('gulp-eslint');
var gulp = require('gulp');

var error = require('../util/error');

exports.lintJS = function lintJS() {
    return gulp.src('src/**/src/**/*.js')
        .pipe(error.handle())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
};
