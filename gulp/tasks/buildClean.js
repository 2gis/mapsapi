var gulp = require('gulp');
var del = require('del');

gulp.task('buildClean', function (cb) {
    del('public', cb);
});
