var path = require('path');
var fs = require('fs');
var through2 = require('through2');
var PluginError = require('gulp-util').PluginError;

module.exports = function(opts) {
  opts = opts || {};
  opts.newPath = opts.newPath || '';

  return through2.obj(function(file, enc, next) {
    var that = this;

    fs.lstat(file.path, function (err, stats) {
      if (!stats.isFile()) return next();
      try {
          file.path = path.join(file.base, opts.newPath, path.basename(file.path));
          that.push(file);
      } catch (e) {
        that.emit('error', new PluginError('gulp-flatten', e));
      }
      next();
    });
  });
};
