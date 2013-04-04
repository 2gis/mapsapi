var express = require('express'),
    exec = require('child_process').exec;

var build = require('./build/build.js');

build.init();

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/js', function (req, res) {
    var params = {
        pkg: req.query.load || null,
        skin: req.query.skin,
        isDebug: req.query.mode === 'debug',
        isIE: req.query.ie || false
    };

    build.getJS(params, function (data) {
        res.set('Cache-Control', 'public, max-age=604800');
        res.set('Content-Type', 'application/x-javascript; charset=utf-8');
        res.set('X-Powered-By', '2GIS Maps API Server');
        res.send(data);
    });
});

app.get('/css', function(req, res){
    var params = {
        pkg: req.query.load || null,
        skin: req.query.skin,
        isDebug: req.query.mode === 'debug',
        isIE: req.query.ie || false
    };

    build.getCSS(params, function(data) {
        res.set('Cache-Control', 'public, max-age=604800');
        res.set('Content-Type', 'text/css');
        res.set('X-Powered-By', '2GIS Maps API Server');
        res.send(data);
    });
});

app.listen(3000);
console.log('Maps API 2.0 server listening on port 3000');



///// Auto Deploy /////

function autoUpdate(callback) {
    setInterval(function() {
        exec('git pull', function (error, stdout, stderr) {
            if (error) { return; }
            if (stdout.indexOf('Already up-to-date') < 0) {
                callback();
            }
        });
    }, 30 * 1000);
}

autoUpdate(function() {
    console.log('Update app!');
    build.init();
});