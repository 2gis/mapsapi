var util = require('gulp-util');

var stat = require('./stat');
var config = require('../../app/config');
var deps = require('../deps')(config);

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

    var statValues = stat.get();

    Object.keys(statValues).forEach(function (file, val) {
        console.log('- ' + file + ': ' + statValues[file]);
    });

    util.log(util.colors.green('Build successfully complete'));
};
