var uglify = require('gulp-uglify');
var header = require('gulp-header');
var rename = require('gulp-rename');
var cache = require('gulp-cache');
var map = require('map-stream');
var util = require('gulp-util');
var extend = require('extend');
var gulp = require('gulp');

var config = require('../../build/config.js');
var buildJS = require('../util/buildJS.js');
var stat = require('../util/stat');

var dependencies = util.env['project-list'] ? ['loadProjectList', 'buildLeaflet'] : ['buildLeaflet'];

gulp.task('buildScripts', dependencies, function () {
    return buildJS(extend({isDebug: true}, util.env))
        .pipe(map(stat.save))
        .pipe(gulp.dest('public/js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cache(uglify()))
        .pipe(header(config.copyright))
        .pipe(map(stat.save))
        .pipe(gulp.dest('public/js/'));
});
