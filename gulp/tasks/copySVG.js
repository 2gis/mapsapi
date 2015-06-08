var flatten = require('gulp-flatten');
var rename = require('gulp-rename');
var util = require('gulp-util');
var gulp = require('gulp');
var path = require('path');

var error = require('../util/error');
var config = require('../../app/config');
var deps = require('../deps')(config);

gulp.task('copySVG', function () {
    return gulp.src(deps.getSVGGlob(util.env))
        .pipe(error.handle())
        .pipe(rename(function (p) {
            p.dirname = p.dirname.split(path.sep)[1];
        }))
        .pipe(gulp.dest('gulp/tmp/img'))
        .pipe(flatten())
        .pipe(gulp.dest('gulp/tmp/img_all'))
        .pipe(gulp.dest('dist/img'));
});
