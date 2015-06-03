var redust = require('gulp-redust');
var file = require('gulp-file');
var map = require('map-stream');
var gulp = require('gulp');

var config = require('../../build/config.js');
var deps = require('../../build/gulp-deps')(config);
var projectList = require('../util/projectList');
var error = require('../util/error');
var stat = require('../util/stat');

gulp.task('buildTestScripts', ['loadProjectList', 'lintJS', 'buildLeaflet'], function () {
    return gulp.src(deps.getJSFiles(), {base: '.'})
        .pipe(error.handle())
        .pipe(file('projectList.js', projectList.get()))
        .pipe(file('config.js', 'DG.config = ' + JSON.stringify(config.appConfig) + ';'))
        .pipe(redust(config.tmpl))
        .pipe(map(stat.save))
        .pipe(gulp.dest('build/tmp/testJS'));
});
