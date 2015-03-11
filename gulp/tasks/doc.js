var gulp = require('gulp');

var gendoc = require('../util/gendoc');
var config = require('../../build/config');

gulp.task('doc', function () {
    var doc = config.doc;

    gendoc.generateDocumentation(doc.menu, doc.input, doc.output);
});
