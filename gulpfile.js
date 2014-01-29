var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var test = require('gulp-test');
var minifyCSS = require('gulp-minify-css');
var deps = require('./build/deps.js');

gulp.task('buildjs', function () {
    //console.log(deps);
    return gulp.src('./src/**/src/**/*.js')
            //.pipe(concat('all.js'))
             .pipe(test())
            /*.pipe(rename('min.js'))
            .pipe(uglify())*/
            .pipe(gulp.dest('./dist'));
});

gulp.task('buildcss', function () {
    return gulp.src('./src/**/skin/**/*.css')
            //.pipe(concat('all.css'))
            .pipe(gulp.dest('./dist'))
            .pipe(rename('min.css'))
            .pipe(minifyCSS())
            .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['buildjs', 'buildcss']);
