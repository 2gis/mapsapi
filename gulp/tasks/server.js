var spawn = require('child_process').spawn;

var nodeServer = null;

exports.server = function server(cb) {
    function start() {
        nodeServer = spawn('node', ['app'], {stdio: 'inherit'});
        cb();
    }

    if (nodeServer) {
        nodeServer.once('close', start);
        nodeServer.kill();
    } else {
        start();
    }
};

process.on('exit', function() {
    if (nodeServer) {
        nodeServer.kill();
    }
});
