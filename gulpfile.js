var extend = require('extend'),
    es = require('event-stream'),
    map = require('map-stream'),
    prettyBytes = require('pretty-bytes'),

    gulp = require('gulp'),
    tasks = require('gulp-load-plugins')(),

    less = require('less'),

    webapiProjects = require('2gis-project-loader'),

    gendoc = require('./docbuilder/gendoc.js'),
    config = require('./build/config.js'),
    deps = require('./build/gulp-deps')(config),
    stat = {}; //file minification statistic

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

gulp.task('build-styles', function () {
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
        gulp.src('./private/img/*.*')
            .pipe(gulp.dest('./public/img')),
        gulp.src('./vendors/leaflet/dist/images/*')
            .pipe(gulp.dest('./public/img/vendors/leaflet')),
        gulp.src('./src/**/fonts/**/*.*')
            .pipe(tasks.flatten())
            .pipe(gulp.dest('./public/fonts/')),
        gulp.src('./src/**/img/**/*.*')
            .pipe(tasks.flatten())
            .pipe(gulp.dest('./public/img/')),
        gulp.src('./private/loader.js')
            .pipe(tasks.uglify())
            .pipe(gulp.dest('./public/'))
    );
});

gulp.task('clean-png', function () {
    return gulp.src('./src/**/png', {read: false}).pipe(tasks.clean());
});

gulp.task('svg2png', ['clean-png'], function () {
    return es.concat(
            gulp.src('./src/**/svg/**/*.svg')
               .pipe(tasks.raster())
               .pipe(tasks.rename(function (path) {
                    path.dirname += '/../png/';
                    path.extname = '.png';
                }))
               .pipe(gulp.dest('./src')),
            gulp.src('./src/**/svg/**/*.svg')
               .pipe(tasks.raster({scale: 2}))
               .pipe(tasks.rename(function (path) {
                    path.dirname += '/../png/';
                    path.extname = '-2x.png';
                }))
               .pipe(gulp.dest('./src'))
    );
});

gulp.task('build-sprites', ['svg2png'], function () {
    return es.concat(
        gulp.src(['./src/**/png/*.png', '!./src/**/png/*2x.png'])
            .pipe(tasks.spritesmith({
                styleTemplate: 'build/sprite-template.mustache',
                imgName: 'sprite.png',
                styleName: 'sprite.less',
                groupBy: 'skin',
                imgPath: '../img/sprite.png',
                engine: 'pngsmith'
            }))
            .pipe(tasks.if('*.png', gulp.dest('./public/img/')))
            .pipe(tasks.if('*.less', gulp.dest('./private/less/'))),
        gulp.src('./src/**/png/*2x.png')
            .pipe(tasks.spritesmith({
                styleTemplate: 'build/sprite-template.mustache',
                imgName: 'sprite-2x.png',
                styleName: 'sprite-2x.less',
                groupBy: 'skin',
                imgPath: '../img/sprite-2x.png',
                engine: 'pngsmith'
            }))
            .pipe(tasks.if('*.png', gulp.dest('./public/img/')))
            .pipe(tasks.if('*.less', gulp.dest('./private/less/')))
    );
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

gulp.task('build-tasks', ['build-scripts', 'build-sprites', 'build-styles', 'build-assets', 'doc'], function () {
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
    gulp.watch('./src/**/svg/**/*.*', ['build-sprites']);
    gulp.watch('./src/**/tmpl/**/*.*', ['build-scripts']);
    gulp.watch('./src/**/less/**/*.*', ['build-styles']);
});

//service tasks
gulp.task('build-clean', function () {
    return gulp.src('./public', {read: false}).pipe(tasks.clean());
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
                isIE: options.includeIE
            },
            imports: [
                './build/tmp/less/sprite.basic.less:reference',
                './build/tmp/less/sprite@2x.basic.less:reference',
                './build/tmp/less/sprite.' + skin + '.less:reference',
                './build/tmp/less/sprite@2x.' + skin + '.less:reference',

                './private/less/mixins.less:reference',
                './private/less/mixins.ie.less:reference'
            ]
        });

    return gulp.src(lessList)
            .pipe(tasks.header(lessPrerequirements))
            .pipe(tasks.frep(config.cfgParams))
            .pipe(tasks.less())
            .pipe(tasks.cache(tasks.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')))
            .pipe(tasks.base64({ extensions: ['svg'] }))
            .pipe(tasks.concat('styles.css'))
            .pipe(options.isDebug ?
                tasks.util.noop() :
                tasks.minifyCss())
            .pipe(tasks.header(config.copyright));
}

/**
 * Analyzes Less, returns images usage statistics
 *
 * @param {Array} lessList List of paths to less files
 * @param {Object} options
 *
 * @returns {Object} Images usage statistics
 */
function getImagesStats(lessList, options) {
    lessList = lessList || [];
    options = options || {};

    var stats = {
        repeatable: [],
        noRepeatable: []
    };

    if (lessList.length) {
        lessList.unshift('./private/less/mixins.statscounters.less');
        lessList.push('./private/less/mixins.statsoutput.less');

        var lessStatsCollector = deps.lessHeader({
                variables: {
                    baseURL: '"__BASE_URL__"',
                    analyticsBaseURL: '"http://maps.api.2gis.ru/analytics/"',

                    isModernBrowser: options.includeModernBrowsers,
                    isIE: options.includeIE
                },
                imports: lessList.map(function (path, index) {
                    return path + (index == lessList.length - 1) ? ':reference' : ':less';
                })
            }),

            lessOutput = less.render(lessStatsCollector),
            
            rawStatsObject = (new Function('return ' + lessOutput.replace('stats ', '')))();

        stats.repeatable = rawStatsObject.repeatable.split(',');
        // Repeatable images can be used as no-repeatable images,
        // so we should exclude repeatable images from no-repeatable images list
        stats.noRepeatable = rawStatsObject.noRepeatable.split(',').filter(function (name) {
            return stats.repeatable.indexOf(name) != -1;
        });
    }

    return stats;
}

module.exports = {
    getJS: bldJs,
    getCSS: buildCss
};
