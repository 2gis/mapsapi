var Server = require('karma').Server;
var argv = require('minimist')(process.argv.slice(2));
var gulp = require('gulp');
var path = require('path');
var glob = require('glob');
var log = require('fancy-log');
var _ = require('lodash');

var { buildTest } = require('./buildTest');

var test = require('../../test/test');
var excludedTests = require('../../test/excludedTests.js') || [];

var isTestDebug = argv.d || argv.debug;
var testRequirements = isTestDebug ? [] : [buildTest];
var itemsInChunk = 10; // items in chunk by default

function performTest(done) {
    var cliOptions = _.cloneDeep(argv);
    var modulesToTest = [];
    var currentChunk = 0;

    var sourcesList = [
        'dist/js/script.full.js',
        'node_modules/leaflet/spec/after.js',
        'node_modules/happen/happen.js',
        'node_modules/prosthetic-hand/dist/prosthetic-hand.js',
        'node_modules/leaflet/spec/suites/SpecHelper.js',
        'node_modules/mock-geolocation/dist/geolocate.js',
        'test/after.js'
    ];

    if ('m' in cliOptions) {
        modulesToTest = cliOptions.m.split(',');
    }

    if ('module' in cliOptions) {
        modulesToTest = cliOptions.module.split(',');
    }

    var modulesToTestSourceList = [];

    if (modulesToTest.length) {
        modulesToTest.forEach(function(moduleName) {
            modulesToTestSourceList = modulesToTestSourceList.concat(glob.sync('src/' + moduleName + '/test/*Spec.js'));
        });
    } else {
        modulesToTestSourceList = modulesToTestSourceList.concat(glob.sync('src/**/test/*Spec.js'));
    }
    modulesToTestSourceList = modulesToTestSourceList.concat(glob.sync('node_modules/leaflet/spec/suites/**/*Spec.js'));

    modulesToTestSourceList = _.difference(modulesToTestSourceList, excludedTests);

    var splittedModules = _.chunk(modulesToTestSourceList, itemsInChunk);

    var numberOfChunks = splittedModules.length;

    log('\nITEMS IN CHUNK: ' + itemsInChunk);
    log('NUMBER OF CHUNKS: ' + numberOfChunks);

    // Flag of existing errors.
    var totalErr = false;

    // Function will be run recursive, because need execute chunks in order.
    function startServer(err) {
        totalErr = err || totalErr;
        log('\nCHUNK #' + currentChunk.toString());

        var localeSourceList = sourcesList.concat(splittedModules[currentChunk]);
        currentChunk++;

        localeSourceList.push('node_modules/leaflet/spec/suites/SpecHelper.js');

        function localDone(errDone) {
            totalErr = errDone || totalErr;
            done(totalErr);
        }

        new Server({
            files: localeSourceList,
            configFile: path.join(__dirname, '../../test/karma.conf.js'),
            browsers: test.getBrowsers(),
            reporters: test.getReporters(isTestDebug),
            junitReporter: test.getJunitReporter(),
            action: 'run',
            preprocessors: {
                'gulp/tmp/testJS/src/**/*.js': ['coverage']
            },
            singleRun: true
            // Function localDone will be executed in the last iteration.
        }, currentChunk === numberOfChunks ? localDone : startServer).start();
    }
    startServer();
}

exports.test = gulp.series(...testRequirements, performTest);
