var gulp = require('gulp');
var error = require('../util/error');

exports.copyIndexPage = function copyIndexPage() {
    return gulp.src(['app/index.html'])
        .pipe(error.handle())
        .pipe(gulp.dest('dist'));
};
