var buildEnd = require('../util/buildEnd.js');
var config = require('../../app/config.js');
var runSequence = require('run-sequence');
var argv = require('minimist')(process.argv.slice(2));
var gulp = require('gulp');

gulp.task('build', function (cb) {
    if (argv.npm) {
        // Disable local config for npm builds
        config.appConfig = config.mainConfig;

        // Make npm builds https-only
        config.appConfig.protocol = 'https:';
    }

    runSequence('clean', 'buildStyles', [
        'buildScripts',
        'doc',
        'loader',
        'copyAssets',
        'copyIndexPage'
    ], function() {
        buildEnd();
        cb();
    });
});
