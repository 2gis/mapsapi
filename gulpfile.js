var extend = require('extend'),
    es = require('event-stream'),
    map = require('map-stream'),
    path = require('path'),
    prettyBytes = require('pretty-bytes'),

    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),

    glob = require('glob'),
    fs = require('fs'),
    runSequence = require('run-sequence'),

    test = require('./test/test.js'),

    webapiProjects = require('./build/2gis-project-loader'),

    gendoc = require('./docbuilder/gendoc.js'),
    config = require('./build/config.js'),
    deps = require('./build/gulp-deps')(config),
    error,
    stat = {}; // Files minification statistics

$.imagemin = require('./build/gulp-imagemin');
$.spritesmith = require('gulp.spritesmith');

if (!process.env.isRuntime) {
    require('./build/fixFileCache')($.cache.fileCache, './build/tmp'); // fix file cache due to buggy realization
}

var projectList,
    errorNotify = function(e) {
        var args = Array.prototype.slice.call(arguments);

        error = true;
        // Send error to notification center with gulp-notify
        $.notify.onError(
            {
                title: 'Build Error',
                message: '<%= error.message %>'
            },
            function() {
                console.error($.util.colors.red('Build failure'));
                if (e.stack) {
                    console.error(e.stack);
                }
                process.exit(1);
            }
        ).apply(this, args);

    },
    errorHandle = function() {
        return $.plumber({
            errorHandler: errorNotify
        });
    };

webapiProjects(function (err, projects) {
    if (err) {
        error = new $.util.PluginError({
          plugin: 'webapiProjects',
          message: err
        });
        errorNotify(error);
    }
    projectList = 'DG.projectsList = JSON.parse(\'' + JSON.stringify(projects) + '\')';
});

//public CLI API
gulp.task('default', ['build']);

gulp.task('help', function () {
    $.util.log('\nTasks list:');
    $.util.log('gulp lint        # Check JS files for errors with JSHint');
    $.util.log('gulp build       # Lint, combine and minify source files, update doc, copy assets');
    $.util.log('gulp doc         # Generate documentation from .md files');
    $.util.log('gulp test        # Rebuild source and run unit tests');
    $.util.log('gulp watch       # Starts watching private & leaflet/src folders');
});

