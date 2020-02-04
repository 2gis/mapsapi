var spritesmith = require('gulp.spritesmith');
var mergeStream = require('merge-stream');
var gulp = require('gulp');

var error = require('../util/error');
var config = require('../../app/config');
var deps = require('../deps')(config);
var { collectImagesUsageStats } = require('./collectImagesUsageStats');

function generateSprites() {
    var skins = deps.getSkinsList();
    var stats = deps.getImagesUsageStats(skins);

    var statisticsStreams = skins.map(function(skinName) {
        // Adds comma to make glob’s {} working properly,
        // even there is only one should be excluded
        var filesToExclude = stats[skinName].repeatable.join(',') + ',' +
            stats[skinName].notRepeatableNotSprited.join(',');

        var pngList = [
            'src/**/' + skinName + '/img/**/*.png',
            '!src/**/' + skinName + '/img/**/*@2x.png',
            '!src/**/' + skinName + '/img/**/{' + filesToExclude + '}.png'
        ];
        var png2xList = [
            'src/**/' + skinName + '/img/**/*@2x.png',
            '!src/**/' + skinName + '/img/**/{' + filesToExclude + '}@2x.png'
        ];
        var spriteData = gulp.src(pngList)
            .pipe(error.handle())
            .pipe(spritesmith({
                cssTemplate: 'gulp/sprite-template.mustache',
                imgName: 'sprite.' + skinName + '.png',
                cssName: 'sprite.' + skinName + '.less',
                engine: 'pixelsmith'
            }));
        var spriteData2x = gulp.src(png2xList)
            .pipe(error.handle())
            .pipe(spritesmith({
                cssTemplate: 'gulp/sprite-template.mustache',
                //padding: 1, // генерирует неправильные смещения :(
                imgName: 'sprite@2x.' + skinName + '.png',
                cssName: 'sprite@2x.' + skinName + '.less',
                engine: 'pixelsmith'
            }));

        return mergeStream(
            spriteData.img
                .pipe(gulp.dest('dist/img/')),

            spriteData2x.img
                .pipe(gulp.dest('dist/img/')),

            spriteData.css
                .pipe(gulp.dest('gulp/tmp/less/')),

            spriteData2x.css
                .pipe(gulp.dest('gulp/tmp/less/'))
        );
    });

    return mergeStream(statisticsStreams);
}

exports.generateSprites = gulp.series(collectImagesUsageStats, generateSprites);
