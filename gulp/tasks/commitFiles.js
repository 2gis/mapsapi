var git = require('gulp-git');
var gulp = require('gulp');

gulp.task('commitFiles', ['bumpLoader'], function () {
    var pkg = require('./package.json');

    return gulp.src('')
        .pipe(git.commit('Release ' + pkg.version));
});
