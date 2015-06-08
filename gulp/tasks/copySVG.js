var flatten = require('gulp-flatten');
var rename = require('gulp-rename');
var util = require('gulp-util');
var gulp = require('gulp');
var path = require('path');

var error = require('../util/error');
var config = require('../../build/config');
var deps = require('../../build/gulp-deps')(config);

gulp.task('copySVG', function () {
    return gulp.src(deps.getSVGGlob(util.env))
        .pipe(error.handle())
        .pipe(rename(function (p) {
            p.dirname = p.dirname.split(path.sep)[1];
        }))
        .pipe(gulp.dest('build/tmp/img'))
        .pipe(flatten())
        .pipe(gulp.dest('build/tmp/img_all'))
        .pipe(gulp.dest('dist/img'));
});
