var karma = require('karma');

var jsonpServer = require('./jsonpServer.js'),
    testConfig = {configFile : __dirname + '/karma.conf.js'};

exports.run = function () {
    jsonpServer.init();

    testConfig.browsers = ['PhantomJS'];

    if (isArgv('--chrome')) {
        testConfig.browsers.push('Chrome');
    }
    if (isArgv('--ff')) {
        testConfig.browsers.push('Firefox');
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

    karma.server.start(testConfig);
};

exports.server = function () {
    server.init();
};

function isArgv(optName) {
    return process.argv.indexOf(optName) !== -1;
}