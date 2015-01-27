var gulp = require('gulp');

var buildEnd = require('../util/buildEnd.js');

gulp.task('buildTest', [
    'buildClean',
    'buildTestScripts',
    'buildTestStyles',
    'doc',
    'copyPrivateAssets'
], buildEnd);
