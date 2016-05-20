var config = require('../../app/config.js');
var source = require('vinyl-source-stream');
var derequire = require('gulp-derequire');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var es = require('event-stream');
var gulpif = require('gulp-if');
var util = require('gulp-util');
var gulp = require('gulp');
var path = require('path');

gulp.task('buildScripts', ['concatScripts'], function () {
    var isCustom = util.env.pkg || util.env.skin;
    var packages;

    if (global.isTestBuild) {
        packages = ['full'];
    } else if (isCustom) {
        packages = [util.env.pkg || 'full'];
    } else {
        packages = Object.keys(config.packages);
    }

    return packages.map(function (pkg) {
        var name = 'script.' + (!isCustom ? pkg + '.' : '') + 'js';
        var src = path.join('gulp', 'tmp', 'js', name);

        var bundler = browserify(src, {
            debug: !util.env.release,
            entry: true,
            standalone: 'DG',
            cache: {},
            packageCache: {}
        });

        bundler.transform('browserify-css', {
            autoInject: true,
            minify: true
        });

        return bundler.bundle()
            .pipe(source(name))
            .pipe(buffer())
            .pipe(derequire())
            .pipe(gulpif(util.env.release, uglify()))
            .pipe(gulpif(util.env.release, header(config.copyright)))
            .pipe(gulp.dest('dist/js/'));
    }).reduce(function (prev, curr) {
        return es.merge(prev, curr);
    });
});