gulp.task('build-scripts', ['lint', 'build-leaflet'], function () {
    return bldJs(extend({ isDebug: true }, $.util.env))
        .pipe(map(saveSize))
        .pipe(gulp.dest('./public/js/'))
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.cache($.uglify()))
        .pipe($.header(config.copyright))
        .pipe(map(saveSize))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('lint', function () {
    return gulp.src('./src/**/src/**/*.js')
                .pipe(errorHandle())
                .pipe($.cache($.jshint('.jshintrc')))
                .pipe($.jshint.reporter('jshint-stylish'))
                .pipe($.jshint.reporter('fail'));
});

var isTestTaskRun = $.util.env._.indexOf('test') == -1;

var buildStylesPreTasks = [];

if (isTestTaskRun) {
    buildStylesPreTasks.push('collect-images-stats');
    buildStylesPreTasks.push('generate-sprites');
}

gulp.task('build-styles', buildStylesPreTasks, function (cb) {
    var cliOptions = extend({}, $.util.env);

    cliOptions.mobile = cliOptions.base64 === 'false';

    if (typeof cliOptions.sprite !== 'undefined') {
        cliOptions.sprite = cliOptions.sprite === 'true';
    }

    var buildRules = [{
        size: true
    },
    {
        ie8: true,
        sprite: true,
        name: 'full'
    },
    {
        ie8: true,
        excludeBaseCss: true,
        name: 'ie'
    }];

    var testRules = [{
        ie8: true,
        sprite: false,
        mobile: false
    }];

    var cssBuildRules = isTestTaskRun ? buildRules : testRules;

    var cssStream = cssBuildRules.map(function(list) {
        var bandle = buildCss(extend({ isDebug: true }, list, cliOptions));
        if (!bandle) { return false; }
        return bandle
            .pipe(list.size ? map(saveSize) : $.util.noop())
            .pipe(list.name ? $.rename({ suffix: '.' + list.name }) : $.util.noop())
            .pipe(gulp.dest('./public/css/'))
            .pipe($.rename({ suffix: '.min' }))
            .pipe($.minifyCss())
            .pipe($.header(config.copyright))
            .pipe(list.size ? map(saveSize) : $.util.noop())
            .pipe(gulp.dest('./public/css/'));
    }).filter(Boolean);

    var stream = es.concat.apply(null, cssStream);

    stream.on('end', cb);
});

gulp.task('copy-private-assets', function (cb) {
    var stream = es.concat(
        gulp.src(['./private/*.*', '!./private/loader.js'])
            .pipe(errorHandle())
            .pipe(gulp.dest('./public/')),

        gulp.src('./private/img/*.*')
            .pipe(errorHandle())
            .pipe(gulp.dest('./public/img')),
        gulp.src('./vendors/leaflet/dist/images/*')
            .pipe(errorHandle())
            .pipe(gulp.dest('./public/img/vendors/leaflet')),

        gulp.src('./src/**/fonts/**/*.*')
            .pipe(errorHandle())
            .pipe($.flatten())
            .pipe(gulp.dest('./public/fonts/')),

        gulp.src('./private/loader.js')
            .pipe(errorHandle())
            .pipe($.uglify())
            .pipe(gulp.dest('./public/'))
        );

    stream.on('end', cb);
});

gulp.task('copy-sprites', ['copy-svg', 'generate-sprites'], function () {
    return gulp.src('./build/tmp/img/sprite*.png')
            .pipe(errorHandle())
            .pipe(gulp.dest('./public/img'));
});


gulp.task('copy-svg', function () {
    return gulp.src('./src/**/img/**/*.svg')
            .pipe(errorHandle())
            .pipe($.imagemin({silent: true}))
            .pipe($.rename(function (p) {
                p.dirname = p.dirname.split(path.sep)[2];
            }))
            .pipe(gulp.dest('./build/tmp/img'))
            .pipe($.flatten())
            .pipe(gulp.dest('./build/tmp/img_all'))
            .pipe(gulp.dest('./public/img'));
});

gulp.task('copy-svg-raster', function (cb) {
    $.util.log($.util.colors.green('Converting SVG to PNG. It can take a long time, please, be patient'));

    var stream = es.concat(
            gulp.src('./src/**/img/**/*.svg')
                .pipe(errorHandle())
                .pipe($.raster())
                .pipe($.rename(function (p) {
                    p.extname = '.png';
                    p.dirname = p.dirname.split(path.sep)[2];
                }))
                .pipe($.imagemin({silent: true}))
                .pipe(gulp.dest('./build/tmp/img'))
                .pipe($.flatten())
                .pipe(gulp.dest('./build/tmp/img_all'))
                .pipe(gulp.dest('./public/img')),

            gulp.src('./src/**/img/**/*.svg')
                .pipe(errorHandle())
                .pipe($.raster({ scale: 2 }))
                .pipe($.rename(function (p) {
                    p.extname = '@2x.png';
                    p.dirname = p.dirname.split(path.sep)[2];
                }))
                .pipe($.imagemin({silent: true}))
                .pipe(gulp.dest('./build/tmp/img'))
                .pipe($.flatten())
                .pipe(gulp.dest('./build/tmp/img_all'))
                .pipe(gulp.dest('./public/img'))
        );

    stream.on('end', cb);
});

gulp.task('copy-raster', function () {
    return gulp.src(['./src/**/img/**/*.{png,gif,jpg,jpeg}'])
            .pipe(errorHandle())
            .pipe($.imagemin({silent: true}))
            .pipe($.rename(function (p) {
                p.dirname = p.dirname.split(path.sep)[2];
            }))
            .pipe(gulp.dest('./build/tmp/img'))
            .pipe($.flatten())
            .pipe(gulp.dest('./build/tmp/img_all'))
            .pipe(gulp.dest('./public/img'));
});

gulp.task('generate-sprites', ['collect-images-usage-stats', 'copy-svg-raster', 'copy-raster'], function (cb) {
    var skins = deps.getSkinsList(),
        stats = deps.getImagesUsageStats(skins),

        statisticsStreams = skins.map(function (skinName) {
            // Adds comma to make glob’s {} working properly,
            // even there is only one should be excluded
            var filesToExclude = stats[skinName].repeatable.join(',') + ',' + stats[skinName].noRepeatableNotSprited.join(','),
                pngList = [
                    './build/tmp/**/' + skinName + '/**/*.png',
                    '!./build/tmp/**/' + skinName + '/**/*@2x.png',
                    '!./build/tmp/**/' + skinName + '/**/{' + filesToExclude + '}.png'
                ],
                png2xList = [
                    './build/tmp/**/' + skinName + '/**/*@2x.png',
                    '!./build/tmp/**/' + skinName + '/**/{' + filesToExclude + '}@2x.png'
                ],
                spriteData = gulp.src(pngList)
                    .pipe(errorHandle())
                    .pipe($.spritesmith({
                        cssTemplate: './build/sprite-template.mustache',
                        algorithm: 'binary-tree',
                        imgName: 'sprite.' + skinName + '.png',
                        imgPath: 'sprite.' + skinName + '.png',
                        cssName: 'sprite.' + skinName + '.less',
                        engine: 'pngsmith'
                    })),
                spriteData2x = gulp.src(png2xList)
                    .pipe(errorHandle())
                    .pipe($.spritesmith({
                        cssTemplate: './build/sprite-template.mustache',
                        algorithm: 'binary-tree',
                        imgName: 'sprite@2x.' + skinName + '.png',
                        imgPath: 'sprite@2x.' + skinName + '.png',
                        cssName: 'sprite@2x.' + skinName + '.less',
                        engine: 'pngsmith'
                    }));

            return es.concat(
                spriteData.img
                    .pipe($.imagemin({silent: true}))
                    .pipe(gulp.dest('./public/img/')),
                spriteData2x.img
                    .pipe($.imagemin({silent: true}))
                    .pipe(gulp.dest('./public/img/')),
                spriteData.css.pipe(gulp.dest('./build/tmp/less/')),
                spriteData2x.css.pipe(gulp.dest('./build/tmp/less/'))
                );
        });

    var stream = es.concat.apply(null, statisticsStreams);

    stream.on('end', cb);
});

gulp.task('test', ['build'], function () {
    var cliOptions = extend({}, $.util.env),
        modulesToTest = [],
        sourcesList = [
            './vendors/leaflet/spec/before.js',
            './public/js/script.js',
            './vendors/leaflet/spec/after.js',
            './node_modules/happen/happen.js'
        ];

    if ('m' in cliOptions) {
        modulesToTest = cliOptions.m.split(',');
    }

    if ('module' in cliOptions) {
        modulesToTest = cliOptions.module.split(',');
    }

    if (modulesToTest.length) {
        modulesToTest.forEach(function (moduleName) {
            sourcesList.push('./src/' + moduleName + '/test/*Spec.js');
        });
    }
    else {
        sourcesList.push('./src/**/test/*Spec.js');
    }

    sourcesList.push('./vendors/leaflet/spec/suites/SpecHelper.js');
    sourcesList.push('./vendors/leaflet/spec/suites/**/*Spec.js');

    return gulp.src(sourcesList)
                .pipe(errorHandle())
                .pipe($.karma({
                    configFile: './test/karma.conf.js',
                    browsers: test.getBrowsers(),
                    reporters: test.getReporters(),
                    junitReporter: test.getJunitReporter(),
                    action: 'run'
                }))
                .on('error', function(err) {
                    // Make sure failed tests cause gulp to exit non-zero
                    throw err;
                });
});

gulp.task('doc', function () {
    var doc = config.doc;
    gendoc.generateDocumentation(doc.menu, doc.input, doc.output);
});

gulp.task('build-leaflet', function () {
    return gulp.src(deps.getJSFiles({source: 'leaflet'}))
           .pipe($.concat('leaflet-src.js'))
           .pipe(gulp.dest('./vendors/leaflet/dist/'));
});

gulp.task('build', ['build-clean', 'clean-up-tmp-images'], function (cb) {

    runSequence(['build-scripts', 'build-styles', 'doc', 'copy-private-assets'],
              function () {
                    if (error) { return; }

                    cb();

                    console.log('Build contains the next modules:');

                    deps.getModulesList($.util.env.pkg).forEach(function (module) {
                        console.log('- ' + module);
                    });

                    if ($.util.env.sprite === 'true') {
                        $.util.log('Builded with sprites');
                    } else if ($.util.env.base64 !== 'false' && typeof $.util.env.base64 !== 'undefined') {
                        $.util.log('Builded with base64 encode');
                    }

                    console.log('\nDist files statistic:');
                    Object.keys(stat).forEach(function (file) {
                        console.log('- ' + file + ': ' + stat[file]);
                    });

                    $.util.log($.util.colors.green('Build successfully complete'));

              });
});

//watchers
gulp.task('watch', function () {
    gulp.watch('./private/*.*', ['copy-private-assets']);
    gulp.watch('./vendors/leaflet/src/**/*.*', ['build-leaflet']);
    gulp.watch('./src/doc/**/*.*', ['doc']);
});

//service tasks
gulp.task('build-clean', function () {
    return gulp.src('./public', { read: false }).pipe($.rimraf());
});

gulp.task('clean-up-tmp-less', function () {
    return gulp.src(['./build/tmp/less/*'], { read: false }).pipe($.rimraf());
});

gulp.task('clean-up-tmp-images', function () {
    return gulp.src(['./build/tmp/img/*', './build/tmp/img_all/*'], { read: false }).pipe($.rimraf());
});

gulp.task('bump', function () {
    return gulp.src('./package.json')
               .pipe($.bump($.util.env))
               .pipe(gulp.dest('./'));
});

gulp.task('bumpLoader', ['bump'], function (done) {
    config.updateLoaderVersion(done);
});

gulp.task('commitFiles', ['bumpLoader'], function () {
    var pkg = require('./package.json'),
        v = pkg.version,
        message = 'Release ' + v;

    return gulp.src('').pipe($.git.commit(message));
});

gulp.task('release', ['commitFiles'], function (done) {
    var pkg = require('./package.json'),
        v = pkg.version;

    $.git.tag(v, v);
    ///$.git.push('all', 'master', '--tags');
    done();
});

gulp.task('collect-images-usage-stats', ['clean-up-tmp-less'], function (cb) {
    var skins = deps.getSkinsList(),

        imagesBasePath = path.resolve(__dirname + '/build/tmp/img_all'),

        statisticsStreams = skins.map(function (skinName) {
            var skinLessFiles = glob.sync('./src/**/' + skinName + '/less/*.less');

            skinLessFiles.unshift('./private/less/mixins.images-usage-statistics.less');
            skinLessFiles.unshift('./private/less/mixins.ie8.less');

            skinLessFiles = skinLessFiles.map(function (lessFilePath) {
                return lessFilePath + ':reference';
            });

            return gulp.src('./private/less/images-usage-statistics.less')
                    .pipe(errorHandle())
                    .pipe($.header(deps.lessHeader({
                        variables: {
                            skinName: skinName,
                            baseURL: '\'__BASE_URL__\'',

                            mobile: false,
                            ie8: true,

                            imagesBasePath: '\'' + imagesBasePath + '\''
                        },
                        imports: skinLessFiles
                    })))
                    .pipe($.less())
                    .pipe($.rename('images-usage-statistics.' + skinName + '.less'))
                    .pipe(gulp.dest('./build/tmp/less/'));
        });

    var stream = es.concat.apply(null, statisticsStreams);
    stream.on('end', cb);
});

gulp.task('collect-images-stats', ['copy-svg', 'copy-svg-raster', 'copy-raster'], function (cb) {
    var skins = deps.getSkinsList(),
        imagesStatsPerSkin = deps.getImagesFilesStats(skins);

    skins.forEach(function (skinName) {
        var skinImagesFilesStats = imagesStatsPerSkin[skinName];

        var statisticsObject,
            statisticsString = '',
            extension;

        for (var imageName in skinImagesFilesStats) {
            statisticsObject = skinImagesFilesStats[imageName];
            extension = (typeof statisticsObject.extension === 'undefined') ? 'svg' : statisticsObject.extension;
            statisticsString = statisticsString +
                '.imageFileData(\'' + imageName + '\') {' +
                    '@filename: \'' + imageName + '\';' +
                    '@extension: \'' + extension + '\'; ' +
                    '@hasVectorVersion: ' + !!statisticsObject.hasVectorVersion + ';' +
                    '}\n';
        }

        fs.writeFileSync('./build/tmp/less/images-files-statistics.' + skinName + '.less', statisticsString);
    });

    cb();
});

function saveSize(file, cb) {
    var name = path.basename(file.path.split('/').pop());
    stat[name] = prettyBytes(file.contents.length);
    cb(null, file);
}

//Exports API for live src streaming
//js build api
function bldJs(opt, enableSsl) {
    if (typeof opt.pkg === 'boolean') {
        error = new $.util.PluginError({
          plugin: 'deps',
          message: 'pkg param can\'t be empty'
        });
        errorNotify(error);
        throw error;
    }

    return gulp.src(deps.getJSFiles(opt))
                .pipe(errorHandle())
                .pipe($.redust(config.tmpl))
                .pipe($.frep(config.cfgParams({ssl: enableSsl})))
                .pipe($.concat('script.js'))
                .pipe($.header(config.js.intro))
                .pipe($.footer(projectList))
                .pipe($.footer(config.js.outro))
                .pipe(opt.isDebug ? $.util.noop() : $.cache($.uglify()))
                .pipe($.header(config.copyright));
}

// Builds CSS from Less
function buildCss(options, enableSsl) {
    options = options || {};

    var skin = options.skin || config.appConfig.DEFAULT_SKIN,

        imagesBasePath = path.resolve(__dirname + '/build/tmp/img_all'),

        lessList = deps.getCSSFiles(options),
        lessPrerequirements = deps.lessHeader({
            variables: {
                baseURL: '"__BASE_URL__"',

                mobile: options.mobile,
                ie8: options.ie8,

                shouldUseSprites: options.sprite,

                skinName: skin,

                imagesBasePath: '\'' + imagesBasePath + '\''
            },
            imports: [
                './build/tmp/less/sprite.basic.less:reference',
                './build/tmp/less/sprite@2x.basic.less:reference',
                './build/tmp/less/sprite.' + skin + '.less:reference',
                './build/tmp/less/sprite@2x.' + skin + '.less:reference',

                './build/tmp/less/images-files-statistics.basic.less:reference',
                './build/tmp/less/images-files-statistics.' + skin + '.less:reference',

                './private/less/mixins.less:reference',
                './private/less/mixins.ie8.less:reference'
            ]
        });

    if (!lessList.length) { return false; }

    return gulp.src(lessList)
                .pipe(errorHandle())
                .pipe($.header(lessPrerequirements))
                .pipe($.frep( config.cfgParams({ssl: enableSsl})))
                .pipe($.less())
                .pipe($.cache($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')))
                .pipe($.concat('styles.css'))
                .pipe(options.isDebug ? $.util.noop() : $.minifyCss())
                .pipe($.header(config.copyright));
}


module.exports = {
    getJS: bldJs,
    getCSS: buildCss
};
