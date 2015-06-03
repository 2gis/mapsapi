var gulp = require('gulp');
var destCSS = require('../util/destCSS');

gulp.task('rebuildCSS', function () {
    return destCSS();
});
