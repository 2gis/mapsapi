var uglify = require('gulp-uglify');
var es = require('event-stream');
var frep = require('gulp-frep');
var gulp = require('gulp');

var error = require('../util/error');
var config = require('../../build/config');

gulp.task('copyPrivateAssets', ['copyFonts', 'copyImg'], function (cb) {
    var stream = es.concat(
        gulp.src(['private/*.*', '!./private/loader.js', '!./private/index.html'])
            .pipe(error.handle())
            .pipe(gulp.dest('public/')),

        gulp.src('private/index.html')
            .pipe(error.handle())
            .pipe(frep(config.cfgParams()))
            .pipe(gulp.dest('public/')),

        gulp.src('private/loader.js')
            .pipe(error.handle())
            .pipe(frep(config.cfgParams()))
            .pipe(uglify())
            .pipe(gulp.dest('public/'))
    );

    stream.on('end', cb);
});
