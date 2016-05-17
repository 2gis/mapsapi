var buildEnd = require('../util/buildEnd.js');
var config = require('../../app/config.js');
var runSequence = require('run-sequence');
var util = require('gulp-util');
var gulp = require('gulp');

gulp.task('build', function (cb) {
    if (util.env.npm) {
        // Disable local config for npm builds
        config.appConfig = config.mainConfig;

        // Make npm builds https-only
        config.appConfig.protocol = 'https:';
    }

    runSequence('clean', [
        'buildScripts',
        'buildStyles',
        'doc',
        'loader',
        'copyAssets',
        'copyIndexPage',
        'hooks'
    ], function () {
        buildEnd();
        cb();
    });
});
