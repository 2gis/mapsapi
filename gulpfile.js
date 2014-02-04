var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cache = require('gulp-cache'),
    minifyCSS = require('gulp-minify-css'),
    base64 = require('gulp-base64'),
    config = require('./build/config.js'),
    deps = require('./build/gulp-deps')(config),
    runSequence = require('gulp-run-sequence'),
    clean = require('gulp-clean');

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
        .pipe(base64({baseDir: 'public', debug: true}))
        // .pipe(base64({debug: true}))
        .pipe(concat('main.css'))
        // .pipe(minifyCSS())
        .pipe(gulp.dest('./public/css'));
});

//CLI API
gulp.task('build-scripts', ['build-clean'], function () {
    return bldJs()
           .pipe(gulp.dest('./public/js'));
});

gulp.task('build-styles', ['build-clean'], function () {
    return bldCss()
          .pipe(gulp.dest('./public/css'));
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
function srcJs() {
    return gulp.src(deps.getJSFiles())
               .pipe(concat('main.js'));
}
function minJs() {
    return srcJs().pipe(cache(uglify()));
}
function bldJs(isDebug) {
    return isDebug ? srcJs() : minJs();
}

//css build api
function srcCss() {
    return gulp.src(deps.getCSSFiles())
               .pipe(concat('main.css'));
}
function minCss() {
    return srcCss().pipe(cache(minifyCSS()));
}
function bldCss(isDebug) {
    return isDebug ? srcCss() : minCss();
}

module.exports = {
    getJS: bldJs,
    getCSS: bldCss
};
