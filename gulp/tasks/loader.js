var gulp = require('gulp');
var util = require('gulp-util');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');

var error = require('../util/error');
var config = require('../../app/config.js');

gulp.task('loader', function () {
    var originalBaseUrl = config.appConfig.protocol + config.appConfig.baseUrl;

    gulp.src('app/loader.js')
        .pipe(error.handle())
        .pipe(replace(/__ORIGINAL_BASE_URL__/g, originalBaseUrl))
        .pipe(gulpif(util.env.release, uglify()))
        .pipe(gulp.dest('dist'))
});
