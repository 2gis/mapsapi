var { buildEnd } = require('../util/buildEnd.js');
var config = require('../../app/config.js');
var argv = require('minimist')(process.argv.slice(2));
var gulp = require('gulp');
var { clean } = require('./clean');
var { buildStyles } = require('./buildStyles');
var { buildScripts } = require('./buildScripts');
var { doc } = require('./doc');
var { loader } = require('./loader');
var { copyAssets } = require('./copyAssets');
var { copyIndexPage } = require('./copyIndexPage');

function npmConfigModify(done) {
    if (argv.npm) {
        // Disable local config for npm builds
        config.appConfig = config.mainConfig;

        // Make npm builds https-only
        config.appConfig.protocol = 'https:';
    }
    done();
}

exports.build = gulp.series(npmConfigModify, clean, buildStyles, gulp.parallel(
    buildScripts,
    doc,
    loader,
    copyAssets,
    copyIndexPage
), buildEnd);
