var extend = require('extend'),
    es = require('event-stream'),

    gulp = require('gulp'),
    tasks = require('gulp-load-plugins')(),

    gendoc = require('./docbuilder/gendoc.js'),
    config = require('./build/config.js'),
    deps = require('./build/gulp-deps')(config);

//DELETE IT
tasks.stylus = require('./build/gulp-stylus');
tasks.flatten = require('./build/gulp-flatten');
tasks.svg2png = require('./build/gulp-svg2png');


//public CLI API
// Get info
gulp.task('default', function () {
    tasks.util.log('\nTasks list:');
    tasks.util.log('gulp assets      # Create public folder and copy all assets there');
    tasks.util.log('gulp lint        # Check JS files for errors with JSHint');
    tasks.util.log('gulp build       # Lint, combine and minify source files, update doc, copy assets');
    tasks.util.log('gulp doc         # Generate documentation from .md files');
    tasks.util.log('gulp test        # Rebuild source and run unit tests');
});

gulp.task('build-scripts', ['lint'], function () {
    return bldJs(extend(tasks.util.env, {isDebug: true}))
                    .pipe(gulp.dest('./public/js/'))
                    .pipe(tasks.rename({suffix: '.min'}))
                    .pipe(tasks.cache(tasks.uglify()))
                    .pipe(gulp.dest('./public/js/'));
});

gulp.task('build-styles', function () {
    return es.concat(
        bldCss(extend(tasks.util.env, {isDebug: true}))
                             .pipe(gulp.dest('./public/css/'))
                             .pipe(tasks.rename({suffix: '.min'}))
                             .pipe(tasks.cache(tasks.minifyCss()))
                             .pipe(gulp.dest('./public/css/')),
        bldCss(extend(tasks.util.env, {isIE: true, isDebug: true}))
                             .pipe(tasks.rename({suffix: '.full'}))
                             .pipe(gulp.dest('./public/css/'))
                             .pipe(tasks.rename({suffix: '.full.min'}))
                             .pipe(tasks.cache(tasks.minifyCss()))
                             .pipe(gulp.dest('./public/css/')),
        bldCss(extend(tasks.util.env, {onlyIE: true, isDebug: true}))
                             .pipe(tasks.rename({suffix: '.ie'}))
                             .pipe(gulp.dest('./public/css/'))
                             .pipe(tasks.rename({suffix: '.ie.min'}))
                             .pipe(tasks.cache(tasks.minifyCss()))
                             .pipe(gulp.dest('./public/css/'))
    );
});

gulp.task('build-assets', function () {
    return es.concat(
        gulp.src(['./private/**/*.*', '!private/*.js', '!private/css/'])
            .pipe(gulp.dest('./public/')),
        gulp.src('./vendors/leaflet/dist/images/*')
            .pipe(gulp.dest('./public/img/vendors/leaflet')),
        gulp.src('./src/**/fonts/**')
            .pipe(tasks.flatten())
            .pipe(gulp.dest('./public/fonts/')),
        gulp.src('./src/**/svg/**')
            .pipe(tasks.flatten())
            .pipe(gulp.dest('./public/svg/')),
        gulp.src('./src/**/img/**')
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
    return gulp.src('./src/**/svg/**/*.svg')
               .pipe(tasks.svg2png())
               .pipe(tasks.svg2png({suffix: '-2x', scale: 2}));
});

gulp.task('sprite', ['svg2png'], function () {
    return gulp.src('./src/**/png/*.png')
        .pipe(tasks.spritesmith({
            cssTemplate: 'build/sprite_tmpl.mustache',
            destImg: 'public/img/sprite.png',
            destCSS: 'private/css/sprite.styl',
            groupBy: 'skin',
            imgPath: '../public/img/sprite.png'
        }));
});

gulp.task('lint', function () {
    return gulp.src('./src/**/src/**/*.js')
               .pipe(tasks.cache(tasks.jshint('.jshintrc')))
               .pipe(tasks.jshint.reporter('jshint-stylish'));
});

//TODO: refactor this task
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


gulp.task('build', function (cb) {
    tasks.runSequence('build-clean', 'sprite', ['build-scripts', 'build-styles', 'build-assets'/*, 'doc'*/], cb);
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

//Exports API for live src streaming
//js build api
function bldJs(opt) {
    return gulp.src(deps.getJSFiles(opt))
               .pipe(tasks.redust(config.tmpl))
               .pipe(tasks.concat('script.js'))
               .pipe(tasks.frep(config.cfgParams))
               .pipe(tasks.header(config.js.intro))
               .pipe(tasks.footer(config.js.outro))
               .pipe(opt.isDebug ? tasks.util.noop() : tasks.cache(tasks.uglify()));
}

//css build api
function bldCss(opt) {
    opt = opt || {};
    var basicSprite = './private/css/sprite.basic.styl',
        skinSprite = './private/css/sprite.' + (opt.skin || 'light') + '.styl',
        cssList = deps.getCSSFiles(opt);
    if (!opt.onlyIE) cssList.push(basicSprite, skinSprite);

    return  gulp.src(cssList)
                .pipe(tasks.stylus({
                    import: [basicSprite, skinSprite, 'private/mixin/mixin.styl'],
                    define: {
                        'imageType': opt.sprite ? 'png' : 'svg'
                    }
                }))
                // .pipe(tasks.cache(prefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')))
                .pipe(tasks.base64({
                    extensions: ['svg']
                }))
                .pipe(tasks.concat('styles.css'))
                .pipe(opt.isDebug ? tasks.util.noop() : tasks.cache(tasks.minifyCss()));
}

module.exports = {
    getJS: bldJs,
    getCSS: bldCss
};
