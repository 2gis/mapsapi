var runSequence = require('run-sequence');
var gulp = require('gulp');

var buildEnd = require('../util/buildEnd.js');

gulp.task('buildTestFunc', function (cb) {
    global.isConcatJS = true;

    runSequence('clean', [
        'buildTestScripts',
        'buildTestStyles',
        'doc',
        'copyPrivateAssets'
    ], function () {
        buildEnd();
        cb();
    });
});
