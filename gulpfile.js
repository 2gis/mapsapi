var extend = require('extend'),
    es = require('event-stream'),
    map = require('map-stream'),
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

tasks.imagemin = require('./build/gulp-imagemin');

var projectList;

webapiProjects(function (err, projects) {
    if (err) { throw err; }
    projectList = 'DG.projectsList = JSON.parse(\'' + JSON.stringify(projects) + '\')';
});

//public CLI API
gulp.task('default', ['build']);

gulp.task('help', function () {
    tasks.util.log('\nTasks list:');
    tasks.util.log('gulp assets      # Create public folder and copy all assets there');
    tasks.util.log('gulp lint        # Check JS files for errors with JSHint');
    tasks.util.log('gulp build       # Lint, combine and minify source files, update doc, copy assets');
    tasks.util.log('gulp doc         # Generate documentation from .md files');
    tasks.util.log('gulp test        # Rebuild source and run unit tests');
    tasks.util.log('gulp watch       # Starts watching private & src/**/svg folders');
});

gulp.task('build-scripts', ['lint', 'build-clean'], function () {
    return bldJs(extend(tasks.util.env, { isDebug: true }))
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
    return es.concat(
        buildCss(extend({}, tasks.util.env, { isDebug: true }))
             .pipe(map(saveSize))
             .pipe(gulp.dest('./public/css/'))
             .pipe(tasks.rename({ suffix: '.min' }))
             .pipe(tasks.minifyCss())
             .pipe(tasks.header(config.copyright))
             .pipe(map(saveSize))
             .pipe(gulp.dest('./public/css/')),

         buildCss(extend({}, tasks.util.env, { ie8: true, isDebug: true }))
             .pipe(tasks.rename({ suffix: '.full' }))
             .pipe(gulp.dest('./public/css/'))
             .pipe(tasks.rename({ suffix: '.min' }))
             .pipe(tasks.minifyCss())
             .pipe(tasks.header(config.copyright))
             .pipe(gulp.dest('./public/css/')),

         buildCss(extend({}, tasks.util.env, { excludeBaseCss: true, ie8: true, isDebug: true }))
             .pipe(tasks.rename({ suffix: '.ie' }))
             .pipe(gulp.dest('./public/css/'))
             .pipe(tasks.rename({ suffix: '.min' }))
             .pipe(tasks.minifyCss())
             .pipe(tasks.header(config.copyright))
             .pipe(gulp.dest('./public/css/'))
    );
});

// gulp.task('assets', ['copy-private-assets', 'copy-sprites']);

gulp.task('copy-private-assets', ['build-clean'], function () {
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
});

// gulp.task('build-graphics', ['copy-svg', 'generate-sprites']);

gulp.task('copy-sprites', ['copy-svg', 'generate-sprites'], function () {
    return gulp.src('./build/tmp/img/sprite*.png')
            .pipe(gulp.dest('./public/img'));
});


gulp.task('copy-svg', ['clean-up-tmp-images', 'build-clean'], function () {
    return gulp.src('./src/**/img/**/*.svg')
            .pipe(tasks.imagemin({silent: true}))
            .pipe(tasks.rename(function (path) {
                path.dirname = path.dirname.replace(/^.*\/(.*)\/img$/, '$1');
            }))
            //.pipe(gulp.dest('./build/tmp/img'))
            .pipe(tasks.flatten())
            //.pipe(gulp.dest('./build/tmp/img_all'))
            .pipe(gulp.dest('./public/img'));
});

// gulp.task('prepare-raster', ['copy-svg-raster', 'copy-raster']);

