var runSequence = require('run-sequence');
var gulp = require('gulp');

gulp.task('dev', function(cb) {
    runSequence('build', 'server', 'watch', cb);
});
