var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cache = require('gulp-cache'),
    minifyCSS = require('gulp-minify-css'),
    base64 = require('./build/gulp-base64'),
    config = require('./build/config.js'),
    deps = require('./build/gulp-deps')(config),
    clean = require('gulp-clean');

// var gulpgrunt = require('gulp-grunt');

// console.log(gulpgrunt.tasks);

gulp.task('test', function () {
    var css = deps.getCSSFiles(null, {
        skin: 'dark',
        addIE: true,
        onlyIE: false
    });
    // console.log(deps.getJSFiles());
    console.log(css, css.length);
});

function bldjs() {
    return gulp.src(deps.getJSFiles())
               .pipe(concat('main.js'))
               .pipe(cache(uglify()));
}

function bldcss() {
    return gulp.src(deps.getCSSFiles())
               // .pipe(concat('main.css'))
               // .pipe(base64())

               // .pipe(cache(minifyCSS()))
               .pipe(gulp.dest('./dist'));
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

module.exports = {
    getJS: bldjs,
    getCSS: bldcss
};
