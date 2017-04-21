var gulp = require('gulp');
var git = require('gulp-git');

gulp.task('release', ['commitFiles'], function(done) {
    var pkg = require('./package.json');
    var v = pkg.version;

    git.tag(v, v);

    done();
});
