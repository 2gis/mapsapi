var flatten = require('gulp-flatten');
var gulp = require('gulp');

var error = require('../util/error');

gulp.task('copyFonts', function () {
    return gulp.src('src/**/fonts/**/*.*')
        .pipe(error.handle())
        .pipe(flatten())
        .pipe(gulp.dest('public/fonts/'));
});
