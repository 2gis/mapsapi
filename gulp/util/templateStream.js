var path = require('path');
var gulp = require('gulp');
var dust = require('gulp-dust');

var config = require('../../app/config.js');
var deps = require('../deps')(config);

module.exports = function(pkg) {
    var templateList = deps.getModulesList(pkg)
        .map(function(moduleName) {
            return 'src/' + moduleName + '/templates/*.dust';
        });

    return gulp.src(templateList).pipe(dust({
        name: function(file) {
            var moduleName = path.basename(path.dirname(path.dirname(file.path)));
            var templateName = path.basename(file.relative, '.dust');

            return moduleName + '/' + templateName;
        }
    }));
};
