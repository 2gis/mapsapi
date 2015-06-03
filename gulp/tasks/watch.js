var gulp = require('gulp');
var destCSS = require('../util/destCSS');
var runSequence = require('run-sequence');

gulp.task('watch', function () {
    gulp.watch('private/*.*', ['copyPrivateAssets']);
    gulp.watch('vendors/leaflet/src/**/*.*', ['buildLeaflet']);
    gulp.watch('src/doc/**/*.*', ['doc']);
    gulp.watch('src/**/*.js', ['buildScripts']);
    gulp.watch('src/**/*.less', ['rebuildCSS']);
});
