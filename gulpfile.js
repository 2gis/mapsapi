var extend = require('extend'),
    es = require('event-stream'),
    map = require('map-stream'),
    prettyBytes = require('pretty-bytes'),

    gulp = require('gulp'),
    tasks = require('gulp-load-plugins')(),

    path = require('path'),
    glob = require('glob'),
    fs = require('fs'),
    runSequence = require('run-sequence'),

    webapiProjects = require('./build/2gis-project-loader'),

    gendoc = require('./docbuilder/gendoc.js'),
    config = require('./build/config.js'),
    deps = require('./build/gulp-deps')(config),
    stat = {}; // Files minification statistics

tasks.imagemin = require('./build/gulp-imagemin');
tasks.spritesmith = require('gulp.spritesmith');

var projectList;

webapiProjects(function (err, projects) {
    if (err) { throw err; }
    projectList = 'DG.projectsList = JSON.parse(\'' + JSON.stringify(projects) + '\')';
});

//public CLI API
gulp.task('default', ['build']);

gulp.task('help', function () {
    tasks.util.log('\nTasks list:');
    tasks.util.log('gulp lint        # Check JS files for errors with JSHint');
    tasks.util.log('gulp build       # Lint, combine and minify source files, update doc, copy assets');
    tasks.util.log('gulp doc         # Generate documentation from .md files');
    tasks.util.log('gulp test        # Rebuild source and run unit tests');
    tasks.util.log('gulp watch       # Starts watching private & leaflet/src folders');
});

