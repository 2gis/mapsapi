var mergeStream = require('merge-stream');
var argv = require('minimist')(process.argv.slice(2));
var gulp = require('gulp');

var config = require('../../app/config');
var { buildCSS } = require('../util/buildCSS');

exports.destCSS = function destCSS() {
    var buildRules = [];

    var skins = config.skins;
    var packages = Object.keys(config.packages);
    var browsers = ['', 'ie8'];

    if (argv.pkg || argv.skin) {
        // Custom build
        buildRules = browsers.map(function(browser) {
            return {
                suffix: browser === 'ie8' ? 'ie8' : null,
                pkg: argv.pkg || 'full',
                skin: argv.skin || config.appConfig.defaultSkin,
                ie8: browser === 'ie8',
                isTest: global.isTestBuild
            };
        });
    } else {
        packages.forEach(function(pkg) {
            skins.forEach(function(skin) {
                browsers.forEach(function(browser) {
                    buildRules.push({
                        suffix: [pkg, skin, browser].join('.').replace(/\.$/, ''),
                        pkg: pkg,
                        skin: skin,
                        ie8: browser === 'ie8',
                        isTest: global.isTestBuild
                    });
                });
            });
        });
    }

    return mergeStream(buildRules.map(function(buildRule) {
        return buildCSS(buildRule).pipe(gulp.dest('dist/css/'));
    }));
};
