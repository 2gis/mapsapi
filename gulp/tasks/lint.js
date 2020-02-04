var gulp = require('gulp');
var { lintJS } = require('./lintJS');
var { lintCSS } = require('./lintCSS');

exports.lint = gulp.parallel(lintJS, lintCSS);
