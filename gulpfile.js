var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
//var deps = require('gulp-deps');
var minifyCSS = require('gulp-minify-css');
var config = require('./build/deps.js').deps;
var runSequence = require('run-sequence');
var clean = require('gulp-clean');

gulp.task('build-deps', function () {
    Object.keys(config).forEach(function (module) {
        //console.log(module, config[module].js);
        var scripts = config[module].js,
            styles = config[module].css ? config[module].css.all : undefined;

        console.log(styles);

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
    });
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
