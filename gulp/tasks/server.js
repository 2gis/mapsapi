var gulp = require('gulp');

var spawn = require('child_process').spawn;

var server = null;

gulp.task('server', function(cb) {
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
});

process.on('exit', function() {
    if (server) {
        server.kill();
    }
});
