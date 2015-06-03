var runSequence = require('run-sequence');
var gulp = require('gulp');

var buildEnd = require('../util/buildEnd.js');

gulp.task('build', function (cb) {
    runSequence('clean', [
        'buildScripts',
        'buildStyles',
        'doc',
        'copyPrivateAssets'
    ], function () {
        buildEnd();
        cb();
    });
});
