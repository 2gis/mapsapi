var spritesmith = require('gulp.spritesmith');
var es = require('event-stream');
var gulp = require('gulp');

var error = require('../util/error');
var config = require('../../build/config');
var deps = require('../../build/gulp-deps')(config);
var imagemin = require('../../build/gulp-imagemin');

gulp.task('generateSprites', [
    'buildClean',
    'collectImagesUsageStats',
    'copySVGRaster',
    'copyRaster'
], function (cb) {
    var skins = deps.getSkinsList();
    var stats = deps.getImagesUsageStats(skins);

    var statisticsStreams = skins.map(function (skinName) {
        // Adds comma to make glob’s {} working properly,
        // even there is only one should be excluded
        var filesToExclude = stats[skinName].repeatable.join(',') + ',' +
            stats[skinName].notRepeatableNotSprited.join(',');

        var pngList = [
            'build/tmp/img/' + skinName + '/*.png',
            '!build/tmp/img/' + skinName + '/*@2x.png',
            '!build/tmp/img/' + skinName + '/{' + filesToExclude + '}.png'
        ];
        var png2xList = [
            'build/tmp/img/' + skinName + '/*@2x.png',
            '!build/tmp/img/' + skinName + '/{' + filesToExclude + '}@2x.png'
        ];
        var spriteData = gulp.src(pngList)
            .pipe(error.handle())
            .pipe(spritesmith({
                cssTemplate: 'build/sprite-template.mustache',
                imgName: 'sprite.' + skinName + '.png',
                cssName: 'sprite.' + skinName + '.less',
                engine: 'pngsmith'
            }));
        var spriteData2x = gulp.src(png2xList)
            .pipe(error.handle())
            .pipe(spritesmith({
                cssTemplate: 'build/sprite-template.mustache',
                //padding: 1, // генерирует неправильные смещения :(
                imgName: 'sprite@2x.' + skinName + '.png',
                cssName: 'sprite@2x.' + skinName + '.less',
                engine: 'pngsmith'
            }));

        return es.concat(
            spriteData.img
                .pipe(imagemin({silent: true}))
                .pipe(gulp.dest('public/img/')),

            spriteData2x.img
                .pipe(imagemin({silent: true}))
                .pipe(gulp.dest('public/img/')),

            spriteData.css
                .pipe(gulp.dest('build/tmp/less/')),

            spriteData2x.css
                .pipe(gulp.dest('build/tmp/less/'))
        );
    });

    var stream = es.concat.apply(null, statisticsStreams);

    stream.on('end', cb);
});
