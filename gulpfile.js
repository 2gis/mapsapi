var extend = require('extend'),
    es = require('event-stream'),
    map = require('map-stream'),
    prettyBytes = require('pretty-bytes'),

    gulp = require('gulp'),
    tasks = require('gulp-load-plugins')(),

    gendoc = require('./docbuilder/gendoc.js'),
    config = require('./build/config.js'),
    deps = require('./build/gulp-deps')(config),
    stat = {}; //file minification statistic

//DELETE IT
tasks.stylus = require('./build/gulp-stylus');


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
    return bldJs(extend(tasks.util.env, {isDebug: true}))
                    .pipe(map(saveSize))
                    .pipe(gulp.dest('./public/js/'))
                    .pipe(tasks.rename({suffix: '.min'}))
                    .pipe(tasks.cache(tasks.uglify()))
                    .pipe(tasks.header(config.copyright))
                    .pipe(map(saveSize))
                    .pipe(gulp.dest('./public/js/'));
});

gulp.task('build-styles', ['sprite'], function () {
    return es.concat(
        bldCss(extend(tasks.util.env, {isDebug: true}))
                             .pipe(map(saveSize))
                             .pipe(gulp.dest('./public/css/'))
                             .pipe(tasks.rename({suffix: '.min'}))
                             .pipe(tasks.cache(tasks.minifyCss()))
                             .pipe(tasks.header(config.copyright))
                             .pipe(map(saveSize))
                             .pipe(gulp.dest('./public/css/')),
        bldCss(extend(tasks.util.env, {isIE: true, isDebug: true}))
                             .pipe(tasks.rename({suffix: '.full'}))
                             .pipe(gulp.dest('./public/css/'))
                             .pipe(tasks.rename({suffix: '.min'}))
                             .pipe(tasks.cache(tasks.minifyCss()))
                             .pipe(tasks.header(config.copyright))
                             .pipe(gulp.dest('./public/css/')),
        bldCss(extend(tasks.util.env, {onlyIE: true, isDebug: true}))
                             .pipe(tasks.rename({suffix: '.ie'}))
                             .pipe(gulp.dest('./public/css/'))
                             .pipe(tasks.rename({suffix: '.min'}))
                             .pipe(tasks.cache(tasks.minifyCss()))
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

gulp.task('sprite', ['svg2png'], function () {
    return es.concat(
        gulp.src(['./src/**/png/*.png', '!./src/**/png/*2x.png'])
            .pipe(tasks.spritesmith({
                styleTemplate: 'build/sprite_tmpl.mustache',
                imgName: 'sprite.png',
                styleName: 'sprite.styl',
                groupBy: 'skin',
                imgPath: '../img/sprite.png',
                engine: 'pngsmith'
            }))
            .pipe(tasks.if('*.png', gulp.dest('./public/img/')))
            .pipe(tasks.if('*.styl', gulp.dest('./private/styl/'))),
        gulp.src('./src/**/png/*2x.png')
            .pipe(tasks.spritesmith({
                styleTemplate: 'build/sprite_tmpl.mustache',
                imgName: 'sprite-2x.png',
                styleName: 'sprite-2x.styl',
                groupBy: 'skin',
                imgPath: '../img/sprite-2x.png',
                engine: 'pngsmith'
            }))
            .pipe(tasks.if('*.png', gulp.dest('./public/img/')))
            .pipe(tasks.if('*.styl', gulp.dest('./private/styl/')))
    );
});

gulp.task('lint', function () {
    return gulp.src('./src/**/src/**/*.js')
               .pipe(tasks.cache(tasks.jshint('.jshintrc')))
               .pipe(tasks.jshint.reporter('jshint-stylish'));
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


gulp.task('build', ['build-clean'], function () {
    return gulp.start('build-tasks');
});

gulp.task('build-tasks', ['build-scripts', 'build-styles', 'build-assets', 'doc'], function () {
    tasks.util.log('Build contains the next modules:');

    deps.getModulesList().forEach(function (module) {
        console.log('- ' + module);
    });

    console.log('\nDist files statistic:');
    Object.keys(stat).forEach(function (file) {
        console.log('- ' + file + ': ' + stat[file]);

    });
    tasks.util.log(tasks.util.colors.green('Build successfully complete'));
});

//watchers
gulp.task('watch', function () {
    gulp.watch('./private/*.*', ['build-assets']);
    gulp.watch('./src/**/svg/**/*.*', ['sprite']);
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
               .pipe(tasks.concat('script.js'))
               .pipe(tasks.frep(config.cfgParams))
               .pipe(tasks.header(config.js.intro))
               .pipe(opt.isDebug ? tasks.footer(config.js.dustdebug) : tasks.util.noop())
               .pipe(tasks.footer(config.js.outro))
               .pipe(opt.isDebug ? tasks.util.noop() : tasks.cache(tasks.uglify()))
               .pipe(tasks.header(config.copyright));
}

//css build api
function bldCss(opt) {
    opt = opt || {};
    var basicSprite = './private/styl/sprite.basic.styl',
        basicSpriteX = './private/styl/sprite-2x.basic.styl',
        skinSprite = './private/styl/sprite.' + ((opt.skin || tasks.util.env.skin) || config.appConfig.DEFAULT_SKIN) + '.styl',
        skinSpriteX = './private/styl/sprite-2x.' + ((opt.skin || tasks.util.env.skin) || config.appConfig.DEFAULT_SKIN) + '.styl',
        cssList = deps.getCSSFiles(opt);
    if (!opt.onlyIE) cssList.push(basicSprite, skinSprite);

    return  gulp.src(cssList)
                .pipe(tasks.frep(config.cfgParams))
                .pipe(tasks.stylus({
                    import: [basicSprite, basicSpriteX, skinSprite, skinSpriteX, 'private/styl/mixin.styl'],
                    define: {
                        'imageType': opt.sprite ? 'png' : 'svg'
                    }
                }))
                .pipe(tasks.cache(tasks.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')))
                .pipe(tasks.base64({
                    extensions: ['svg']
                }))
                .pipe(tasks.concat('styles.css'))
                .pipe(opt.isDebug ? tasks.util.noop() : tasks.minifyCss())
                .pipe(tasks.header(config.copyright));
}

module.exports = {
    getJS: bldJs,
    getCSS: bldCss
};
