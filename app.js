/**
 * Web app of 2GIS Maps API 2.0
 *
 * Version 2.0.0
 *
 * Copyright (c) 2013, 2GIS
 */
var http = require('http'),
    express = require('express'),
    build = require('./build/build.js');

var app = express();

build.init();

/**
 * General configuration of the application
 */
app.set('env', 'production');
app.set('port', 3000);
app.set('host', '127.0.0.1');
app.use(express.static(__dirname + '/public'));

/**
 * Routes
 */
app.all(/^\/(js|css)$/, function(req, resp, next) {
    req.dgParams = {};
    req.dgParams.pkg = req.query.load || null;
    req.dgParams.isDebug = req.query.mode === 'debug';
    req.dgParams.skin = req.query.skin;
    req.dgParams.isIE = req.query.ie || false;
    var contentType = (req.path == '/js') ? 'application/x-javascript; charset=utf-8' : 'text/css';
    req.dgParams.callback = function(response, data) {
        response.set('Cache-Control', 'public, max-age=604800');
        response.set('X-Powered-By', '2GIS Maps API Server');
        response.set('Content-Type', contentType);
        response.send(data);
    };
    next();
});

app.get('/js', function(req, res){
    build.getJS(req.dgParams,function(data) {
        req.dgParams.callback(res, data);
    });
});

app.get('/css', function(req, res){
    build.getCSS(req.dgParams, function(data) {
        req.dgParams.callback(res, data);
    });
});

/**
 * Start app
 */
http.createServer(app).listen(app.get('port'), app.get('host'), function(){
    console.log('Maps API 2.0 server listening on ' + app.get('host') + ':' + app.get('port'));
});
