var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('watch', function () {
    gulp.watch('src/doc/**/*.*', ['doc']);

    gulp.watch('assets/**/*', function () {
        runSequence('copyAssets', 'server');
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

    gulp.watch(['app/index.js', 'config.local.json'], ['server']);

    gulp.watch('app/loader.js', function () {
        runSequence('loader', 'server');
    });

    gulp.watch('app/index.html', function() {
        runSequence('copyIndexPage', 'server');
    });
});
