var imagemin = require('gulp-imagemin');
var util = require('gulp-util');
var gulpif = require('gulp-if');
var gulp = require('gulp');

gulp.task('imageMinify', [
    'copyAssets',
    'copyImg',
    'generateSprites'
], function () {
    return gulp.src('dist/img/**/*.{png,gif,jpg,jpeg}')
        .pipe(gulpif(util.env.release, imagemin()))
        .pipe(gulp.dest('dist/img'));
});
