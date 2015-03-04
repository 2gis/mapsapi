var runSequence = require('run-sequence');
var gulp = require('gulp');

var buildEnd = require('../util/buildEnd.js');

gulp.task('buildTest', function (cb) {
    runSequence('clean', [
        'checkPackage',
        'buildTestScripts',
        'buildTestStyles',
        'doc',
        'copyPrivateAssets'
    ], function() {
        buildEnd();
        cb();
    });
});