gulp.task('build-scripts', ['lint', /*'build-clean',*/ 'build-leaflet'], function () {
    return bldJs(extend({ isDebug: true }, tasks.util.env))
        .pipe(map(saveSize))
        .pipe(gulp.dest('./public/js/'))
        .pipe(tasks.rename({ suffix: '.min' }))
        .pipe(tasks.cache(tasks.uglify()))
        .pipe(tasks.header(config.copyright))
        .pipe(map(saveSize))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('lint', function () {
    return gulp.src('./src/**/src/**/*.js')
               .pipe(tasks.cache(tasks.jshint('.jshintrc')))
               .pipe(tasks.jshint.reporter('jshint-stylish'));
});

gulp.task('build-styles', ['collect-images-stats', 'generate-sprites'], function () {
    var cliOptions = extend({}, tasks.util.env);

    cliOptions.mobile = cliOptions.base64 === 'false';

    if (typeof cliOptions.sprite !== 'undefined') {
        cliOptions.sprite = cliOptions.sprite === 'true';
    }

    var css = [
       {
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
       }
    ].map(function(list) {
        var bandle = buildCss(extend({ isDebug: true }, list, cliOptions));
        if (!bandle) { return false; }
        return bandle
            .pipe(list.size ? map(saveSize) : tasks.util.noop())
            .pipe(list.name ? tasks.rename({ suffix: '.' + list.name }) : tasks.util.noop())
            .pipe(gulp.dest('./public/css/'))
            .pipe(tasks.rename({ suffix: '.min' }))
            .pipe(tasks.minifyCss())
            .pipe(tasks.header(config.copyright))
            .pipe(list.size ? map(saveSize) : tasks.util.noop())
            .pipe(gulp.dest('./public/css/'));
    }).filter(Boolean);

    return es.concat.apply(null, css);
});

var copyPrivateAssets = function () {
    return es.concat(
        gulp.src(['./private/*.*', '!./private/loader.js'])
            .pipe(gulp.dest('./public/')),

        gulp.src('./private/img/*.*')
            .pipe(gulp.dest('./public/img')),
        gulp.src('./vendors/leaflet/dist/images/*')
            .pipe(gulp.dest('./public/img/vendors/leaflet')),

        gulp.src('./src/**/fonts/**/*.*')
            .pipe(tasks.flatten())
            .pipe(gulp.dest('./public/fonts/')),

        gulp.src('./private/loader.js')
            .pipe(tasks.uglify())
            .pipe(gulp.dest('./public/'))
        );
};

gulp.task('copy-private-assets', /*['build-clean'],*/ function () {
    return copyPrivateAssets();
});

gulp.task('copy-private-assets-without-clean', function () {
    return copyPrivateAssets();
});

gulp.task('copy-sprites', ['copy-svg', 'generate-sprites'], function () {
    return gulp.src('./build/tmp/img/sprite*.png')
            .pipe(gulp.dest('./public/img'));
});


gulp.task('copy-svg', /*['clean-up-tmp-images', 'build-clean'],*/ function () {
    return gulp.src('./src/**/img/**/*.svg')
            .pipe(tasks.imagemin({silent: true}))
            .pipe(tasks.rename(function (path) {
                path.dirname = path.dirname.replace(/^.*\/(.*)\/img$/, '$1');
            }))
            .pipe(gulp.dest('./build/tmp/img'))
            .pipe(tasks.flatten())
            .pipe(gulp.dest('./build/tmp/img_all'))
            .pipe(gulp.dest('./public/img'));
});

gulp.task('copy-svg-raster', /*['clean-up-tmp-images'],*/ function () {
    tasks.util.log(tasks.util.colors.green(('Converting SVG to PNG. It can take a long time, please, be patient')));

    return es.concat(
            gulp.src('./src/**/img/**/*.svg')
                //.pipe(tasks.raster())
                .pipe(tasks.rename(function (path) {
                    path.extname = '.png';
                    path.dirname = path.dirname.replace(/^.*\/(.*)\/img$/, '$1');
                }))
                .pipe(tasks.imagemin({silent: true}))
                .pipe(gulp.dest('./build/tmp/img'))
                .pipe(tasks.flatten())
                .pipe(gulp.dest('./build/tmp/img_all'))
                .pipe(gulp.dest('./public/img')),

            gulp.src('./src/**/img/**/*.svg')
                //.pipe(tasks.raster({ scale: 2 }))
                .pipe(tasks.rename(function (path) {
                    path.extname = '@2x.png';
                    path.dirname = path.dirname.replace(/^.*\/(.*)\/img$/, '$1');
                }))
                .pipe(tasks.imagemin({silent: true}))
                .pipe(gulp.dest('./build/tmp/img'))
                .pipe(tasks.flatten())
                .pipe(gulp.dest('./build/tmp/img_all'))
                .pipe(gulp.dest('./public/img'))
        );
});

gulp.task('copy-raster', /*['clean-up-tmp-images', 'build-clean'],*/ function () {
    return gulp.src(['./src/**/img/**/*.{png,gif,jpg,jpeg}'])
            //.pipe(tasks.imagemin({silent: true}))
            .pipe(tasks.rename(function (path) {
                path.dirname = path.dirname.replace(/^.*\/(.*)\/img$/, '$1');
            }))
            .pipe(gulp.dest('./build/tmp/img'))
            .pipe(tasks.flatten())
            .pipe(gulp.dest('./build/tmp/img_all'))
            .pipe(gulp.dest('./public/img'));
});

gulp.task('generate-sprites', ['collect-images-usage-stats', 'copy-svg-raster', 'copy-raster'], function () {
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
                    .pipe(tasks.spritesmith({
                        cssTemplate: './build/sprite-template.mustache',
                        algorithm: 'binary-tree',
                        imgName: 'sprite.' + skinName + '.png',
                        imgPath: 'sprite.' + skinName + '.png',
                        cssName: 'sprite.' + skinName + '.less',
                        engine: 'pngsmith'
                    })),
                spriteData2x = gulp.src(png2xList)
                    .pipe(tasks.spritesmith({
                        cssTemplate: './build/sprite-template.mustache',
                        algorithm: 'binary-tree',
                        imgName: 'sprite@2x.' + skinName + '.png',
                        imgPath: 'sprite@2x.' + skinName + '.png',
                        cssName: 'sprite@2x.' + skinName + '.less',
                        engine: 'pngsmith'
                    }));

            return es.concat(
                spriteData.img
                    .pipe(tasks.imagemin({silent: true}))
                    .pipe(gulp.dest('./public/img/')),
                spriteData2x.img
                    .pipe(tasks.imagemin({silent: true}))
                    .pipe(gulp.dest('./public/img/')),
                spriteData.css.pipe(gulp.dest('./build/tmp/less/')),
                spriteData2x.css.pipe(gulp.dest('./build/tmp/less/'))
                );
        });

    return es.concat.apply(null, statisticsStreams);
});

//TODO: refactor this config
gulp.task('test', ['build'], function () {
    return gulp.src(['./vendors/leaflet/spec/before.js',
                     './public/js/script.js',
                     './vendors/leaflet/spec/after.js',
                     './node_modules/happen/happen.js',
                     './src/**/test/*Spec.js',
                     './vendors/leaflet/spec/suites/SpecHelper.js',
                     './vendors/leaflet/spec/suites/**/*Spec.js'
                ])
               .pipe(tasks.karma({
                    configFile: './test/karma.conf.js',
                    action: 'run'
                }));
});

gulp.task('doc', function () {
    var doc = config.doc;
    gendoc.generateDocumentation(doc.menu, doc.input, doc.output);
});

gulp.task('build-leaflet', function () {
    return gulp.src(deps.getJSFiles({source: 'leaflet'}))
           .pipe(tasks.concat('leaflet-src.js'))
           .pipe(gulp.dest('./vendors/leaflet/dist/'));
});

