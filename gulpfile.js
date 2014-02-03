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
    var css = deps.getCSSFiles(null, {
        skin: 'dark',
        addIE: true,
        onlyIE: false
    });
    console.log(deps.getJSFiles());
    //console.log(css, css.length);
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
    return bldjs()
           .pipe(gulp.dest('./public/js'));
});

gulp.task('build-styles', ['build-clean'], function () {
    return bldcss()
          .pipe(gulp.dest('./public/css'));
});

gulp.task('build-assets', function () {
    return bldcss();
});

gulp.task('build-clean', function () {
    return gulp.src('./public', {read: false}).pipe(clean());
});

module.exports = {
    getJS: bldjs,
    getCSS: bldcss,
    mod: deps.getJSFiles
}
