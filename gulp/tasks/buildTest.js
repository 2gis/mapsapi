var runSequence = require('run-sequence');
var gulp = require('gulp');

var buildEnd = require('../util/buildEnd.js');

gulp.task('buildTest', function (cb) {
    global.isTestBuild = true;

    runSequence('clean', [
        'buildScripts',
        'buildStyles',
        'doc',
        'loader',
        'copyAssets',
        'copyIndexPage'
    ], function () {
        buildEnd();
        cb();
    });
});
