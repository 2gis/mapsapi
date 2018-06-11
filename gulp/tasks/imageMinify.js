var imagemin = require('gulp-imagemin');
var argv = require('minimist')(process.argv.slice(2));
var gulpif = require('gulp-if');
var gulp = require('gulp');

gulp.task('imageMinify', [
    'copyAssets',
    'copyImg',
    'generateSprites'
], function() {
    return gulp.src('dist/img/**/*.{png,gif,jpg,jpeg}')
        .pipe(gulpif(argv.release, imagemin()))
        .pipe(gulp.dest('dist/img'));
});
