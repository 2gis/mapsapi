var gulp = require('gulp');

var destCSS = require('../util/destCSS');

gulp.task('buildStyles', ['buildClean', 'collectImagesStats', 'generateSprites'], function (cb) {
    destCSS({}, cb);
});
