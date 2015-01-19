var prettyBytes = require('pretty-bytes');
var path = require('path');

var stat = {};

function save(file, cb) {
    var name = path.basename(file.path.split('/').pop());

    stat[name] = prettyBytes(file.contents.length);

    cb(null, file);
}

function get() {
    return stat;
}

module.exports = {
    save: save,
    get: get
};
