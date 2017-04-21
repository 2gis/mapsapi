var bump = require('gulp-bump');
var util = require('gulp-util');
var gulp = require('gulp');

gulp.task('bump', function() {
    return gulp.src('package.json')
        .pipe(bump(util.env))
        .pipe(gulp.dest('./'));
});
