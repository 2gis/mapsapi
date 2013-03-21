var build = require('./build/build.js');

desc('Combine source files');
task('build', build.build);

desc('Run tests');
task('test', build.test);

task('default', ['build']);