gulp.task('copy-svg-raster', ['clean-up-tmp-images'], function () {
    tasks.util.log(tasks.util.colors.green(('Converting SVG to PNG. It can take a long time, please, be patient')));

    return es.concat(
            gulp.src('./src/**/img/**/*.svg')
                .pipe(tasks.raster())
                .pipe(tasks.rename(function (path) {
                    path.extname = '.png';
                    path.dirname = path.dirname.replace(/^.*\/(.*)\/img$/, '$1');
                }))
                .pipe(tasks.imagemin({silent: true}))
                .pipe(gulp.dest('./build/tmp/img'))
                .pipe(tasks.flatten())
                .pipe(gulp.dest('./build/tmp/img_all')),

            gulp.src('./src/**/img/**/*.svg')
                .pipe(tasks.raster({ scale: 2 }))
                .pipe(tasks.rename(function (path) {
                    path.extname = '@2x.png';
                    path.dirname = path.dirname.replace(/^.*\/(.*)\/img$/, '$1');
                }))
                .pipe(tasks.imagemin({silent: true}))
                .pipe(gulp.dest('./build/tmp/img'))
                .pipe(tasks.flatten())
                .pipe(gulp.dest('./build/tmp/img_all'))
        );
});

gulp.task('copy-raster', ['clean-up-tmp-images', 'build-clean'], function () {
    return gulp.src(['./src/**/img/**/*.{png,gif,jpg,jpeg}'])
            .pipe(tasks.imagemin({silent: true}))
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
                ];

            return es.concat(
                gulp.src(pngList)
                    .pipe(tasks.spritesmith({
                        styleTemplate: './build/sprite-template.mustache',
                        imgName: 'sprite.png',
                        styleName: 'sprite.less',
                        groupBy: 'img',
                        imgPath: 'sprite.png',
                        engine: 'pngsmith'
                    })),

                gulp.src(png2xList)
                    .pipe(tasks.spritesmith({
                        styleTemplate: './build/sprite-template.mustache',
                        imgName: 'sprite@2x.png',
                        styleName: 'sprite@2x.less',
                        groupBy: 'img',
                        imgPath: 'sprite@2x.png',
                        engine: 'pngsmith'
                    }))
                )
                // @TODO: Refactor this shit
                .pipe(tasks.if('*.png', gulp.dest('./build/tmp/img/')))
                .pipe(tasks.if('*.png', tasks.imagemin({silent: true})))
                .pipe(tasks.if('*.png', gulp.dest('./public/tmp/img/')))
                .pipe(tasks.if('*.less', gulp.dest('./build/tmp/less/')));
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

// gulp.task('build', ['build-clean', 'clean-up-tmp-less'], function () {
//     return gulp.start('build-tasks');
// });

gulp.task('build', ['build-scripts', 'copy-svg', 'generate-sprites', 'build-styles', 'copy-private-assets', 'copy-sprites', 'doc'], function () {
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
    gulp.watch('./private/*.*', ['copy-private-assets']);
    gulp.watch('./src/**/img/**/*.*', ['copy-svg', 'generate-sprites']);
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
                            analyticsBaseURL: '\'http://maps.api.2gis.ru/analytics/\'',

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
               .pipe(opt.isDebug ? tasks.footer(config.js.dustdebug) : tasks.util.noop())
               .pipe(tasks.footer(projectList))
               .pipe(tasks.footer(config.js.outro))
               .pipe(opt.isDebug ? tasks.util.noop() : tasks.cache(tasks.uglify()))
               .pipe(tasks.header(config.copyright));
}

// Builds CSS from Less
function buildCss(options) {
    options = options || {};

    var skin = (options.skin || tasks.util.env.skin) || config.appConfig.DEFAULT_SKIN,

        imagesBasePath = path.resolve(__dirname + '/build/tmp/img_all'),

        lessList = deps.getCSSFiles(options),
        lessPrerequirements = deps.lessHeader({
            variables: {
                baseURL: '"__BASE_URL__"',
                analyticsBaseURL: '"http://maps.api.2gis.ru/analytics/"',

                mobile: options.mobile,
                ie8: options.ie8,

                shouldUseSprites: options.sprite || tasks.util.env.sprite,

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
    // console.log(options.sprite || tasks.util.env.sprite);

    return gulp.src(lessList)
            .pipe(tasks.header(lessPrerequirements))
            .pipe(tasks.frep(config.cfgParams))
            .pipe(tasks.less())
            .pipe(tasks.cache(tasks.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')))
            .pipe(tasks.concat('styles.css'))
            .pipe(options.isDebug ?
                tasks.util.noop() :
                tasks.minifyCss())
            .pipe(tasks.header(config.copyright));
}


module.exports = {
    getJS: bldJs,
    getCSS: buildCss
};
