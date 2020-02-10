var sourcemaps = require('gulp-sourcemaps');
var streamqueue = require('streamqueue');
var concat = require('gulp-concat');
var footer = require('gulp-footer');
var mergeStream = require('merge-stream');
var gulpif = require('gulp-if');
var argv = require('minimist')(process.argv.slice(2));
var gulp = require('gulp');

var config = require('../../app/config.js');
var deps = require('../deps')(config);

var templateStream = require('../util/templateStream');
var projectList = require('../util/projectList');
var error = require('../util/error');
var { loadProjectList } = require('./loadProjectList');
var { buildLeaflet } = require('./buildLeaflet');

function getStyleRequireStatement(pack, skin) {
    return 'require("../../../dist/css/styles.' + pack + '.' + skin + '.css");';
}

function concatScripts() {
    var isCustom = argv.pkg || argv.skin;
    var packages;

    if (global.isTestBuild) {
        packages = ['full'];
    } else if (isCustom) {
        packages = [argv.pkg || 'full'];
    } else {
        packages = Object.keys(config.packages);
    }

    if (global.isTestBuild) {
        // Disable tile loading in test build
        config.appConfig.tileServer = '';
    }

    return mergeStream(packages.map(function(pkg) {
        var stream = streamqueue(
                {objectMode: true},
                gulp.src(deps.getJSFiles({pkg: pkg}), {base: '.'}),
                templateStream(pkg)
            )
            .pipe(error.handle())
            .pipe(gulpif(!argv.release, sourcemaps.init()))
            .pipe(concat('script.' + (!isCustom ? pkg + '.' : '') + 'js'))
            .pipe(footer(projectList.get()))
            .pipe(footer('DG.config = ' + JSON.stringify(config.appConfig) + ';'));

        if (argv.npm) {
            stream = stream.pipe(footer(getStyleRequireStatement(pkg, 'dark')));
        }

        return stream
            .pipe(gulpif(!argv.release, sourcemaps.write()))
            .pipe(gulp.dest('gulp/tmp/js'));
    }));
}

const projectListTask = argv['project-list'] !== false ? [loadProjectList] : [];

exports.concatScripts = gulp.series(gulp.parallel(
    ...projectListTask,
    buildLeaflet
), concatScripts);
