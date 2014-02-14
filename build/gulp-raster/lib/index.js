'use strict';

var path = require('path'),
    execFile = require('child_process').execFile,
    isError = /^err/g;

var phantomjsCmd = require('phantomjs').path;
var converterFileName = path.resolve(__dirname, './converter.js');

module.exports = function svgToPng(sourceFileName, format, scale, cb) {
    if (typeof scale === 'function') {
        cb = scale;
        scale = 1.0;
    }

    var args = [converterFileName, sourceFileName, format, scale];
    execFile(phantomjsCmd, args, function (err, stdout, stderr) {
        if (err) {
            return cb(err);
        } else if (stdout.length > 0) {
            if (stdout.match(isError)) {
                return cb(new Error(stdout.toString().trim()));
            }

            cb(null, new Buffer(stdout, 'base64'));
        } else if (stderr.length > 0) {
            cb(new Error(stderr.toString().trim()));
        }
    });
};
