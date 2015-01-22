var flatten = require('gulp-flatten');
var svg2png = require('gulp-svg2png');
var rename = require('gulp-rename');
var newer = require('gulp-newer');
var util = require('gulp-util');
var gulp = require('gulp');
var path = require('path');

var imagemin = require('../../build/gulp-imagemin');
var error = require('../util/error');

gulp.task('copySVGRaster', ['buildClean'], function (cb) {
    util.log(util.colors.green('Converting SVG to PNG. It can take a long time, please, be patient'));

    gulp.src('src/**/img/**/*.svg')
        .pipe(error.handle())
        .pipe(newer({dest: 'build/tmp/img_newer', ext: '.png'}))
        .pipe(svg2png())
        .pipe(rename(function (p) {
            p.dirname = p.dirname.split(path.sep)[2];
        }))
        .pipe(imagemin({silent: true}))
        .pipe(gulp.dest('build/tmp/img'))
        .pipe(flatten())
        .pipe(gulp.dest('build/tmp/img_all'))
        .pipe(gulp.dest('public/img'))
        .on('end', function () {
            gulp.src('src/**/img/**/*.svg')
                .pipe(error.handle())
                .pipe(newer({dest: 'build/tmp/img_newer', ext: '.png'}))
                .pipe(svg2png(2))
                .pipe(gulp.dest('build/tmp/img_newer'))
                .pipe(rename(function (p) {
                    p.extname = '@2x.png';
                    p.dirname = p.dirname.split(path.sep)[2];
                }))
                .pipe(imagemin({silent: true}))
                .pipe(gulp.dest('build/tmp/img'))
                .pipe(flatten())
                .pipe(gulp.dest('build/tmp/img_all'))
                .pipe(gulp.dest('public/img'))
                .on('end', cb);
        });
});
