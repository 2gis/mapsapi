var karma = require('gulp-karma');
var util = require('gulp-util');
var extend = require('extend');
var gulp = require('gulp');

var error = require('../util/error');
var test = require('../../test/test');

var isTestDebug = util.env.d || util.env.debug;
var testRequirements = (isTestDebug) ? [] : ['buildTest'];

gulp.task('test', testRequirements, function () {
    var cliOptions = extend({}, util.env);
    var modulesToTest = [];
    var sourcesList = [
        'vendors/leaflet/spec/before.js',
        'public/js/script.js',
        'vendors/leaflet/spec/after.js',
        'node_modules/happen/happen.js',
        'test/geolocate.js'
    ];

    if ('m' in cliOptions) {
        modulesToTest = cliOptions.m.split(',');
    }

    if ('module' in cliOptions) {
        modulesToTest = cliOptions.module.split(',');
    }

    if (modulesToTest.length) {
        modulesToTest.forEach(function (moduleName) {
            sourcesList.push('src/' + moduleName + '/test/*Spec.js');
        });
    } else {
        sourcesList.push('src/**/test/*Spec.js');
    }

    sourcesList.push('vendors/leaflet/spec/suites/SpecHelper.js');
    sourcesList.push('vendors/leaflet/spec/suites/**/*Spec.js');

    return gulp.src(sourcesList)
        .pipe(error.handle())
        .pipe(karma({
            configFile: './test/karma.conf.js',
            browsers: test.getBrowsers(),
            reporters: test.getReporters(isTestDebug),
            junitReporter: test.getJunitReporter(),
            action: 'run'
        }))
        .on('error', function (err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});
