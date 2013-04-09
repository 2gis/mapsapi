/**
 * Web app of 2GIS Maps API 2.0
 *
 * Version 2.0.0
 *
 * Copyright (c) 2013, 2GIS
 */
var express = require('express'),
    exec = require('child_process').exec,
    build = require('./build/build.js'),
    app = express();

build.init();

/**
 * App settings
 */
app.use(express.static(__dirname + '/public'));

/**
 * Routes
 */
app.all(/^\/(js|css)$/, function(req, resp, next) {
    req.params.pkg = req.query.load || null;
    req.params.isDebug = req.query.mode === 'debug';
    req.params.skin = req.query.skin;
    req.params.isIE = req.query.ie || false;
    var contentType = req.path == '/js' ? 'application/x-javascript; charset=utf-8' : 'text/css';
    req.callback = function(response, data) {
        response.set('Cache-Control', 'public, max-age=604800');
        response.set('X-Powered-By', '2GIS Maps API Server');
        response.set('Content-Type', contentType);
        response.send(data);
    };
    next();
});

app.get('/js', function(req, res){
    build.getJS(req.params,function(data) {
        req.callback(res, data);
    });
});

app.get('/css', function(req, res){
    build.getCSS(req.params, function(data) {
        req.callback(res, data);
    });
});

/**
 * Start app
 */
app.listen(3000);
console.log('Maps API 2.0 server listening on port 3000');

/**
 * Auto update
 */
function autoUpdate(callback) {
    setInterval(function() {
        exec('git pull', function (error, stdout, stderr) {
            if (error || stderr) { return; }
            if (stdout.indexOf('Already up-to-date') < 0) {
                callback();
            }
        });
    }, 30 * 1000);
}

autoUpdate(function() {
    build.init();
    console.log('Update app!' );
});