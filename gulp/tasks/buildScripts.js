var config = require('../../app/config.js');
var stat = require('../util/stat');
var source = require('vinyl-source-stream');
var derequire = require('gulp-derequire');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var mergeStream = require('merge-stream');
var gulpif = require('gulp-if');
var argv = require('minimist')(process.argv.slice(2));
var gulp = require('gulp');
var path = require('path');
var map = require('map-stream');
var insert = require('gulp-insert');
var sourcemaps = require('gulp-sourcemaps');
var { concatScripts } = require('./concatScripts');

function buildScripts() {
    var isCustom = argv.pkg || argv.skin;
    var packages;

    if (global.isTestBuild) {
        packages = ['full'];
    } else if (isCustom) {
        packages = [argv.pkg || 'full'];
    } else {
        packages = Object.keys(config.packages);
    }

    return mergeStream(packages.map(function(pkg) {
        var name = 'script.' + (!isCustom ? pkg + '.' : '') + 'js';
        var src = path.join('gulp', 'tmp', 'js', name);

        var bundler = browserify(src, {
            debug: !argv.release,
            entry: true,
            standalone: argv.npm ? 'DG': false,
            cache: {},
            packageCache: {},
            sourceMaps: argv.release
        });

        bundler.transform('browserify-css', {
            autoInject: true,
            minify: true
        });

        return bundler.bundle()
            .pipe(source(name))
            .pipe(buffer())
            .pipe(derequire())
            .pipe(gulpif(argv.release, sourcemaps.init()))
            .pipe(gulpif(argv.release, uglify()))
            .pipe(gulpif(argv.release, header(config.copyright)))
            .pipe(gulpif(
                Boolean(argv['leaflet-custom-build']),
                insert.prepend('// leaflet-custom-build: ' + argv['leaflet-custom-build'] + '\n')
            ))
            .pipe(gulpif(argv.release, sourcemaps.write('./')))
            .pipe(map(stat.save))
            .pipe(gulp.dest('dist/js/'));
    }));
}

exports.buildScripts = gulp.series(concatScripts, buildScripts);
