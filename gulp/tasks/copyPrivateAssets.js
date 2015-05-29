var uglify = require('gulp-uglify');
var es = require('event-stream');
var gulpif = require('gulp-if');
var util = require('gulp-util');
var gulp = require('gulp');

var error = require('../util/error');

gulp.task('copyPrivateAssets', ['copyFonts', 'copyImg'], function (cb) {
    var stream = es.concat(
        gulp.src(['private/*.*', '!./private/loader.js'])
            .pipe(error.handle())
            .pipe(gulp.dest('public/')),

        gulp.src('private/loader.js')
            .pipe(error.handle())
            .pipe(gulpif(util.env.release, uglify()))
            .pipe(gulp.dest('public/'))
    );

    stream.on('end', cb);
});
