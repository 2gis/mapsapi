var header = require('gulp-header');
var rename = require('gulp-rename');
var mergeStream = require('merge-stream');
var less = require('gulp-less');
var gulp = require('gulp');
var path = require('path');
var glob = require('glob');

var error = require('../util/error');
var config = require('../../app/config');
var deps = require('../deps')(config);

exports.collectImagesUsageStats = function collectImagesUsageStats() {
    var skins = deps.getSkinsList();

    var imagesBasePath = path.resolve(__dirname + '/../../dist/img');

    var statisticsStreams = skins.map(function(skinName) {
        var skinLessFiles = glob.sync('./src/**/' + skinName + '/less/*.less');

        skinLessFiles.unshift('./src/less/mixins.images-usage-statistics.less');
        skinLessFiles.unshift('./src/less/mixins.ie8.less');

        skinLessFiles = skinLessFiles.map(function(lessFilePath) {
            return lessFilePath + ':reference';
        });

        return gulp.src('src/less/images-usage-statistics.less')
            .pipe(error.handle())
            .pipe(header(deps.lessHeader({
                variables: {
                    baseURL: '\'__BASE_URL__\'',
                    spritesURL: '\'__BASE_URL__\'',

                    ie8: true,
                    useSprites: true,
                    mobile: false,
                    retina: false,

                    skinName: skinName,

                    imagesBasePath: '\'' + imagesBasePath + '\''
                },
                imports: skinLessFiles
            })))
            .pipe(less())
            .pipe(rename('images-usage-statistics.' + skinName + '.less'))
            .pipe(gulp.dest('gulp/tmp/less/'));
    });

    return mergeStream(statisticsStreams);
};
