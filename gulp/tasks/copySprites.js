var gulp = require('gulp');

var error = require('../util/error');

gulp.task('copySprites', ['copySVG', 'generateSprites'], function () {
    return gulp.src('build/tmp/img/sprite*.png')
        .pipe(error.handle())
        .pipe(gulp.dest('dist/img'));
});
