var gulp = require('gulp');

var destCSS = require('../util/destCSS');

gulp.task('buildTestStyles', ['buildClean'], function (cb) {
    destCSS({
        isTest: true
    }, cb);
});
