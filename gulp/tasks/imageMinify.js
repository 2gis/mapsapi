var imagemin = require('gulp-imagemin');
var argv = require('minimist')(process.argv.slice(2));
var gulpif = require('gulp-if');
var gulp = require('gulp');
var { copyAssets } = require('./copyAssets');
var { copyImg } = require('./copyImg');
var { generateSprites } = require('./generateSprites');

function imageMinify() {
    return gulp.src('dist/img/**/*.{png,gif,jpg,jpeg}')
        .pipe(gulpif(argv.release, imagemin()))
        .pipe(gulp.dest('dist/img'));
}

exports.imageMinify = gulp.series(
    gulp.parallel(
        copyAssets,
        copyImg,
        generateSprites
    ),
    imageMinify,
);
