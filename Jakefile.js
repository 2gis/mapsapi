
var build = require('./build/build.js');

desc('Check source for errors with JSHint');
task('lint', build.lint);

desc('Combine and compress source files');
task('build', ['lint'], build.build);

desc('Run PhantomJS tests');
task('test', ['lint'], build.test);

task('default', ['build']);
