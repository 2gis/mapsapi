var gulp = require('gulp');

var destCSS = require('../util/destCSS');

gulp.task('buildStyles', [
    'collectImagesStats',
    'generateSprites',
    'imageMinify'
], function() {
    return destCSS();
});
