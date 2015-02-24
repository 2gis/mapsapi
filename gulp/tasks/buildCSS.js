
var gulp = require('gulp');

var destCSS = require('../util/destCSS');

gulp.task('buildCSS', ['collectImagesStats', 'generateSprites'], function (cb) {
    destCSS({}, cb);
});
