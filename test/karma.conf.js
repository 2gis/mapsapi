// Sample Karma configuration file, that contain pretty much all the available options
// It's used for running client test on Travis (http://travis-ci.org/#!/karma-runner/karma)
// Most of the options can be overriden by cli arguments (see karma --help)
//
// For all available config options and default values, see:
// https://github.com/karma-runner/karma/blob/stable/lib/config.js#L54


// base path, that will be used to resolve files and exclude
basePath = '../';

frameworks = ['jasmine'];

// list of files / patterns to load in the browser
files = [
    JASMINE,
    JASMINE_ADAPTER,

    // Leaflet test helpers (before):
    'vendors/leaflet/spec/before.js',
    'vendors/leaflet/spec/testacular.js',

    // Full API dist:
    'dist/dg-map-custom.js',

    // DG tests:
    'src/Jsonp/test/*Spec.js',
    'src/ProjectDetector/test/*Spec.js',
//    'src/TileLayer/test/*Spec.js',

    // Leaflet test helpers (after):
    'vendors/leaflet/spec/after.js',
    'vendors/leaflet/spec/happen.js',
    'vendors/leaflet/spec/suites/SpecHelper.js',

    // Leaflet tests:
    'vendors/leaflet/spec/suites/**/*Spec.js',
    'vendors/leaflet/spec/suites/LeafletSpec.js'

];

// list of files to exclude
exclude = [];

// use dots reporter, as travis terminal does not support escaping sequences
// possible values: 'dots', 'progress', 'junit', 'teamcity'
// CLI --reporters progress
reporters = ['dots'];

// web server port
// CLI --port 9876
port = 9876;

// cli runner port
// CLI --runner-port 9100
runnerPort = 9100;

// enable / disable colors in the output (reporters and logs)
// CLI --colors --no-colors
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
// CLI --log-level debug
logLevel = LOG_WARN;

// enable / disable watching file and executing test whenever any file changes
// CLI --auto-watch --no-auto-watch
autoWatch = false;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
// CLI --browsers Chrome,Firefox,Safari
browsers = ['PhantomJS'];

// If browser does not capture in given timeout [ms], kill it
// CLI --capture-timeout 5000
captureTimeout = 15000;

// Auto run test on start (when browsers are captured) and exit
// CLI --single-run --no-single-run
singleRun = true;

// report which specs are slower than 500ms
// CLI --report-slower-than 500
reportSlowerThan = 500;
