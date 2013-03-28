var http = require('http'),
    url = require('url');

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

    console.log('JSONP test server running on port ' + port);

};

exports.cli = function (argv) {
    var browsers = ['PhantomJS'];

    if (isArgv(argv, '--ff')) {
        browsers.push('Firefox');
    }
    if (isArgv(argv, '--chrome')) {
        browsers.push('Chrome');
    }
    if (isArgv(argv, '--opera')) {
        browsers.push('Opera');
    }
    if (isArgv(argv, '--safari')) {
        browsers.push('Safari');
    }
    if (isArgv(argv, '--ie')) {
        browsers.push('IE');
    }

    return browsers;
};

function isArgv(argv, optName) {
    return argv.indexOf(optName) !== -1;
}