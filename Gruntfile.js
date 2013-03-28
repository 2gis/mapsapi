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
    grunt.registerTask('build', function() {
        build.lint();
        build.build();
    });

    //Rebuild and run unit tests
    grunt.registerTask('test', function() {
        grunt.task.run('build');
        test.server();
        grunt.task.run('karma:continuous');
    });

    // Default task
    grunt.registerTask('default', function() {
        grunt.log.writeln('\nTasks list:\n');
        grunt.log.writeln('grunt lint     # Check JS files for errors with JSHint');
        grunt.log.writeln('grunt build    # Combine and minify source files');
        grunt.log.writeln('grunt test     # Rebuild and run unit tests');
    });


    grunt.initConfig({
        karma: {
            options: {
                configFile: 'test/karma.conf.js',
                browsers: test.getBrowsers()
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
