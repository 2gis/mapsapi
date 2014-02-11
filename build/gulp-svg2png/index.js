var through = require('through2'),
	svgToPng = require('svg2png'),
	path = require('path'),
	mkdirp = require('mkdirp'),
	gutil = require('gulp-util');

module.exports = function (opt) {
	'use strict';

	opt = opt || {};
	opt.suffix = opt.suffix || '';
	opt.scale = opt.scale || 1;

	function svg2png(file, enc, callback) {
		var that = this;

		// Do nothing if no contents
		if (file.isNull()) return callback();

		if (file.isBuffer()) {

			var relative = '/../png/',
				dest = path.normalize(path.dirname(file.path) + relative),
				fileName = path.basename(file.path).replace('.svg', opt.suffix + '.png');

			mkdirp(dest, function (err) {
                if (err) { return self.emit('error', new PluginError('gulp-svg2png', 'Can`t create dest folder')); }
                svgToPng(file.path, dest + fileName, opt.scale, function (err) {
					if (err) new gutil.PluginError('gulp-svg2png', 'Error occured during file convertion');
					that.push(file);
					return callback();
				});
            });
		}
	}

	return through.obj(svg2png);
};
