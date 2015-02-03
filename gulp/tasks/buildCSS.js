
var gulp = require('gulp');

var destCSS = require('../util/destCSS');

gulp.task('buildCSS', ['buildClean', 'collectImagesStats', 'generateSprites'], function (cb) {
    destCSS({}, cb);
});
