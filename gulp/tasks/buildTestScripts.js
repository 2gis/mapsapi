var redust = require('gulp-redust');
var file = require('gulp-file');
var map = require('map-stream');
var frep = require('gulp-frep');
var gulp = require('gulp');

var config = require('../../build/config.js');
var deps = require('../../build/gulp-deps')(config);
var projectList = require('../util/projectList');
var error = require('../util/error');
var stat = require('../util/stat');

gulp.task('buildTestScripts', ['buildClean', 'loadProjectList', 'lint', 'buildLeaflet'], function () {
    // part from buildJS
    return gulp.src(deps.getJSFiles(), {base: '.'})
        .pipe(error.handle())
        .pipe(file('projectList.js', projectList.get()))
        .pipe(redust(config.tmpl))
        .pipe(frep(config.cfgParams({ssl: false})))
        // part from buildScripts task
        .pipe(map(stat.save))
        .pipe(gulp.dest('build/tmp/testJS'));
});
