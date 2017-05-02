var argv = require('optimist').argv;

exports.getBrowsers = function() {
    var browsers = ['PhantomJS'];

    if (argv.hasOwnProperty('ff')) {
        browsers.push('Firefox');
    }
    if (argv.hasOwnProperty('chrome')) {
        browsers.push('Chrome');
    }
    if (argv.hasOwnProperty('opera')) {
        browsers.push('Opera');
    }
    if (argv.hasOwnProperty('safari')) {
        browsers.push('Safari');
    }
    if (argv.hasOwnProperty('ie')) {
        browsers.push('IE');
    }

    return browsers;
};

exports.getReporters = function(isDebug) {
    var reporters = isDebug ? ['mocha'] : ['dots'];

    reporters.push('coverage');

    if (argv.hasOwnProperty('reporters')) {
        reporters = argv.reporters.split(',');
    }

    return reporters;
};

exports.getJunitReporter = function() {
    var junitReporter = {};

    if (argv.hasOwnProperty('junitOutput')) {
        junitReporter['outputFile'] = argv.junitOutput;
    }

    return junitReporter;
};
