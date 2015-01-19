var gulp = require('gulp');

var buildEnd = require('../util/buildEnd.js');

gulp.task('buildTest', [
    'buildClean',
    'buildScripts',
    'buildTestStyles',
    'doc',
    'copyPrivateAssets'
], buildEnd);
