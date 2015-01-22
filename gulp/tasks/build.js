var gulp = require('gulp');

var buildEnd = require('../util/buildEnd.js');

gulp.task('build', [
    'buildClean',
    'buildScripts',
    'buildStyles',
    'doc',
    'copyPrivateAssets'
], buildEnd);
