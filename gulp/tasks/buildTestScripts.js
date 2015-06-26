var streamqueue = require('streamqueue');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var footer = require('gulp-footer');
var file = require('gulp-file');
var map = require('map-stream');
var gulpif = require('gulp-if');
var util = require('gulp-util');
var gulp = require('gulp');

var templateStream = require('../util/templateStream');
var config = require('../../app/config.js');
var deps = require('../deps')(config);
var projectList = require('../util/projectList');
var error = require('../util/error');
var stat = require('../util/stat');

gulp.task('buildTestScripts', ['loadProjectList', 'lintJS', 'buildLeaflet'], function () {
    var pkg = 'full';
    var isConcat = global.isConcatJS;

    // no loading tiles
    config.appConfig.tileServer = '';

    var stream = streamqueue({objectMode: true},
            gulp.src(deps.getJSFiles({pkg: pkg}), {base: '.'}),
            templateStream(pkg).pipe(concat('templates.js'))
        )
        .pipe(error.handle());

    if (isConcat) {
        stream = stream
            .pipe(concat('script.' + pkg + '.js'))
            .pipe(header(config.js.intro))
            .pipe(footer(projectList.get()))
            .pipe(footer('DG.config = ' + JSON.stringify(config.appConfig) + ';'))
            .pipe(footer(config.js.outro))
    } else {
        stream = stream
            .pipe(file('projectList.js', projectList.get()))
            .pipe(file('config.js', 'DG.config = ' + JSON.stringify(config.appConfig) + ';'));
    }

    stream = stream.pipe(gulpif(util.env.release, uglify()));

    if (isConcat) {
        stream = stream.pipe(header(config.copyright))
    }

    return stream
        .pipe(map(stat.save))
        .pipe(gulpif(isConcat, gulp.dest('dest/js/'), gulp.dest('gulp/tmp/testJS')));
});
