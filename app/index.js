//Web app of 2GIS Maps API 2.0
var express = require('express');
var cors = require('cors');
var config = require('./config.js');
var _ = require('lodash');
var fs = require('fs');

// Init application
var app = express();
app.disable('x-powered-by');
app.use(cors());

// Serve loader
var loader = fs.readFileSync('./dist/loader.js', {encoding: 'utf8'});
app.get('/loader.js', function(req, res) {
    var localConfig = _.cloneDeep(config.localConfig);
    var protocol = config.appConfig.protocol;

    localConfig.protocol = protocol;

    res.set('Content-Type', 'application/javascript; charset=utf-8');

    var result = loader
        .replace(/__LOCAL_CONFIG__/g, JSON.stringify(localConfig))
        .replace(/__BASE_URL__/g, protocol + config.appConfig.baseUrl)
        .replace(/__QUERY__/g, JSON.stringify(req.query));

    // Send loader with injected params
    res.send(result);
});

// Load index file and inject base URL
var indexFile = fs.readFileSync('./dist/index.html', {encoding: 'utf8'});
indexFile = indexFile.replace(/__BASE_URL__/g, config.appConfig.baseUrl);

// Serve index file
function serveIndexFile(req, res) {
    res.send(indexFile);
}
app.get('/', serveIndexFile);
app.get('/index.html', serveIndexFile);
app.get('/healthcheck', function(req, res) {
    res.sendStatus(200);
});

function getParams(req) {
    var pkg = req.query.pkg;
    var skin = req.query.skin;
    var ie8 = req.query.ie8 === 'true';

    if (Object.keys(config.packages).indexOf(pkg) === -1) {
        pkg = 'full';
    }

    if (config.skins.indexOf(skin) === -1) {
        skin = config.appConfig.defaultSkin;
    }

    return {
        pkg: pkg,
        skin: skin,
        ie8: ie8
    }
}

function loadDir(dirPath) {
    var files = {};

    fs.readdirSync(dirPath).forEach(function(fileName) {
        files[fileName] = fs.readFileSync(dirPath + '/' + fileName);
    });

    return files;
}

// Load and serve JS files
var jsFiles = loadDir('./dist/js');
app.get('/js', function(req, res) {
    var params = getParams(req);
    var fileName = 'script.' + params.pkg + '.js';

    res.set('Content-Type', 'application/javascript; charset=utf-8');
    res.set('Cache-Control', 'public, max-age=84000');

    res.send(jsFiles[fileName]);
});

// Load and serve CSS files
var cssFiles = loadDir('./dist/css');
app.get('/css', function(req, res) {
    var params = getParams(req);

    var fileName = 'styles.' +
        params.pkg + '.' +
        params.skin + '.' +
        (params.ie8 ? 'ie8' + '.' : '') +
        'css';

    res.set('Content-Type', 'text/css');
    res.set('Cache-Control', 'public, max-age=84000');

    res.send(cssFiles[fileName]);
});

// Serve everything else
app.use(express.static(__dirname + '/../dist'));

// Start server
var host = config.appConfig.host;
var port = config.appConfig.port;

app.listen(port, host, function() {
    console.log('Maps API 2.0 server listening on ' + (host ? host + ':' : '') + port);
});
