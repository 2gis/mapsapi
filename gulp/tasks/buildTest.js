var gulp = require('gulp');

var { buildEnd } = require('../util/buildEnd.js');
var { buildStyles } = require('./buildStyles');
var { buildScripts } = require('./buildScripts');
var { doc } = require('./doc');
var { clean } = require('./clean');
var { loader } = require('./loader');
var { copyAssets } = require('./copyAssets');
var { copyIndexPage } = require('./copyIndexPage');

function enableTestBuild(done) {
    global.isTestBuild = true;
    done();
}

exports.buildTest = gulp.series(enableTestBuild, clean, gulp.parallel(
    buildScripts,
    buildStyles,
    doc,
    loader,
    copyAssets,
    copyIndexPage
), buildEnd);
