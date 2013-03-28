var express = require('express');

var build = require('./build/build.js');

var app = express();

app.use(express.static(__dirname + '/public'));


app.get('/js', function (req, res) {
    var pkg = req.query.load || 'full';
    var isDebug = req.query.mode === 'debug';

    build.get(pkg, isDebug, function (data) {
        res.set('Cache-Control', 'public, max-age=604800');
        res.set('Content-Type', 'application/x-javascript; charset=utf-8');
        res.set('X-Powered-By', '2GIS Maps API Server');
        res.send(data);
    });
});

//app.get('/css', function(req, res){
//    var pkg = req.query.load || 'full';
//    build.get(pkg, function(data) {
//        res.set('Cache-Control', 'public, max-age=604800');
//        res.set('Content-Type', 'text/css');
//        res.set('X-Powered-By', '2GIS Maps API Server');
//        res.send(data);
//    });
//});

build.init();
app.listen(3000);
