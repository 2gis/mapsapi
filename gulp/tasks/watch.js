var gulp = require('gulp');

gulp.task('watch', function () {
    gulp.watch('private/*.*', ['copyPrivateAssets']);
    gulp.watch('vendors/leaflet/src/**/*.*', ['buildLeaflet']);
    gulp.watch('src/doc/**/*.*', ['doc']);
});
