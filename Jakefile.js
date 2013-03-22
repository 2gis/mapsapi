/**
 * Main CLI 2GIS Maps API 2.0
 *
 * Depending list:
 *   node.js
 *   npm
 *
 * Install of the environment:
 *   npm install -g jake
 *   npm install
 *
 * See tasks list:
 *   jake -ls
 *
 * Tasks list:
 *  - lint
 *  - build
 *  - test
 *  - watch
 */
var build = require('./build/build.js'),
    tests = require('./tests/tests.js');

desc('Check JS files for errors with JSHint');
task('lint', build.lint);

desc('Combine and minify source files');
task('build', ['lint'], build.build);

desc('Rebuild and run unit tests');
task('test', ['lint', 'build'], tests.run);

desc('Rebuild dist on changes src directory');
task('watch', build.watch);

task('default', ['build']);
