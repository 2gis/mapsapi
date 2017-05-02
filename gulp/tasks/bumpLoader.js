var gulp = require('gulp');

var config = require('../../app/config');

gulp.task('bumpLoader', ['bump'], function(done) {
    config.updateLoaderVersion(done);
});
