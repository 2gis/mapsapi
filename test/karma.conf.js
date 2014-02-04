module.exports = function(config) {
    config.set({
        basePath: '../',

        frameworks: ['mocha'],

        // list of files / patterns to load in the browser
        files: [
            'src/**/test/*Spec.js', // 2GIS tests
            'vendors/leaflet/spec/suites/SpecHelper.js',
            'vendors/leaflet/spec/suites/**/*.js'
        ],

        // use dots reporter, as travis terminal does not support escaping sequences
        // possible values: 'dots', 'progress', 'junit', 'teamcity'
        // CLI --reporters progress
        reporters: ['progress'],

        // web server port
        // CLI --port 9876
        port: 9876,

        // cli runner port
        // CLI --runner-port 9100
        runnerPort: 9100,

        // enable / disable colors in the output (reporters and logs)
        // CLI --colors --no-colors
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        // CLI --log-level debug
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing test whenever any file changes
        // CLI --auto-watch --no-auto-watch
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        // CLI --browsers Chrome,Firefox,Safari
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        // CLI --capture-timeout 5000
        captureTimeout: 20000,

        // Auto run test on start (when browsers are captured) and exit
        // CLI --single-run --no-single-run
        singleRun: false,

        // report which specs are slower than 500ms
        // CLI --report-slower-than 500
        reportSlowerThan: 500,

        plugins: [
            'karma-mocha',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-opera-launcher',
            'karma-firefox-launcher'
        ]
    });
};
