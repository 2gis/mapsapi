var concat = require('gulp-concat');
var gulp = require('gulp');

var config = require('../../build/config.js');
var deps = require('../../build/gulp-deps')(config);

gulp.task('buildLeaflet', ['buildClean'], function () {
    return gulp.src(deps.getJSFiles({source: 'leaflet'}))
        .pipe(concat('leaflet-src.js'))
        .pipe(gulp.dest('vendors/leaflet/dist/'));
});
