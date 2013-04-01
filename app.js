var express = require('express'),
    exec = require('child_process').exec;

var build = require('./build/build.js');

build.init();

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/js', function (req, res) {
    var pkg = req.query.load || null;
    var isDebug = req.query.mode === 'debug';

    build.getJS(pkg, isDebug, function (data) {
        res.set('Cache-Control', 'public, max-age=604800');
        res.set('Content-Type', 'application/x-javascript; charset=utf-8');
        res.set('X-Powered-By', '2GIS Maps API Server');
        res.send(data);
    });
});

app.get('/css', function(req, res){
    var pkg = req.query.load || null;
    var isDebug = req.query.mode === 'debug';

    build.getCSS(pkg, isDebug, function(data) {
        res.set('Cache-Control', 'public, max-age=604800');
        res.set('Content-Type', 'text/css');
        res.set('X-Powered-By', '2GIS Maps API Server');
        res.send(data);
    });
});

app.listen(3000);
console.log("Server listening on port 3000");


autoUpdate(function() {
    console.log('Update app!');
    build.init();
});

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
