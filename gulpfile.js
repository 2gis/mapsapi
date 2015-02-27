var requireDir = require('require-dir');
var cache = require('gulp-cache');

requireDir('./gulp/tasks', { recurse: true });

// fix file cache due to buggy realization
// https://github.com/2gis/mapsapi/pull/38
require('./gulp/util/fixFileCache')(cache.fileCache, './build/cache');

module.exports = {
    getJS: require('./gulp/util/buildJS'),
    getCSS: require('./gulp/util/buildCSS')
};
