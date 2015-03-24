var eslint = require('gulp-eslint');
var gulp = require('gulp');

var error = require('../util/error');

gulp.task('lintJS', function () {
    return gulp.src('src/**/src/**/*.js')
        .pipe(error.handle())
        .pipe(eslint())
        .pipe(eslint.format());
});
