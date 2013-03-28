var karma = require('karma');

var jsonpServer = require('./jsonpServer.js'),
    testConfig = {configFile : __dirname + '/karma.conf.js'};

exports.run = function () {

    console.log('\nRun tests...\n');

    testConfig.browsers = ['PhantomJS'];

    if (isArgv('--ff')) {
        testConfig.browsers.push('Firefox');
    }
    if (isArgv('--chrome')) {
        testConfig.browsers.push('Chrome');
    }
    if (isArgv('--opera')) {
        testConfig.browsers.push('Opera');
    }
    if (isArgv('--safari')) {
        testConfig.browsers.push('Safari');
    }
    if (isArgv('--ie')) {
        testConfig.browsers.push('IE');
    }

    jsonpServer.init();
    karma.server.start(testConfig);
};

exports.server = function () {
    jsonpServer.init();
};

function isArgv(optName) {
    return process.argv.indexOf(optName) !== -1;
}