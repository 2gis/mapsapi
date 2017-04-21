var runSequence = require('run-sequence');
var gulp = require('gulp');

var buildEnd = require('../util/buildEnd.js');

gulp.task('buildTestFunc', function(cb) {
    global.isTestBuild = true;

    runSequence('clean', [
        'buildScripts',
        'buildStyles',
        'doc',
        'copyPrivateAssets'
    ], function() {
        buildEnd();
        cb();
    });
});
