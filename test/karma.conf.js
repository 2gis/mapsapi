// Karma configuration
module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../',

        plugins: [
            'karma-mocha',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher'
        ],

        // frameworks to use
        frameworks: ['mocha'],

        // list of files / patterns to load in the browser
        files: [
            'node_modules/mocha/mocha.js',
            'vendors/leaflet/spec/sinon.js',
            'vendors/leaflet/spec/expect.js',
            'public/js/dg-map-src.js', // full 2GIS API dist
            'src/**/test/*Spec.js', // 2GIS tests
            'vendors/leaflet/spec/after.js',
            'node_modules/happen/happen.js',
            'vendors/leaflet/spec/suites/SpecHelper.js',
            'vendors/leaflet/spec/suites/**/*.js'
        ],
        // list of files to exclude
        exclude: [
            // excluded, because L.DG.TileLayer added to the map by default,
            // but leaflet tests think that map without layers and fails
            'vendors/leaflet/spec/suites/map/MapSpec.js',
            'vendors/leaflet/spec/suites/layer/tile/TileLayerSpec.js'
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['dots'],

        // web server port
        port: 9876,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_WARN,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 5000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};
