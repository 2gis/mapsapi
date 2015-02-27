var path = require('path');
var mkdirp = require('mkdirp');

module.exports = function(fileCache, tmpDir) {
    fileCache.options.tmpDir = tmpDir; // don't use global /tmp dir for support concurrent builds

    // also patch _prepPath which incorrect handles not exists tmpDir
    fileCache._prepPath = function(filePath, done) {
        var dirPath = path.dirname(filePath);
        mkdirp(dirPath, done);
    };
};
