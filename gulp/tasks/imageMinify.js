var imagemin = require('gulp-imagemin');
var gulp = require('gulp');

gulp.task('imageMinify', [
    'copyImg',
    'copyRaster',
    'copySVGRaster',
    'generateSprites'
], function () {
    return gulp.src('public/img/**/*.{png,gif,jpg,jpeg}')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img'));
});
