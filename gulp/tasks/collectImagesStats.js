var gulp = require('gulp');
var fs = require('fs');
var mkdirp = require('mkdirp');

var config = require('../../app/config');
var deps = require('../deps')(config);
var { copyImg } = require('./copyImg');

function collectImagesStats(cb) {
    var skins = deps.getSkinsList();
    var imagesStatsPerSkin = deps.getImagesFilesStats(skins);

    mkdirp.sync('./gulp/tmp');
    mkdirp.sync('./gulp/tmp/less');

    skins.forEach(function(skinName) {
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

            imageExtension = (typeof statisticsObject.extension === 'undefined') ? 'svg' : statisticsObject.extension;

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

        fs.writeFileSync('./gulp/tmp/less/images-files-statistics.' + skinName + '.less', statisticsString);
    });

    cb();
}

exports.collectImagesStats = gulp.series(copyImg, collectImagesStats);
