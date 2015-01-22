var flatten = require('gulp-flatten');
var rename = require('gulp-rename');
var gulp = require('gulp');
var path = require('path');

var imagemin = require('../../build/gulp-imagemin');
var error = require('../util/error');

gulp.task('copySVG', ['buildClean'], function () {
    return gulp.src('src/**/img/**/*.svg')
        .pipe(error.handle())
        .pipe(imagemin({silent: true}))
        .pipe(rename(function (p) {
            p.dirname = p.dirname.split(path.sep)[2];
        }))
        .pipe(gulp.dest('build/tmp/img'))
        .pipe(flatten())
        .pipe(gulp.dest('build/tmp/img_all'))
        .pipe(gulp.dest('public/img'));
});
