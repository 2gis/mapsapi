var extend = require('extend'),
    es = require('event-stream'),

    gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    runSequence = require('gulp-run-sequence'),
    rename = require('gulp-rename'),
    cache = require('gulp-cache'),
    clean = require('gulp-clean'),
<<<<<<< HEAD
    frep = require('gulp-frep'),
    karma = require('gulp-karma'),
=======
    // include = require('gulp-ignore').include,
    // exclude = require('gulp-ignore').exclude,
>>>>>>> 6f1261bdfb2ac557e1d0005a3931e2900ef25d70

    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),

    minifyCSS = require('gulp-minify-css'),
    base64 = require('gulp-base64'),
    prefix = require('gulp-autoprefixer'),

    gendoc = require('./docbuilder/gendoc.js'),
    config = require('./build/config.js'),
    deps = require('./build/gulp-deps')(config);

//Delete it
gulp.task('test', ['build-clean'], function () {
    // var css = deps.getCSSFiles(null, {
    //     skin: 'dark',
    //     addIE: true,
    //     onlyIE: false
    // });
    // console.log(deps.getJSFiles());
    //console.log(css, css.length);
    return gulp.src(deps.getCSSFiles())
        // .pipe(base64({baseDir: 'public', debug: true}))
        // .pipe(base64({debug: true, extensions: ['svg', 'gif']}))
        .pipe(base64({extensions: ['svg', 'gif']}))
        .pipe(concat('main.css'))
        // .pipe(minifyCSS())
        .pipe(gulp.dest('./public/css'));
});

//CLI API
gulp.task('build-scripts', ['lint'], function () {
    return srcJs(gutil.env).pipe(gulp.dest('./public/js/'))
                    .pipe(rename({suffix: '.min'}))
                    .pipe(cache(uglify()))
                    .pipe(gulp.dest('./public/js/'));
});

gulp.task('build-styles', function () {
    return es.concat(
        srcCss(gutil.env).pipe(gulp.dest('./public/css/'))
                             .pipe(rename({suffix: '.min'}))
                             .pipe(cache(minifyCSS()))
                             .pipe(gulp.dest('./public/css/')),
        srcCss(extend(gutil.env, {addIE: true})).pipe(rename({suffix: '.full'}))
                             .pipe(gulp.dest('./public/css/'))
                             .pipe(rename({suffix: '.full.min'}))
                             .pipe(cache(minifyCSS()))
                             .pipe(gulp.dest('./public/css/'))/*,
        srcCss(extend(gutil.env, {onlyIE: true})).pipe(rename({suffix: '.ie'}))
                             .pipe(gulp.dest('./public/css/'))
                             .pipe(rename({suffix: '.ie.min'}))
                             .pipe(cache(minifyCSS()))
                             .pipe(gulp.dest('./public/css/'))*/
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
               .pipe(jshint('.jshintrc'))
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

gulp.task('build-clean', function () {
    return gulp.src('./public', {read: false}).pipe(clean());
});

// Get info
gulp.task('default', function () {
    gutil.log('\nTasks list:');
    gutil.log('gulp assets      # Create public folder and copy all assets there');
    gutil.log('gulp lint        # Check JS files for errors with JSHint');
    gutil.log('gulp build       # Lint, combine and minify source files, update doc, copy assets');
    gutil.log('gulp doc         # Generate documentation from .md files');
    gutil.log('gulp test        # Rebuild source and run unit tests');
});

//Exports API for live src streaming

//js build api
function srcJs(opt) {
    return gulp.src(deps.getJSFiles(opt))
               .pipe(concat('script.js'))
               .pipe(frep(config.cfgParams));
}
function minJs(opt) {
    return srcJs(opt).pipe(cache(uglify()));
}
function bldJs(opt) {
    return opt.isDebug ? srcJs(opt) : minJs(opt);
}

//css build api
function srcCss(opt) {
    return gulp.src(deps.getCSSFiles(opt))
               .pipe(cache(prefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')))
<<<<<<< HEAD
               .pipe(base64())
=======
               .pipe(cache(base64({
                    extensions: ['svg']
               })))
>>>>>>> 6f1261bdfb2ac557e1d0005a3931e2900ef25d70
               .pipe(concat('styles.css'));
}
function minCss(opt) {
    return srcCss(opt).pipe(cache(minifyCSS()));
}
function bldCss(opt) {
    return opt.isDebug ? srcCss(opt) : minCss(opt);
}

module.exports = {
    getJS: bldJs,
    getCSS: bldCss
};
