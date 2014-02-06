var through = require('through'),
    path = require('path'),
    fs = require('fs'),
    json2css = require('json2css'),
    //async = require('async'),
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

    function genCss(result, group) {
        var coordinates = result.coordinates,
            properties = result.properties,
            spritePath = rename(opt.destImg, group),
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
            coords.image = spritePath;
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
        fs.writeFileSync(rename(opt.destCSS, group), cssStr, 'utf8');
    }

    function rename(dest, group) {
        var name = dest.split(path.sep),
            file = name.slice(1, 2);

        name[name.length - 1] = file[0].replace('.', '.' + group + '.');
        console.log(name.join('/'));
        return name.join('/');
    }

    function bufferContents(file) {
        if (file.isNull()) { return; }// ignore
        if (file.isStream()) { return this.emit('error', new PluginError('gulp-spritesmith', 'Streaming not supported')); }

        if (!firstFile) {
            firstFile = file;
        }

        var skin = file.relative.split(path.sep)[2]; // todo: make it option
        if (!buffer[skin]) { buffer[skin] = []; }
        buffer[skin].push(file.path);
    }

    function endStream() {
        if (buffer.length === 0) { return this.emit('end'); }

        var self = this,
        spritesmithParams = {
            //'src': buffer.light,
            'engine': 'auto',
            'algorithm': 'binary-tree',
            'padding': 1,
            'engineOpts': {},
            'exportOpts': {format: 'png'}
        };

        Object.keys(buffer).forEach(function (group) {
            spritesmithParams.src = buffer[group];

            spritesmith(spritesmithParams, function (err, result) {
                // If an error occurred, callback with it
                if (err) { return self.emit('error', new PluginError('gulp-spritesmith', 'wrooooong!')); }

                fs.writeFileSync(rename(opt.destImg, group), result.image, 'binary');
                genCss(result, group);

                self.emit('data', 'yeah!');
                self.emit('end');
            });
        });
    }

    return through(bufferContents, endStream);
};

