var gulp = require('gulp'),
    async = require('async'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    config = require('./build/deps.js').deps,
    runSequence = require('run-sequence'),
    clean = require('gulp-clean');

gulp.task('build-deps', function (callback) {

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
                .pipe(concat(module + '.css'))
                .pipe(gulp.dest('./dist/' + module + '/css/'))
                .pipe(rename(module + '.min.css'))
                .pipe(minifyCSS())
                .pipe(gulp.dest('./dist/' + module + '/css/'));
        }

        if (stylesIE) {
            gulp.src(stylesIE)
                .pipe(concat(module + '.ie.css'))
                .pipe(gulp.dest('./dist/' + module + '/css/'))
                .pipe(rename(module + '.ie.min.css'))
                .pipe(minifyCSS())
                .pipe(gulp.dest('./dist/' + module + '/css/'));
        }
        callback(); // tell async that the iterator has completed

    });
    /*Object.keys(config).forEach(function (module) {
        //console.log(module, config[module].js);

    });*/
});

/*gulp.task('build-scripts', function (module, files) {
    return gulp.src(files)
            .pipe(concat(module + '.js'))
            .pipe(gulp.dest('./dist/' + module + '/js/'))
            .pipe(rename(module + '.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/' + module + '/js/'));
});

gulp.task('build-styles', function (module, files) {
            //.pipe(concat('all.css'))
            .pipe(gulp.dest('./dist'))
            .pipe(rename('min.css'))
            .pipe(minifyCSS())
            .pipe(gulp.dest('./dist'));
});*/

gulp.task('build-clean', function () {
    return gulp.src('./dist').pipe(clean());
});

gulp.task('build', function (cb) {
    runSequence('build-clean', 'build-deps', cb);
});
