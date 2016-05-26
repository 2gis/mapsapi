var gulp = require('gulp');
var destCSS = require('../util/destCSS');

gulp.task('rebuildStyles', function () {
    return destCSS();
});
