var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

function errorNotify(err) {
    var args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    notify.onError({
        title: 'Build Error',
        message: '<%= error.message %>'
    }, function() {
        console.error('Build failure');

        if (err.stack) {
            console.error(err.stack);
        }

        process.exit(1);
    }).apply(this, args);
}

function errorHandle() {
    return plumber({
        errorHandler: errorNotify
    });
}

module.exports = {
    notify: errorNotify,
    handle: errorHandle
};
