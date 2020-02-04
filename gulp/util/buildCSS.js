var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean-css');
var remember = require('gulp-remember');
var concat = require('gulp-concat');
var header = require('gulp-header');
var cache = require('gulp-cached');
var gulpif = require('gulp-if');
var less = require('gulp-less');
var argv = require('minimist')(process.argv.slice(2));
var map = require('map-stream');
var gulp = require('gulp');
var path = require('path');
var fs = require('fs');

var config = require('../../app/config.js');
var deps = require('../deps')(config);
var stat = require('../util/stat');
var error = require('./error');

exports.buildCSS = function(options) {
    var imagesBasePath = path.resolve(__dirname + '/../../dist/img');
    var baseURL = config.appConfig.protocol + config.appConfig.baseUrl;
    var lessList = deps.getCSSFiles(options);

    var lessHeaderImports;
    if (options.isTest) {
        lessHeaderImports = [
            './src/less/mixins.less:reference',
            './src/less/mixins.ie8.less:reference'
        ];
    } else {
        lessHeaderImports = [
            './gulp/tmp/less/sprite.basic.less:reference',
            './gulp/tmp/less/sprite@2x.basic.less:reference',
            './gulp/tmp/less/sprite.' + options.skin + '.less:reference',
            './gulp/tmp/less/sprite@2x.' + options.skin + '.less:reference',

            './gulp/tmp/less/images-files-statistics.basic.less:reference',
            './gulp/tmp/less/images-files-statistics.' + options.skin + '.less:reference',

            './src/less/mixins.less:reference',
            './src/less/mixins.ie8.less:reference'
        ];
    }

    lessHeaderImports = lessHeaderImports.filter(function(src) {
        var lessFileSrc = src.split(':')[0];

        try {
            return fs.readFileSync(path.join(__dirname, '../..', lessFileSrc));
        } catch (e) {
            return false;
        }
    });

    var lessPrerequirements = deps.lessHeader({
        variables: {
            baseURL: "'" + baseURL + "'",
            skinName: options.skin,
            ie8: options.ie8,
            imagesBasePath: "'" + imagesBasePath + "'"
        },

        imports: lessHeaderImports
    });

    return gulp.src(lessList)
        .pipe(error.handle())
        .pipe(cache('css.' + options.suffix))
        .pipe(header(lessPrerequirements))
        .pipe(less())
        .pipe(autoprefixer({browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}))
        .pipe(remember('css.' + options.suffix))
        .pipe(concat('styles.' + (options.suffix ? options.suffix + '.' : '') + 'css'))
        .pipe(gulpif(argv.release, clean()))
        .pipe(header(config.copyright))
        .pipe(map(stat.save));
};
