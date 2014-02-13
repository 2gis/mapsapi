var through = require('through2'),
    svgToPng = require('svg2png'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-svg2png';

module.exports = function (opt) {
    'use strict';

    opt = opt || {};
    opt.scale = opt.scale || 1;
    opt.format = opt.format || 'png';

    function svg2png(file, enc, callback) {
        var that = this;

        // Do nothing if no contents
        if (file.isNull()) { return callback(); }

        if (file.isBuffer()) {
            svgToPng(file.path, opt.format, opt.scale, function (err, data) {
                if (err) { throw new PluginError(PLUGIN_NAME, 'Error occured during file convertation'); }

                file.contents = data;
                that.push(file);
                return callback();
            });
        }
    }

    return through.obj(svg2png);
};
