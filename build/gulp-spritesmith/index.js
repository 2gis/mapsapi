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
    var cssTemplate = opt.cssTemplate;

    var buffer = {};

    function generateCss(result, imgPath) {
        var coordinates = result.coordinates,
            properties = result.properties,
            cleanCoords = [],
            cssFormat = 'custom';

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
            cleanCoords.push(coords);
        });

        if (cssTemplate) {
            var mt = fs.readFileSync(cssTemplate, 'utf8');
            json2css.addMustacheTemplate(cssFormat, mt);
        } else {
            cssFormat = 'css';
        }

        return json2css(cleanCoords, {format: cssFormat, formatOpts: {}});
    }

    function rename(dest, group) {
        var name = dest.split(path.sep),
            file = name[name.length - 1];

        name[name.length - 1] = file.replace('.', '.' + group + '.');
        return name.join('/');
    }

    function processFile(params, done, group) {
        var self = this;

        spritesmith(params, function (err, result) {
            if (err) { return self.emit('error', new PluginError('gulp-spritesmith', 'Error occurred during spritesmith processing')); }

            var destImg = group ? rename(opt.destImg, group) : opt.destImg,
                destCss = group ? rename(opt.destCSS, group) : opt.destCSS,
                destCssDir = path.dirname(destCss),
                destImgDir = path.dirname(destImg),
                imgPath = (group ? rename(opt.imgPath, group) : opt.imgPath) || path.relative(destCss, destImg);

            async.parallel([
                function (cb) {
                    mkdirp(destImgDir, function (err) {
                        if (err) { return self.emit('error', new PluginError('gulp-spritesmith', 'Can`t create image dest folder')); }
                        fs.writeFileSync(destImg, result.image, 'binary');
                        cb();
                    });
                },
                function (cb) {
                    mkdirp(destCssDir, function (err) {
                        if (err) { return self.emit('error', new PluginError('gulp-spritesmith', 'Can`t create css dest folder')); }
                        var cssStr = generateCss(result, imgPath);
                        fs.writeFileSync(destCss, cssStr, 'utf8');
                        cb();
                    });
                }
            ],
            function () {
                done();
            });
        });
    }

    function processByGroup(prarams, done) {
        function makeSprite(group, cb) {
            prarams.src = buffer[group];
            processFile(prarams, cb, group);
        }
        async.each(Object.keys(buffer), makeSprite, done);
    }

    function bufferContents(file) {
        if (file.isNull()) { return; }// ignore
        if (file.isStream()) { return this.emit('error', new PluginError('gulp-spritesmith', 'Streaming not supported')); }

        var group = opt.groupBy,
            groupValue = '',
            parsedPath = file.relative.split(path.sep);

        parsedPath.filter(function (pth, i) {
            if (pth === group) { groupValue = parsedPath[i + 1]; }
        });

        if (!buffer[groupValue]) { buffer[groupValue] = []; }
        buffer[groupValue].push(file.path);
    }

    function endStream() {
        if (Object.keys(buffer).length === 0 || buffer.length === 0) { return this.emit('end'); }

        var self = this,
            spriteParams = {
            'engine': opt.engine || 'auto',
            'algorithm': opt.algorithm || 'binary-tree',
            'padding': opt.padding || 1
        };

        function end() {
            self.emit('data', 'yeah!');
            self.emit('end');
        }

        ({}.toString.call(buffer) === '[object Array]') ? processFile(spriteParams, end) : processByGroup(spriteParams, end);
    }

    return through(bufferContents, endStream);
};
