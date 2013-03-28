var http = require('http'),
    url = require('url'),
    argv = require('optimist').argv;

exports.server = function () {
    var port = 3005;

    http.createServer(function (request, response) {
        var requestParam = url.parse(request.url, true);

        if (requestParam.pathname && requestParam.pathname !== '/') {
            var pathname = requestParam.pathname.replace(/\//g, '');
            var data = requestParam.query.callback + '({"pathname":"' + pathname + '"})';
            response.writeHead(200, {"Content-Type": "application/javascript"});
            response.end(data);
        } else {
            var data = '<html><body><h1>404 Not Found</h1></body></html>';
            response.writeHead(404, {"Content-Type": "text/html"});
            response.end(data);
        }

    }).listen(port);

    console.log('\nJSONP test server running on port ' + port);

};

exports.getBrowsers = function () {
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