//gulp.task('build', ['build-scripts', 'copy-svg', 'generate-sprites', 'build-styles', 'copy-private-assets', 'copy-sprites', 'doc', 'build-leaflet'], function () {
gulp.task('build', ['build-clean', 'clean-up-tmp-images'], function (cb) {
    //'build-scripts', 'copy-svg', 'generate-sprites', 'build-styles', 'copy-private-assets', 'copy-sprites', 'doc', 'build-leaflet'

    runSequence('build-scripts', 'build-styles', 'doc',
              function () {
                    tasks.util.log('Build contains the next modules:');

                    deps.getModulesList(tasks.util.env.pkg).forEach(function (module) {
                        console.log('- ' + module);
                    });

                    if (tasks.util.env.sprite === 'true') {
                        tasks.util.log('Builded with sprites');
                    } else if (tasks.util.env.base64 !== 'false' && typeof tasks.util.env.base64 !== 'undefined') {
                        tasks.util.log('Builded with base64 encode');
                    }

                    console.log('\nDist files statistic:');
                    Object.keys(stat).forEach(function (file) {
                        console.log('- ' + file + ': ' + stat[file]);
                    });
                    tasks.util.log(tasks.util.colors.green('Build successfully complete'));

                    cb();
              });
});

//watchers
gulp.task('watch', function () {
    gulp.watch('./private/*.*', ['copy-private-assets-without-clean']);
    gulp.watch('./vendors/leaflet/src/**/*.*', ['build-leaflet']);
});

//service tasks
gulp.task('build-clean', function () {
    return gulp.src('./public', { read: false }).pipe(tasks.clean());
});

gulp.task('clean-up-tmp-less', function () {
    return gulp.src(['./build/tmp/less/*'], { read: false }).pipe(tasks.clean());
});

gulp.task('clean-up-tmp-images', function () {
    return gulp.src(['./build/tmp/img/*', './build/tmp/img_all/*'], { read: false }).pipe(tasks.clean());
});

gulp.task('bump', function () {
    return gulp.src('./package.json')
               .pipe(tasks.bump(tasks.util.env))
               .pipe(gulp.dest('./'));
});

gulp.task('bumpLoader', ['bump'], function (done) {
    config.updateLoaderVersion(done);
});

gulp.task('commitFiles', ['bumpLoader'], function () {
    var pkg = require('./package.json'),
        v = pkg.version,
        message = 'Release ' + v;

    return gulp.src('').pipe(tasks.git.commit(message));
});

gulp.task('release', ['commitFiles'], function (done) {
    var pkg = require('./package.json'),
        v = pkg.version;

    tasks.git.tag(v, v);
    ///tasks.git.push('all', 'master', '--tags');
    done();
});

gulp.task('collect-images-usage-stats', ['clean-up-tmp-less'], function () {
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
                    .pipe(tasks.header(deps.lessHeader({
                        variables: {
                            skinName: skinName,
                            baseURL: '\'__BASE_URL__\'',

                            mobile: false,
                            ie8: true,

                            imagesBasePath: '\'' + imagesBasePath + '\''
                        },
                        imports: skinLessFiles
                    })))
                    .pipe(tasks.less())
                    .pipe(tasks.rename('images-usage-statistics.' + skinName + '.less'))
                    .pipe(gulp.dest('./build/tmp/less/'));
        });

    return es.concat.apply(null, statisticsStreams);
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
    var name = file.path.split('/').pop();
    stat[name] = prettyBytes(file.contents.length);
    cb(null, file);
}

//Exports API for live src streaming
//js build api
function bldJs(opt) {
    return gulp.src(deps.getJSFiles(opt))
               .pipe(tasks.redust(config.tmpl))
               .pipe(tasks.frep(config.cfgParams))
               .pipe(tasks.concat('script.js'))
               .pipe(tasks.header(config.js.intro))
               .pipe(tasks.footer(projectList))
               .pipe(tasks.footer(config.js.outro))
               .pipe(opt.isDebug ? tasks.util.noop() : tasks.cache(tasks.uglify()))
               .pipe(tasks.header(config.copyright));
}

// Builds CSS from Less
function buildCss(options) {
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
            .pipe(tasks.header(lessPrerequirements))
            .pipe(tasks.frep(config.cfgParams))
            .pipe(tasks.less())
            .pipe(tasks.cache(tasks.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')))
            .pipe(tasks.concat('styles.css'))
            .pipe(options.isDebug ? tasks.util.noop() : tasks.minifyCss())
            .pipe(tasks.header(config.copyright));
}


module.exports = {
    getJS: bldJs,
    getCSS: buildCss
};
