var gulp = require('gulp');
var fs = require('fs');

var config = require('../../app/config');
var deps = require('../deps')(config);

function mkdirSync(path) {
    try {
        fs.mkdirSync(path);
    } catch (e) {
        if (e.code !== 'EEXIST') throw e;
    }
}

gulp.task('collectImagesStats', ['copyImg'], function (cb) {
    var skins = deps.getSkinsList();
    var imagesStatsPerSkin = deps.getImagesFilesStats(skins);

    skins.forEach(function (skinName) {
        var skinImagesFilesStats = imagesStatsPerSkin[skinName];

        var statisticsObject;
        var statisticsString = '';

        var imageExtension;

        var originalImageName;
        var originalImageStatisticObject;

        for (var imageName in skinImagesFilesStats) {
            originalImageName = imageName.replace(/@\d+(\.\d+)?x/, '');

            statisticsObject = skinImagesFilesStats[imageName];
            originalImageStatisticObject = skinImagesFilesStats[originalImageName];

            imageExtension = (typeof statisticsObject.extension == 'undefined') ? 'svg' : statisticsObject.extension;

            statisticsString += '.imageData(\'' + imageName + '\') { ' +
                '@filename: \'' + imageName + '\'; ' +
                '@extension: \'' + imageExtension + '\'; ' +
                '@hasVectorVersion: ' + !!statisticsObject.hasVectorVersion + '; ' +
                '@width: ' + statisticsObject.width + 'px; ' +
                '@height: ' + statisticsObject.height + 'px; ' +
                '@originalWidth: ' + originalImageStatisticObject.width + 'px; ' +
                '@originalHeight: ' + originalImageStatisticObject.height + 'px; ' +
                '}\n';
        }

        mkdirSync('./gulp/tmp');
        mkdirSync('./gulp/tmp/less');
        fs.writeFileSync('./gulp/tmp/less/images-files-statistics.' + skinName + '.less', statisticsString);
    });

    cb();
});
