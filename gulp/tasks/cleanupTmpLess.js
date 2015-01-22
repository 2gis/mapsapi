var rimraf = require('gulp-rimraf');
var gulp = require('gulp');

var error = require('../util/error');

gulp.task('cleanupTmpLess', function () {
    return gulp.src(['build/tmp/less/*'], {read: false})
        .pipe(rimraf());
});
