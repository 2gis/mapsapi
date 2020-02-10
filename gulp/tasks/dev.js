var gulp = require('gulp');
var { build } = require('./build');
var { server } = require('./server');
var { watch } = require('./watch');

exports.dev = gulp.series(build, server, watch);
