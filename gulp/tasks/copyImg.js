var flatten = require('gulp-flatten');
var es = require('event-stream');
var gulp = require('gulp');

var error = require('../util/error');

gulp.task('copyImg', function (cb) {
    var stream = es.concat(
        gulp.src('private/img/*.*')
            .pipe(error.handle())
            .pipe(gulp.dest('public/img')),

        gulp.src('vendors/leaflet/dist/images/*')
            .pipe(error.handle())
            .pipe(gulp.dest('public/img/vendors/leaflet'))
    );

    stream.on('end', cb);
});
