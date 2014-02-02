/*var http = require('http'),
    gl = require(__dirname + '/gulpfile.js');

var server = http.createServer(function (req, res) {
    var stream = gl();

    stream.on('data', function (file) {
        res.write(file.contents);
    });

    stream.on('end', function () {
        res.end();
    });
});
server.listen(3000);*/

//Web app of 2GIS Maps API 2.0
var http = require('http'),
    express = require('express'),
    gl = require(__dirname + '/gulpfile.js'),
    config = {};

//Init application
var app = express();

//General configuration of the application
app.set('port', config.PORT || '3000');
app.set('host', config.HOST || null);
app.use(express.static(__dirname + '/public'));

//Routes
app.get(/^\/2.0\/(js|css)$/, function (req, resp, next) {
    //@todo Add validations
    /*req.dgParams = {};
    req.dgParams.pkg = req.query.pkg || null;
    req.dgParams.mod = req.query.mod || null;
    req.dgParams.isDebug = req.query.mode === 'debug';
    req.dgParams.skin = req.query.skin || null;
    req.dgParams.isIE = req.query.ie || false;
    var contentType = (req.path === '/2.0/js') ? 'application/x-javascript; charset=utf-8' : 'text/css';
    req.dgParams.callback = function (response, data) {
        response.set('Cache-Control', 'public, max-age=604800');
        response.set('X-Powered-By', '2GIS Maps API Server');
        response.set('Content-Type', contentType);
        response.send(data);
    };
    next();*/
    var stream = gl();

    stream.on('data', function (file) {
        resp.write(file.contents);
    });

    stream.on('end', function () {
        resp.end();
    });
});

/*app.get('/2.0/js', function (req, res) {
    //console.log('js!');
    //var stream = fs.createReadStream(__dirname + '/dist/js/main.js');
    gl().pipe(res);
    build.getJS(req.dgParams, function (data) {
        req.dgParams.callback(res, data);
    });
});*/

/*app.get('/2.0/css', function (req, res) {
    build.getCSS(req.dgParams, function (data) {
        req.dgParams.callback(res, data);
    });
});*/

var host = app.get('host'),
    port = app.get('port');

http.createServer(app).listen(app.get('port'), host ? host : null, function () {
    console.log('Maps API 2.0 server listening on ' + (host ? host + ':' : '') + port);
});
