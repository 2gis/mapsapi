var http = require('http'),
    url = require('url');

var server;

function initServer() {
    server = http.createServer(function(request, response) {

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

    }).listen(3005);

    console.log('Test server running on port 3005');
}

exports.init = initServer;

exports.stop = function() {
    server.close(function() {
        console.log('Test server stop');
    })
}