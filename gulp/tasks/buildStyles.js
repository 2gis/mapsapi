var gulp = require('gulp');

var { destCSS } = require('../util/destCSS');
var { collectImagesStats } = require('./collectImagesStats');
var { generateSprites } = require('./generateSprites');
var { imageMinify } = require('./imageMinify');

exports.buildStyles = gulp.series(gulp.parallel(
    collectImagesStats,
    generateSprites,
    imageMinify
), destCSS);
