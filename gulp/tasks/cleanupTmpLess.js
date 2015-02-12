var gulp = require('gulp');
var del = require('del');

var error = require('../util/error');

gulp.task('cleanupTmpLess', function (cb) {
    del([
        'build/tmp/less/*'
    ], cb);
});
