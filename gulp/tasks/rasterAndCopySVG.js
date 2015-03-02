var flatten = require('gulp-flatten');
var rename = require('gulp-rename');
var rsvg = require('gulp-rsvg');
var util = require('gulp-util');
var gulp = require('gulp');
var path = require('path');

var error = require('../util/error');
var config = require('../../build/config');
var deps = require('../../build/gulp-deps')(config);

gulp.task('rasterAndCopySVG', function (cb) {
    gulp.src(deps.getSVGGlob(util.env))
        .pipe(error.handle())
        .pipe(rsvg())
        .pipe(rename(function (p) {
            p.dirname = p.dirname.split(path.sep)[1];
        }))
        .pipe(gulp.dest('build/tmp/img'))
        .pipe(flatten())
        .pipe(gulp.dest('build/tmp/img_all'))
        .pipe(gulp.dest('public/img'))
        .on('end', function () {
            gulp.src(deps.getSVGGlob(util.env))
                .pipe(error.handle())
                .pipe(rsvg({scale: 2}))
                .pipe(rename(function (p) {
                    p.extname = '@2x.png';
                    p.dirname = p.dirname.split(path.sep)[1];
                }))
                .pipe(gulp.dest('build/tmp/img'))
                .pipe(flatten())
                .pipe(gulp.dest('build/tmp/img_all'))
                .pipe(gulp.dest('public/img'))
                .on('end', cb);
        });
});
