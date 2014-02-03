var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cache = require('gulp-cache'),
    es = require('event-stream'),
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
        .pipe(base64())
        .pipe(concat('main.css'))
        // .pipe(minifyCSS())
        .pipe(gulp.dest('./public/css'));
});

//CLI API
gulp.task('build-scripts', function () {
    return bldJs()
           .pipe(gulp.dest('./public/js'));
});

gulp.task('build-styles', function () {
    return es.concat(
        srcCss({}).pipe(gulp.dest('./public/css/'))
                             .pipe(rename({suffix: '.min'}))
                             .pipe(minifyCSS())
                             .pipe(gulp.dest('./public/css/')),
        srcCss({addIE: true}).pipe(rename({suffix: '.full'}))
                             .pipe(gulp.dest('./public/css/'))
                             .pipe(rename({suffix: '.full.min'}))
                             .pipe(minifyCSS())
                             .pipe(gulp.dest('./public/css/')),
        srcCss({onlyIE: true}).pipe(rename({suffix: '.ie'}))
                             .pipe(gulp.dest('./public/css/'))
                             .pipe(rename({suffix: '.ie.min'}))
                             .pipe(minifyCSS())
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
