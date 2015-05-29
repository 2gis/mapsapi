var imagemin = require('gulp-imagemin');
var util = require('gulp-util');
var gulpif = require('gulp-if');
var gulp = require('gulp');

gulp.task('imageMinify', [
    'copyImg',
    'copyRaster',
    'rasterAndCopySVG',
    'generateSprites'
], function () {
    return gulp.src('public/img/**/*.{png,gif,jpg,jpeg}')
        .pipe(gulpif(util.env.release, imagemin()))
        .pipe(gulp.dest('public/img'));
});
