//Web app of 2GIS Maps API 2.0
require('strong-agent').profile();
var express = require('express'),
    clc = require('cli-color'),
    gulp = require(__dirname + '/gulpfile.js'),
    config = require(__dirname + '/build/config.js').appConfig;

//Init application
var app = express();

//General configuration of the application
app.set('port', config.PORT || '3000');
app.set('host', config.HOST || null);
app.use('/2.0', express.static(__dirname + '/public'));

//Routes
function getParams(req, resp, next) {
    req.query.isDebug = (req.query.mode === 'debug');
    var contentType = (req.path === '/2.0/js') ? 'application/x-javascript; charset=utf-8' : 'text/css';

    req.dgCallback = function (stream, response) {
        response.set('Cache-Control', 'public, max-age=604800');
        response.set('X-Powered-By', '2GIS Maps API Server');
        response.set('Content-Type', contentType);

        stream.on('data', function (file) {
            var directWrite = response.write(file.contents.toString('utf8'));
            if (!directWrite) {
                stream.pause();
                response.once('drain', function () {
                    stream.resume();
                });
            }
        });
        stream.on('end', function () {
            response.end();
        });
    };
    next();
}

app.get('/2.0/js', getParams, function (req, res) {
    var jsStream = gulp.getJS(req.query);
    req.dgCallback(jsStream, res);
});

app.get('/2.0/css', getParams, function (req, res) {
    var cssStream = gulp.getCSS(req.query);
    req.dgCallback(cssStream, res);
});

//Start server
var host = app.get('host'),
    port = app.get('port');

app.listen(port, host, function () {
    console.log(clc.green('Maps API 2.0 server listening on ' + (host ? host + ':' : '') + app.get('port')));
});
