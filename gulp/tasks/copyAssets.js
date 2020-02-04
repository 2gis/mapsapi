var gulp = require('gulp');
var error = require('../util/error');

exports.copyAssets = function copyAssets() {
    return gulp.src(['assets/**/*'])
        .pipe(error.handle())
        .pipe(gulp.dest('dist'));
};
