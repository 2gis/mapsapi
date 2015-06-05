var runSequence = require('run-sequence');
var gulp = require('gulp');

var buildEnd = require('../util/buildEnd.js');

gulp.task('dev', function (cb) {
    runSequence('build', 'server', 'watch', cb);
});
