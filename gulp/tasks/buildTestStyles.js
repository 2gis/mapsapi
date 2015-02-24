var gulp = require('gulp');

var destCSS = require('../util/destCSS');

gulp.task('buildTestStyles', function (cb) {
    destCSS({
        isTest: true
    }, cb);
});
