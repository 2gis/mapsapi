var gulp = require('gulp');

gulp.task('hooks', function() {
    return gulp.src('hooks/pre-push')
        .pipe(gulp.dest('.git/hooks'));
});
