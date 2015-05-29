var gulp = require('gulp');

var destCSS = require('../util/destCSS');

gulp.task('buildTestStyles', function () {
    return destCSS({isTest: true});
});
