var extend = require('extend'),
    es = require('event-stream'),
    map = require('map-stream'), // @TODO: Probably, it can be replaced with es.map?
    prettyBytes = require('pretty-bytes'),

    gulp = require('gulp'),
    tasks = require('gulp-load-plugins')(),

    path = require('path'),
    glob = require('glob'),
    fs = require('fs'),

    webapiProjects = require('2gis-project-loader'),

    gendoc = require('./docbuilder/gendoc.js'),
    config = require('./build/config.js'),
    deps = require('./build/gulp-deps')(config),
    stat = {}; // Files minification statistics

var projectList;

webapiProjects(function (err, projects) {
    if (err) { throw err; }
    projectList = 'DG.projectsList = JSON.parse(\'' + JSON.stringify(projects) + '\')';
});
//public CLI API
// Get info
gulp.task('default', function () {
    tasks.util.log('\nTasks list:');
    tasks.util.log('gulp assets      # Create public folder and copy all assets there');
    tasks.util.log('gulp lint        # Check JS files for errors with JSHint');
    tasks.util.log('gulp build       # Lint, combine and minify source files, update doc, copy assets');
    tasks.util.log('gulp doc         # Generate documentation from .md files');
    tasks.util.log('gulp test        # Rebuild source and run unit tests');
    tasks.util.log('gulp watch       # Starts watching private & src/**/svg folders');
});

