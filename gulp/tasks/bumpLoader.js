var gulp = require('gulp');

var config = require('../../build/config');

gulp.task('bumpLoader', ['bump'], function (done) {
    config.updateLoaderVersion(done);
});
