var spawn = require('child_process').spawn;

var server = null;

exports.server = function server(cb) {
    function start() {
        server = spawn('node', ['app'], {stdio: 'inherit'});
        cb();
    }

    if (server) {
        server.once('close', start);
        server.kill();
    } else {
        start();
    }
};

process.on('exit', function() {
    if (server) {
        server.kill();
    }
});
