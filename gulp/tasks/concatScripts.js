var sourcemaps = require('gulp-sourcemaps');
var streamqueue = require('streamqueue');
var concat = require('gulp-concat');
var footer = require('gulp-footer');
var es = require('event-stream');
var gulpif = require('gulp-if');
var util = require('gulp-util');
var map = require('map-stream');
var gulp = require('gulp');

var config = require('../../app/config.js');
var deps = require('../deps')(config);

var templateStream = require('../util/templateStream');
var projectList = require('../util/projectList');
var error = require('../util/error');
var stat = require('../util/stat');

var dependencies = util.env['project-list'] !== false ? ['loadProjectList', 'buildLeaflet'] : ['buildLeaflet'];

gulp.task('concatScripts', dependencies, function () {
    var isCustom = util.env.pkg || util.env.skin;
    var packages;

    if (global.isTestBuild) {
        packages = ['full'];
    } else if (isCustom) {
        packages = [util.env.pkg || 'full'];
    } else {
        packages = Object.keys(config.packages);
    }

    if (global.isTestBuild) {
        // Disable tile loading in test build
        config.appConfig.tileServer = '';
    }

    return packages.map(function (pkg) {
        return streamqueue({objectMode: true},
                gulp.src(deps.getJSFiles({pkg: pkg}), {base: '.'}),
                templateStream(pkg)
            )
            .pipe(error.handle())
            .pipe(gulpif(!util.env.release, sourcemaps.init()))
            .pipe(concat('script.' + (!isCustom ? pkg + '.' : '') + 'js'))
            .pipe(footer(projectList.get()))
            .pipe(footer('DG.config = ' + JSON.stringify(config.appConfig) + ';'))
            .pipe(map(stat.save))
            .pipe(gulpif(!util.env.release, sourcemaps.write()))
            .pipe(gulp.dest('gulp/tmp/js'));
    }).reduce(function (prev, curr) {
        return es.merge(prev, curr);
    });
});
