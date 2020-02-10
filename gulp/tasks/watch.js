var gulp = require('gulp');

var { doc } = require('./doc');
var { copyAssets } = require('./copyAssets');
var { server } = require('./server');
var { buildScripts } = require('./buildScripts');
var { rebuildStyles } = require('./rebuildStyles');
var { build } = require('./build');
var { loader } = require('./loader');
var { copyIndexPage } = require('./copyIndexPage');

exports.watch = function watch() {
    gulp.watch('src/doc/**/*.*', doc);

    gulp.watch('assets/**/*', gulp.series(copyAssets, server));

    gulp.watch([
        'src/**/*.js',
        'vendors/leaflet/src/**/*.*'
    ], gulp.series(buildScripts, server));

    gulp.watch('src/**/*.less', gulp.series(rebuildStyles, server));

    gulp.watch('config.main.json', gulp.series(build, server));

    gulp.watch(['app/index.js', 'config.local.json'], server);

    gulp.watch('app/loader.js', gulp.series(loader, server));

    gulp.watch('app/index.html', gulp.series(copyIndexPage, server));
};
