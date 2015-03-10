var concat = require('gulp-concat');
var gulp = require('gulp');

var config = require('../../app/config.js');
var deps = require('../deps')(config);

gulp.task('buildLeaflet', function () {
    return gulp.src(deps.getJSFiles({source: 'leaflet'}))
        .pipe(concat('leaflet-src.js'))
        .pipe(gulp.dest('node_modules/leaflet/dist/'));
});
