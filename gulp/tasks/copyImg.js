var rename = require('gulp-rename');
var util = require('gulp-util');
var gulp = require('gulp');

var error = require('../util/error');
var config = require('../../app/config');
var deps = require('../deps')(config);

gulp.task('copyImg', function () {

    return gulp.src(deps.getImgGlob(util.env))
        .pipe(error.handle())
        .pipe(rename(function (p) {
            p.dirname = '';
        }))
        .pipe(gulp.dest('dist/img'));
});
