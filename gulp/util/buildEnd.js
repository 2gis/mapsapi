var util = require('gulp-util');

var stat = require('../util/stat');
var config = require('../../build/config');
var deps = require('../../build/gulp-deps')(config);

module.exports = function () {
    console.log('Build contains the next modules:');

    deps.getModulesList(util.env.pkg).forEach(function (module) {
        console.log('- ' + module);
    });

    if (util.env.sprite == 'true') {
        util.log('Builded with sprites');
    } else if (util.env.base64 != 'false' && typeof util.env.base64 != 'undefined') {
        util.log('Builded with base64 encode');
    }

    console.log('\nDist files statistic:');

    Object.keys(stat.get()).forEach(function (file) {
        console.log('- ' + file + ': ' + stat[file]);
    });

    util.log(util.colors.green('Build successfully complete'));
};
