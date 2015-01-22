var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var header = require('gulp-header');
var footer = require('gulp-footer');
var cache = require('gulp-cache');
var frep = require('gulp-frep');
var less = require('gulp-less');
var util = require('gulp-util');
var gulp = require('gulp');
var path = require('path');

var config = require('../../build/config.js');
var deps = require('../../build/gulp-deps')(config);
var error = require('./error');

module.exports = function (options, enableSsl) {
    options = options || {};

    var skin = options.skin || config.appConfig.DEFAULT_SKIN;

    var imagesBasePath = path.resolve(path.join(__dirname, '../../build/tmp/img_all'));

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
            './build/tmp/less/sprite.' + skin + '.less:reference',
            './build/tmp/less/sprite@2x.' + skin + '.less:reference',

            './build/tmp/less/images-files-statistics.basic.less:reference',
            './build/tmp/less/images-files-statistics.' + skin + '.less:reference',

            './private/less/mixins.less:reference',
            './private/less/mixins.ie8.less:reference'
        ];
    }

    var lessPrerequirements = deps.lessHeader({
        variables: {
            baseURL: options.ie8 ? '\'__IE8_BASE_URL__\'' : '\'__BASE_URL__\'',
            spritesURL: options.ie8 ? '\'__IE8_BASE_URL__\'' : '\'__BASE_URL__\'',

            ie8: options.ie8,
            useSprites: options.sprite,
            mobile: options.mobile,
            retina: options.retina,

            skinName: skin,

            imagesBasePath: '\'' + imagesBasePath + '\''
        },

        imports: lessHeaderImports
    });

    if (!lessList.length) {
        return false;
    }

    return gulp.src(lessList)
        .pipe(error.handle())
        .pipe(header(lessPrerequirements))
        .pipe(frep(config.cfgParams({ssl: enableSsl})))
        .pipe(less())
        .pipe(cache(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')))
        .pipe(concat('styles.css'))
        .pipe(options.isDebug ? util.noop() : minifyCss())
        .pipe(header(config.copyright));
};
