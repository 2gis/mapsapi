var imagemin = require('gulp-imagemin');
var gulp = require('gulp');

gulp.task('imageMinify', [
    'copyImg',
    'copyRaster',
    'rasterAndCopySVG',
    'generateSprites'
], function () {
    return gulp.src('public/img/**/*.{png,gif,jpg,jpeg}')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img'));
});
