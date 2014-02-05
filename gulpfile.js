var extend = require('extend'),
    es = require('event-stream'),

    gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    runSequence = require('gulp-run-sequence'),
    rename = require('gulp-rename'),
    cache = require('gulp-cache'),
    clean = require('gulp-clean'),
    frep = require('gulp-frep'),
    karma = require('gulp-karma'),
    bump = require('gulp-bump'),
    git = require('gulp-git'),

    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    redust = require('gulp-redust'),

    minifyCSS = require('gulp-minify-css'),
    base64 = require('gulp-base64'),
    prefix = require('gulp-autoprefixer'),

    gendoc = require('./docbuilder/gendoc.js'),
    config = require('./build/config.js'),
    deps = require('./build/gulp-deps')(config);

//Delete it
gulp.task('mytest', ['build-clean'], function () {
    // var css = deps.getCSSFiles({
    //     skin: 'dark',
    //     isIE: true,
    //     onlyIE: true
    // });
    // console.log(deps.getJSFiles());
    // console.log(css, css.length);
    // return gulp.src(deps.getCSSFiles())
    //     // .pipe(base64({baseDir: 'public', debug: true}))
    //     // .pipe(base64({debug: true, extensions: ['svg', 'gif']}))
    //     .pipe(base64({extensions: ['svg', 'gif']}))
    //     .pipe(concat('main.css'))
    //     // .pipe(minifyCSS())
    //     .pipe(gulp.dest('./public/css'));
    gulp.src(deps.getJSFiles())
               .pipe(redust())
               .pipe(gulp.dest('./public/js/'));
});
//public CLI API
// Get info
gulp.task('default', function () {
    gutil.log('\nTasks list:');
    gutil.log('gulp assets      # Create public folder and copy all assets there');
    gutil.log('gulp lint        # Check JS files for errors with JSHint');
    gutil.log('gulp build       # Lint, combine and minify source files, update doc, copy assets');
    gutil.log('gulp doc         # Generate documentation from .md files');
    gutil.log('gulp test        # Rebuild source and run unit tests');
});

gulp.task('build-scripts', ['lint'], function () {
    return bldJs(extend(gutil.env, {isDebug: true}))
                    .pipe(gulp.dest('./public/js/'))
                    .pipe(rename({suffix: '.min'}))
                    .pipe(cache(uglify()))
                    .pipe(gulp.dest('./public/js/'));
});

gulp.task('build-styles', function () {
    return es.concat(
        bldCss(extend(gutil.env, {isDebug: true})).pipe(gulp.dest('./public/css/'))
                             .pipe(rename({suffix: '.min'}))
                             .pipe(cache(minifyCSS()))
                             .pipe(gulp.dest('./public/css/')),
        bldCss(extend(gutil.env, {isIE: true, isDebug: true})).pipe(rename({suffix: '.full'}))
                             .pipe(gulp.dest('./public/css/'))
                             .pipe(rename({suffix: '.full.min'}))
                             .pipe(cache(minifyCSS()))
                             .pipe(gulp.dest('./public/css/')),
        bldCss(extend(gutil.env, {onlyIE: true, isDebug: true})).pipe(rename({suffix: '.ie'}))
                             .pipe(gulp.dest('./public/css/'))
                             .pipe(rename({suffix: '.ie.min'}))
                             .pipe(cache(minifyCSS()))
                             .pipe(gulp.dest('./public/css/'))
    );
});

gulp.task('build-assets', function () {
    return es.concat(
        gulp.src(['./private/*.*', '!private/*.js'])
            .pipe(gulp.dest('./public/')),
        gulp.src('./vendors/leaflet/dist/images/*')
            .pipe(gulp.dest('./public/img/vendors/leaflet')),
        gulp.src('./src/**/fonts/**')
            .pipe(gulp.dest('./public/fonts/')),
        gulp.src('./private/loader.js')
            .pipe(uglify())
            .pipe(gulp.dest('./public/'))
    );
});

gulp.task('lint', function () {
    return gulp.src('./src/**/src/**/*.js')
               .pipe(cache(jshint('.jshintrc')))
               .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['build'], function () {
    return gulp.src('./public/js/script.js')
               .pipe(karma({
                        configFile: './test/karma.conf.js',
                        action: 'run'
                    }));
});

gulp.task('doc', function () {
    var doc = config.doc;
    gendoc.generateDocumentation(doc.menu, doc.input, doc.output);
});

gulp.task('build', function (cb) {
    runSequence('build-clean', ['build-scripts', 'build-styles', 'build-assets', 'doc'], cb);
});

//service tasks
gulp.task('build-clean', function () {
    return gulp.src('./public', {read: false}).pipe(clean());
});

gulp.task('bump', function () {
    return gulp.src('./package.json')
               .pipe(bump(gutil.env))
               .pipe(gulp.dest('./'));
});

gulp.task('bumpLoader', ['bump'], function (done) {
    config.updateLoaderVersion(done);
});

gulp.task('commitFiles', ['bumpLoader'], function () {
    var pkg = require('./package.json'),
        v = pkg.version,
        message = 'Release ' + v;

    return gulp.src('').pipe(git.commit(message));
});

gulp.task('release', ['commitFiles'], function (done) {
    var pkg = require('./package.json'),
        v = pkg.version;

    git.tag(v, v);
    ///git.push('all', 'master', '--tags');
    done();
});


//Exports API for live src streaming

//js build api
function bldJs(opt) {
    return gulp.src(deps.getJSFiles(opt))
<<<<<<< HEAD
               .pipe(cache(redust()))
=======
               .pipe(redust(config.tmpl))
>>>>>>> c4b2c2d32de030681dd28d58fd5a219ec1bb6ea2
               .pipe(concat('script.js'))
               .pipe(frep(config.cfgParams))
               .pipe(opt.isDebug ? gutil.noop() : cache(uglify()));
}

//css build api
function bldCss(opt) {
    return gulp.src(deps.getCSSFiles(opt))
               .pipe(cache(prefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')))
               .pipe(cache(base64({
                    extensions: ['svg', 'png']
               })))
               .pipe(concat('styles.css'))
               .pipe(opt.isDebug ? gutil.noop() : cache(minifyCSS()));
}

module.exports = {
    getJS: bldJs,
    getCSS: bldCss
};
