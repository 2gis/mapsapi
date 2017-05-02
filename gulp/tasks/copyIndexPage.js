var gulp = require('gulp');
var error = require('../util/error');

gulp.task('copyIndexPage', function() {
    return gulp.src(['app/index.html'])
        .pipe(error.handle())
        .pipe(gulp.dest('dist'));
});
