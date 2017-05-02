var gulp = require('gulp');
var error = require('../util/error');

gulp.task('copyAssets', function() {
    return gulp.src(['assets/**/*'])
        .pipe(error.handle())
        .pipe(gulp.dest('dist'));
});
