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
 *   grunt ...
 *
 * Tasks list:
 *   grunt lint
 *   grunt build
 *   grunt test
 *   grunt test-server
 *
 */

var build = require('./build/build.js'),
    test = require('./test/test.js');

module.exports = function (grunt) {
    "use strict";

    grunt.registerTask('lint', function() {
        build.lint();
    });

    grunt.registerTask('build', function(pkg) {
        build.lint();
        build.build(pkg);
    });

    grunt.registerTask('test', ['build', 'test-server', 'karma:continuous']);

    grunt.registerTask('test-server', '', function() {
        test.server();
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
