
var runSequence = require('run-sequence');
var gulp = require('gulp');

var destCSS = require('../util/destCSS');

gulp.task('buildStyles-notLint', ['buildClean', 'collectImagesStats', 'generateSprites'], function (cb) {
    destCSS({}, cb);
});

gulp.task('buildStyles', function (cb) {
    runSequence('buildStyles-notLint', 'lintCSS', cb);
});
