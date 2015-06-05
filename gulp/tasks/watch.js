var gulp = require('gulp');
var destCSS = require('../util/destCSS');
var runSequence = require('run-sequence');

gulp.task('watch', function () {
    gulp.watch('src/doc/**/*.*', ['doc']);

    gulp.watch('private/*.*', function () {
        runSequence('copyPrivateAssets', 'server');
    });

    gulp.watch([
        'src/**/*.js',
        'vendors/leaflet/src/**/*.*'
    ], function () {
        runSequence('buildScripts', 'server');
    });

    gulp.watch('src/**/*.less', function () {
        runSequence('rebuildCSS', 'server');
    });

    gulp.watch('config.main.json', function () {
        runSequence('build', 'server');
    });

    gulp.watch(['app.js', 'config.local.json'], ['server']);
});
