var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cache = require('gulp-cache'),
    minifyCSS = require('gulp-minify-css'),
    config = require('./build/config.js'),
    deps = require('./build/gulp-deps.js')(config),
    clean = require('gulp-clean');


gulp.task('test', function () {
    var css = deps.getCSSFiles();
    // console.log(deps.getJSFiles());
    // console.log(css, css.length);
});

function bldjs() {
    return gulp.src(deps.getJSFiles())
               .pipe(concat('main.js'))
               .pipe(cache(uglify()));
}

function bldcss() {
    return gulp.src(deps.getCSSFiles())
               .pipe(concat('main.css'))
               .pipe(cache(minifyCSS()));
}

gulp.task('build-scripts', ['build-clean'], function () {
    return bldjs();
});

gulp.task('build-styles', ['build-clean'], function () {
    return bldcss();
});

gulp.task('build-clean', function () {
    return gulp.src('./dist', {read: false}).pipe(clean());
});

module.exports = function () {
    return bldcss();
};
