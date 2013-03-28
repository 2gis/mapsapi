/**
 * Main CLI 2GIS Maps API 2.0
 *
 * Depending list:
 *   node.js (ver > 0.8)
 *
 * Install of the environment:
 *   npm install -g grunt-cli
 *   npm install
 *
 * See tasks list:
 *   grunt
 *
 * Tasks list:
 *   grunt lint
 *   grunt build
 *   grunt test
 *
 */

var build = require('./build/build.js'),
    test = require('./test/test.js');

module.exports = function (grunt) {
    "use strict";

    // Check JS files for errors with JSHint
    grunt.registerTask('lint', function() {
        build.lint();
    });

    // Combine and minify source files
    grunt.registerTask('build', function(pkg) {
        build.lint();
        build.build(pkg);
    });

    //Rebuild and run unit tests
    grunt.registerTask('test', function(pkg) {
        build.lint();
        build.build(pkg);
        test.server();
        grunt.task.run('karma:continuous');
    });

    // Default task
    grunt.registerTask('default', function() {
        grunt.log.writeln('\nTasks list:\n');
        grunt.log.writeln('lint    Check JS files for errors with JSHint');
        grunt.log.writeln('build   Combine and minify source files');
        grunt.log.writeln('test    Rebuild and run unit tests');
    });


    grunt.initConfig({
        karma: {
            options: {
                configFile: 'test/karma.conf.js',
                browsers: test.cli(process.argv)
            },
            continuous: {
                singleRun: true
            },
            dev: {
                reporters: 'dots'
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');

};
