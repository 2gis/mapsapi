var through = require('through'),
    path = require('path'),
    fs = require('fs'),
    json2css = require('json2css'),
    async = require('async'),
    mkdirp = require('mkdirp'),
    spritesmith = require('spritesmith'),
    gutil = require('gulp-util');

var PluginError = gutil.PluginError;

module.exports = function (opt) {
    'use strict';
    opt = opt || {};
    /*if (!fileName) throw new PluginError('gulp-spritesmith',  'Missing fileName option for gulp-spritesmith');
    if (!opt.newLine) opt.newLine = gutil.linefeed;*/

    var buffer = {};
    var firstFile = null;

    function genCss(result, imgPath, cssPath) {
        var coordinates = result.coordinates,
            properties = result.properties,
            cssVarMap = function noop () {},
            cleanCoords = [];

        // Clean up the file name of the file
        Object.getOwnPropertyNames(coordinates).sort().forEach(function (file) {
            // Extract the image name (exlcuding extension)
            var fullname = path.basename(file),
            nameParts = fullname.split('.');

            // If there is are more than 2 parts, pop the last one
            if (nameParts.length >= 2) {
                nameParts.pop();
            }

            // Extract out our name
            var name = nameParts.join('.'),
            coords = coordinates[file];

            // Specify the image for the sprite
            coords.name = name;
            coords.source_image = file;
            coords.image = imgPath;
            coords.total_width = properties.width;
            coords.total_height = properties.height;

            // Map the coordinates through cssVarMap
            coords = cssVarMap(coords) || coords;

            // Save the cleaned name and coordinates
            cleanCoords.push(coords);

        });

        var cssFormat = 'css',
            cssOptions = {};

        var cssStr = json2css(cleanCoords, {'format': cssFormat, 'formatOpts': cssOptions});
        fs.writeFileSync(cssPath, cssStr, 'utf8');
    }

    function rename(dest, group) {
        var name = dest.split(path.sep),
            file = name[name.length - 1];

        name[name.length - 1] = file.replace('.', '.' + group + '.');
        return name.join('/');
    }

    function processFile (params, group) {
        var self = this;

        spritesmith(params, function (err, result) {
            var destImg = rename(opt.destImg, group),
                destCss = rename(opt.destCSS, group),
                destCssDir = path.dirname(destCss),
                destImgDir = path.dirname(destImg);

            if (err) { return self.emit('error', new PluginError('gulp-spritesmith', 'Error occurred during spritesmith processing')); }

            mkdirp(destImgDir, function (err) {
                if (err) { return self.emit('error', new PluginError('gulp-spritesmith', 'Can`t create image dest folder')); }
                fs.writeFileSync(destImg, result.image, 'binary');
            });

            mkdirp(destCssDir, function (err) {
                if (err) { return self.emit('error', new PluginError('gulp-spritesmith', 'Can`t create css dest folder')); }
                genCss(result, destImg, destCss);
            });
        });
    }

    function bufferContents(file) {
        if (file.isNull()) { return; }// ignore
        if (file.isStream()) { return this.emit('error', new PluginError('gulp-spritesmith', 'Streaming not supported')); }

        if (!firstFile) {
            firstFile = file;
        }

        var group = opt.groupBy,
            groupValue = '',
            parsedPath = file.relative.split(path.sep);

        parsedPath.filter(function (pth, i) {
            if (pth === group) {
                groupValue = parsedPath[i + 1];
            }
        });

        if (!buffer[groupValue]) { buffer[groupValue] = []; }
        buffer[groupValue].push(file.path);
    }

    function endStream() {
        //TODO: handle it in proper way
        if (buffer.length === 0) { return this.emit('end'); }

        var spritesmithParams = {
            'engine': opt.engine || 'auto',
            'algorithm': opt.algorithm || 'binary-tree',
            'padding': opt.padding || 1
        };

        Object.keys(buffer).forEach(function (group) {
            spritesmithParams.src = buffer[group];
            processFile(spritesmithParams, group);
        });

        this.emit('data', 'yeah!');
        this.emit('end');
    }

    return through(bufferContents, endStream);
};

