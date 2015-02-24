var flatten = require('gulp-flatten');
var rsvg = require('gulp-rsvg');
var rename = require('gulp-rename');
var util = require('gulp-util');
var gulp = require('gulp');
var path = require('path');

var imagemin = require('../../build/gulp-imagemin');
var error = require('../util/error');

gulp.task('copySVGRaster', ['buildClean'], function (cb) {
    util.log(util.colors.green('Converting SVG to PNG. It can take a long time, please, be patient'));

    gulp.src('src/**/img/**/*.svg')
        .pipe(error.handle())
        .pipe(rsvg())
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
                .pipe(rsvg({scale: 2}))
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
