var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var remember = require('gulp-remember');
var concat = require('gulp-concat');
var header = require('gulp-header');
var cache = require('gulp-cached');
var gulpif = require('gulp-if');
var less = require('gulp-less');
var util = require('gulp-util');
var map = require('map-stream');
var gulp = require('gulp');
var path = require('path');
var fs = require('fs');

var config = require('../../build/config.js');
var deps = require('../../build/gulp-deps')(config);
var stat = require('../util/stat');
var error = require('./error');

module.exports = function (options) {
    var imagesBasePath = path.resolve(path.join(__dirname, '../../build/tmp/img_all'));
    var baseURL = config.appConfig.protocol + config.appConfig.baseUrl;
    var lessList = deps.getCSSFiles(options);

    var lessHeaderImports;
    if (options.isTest) {
        lessHeaderImports = [
            './private/less/mixins.less:reference',
            './private/less/mixins.ie8.less:reference'
        ];
    } else {
        lessHeaderImports = [
            './build/tmp/less/sprite.basic.less:reference',
            './build/tmp/less/sprite@2x.basic.less:reference',
            './build/tmp/less/sprite.' + options.skin + '.less:reference',
            './build/tmp/less/sprite@2x.' + options.skin + '.less:reference',

            './build/tmp/less/images-files-statistics.basic.less:reference',
            './build/tmp/less/images-files-statistics.' + options.skin + '.less:reference',

            './private/less/mixins.less:reference',
            './private/less/mixins.ie8.less:reference'
        ];
    }

    lessHeaderImports = lessHeaderImports.filter(function (src) {
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
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(remember('css.' + options.suffix))
        .pipe(concat('styles.' + (options.suffix ? options.suffix + '.' : '') + 'css'))
        .pipe(gulpif(util.env.release, minify()))
        .pipe(header(config.copyright))
        .pipe(map(stat.save));
};
