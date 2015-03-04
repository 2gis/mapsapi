var util = require('gulp-util');
var gulp = require('gulp');

var configBuild = require('../../build/config.js');

gulp.task('checkPackage', function() {
    var pkg = util.env.pkg;

    if (pkg) {
        var modules = pkg.split(',');

        configBuild.deprecatedModules.forEach(function(name) {
            if (modules.indexOf(name) !== -1) {
                util.log(util.colors.yellow('Warning! Deprecated module', name));
            }
        });
    }
});
