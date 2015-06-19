var karma = require('gulp-karma');
var util = require('gulp-util');
var gulp = require('gulp');
var _ = require('lodash');

var error = require('../util/error');
var test = require('../../test/test');
var config = require('../../app/config.js');
var deps = require('../deps')(config);

var isTestDebug = util.env.d || util.env.debug;
var testRequirements = isTestDebug ? [] : ['buildTest'];

gulp.task('test', testRequirements, function () {
    var cliOptions = _.cloneDeep(util.env);
    var modulesToTest = [];

    var sourcesList = deps.getJSFiles({source: 'testSource'}).concat([
        'gulp/tmp/testJS/config.js',
        'gulp/tmp/testJS/projectList.js',
        'node_modules/leaflet/spec/after.js',
        'node_modules/happen/happen.js',
        'node_modules/mock-geolocation/dist/geolocate.js'
    ]);

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

    sourcesList.push('node_modules/leaflet/spec/suites/SpecHelper.js');
    sourcesList.push('node_modules/leaflet/spec/suites/**/*Spec.js');

    return gulp.src(sourcesList)
        .pipe(error.handle())
        .pipe(karma({
            configFile: './test/karma.conf.js',
            browsers: test.getBrowsers(),
            reporters: test.getReporters(isTestDebug),
            junitReporter: test.getJunitReporter(),
            action: 'run',
            preprocessors: {
                'gulp/tmp/testJS/src/**/*.js': ['coverage']
            }
        }))
        .on('error', function (err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});
