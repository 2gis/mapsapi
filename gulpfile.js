var extend = require('extend'),
    es = require('event-stream'),

    gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    runSequence = require('gulp-run-sequence'),
    rename = require('gulp-rename'),
    cache = require('gulp-cache'),
    clean = require('gulp-clean'),

    uglify = require('gulp-uglify'),

    minifyCSS = require('gulp-minify-css'),
    base64 = require('gulp-base64'),
    prefix = require('gulp-autoprefixer'),

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
        .pipe(base64())
        .pipe(concat('main.css'))
        // .pipe(minifyCSS())
        .pipe(gulp.dest('./public/css'));
});

//CLI API
gulp.task('build-scripts', function () {
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
                             .pipe(gulp.dest('./public/css/')),
        srcCss(extend(gutil.env, {onlyIE: true})).pipe(rename({suffix: '.ie'}))
                             .pipe(gulp.dest('./public/css/'))
                             .pipe(rename({suffix: '.ie.min'}))
                             .pipe(cache(minifyCSS()))
                             .pipe(gulp.dest('./public/css/'))
    );
});

gulp.task('build-assets', function () {
    return gulp.src('./private/*.*')
               .pipe(gulp.dest('./public'));
});

gulp.task('build', function (cb) {
    runSequence('build-clean', ['build-scripts', 'build-styles', 'build-assets'], cb);
});

gulp.task('build-clean', function () {
    return gulp.src('./public', {read: false}).pipe(clean());
});

//Exports API for live src streaming

//js build api
function srcJs(opt) {
    return gulp.src(deps.getJSFiles(opt))
               .pipe(concat('script.js'));
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
               .pipe(prefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
               .pipe(base64())
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
