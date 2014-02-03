//Web app of 2GIS Maps API 2.0
var http = require('http'),
    express = require('express'),
    gulp = require(__dirname + '/gulpfile.js'),
    config = {};

//Init application
var app = express();

//General configuration of the application
app.set('port', config.PORT || '3000');
app.set('host', config.HOST || null);
app.use(express.static(__dirname + '/public'));

//Routes
function getParams(req, resp, next) {
    //@todo Add validations
    req.dgParams = {};
    req.dgParams.pkg = req.query.pkg || null;
    req.dgParams.isDebug = req.query.mode === 'debug';
    req.dgParams.skin = req.query.skin || null;
    req.dgParams.isIE = req.query.ie || false;
    var contentType = (req.path === '/2.0/js') ? 'application/x-javascript; charset=utf-8' : 'text/css';
    req.dgParams.callback = function (stream, response) {
        console.log('all cb');
        response.set('Cache-Control', 'public, max-age=604800');
        response.set('X-Powered-By', '2GIS Maps API Server');
        response.set('Content-Type', contentType);
        stream.on('data', function (file) {
            response.write(file.contents);
        });
        stream.on('end', function () {
            console.log('end', arguments);
            response.end();
        });
    };
    next();
}

app.get('/2.0/js', getParams, function (req, res) {
    var jsStream = gulp.getJS();
    req.dgParams.callback(jsStream, res);
});

app.get('/2.0/css', getParams, function (req, res) {
    var cssSteam = gulp.getCSS();
    req.dgParams.callback(cssSteam, res);
});

var host = app.get('host'),
    port = app.get('port');

http.createServer(app).listen(app.get('port'), host ? host : null, function () {
    console.log('Maps API 2.0 server listening on ' + (host ? host + ':' : '') + port);
});
