var requireDir = require('require-dir');

requireDir('./gulp/tasks', { recurse: true });

module.exports = {
    getJS: require('./gulp/util/buildJS'),
    getCSS: require('./gulp/util/buildCSS')
};
