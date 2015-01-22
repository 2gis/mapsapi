var sourcemaps = require('gulp-sourcemaps');
var redust = require('gulp-redust');
var concat = require('gulp-concat');
var header = require('gulp-header');
var footer = require('gulp-footer');
var uglify = require('gulp-uglify');
var cache = require('gulp-cache');
var frep = require('gulp-frep');
var util = require('gulp-util');
var gulp = require('gulp');

var config = require('../../build/config.js');
var deps = require('../../build/gulp-deps')(config);
var projectList = require('./projectList');
var error = require('./error');

module.exports = function (opt, enableSsl) {
    if (typeof opt.pkg == 'boolean') {
        var err = new util.PluginError({
            plugin: 'deps',
            message: 'pkg param can\'t be empty'
        });

        error.notify(err);

        throw err;
    }

    return gulp.src(deps.getJSFiles(opt), {base: '.'})
        .pipe(error.handle())
        .pipe(redust(config.tmpl))
        .pipe(frep(config.cfgParams({ssl: enableSsl})))
        .pipe(opt.isDebug ? sourcemaps.init() : util.noop())
        .pipe(concat('script.js'))
        .pipe(header(config.js.intro))
        .pipe(footer(projectList.get()))
        .pipe(footer(config.js.outro))
        .pipe(opt.isDebug ? util.noop() : cache(uglify()))
        .pipe(header(config.copyright))
        .pipe(opt.isDebug ? sourcemaps.write() : util.noop());
};
