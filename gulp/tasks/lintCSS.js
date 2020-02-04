var gulp = require('gulp');

var csslint = require('../util/csslint/gulp-csslint');
var error = require('../util/error');
var {buildStyles} = require('./buildStyles');

function lintCSS() {
    return gulp.src('dist/css/**.css')
        .pipe(error.handle())
        .pipe(csslint({
            'adjoining-classes': false,
            'box-model': false,
            'box-sizing': false,
            'compatible-vendor-prefixes': false,
            'empty-rules': false,
            'display-property-grouping': false,
            'duplicate-background-images': false,
            'fallback-colors': false,
            'font-sizes': false,
            'gradients': false,
            'important': false,
            'overqualified-elements': false,
            'outline-none': false,
            'regex-selectors': false,
            'vendor-prefix': false,
            'unqualified-attributes': false,
            'zero-units': false
        }))
        .pipe(csslint.reporter());
}

exports.lintCSS = gulp.series(buildStyles, lintCSS);
