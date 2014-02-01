var gulp = require('gulp'),
    async = require('async'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    // minifyCSS = require('gulp-minify-css'),
    config = require('./build/config.js'),
    deps = require('./build/gulp-deps.js')(config),
    runSequence = require('run-sequence'),
    clean = require('gulp-clean');
    // data_uri = require('gulp-data-uri');


gulp.task('test', function () {
    console.log(deps.getJSFiles());
    console.log(deps.getCSSFiles());
});


gulp.task('build-deps', function (done) {

    async.each(Object.keys(config), function (module, callback) {
        console.log(module); // print the key

        var scripts = config[module].js,
            style = config[module].css,
            styles = style ? config[module].css.all : undefined,
            stylesIE = style ? config[module].css.ie : undefined;

        if (scripts)  {
            gulp.src(scripts)
                .pipe(concat(module + '.js'))
                .pipe(gulp.dest('./dist/' + module + '/js/'))
                .pipe(rename(module + '.min.js'))
                .pipe(uglify())
                .pipe(gulp.dest('./dist/' + module + '/js/'));
        }

        if (styles) {
            gulp.src(styles)
                //.pipe(data_uri())
                .pipe(gulp.dest('./dist/' + module + '64.css'))
                .pipe(concat(module + '.css'))
                .pipe(gulp.dest('./dist/' + module + '/css/'))
                .pipe(rename(module + '.min.css'))
                // .pipe(minifyCSS())
                .pipe(gulp.dest('./dist/' + module + '/css/'));
        }

        if (stylesIE) {
            gulp.src(stylesIE)
                //.pipe(data_uri())
                .pipe(concat(module + '.ie.css'))
                .pipe(gulp.dest('./dist/' + module + '/css/'))
                .pipe(rename(module + '.ie.min.css'))
                // .pipe(minifyCSS())
                .pipe(gulp.dest('./dist/' + module + '/css/'));
        }
        callback(); // tell async that the iterator has completed

    }, done);
    /*Object.keys(config).forEach(function (module) {
        //console.log(module, config[module].js);

    });*/
});

function bldjs() {
    return gulp.src(getJSFiles())
               .pipe(concat('main.js'));
}

gulp.task('build-scripts', ['build-clean'], function () {
    return bldjs();
});

/*gulp.task('build-styles', function (module, files) {
            //.pipe(concat('all.css'))
            .pipe(gulp.dest('./dist'))
            .pipe(rename('min.css'))
            .pipe(minifyCSS())
            .pipe(gulp.dest('./dist'));
});*/

gulp.task('templates', function () {
    gulp.src(['/home/dlutsik/projects/mapsapi-folder/src/DGLocation/skin/light/css/DGLocation.css'])
        .pipe(data_uri())
        .pipe(gulp.dest('dest/64.css'));
});

gulp.task('build-clean', function () {
    return gulp.src('./dist', {read: false}).pipe(clean());
});

module.exports = function () {
    return bldjs();
};
