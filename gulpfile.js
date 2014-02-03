var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cache = require('gulp-cache'),
    minifyCSS = require('gulp-minify-css'),
    base64 = require('./build/gulp-base64'),
    config = require('./build/config.js'),
    deps = require('./build/gulp-deps')(config),
    runSequence = require('gulp-run-sequence'),
    clean = require('gulp-clean');

//Delete it
gulp.task('test', function () {
    var css = deps.getCSSFiles(null, {
        skin: 'dark',
        addIE: true,
        onlyIE: false
    });
    console.log(deps.getJSFiles());
    //console.log(css, css.length);
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
function srcJs(opt) {
    return gulp.src(deps.getJSFiles(opt))
               .pipe(concat('main.js'));
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
               .pipe(concat('main.css'));
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
