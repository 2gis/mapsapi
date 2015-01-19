var minifyCss = require('gulp-minify-css');
var header = require('gulp-header');
var rename = require('gulp-rename');
var es = require('event-stream');
var map = require('map-stream');
var util = require('gulp-util');
var extend = require('extend');
var gulp = require('gulp');

var config = require('../../build/config');
var buildCSS = require('../util/buildCSS');
var stat = require('../util/stat');

module.exports = function(opt, cb) {
    var cliOptions = extend({}, util.env);

    cliOptions.mobile = cliOptions.base64 == 'false';

    if (typeof cliOptions.sprite != 'undefined') {
        cliOptions.sprite = cliOptions.sprite == 'true';
    }

    var buildRules = [
        {
            size: true
        },
        {
            ie8: true,
            sprite: true,
            name: 'full'
        },
        {
            ie8: true,
            excludeBaseCss: true,
            name: 'ie'
        }
    ];

    var testRules = [{
        ie8: true,
        sprite: false,
        mobile: false
    }];

    var cssBuildRules = opt.isTest ? testRules : buildRules;

    var cssStream = cssBuildRules.map(function (list) {
        var bandle = buildCSS(extend({
            isDebug: true,
            isTest: opt.isTest
        }, list, cliOptions));

        if (!bandle) {
            return false;
        }

        return bandle
            .pipe(list.size ? map(stat.save) : util.noop())
            .pipe(list.name ? rename({suffix: '.' + list.name}) : util.noop())
            .pipe(gulp.dest('public/css/'))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifyCss())
            .pipe(header(config.copyright))
            .pipe(list.size ? map(stat.save) : util.noop())
            .pipe(gulp.dest('public/css/'));
    }).filter(Boolean);

    var stream = es.concat.apply(null, cssStream);

    stream.on('end', cb);
};
