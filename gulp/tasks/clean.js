var del = require('del');

exports.clean = function clean() {
    return del(['dist', 'gulp/tmp']);
};
