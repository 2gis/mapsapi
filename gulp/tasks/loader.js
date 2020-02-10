var gulp = require('gulp');
var argv = require('minimist')(process.argv.slice(2));
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');

var error = require('../util/error');
var config = require('../../app/config.js');

exports.loader = function loader() {
    var originalBaseUrl = config.appConfig.protocol + config.appConfig.baseUrl;

    return gulp.src('app/loader.js')
        .pipe(error.handle())
        .pipe(replace(/__ORIGINAL_BASE_URL__/g, originalBaseUrl))
        .pipe(gulpif(argv.release, uglify()))
        .pipe(gulp.dest('dist'));
};