gulp.task('build-scripts', ['lint'], function () {
    return bldJs(extend(tasks.util.env, { isDebug: true }))
        .pipe(map(saveSize))
        .pipe(gulp.dest('./public/js/'))
        .pipe(tasks.rename({ suffix: '.min' }))
        .pipe(tasks.cache(tasks.uglify()))
        .pipe(tasks.header(config.copyright))
        .pipe(map(saveSize))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('build-styles', ['collect-images-stats', 'generate-sprites'], function () {
    return es.concat(
        buildCss(extend(tasks.util.env, { includeModernBrowsers: true, isDebug: true }))
             .pipe(map(saveSize))
             .pipe(gulp.dest('./public/css/'))
             .pipe(tasks.rename({ suffix: '.min' }))
             .pipe(tasks.minifyCss())
             .pipe(tasks.header(config.copyright))
             .pipe(map(saveSize))
             .pipe(gulp.dest('./public/css/')),

         buildCss(extend(tasks.util.env, { includeModernBrowsers: true, includeIE: true, isDebug: true }))
             .pipe(tasks.rename({ suffix: '.full' }))
             .pipe(gulp.dest('./public/css/'))
             .pipe(tasks.rename({ suffix: '.min' }))
             .pipe(tasks.minifyCss())
             .pipe(tasks.header(config.copyright))
             .pipe(gulp.dest('./public/css/')),

         buildCss(extend(tasks.util.env, { includeIE: true, isDebug: true }))
             .pipe(tasks.rename({ suffix: '.ie' }))
             .pipe(gulp.dest('./public/css/'))
             .pipe(tasks.rename({ suffix: '.min' }))
             .pipe(tasks.minifyCss())
             .pipe(tasks.header(config.copyright))
             .pipe(gulp.dest('./public/css/'))
    );
});

gulp.task('build-assets', function () {
    return es.concat(
        gulp.src(['./private/*.*', '!./private/loader.js'])
            .pipe(gulp.dest('./public/')),
        gulp.src('./build/tmp/img_all/*.*')
            .pipe(gulp.dest('./public/img')),
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
});

gulp.task('clean-up-less', function () {
    return gulp.src(['./build/tmp/less/*'], { read: false }).pipe(tasks.clean());
});

gulp.task('clean-up-images', function () {
    return gulp.src(['./build/tmp/img/*', './build/tmp/img_all/*'], { read: false }).pipe(tasks.clean());
});

gulp.task('clean-up', ['clean-up-less', 'clean-up-images']);


gulp.task('collect-images-usage-stats', function () {
    var skins = getSkinsList(),
    
        statisticsStreams = skins.map(function (skinName) {
            var skinLessFiles = glob.sync('./src/**/' + skinName + '/less/*.less', { sync: true });

            skinLessFiles.unshift('./private/less/mixins.images-usage-statistics.less');
            skinLessFiles.unshift('./private/less/mixins.ie.less');

            skinLessFiles = skinLessFiles.map(function (lessFilePath) {
                return lessFilePath + ':reference';
            });

            return (
                gulp.src('./private/less/images-usage-statistics.less')
                    .pipe(tasks.header(deps.lessHeader({
                        variables: {
                            skinName: skinName,
                            baseURL: '\'__BASE_URL__\'',
                            analyticsBaseURL: '\'http://maps.api.2gis.ru/analytics/\'',

                            isModernBrowser: true,
                            isIE: true
                        },
                        imports: skinLessFiles
                    })))
                    .pipe(tasks.less())
                    .pipe(tasks.rename('images-usage-statistics.' + skinName + '.less'))
                    .pipe(gulp.dest('./build/tmp/less/'))
                );
        });

    return es.concat.apply(null, statisticsStreams);
});

gulp.task('collect-images-stats', function (taskCaback) {
    var skins = getSkinsList(),
        imagesStatsPerSkin = getImagesFilesStats(skins);

    skins.forEach(function (skinName) {
        var skinImagesFilesStats = imagesStatsPerSkin[skinName];

        var statisticsObject,
            statisticsString = '';

        for (var imageName in skinImagesFilesStats) {
            statisticsObject = skinImagesFilesStats[imageName];
            statisticsString = statisticsString +
                '.imageFileData(\'' + imageName + '\') {' +
                    '@filename: \'' + imageName + '\';' +
                    '@extension: \'' + (typeof statisticsObject.extension == 'undefined' ? 'svg' : statisticsObject.extension) + '\'; ' +
                    '@hasVectorVersion: ' + !!statisticsObject.hasVectorVersion + ';' +
                    '}\n';
        }

        fs.writeFileSync('./build/tmp/less/images-files-statistics.' + skinName + '.less', statisticsString);
    });

    taskCaback();
});

gulp.task('copy-svg', function () {
    return (
        gulp.src('./src/**/img/**/*.svg')
            .pipe(tasks.svgmin())
            .pipe(tasks.rename(function (path) {
                path.dirname = path.dirname.replace(/^.*\/(.*)\/img$/, '$1');
            }))
            .pipe(gulp.dest('./build/tmp/img'))
            .pipe(tasks.rename({ dirname: './' }))
            .pipe(gulp.dest('./build/tmp/img_all'))
    );
});

gulp.task('copy-svg-raster', function () {
    tasks.util.log(tasks.util.colors.green(('Converting SVG to PNG. It can take a long time, please, be patient')));

    return (
        es.concat(
            gulp.src('./src/**/img/**/*.svg')
                .pipe(tasks.raster())
                .pipe(tasks.rename(function (path) {
                    path.extname = '.png';
                    path.dirname = path.dirname.replace(/^.*\/(.*)\/img$/, '$1');
                }))
                .pipe(tasks.imagemin())
                .pipe(gulp.dest('./build/tmp/img'))
                .pipe(tasks.rename({ dirname: './' }))
                .pipe(gulp.dest('./build/tmp/img_all')),

            gulp.src('./src/**/img/**/*.svg')
                .pipe(tasks.raster({ scale: 2 }))
                .pipe(tasks.rename(function (path) {
                    path.extname = '@2x.png';
                    path.dirname = path.dirname.replace(/^.*\/(.*)\/img$/, '$1');
                }))
                .pipe(tasks.imagemin())
                .pipe(gulp.dest('./build/tmp/img'))
                .pipe(tasks.rename({ dirname: './' }))
                .pipe(gulp.dest('./build/tmp/img_all'))
        )
    );
});

gulp.task('copy-raster', function () {
    return (
        gulp.src(['./src/**/img/**/*.{png,gif,jpg,jpeg}'])
            .pipe(tasks.imagemin())
            .pipe(tasks.rename(function (path) {
                path.dirname = path.dirname.replace(/^.*\/(.*)\/img$/, '$1');
            }))
            .pipe(gulp.dest('./build/tmp/img'))//,
            .pipe(tasks.rename({ dirname: './' }))
            .pipe(gulp.dest('./build/tmp/img_all'))
    );
});

gulp.task('prepare-raster', ['copy-svg-raster', 'copy-raster']);

gulp.task('generate-sprites', ['collect-images-usage-stats', 'prepare-raster'], function (taskCallback) {
    var skins = getSkinsList(),
        stats = getImagesUsageStats(skins),
        
        statisticsStreams = skins.map(function (skinName) {
            // Adds comma to make glob’s {} working properly,
            // even there is only one should be excluded
            var filesToExclude = stats[skinName].repeatable.join(',') + ',',
                pngList = [
                    './build/tmp/**/' + skinName +'/**/*.png',
                    '!./build/tmp/**/' + skinName + '/**/*@2x.png',
                    '!./build/tmp/**/' + skinName + '/**/{' + filesToExclude + '}.png'
                ],
                png2xList = [
                    './build/tmp/**/' + skinName +'/**/*@2x.png',
                    '!./build/tmp/**/' + skinName +'/**/{' + filesToExclude + '}@2x.png'
                ];

            return es.concat(
                gulp.src(pngList)
                    .pipe(tasks.spritesmith({
                        styleTemplate: './build/sprite-template.mustache',
                        imgName: 'sprite.png',
                        styleName: 'sprite.less',
                        groupBy: 'img',
                        imgPath: '../img/sprite.png',
                        engine: 'pngsmith'
                    })),

                gulp.src(png2xList)
                    .pipe(tasks.spritesmith({
                        styleTemplate: './build/sprite-template.mustache',
                        imgName: 'sprite@2x.png',
                        styleName: 'sprite@2x.less',
                        groupBy: 'img',
                        imgPath: '../img/sprite@2x.png',
                        engine: 'pngsmith'
                    }))
                )
                .pipe(tasks.if('*.less', gulp.dest('./build/tmp/less/')), true)
                .pipe(tasks.imagemin())
                .pipe(gulp.dest('./build/tmp/img/'))
                .pipe(tasks.rename({ dirname: './' }))
                .pipe(gulp.dest('./build/tmp/img_all/'));
        });

    return es.concat.apply(null, statisticsStreams);
});

gulp.task('prepare-svg', ['copy-svg']);

gulp.task('build-graphics-tasks', ['prepare-svg', 'prepare-raster', 'generate-sprites']);

gulp.task('build-graphics', ['clean-up-images'], function() {
    return gulp.start('build-graphics-tasks');
});

gulp.task('lint', function () {
    return gulp.src('./src/**/src/**/*.js')
               .pipe(tasks.cache(tasks.jshint('.jshintrc')))
               .pipe(tasks.jshint.reporter('jshint-stylish'));
});

//TODO: refactor this config
gulp.task('test', ['build-tasks'], function () {
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

gulp.task('build', ['build-clean'], function () {
    return gulp.start('build-tasks');
});

gulp.task('build-tasks', ['build-scripts', 'build-graphics', 'build-styles', 'build-assets', 'doc'], function () {
    tasks.util.log('Build contains the next modules:');

    deps.getModulesList().forEach(function (module) {
        console.log('- ' + module);
    });

    console.log('\nDist files statistic:');
    Object.keys(stat).forEach(function (file) {
        console.log('- ' + file + ': ' + stat[file]);
    });
    tasks.util.log(tasks.util.colors.green('Build successfully complete'));

    return;
});

//watchers
gulp.task('watch', function () {
    gulp.watch('./private/*.*', ['build-assets']);
    gulp.watch('./src/**/img/**/*.*', ['build-sprites']);
    gulp.watch('./src/**/tmpl/**/*.*', ['build-scripts']);
    gulp.watch('./src/**/less/**/*.*', ['build-styles']);
    gulp.watch('./private/less/*.*', ['build-styles']);
});

//service tasks
gulp.task('build-clean', function () {
    return gulp.src('./public', { read: false }).pipe(tasks.clean());
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
               .pipe(opt.isDebug ? tasks.footer(config.js.dustdebug) : tasks.util.noop())
               .pipe(tasks.footer(projectList))
               .pipe(tasks.footer(config.js.outro))
               .pipe(opt.isDebug ? tasks.util.noop() : tasks.cache(tasks.uglify()))
               .pipe(tasks.header(config.copyright));
}

/**
 * Builds CSS from Less
 *
 * @param {Object} options
 * @param {String} options.skin Skin name
 *
 * @param {Boolean} options.includeModernBrowsers If true, usual styles will be built in
 * @param {Boolean} options.includeIE If true, IE8 specific styles will built in
 *
 * @param {Boolean} options.isDebug Deprecated option, do not use it
 *
 * @returns {Object} Stream
 */
function buildCss(options) {
    options = options || {};

    var skin = (options.skin || tasks.util.env.skin) || config.appConfig.DEFAULT_SKIN,

        lessList = deps.getCSSFiles(options),
        lessPrerequirements = deps.lessHeader({
            variables: {
                baseURL: '"__BASE_URL__"',
                analyticsBaseURL: '"http://maps.api.2gis.ru/analytics/"',

                isModernBrowser: options.includeModernBrowsers,
                isIE: options.includeIE,

                skinName: skin
            },
            imports: [
                './build/tmp/less/sprite.basic.less:reference',
                './build/tmp/less/sprite@2x.basic.less:reference',
                './build/tmp/less/sprite.' + skin + '.less:reference',
                './build/tmp/less/sprite@2x.' + skin + '.less:reference',

                './build/tmp/less/images-files-statistics.basic.less:reference',
                './build/tmp/less/images-files-statistics.' + skin + '.less:reference',

                './private/less/mixins.less:reference',
                './private/less/mixins.ie.less:reference'
            ]
        });

    return gulp.src(lessList)
            .pipe(tasks.header(lessPrerequirements))
            .pipe(tasks.frep(config.cfgParams))
            .pipe(tasks.less())
            .pipe(tasks.cache(tasks.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')))
            //.pipe(tasks.base64({ extensions: ['svg'] }))
            .pipe(tasks.concat('styles.css'))
            .pipe(options.isDebug ?
                tasks.util.noop() :
                tasks.minifyCss())
            .pipe(tasks.header(config.copyright));
}

/**
 * Scans the project for skins directories to get skins names
 *
 * @returns {Array} List of skins’ names
 */
function getSkinsList() {
    var skinsDirectories = glob.sync('./src/**/skin/*'),
        skins = [];

    skinsDirectories.forEach(function (directory) {
        var skinName = path.basename(directory);

        if (skins.indexOf(skinName) == -1) {
            skins.push(skinName);
        }
    });

    return skins;
}

/**
 * Analyzes Less, gets images usage statistics per skin
 *
 * @param {String[]} [skins] List of skins names those need be analyzed,
 *                           if not passed, all the skins will be analyzed
 *
 * @returns {Object} Images usage statistics per skin
 */
function getImagesUsageStats(skins) {
    skins = skins || getSkinsList();

    var perSkinStats = {};

    skins.forEach(function (skinName) {
        var stats = {},

            statsFilePath = './build/tmp/less/images-usage-statistics.' + skinName + '.less',
            statsFileContent = fs.readFileSync(statsFilePath).toString(),
            preparedStatsFileContent = statsFileContent.slice(6).replace(/\;/g, ','), // 6 is 'stats '.length

            rawStats = (new Function('return ' + preparedStatsFileContent))();

        stats.repeatable = rawStats.repeatable.split(',');
        // Repeatable images can be used as no-repeatable images,
        // so we should exclude repeatable images from no-repeatable images list
        stats.noRepeatable = rawStats.noRepeatable.split(',').filter(function (name) {
            return stats.repeatable.indexOf(name) == -1;
        });

        perSkinStats[skinName] = stats;
    });

    return perSkinStats;
}

/**
 * Gets images per skin formats statistics
 *
 * @param {String[]} [skins] List of skins names those need be analyzed,
 *                           if not passed, all the skins will be analyzed
 *
 * @returns {Object} Statistics per skin
 */
function getImagesFilesStats(skins) {
    skins = skins || getSkinsList();

    var perSkinStats = {};

    skins.forEach(function (skinName) {
        var imagesPaths = glob.sync('./build/tmp/img/' + skinName + '/*'),
            skinStats = {};

        imagesPaths.forEach(function (imagePath) {
            var basename = path.basename(imagePath),
                extname = path.extname(imagePath),

                name = path.basename(imagePath, extname);

            if (!(name in skinStats)) {
                skinStats[name] = {};
            }

            if (extname == '.svg') {
                skinStats[name].hasVectorVersion = true;
            }
            else {
                skinStats[name].extension = extname.replace('.', '');
            }
        });

        perSkinStats[skinName] = skinStats;
    });

    return perSkinStats;
}


module.exports = {
    getJS: bldJs,
    getCSS: buildCss
};
