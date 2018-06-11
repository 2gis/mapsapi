var rename = require('gulp-rename');
var argv = require('minimist')(process.argv.slice(2));
var gulp = require('gulp');

var error = require('../util/error');
var config = require('../../app/config');
var deps = require('../deps')(config);

gulp.task('copyImg', function() {
    return gulp.src(deps.getImgGlob(argv))
        .pipe(error.handle())
        .pipe(rename(function(p) {
            p.dirname = '';
        }))
        .pipe(gulp.dest('dist/img'));
});
