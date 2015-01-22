var rimraf = require('gulp-rimraf');
var gulp = require('gulp');

gulp.task('buildClean', function () {
    return gulp.src([
        'public/js',
        'public/css',
        'public/fonts',
        'public/doc',
        'public/*.*'
    ], {read: false})
        .pipe(rimraf());
});
