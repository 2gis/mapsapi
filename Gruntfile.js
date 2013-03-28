/**
 * Main CLI 2GIS Maps API 2.0
 *
 * Depending list:
 *   node.js
 *   npm
 *
 * Install of the environment:
 *   npm install -g grunt-cli
 *   npm install
 *
 * See tasks list:
 *   grunt -ls
 *
 * Tasks list:
 *   grunt lint
 *   grunt build
 *   grunt test
 *
 */

var build = require('./build/build.js'),
    jsonpServer = require('./tests/jsonpServer.js');

module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
        karma: {
            options: {
                configFile: 'tests/karma.conf.js',
                browsers: ['PhantomJS']
            },
            continuous: {
                singleRun: true
            },
            dev: {
                reporters: 'dots'
            }
        }
    });

    grunt.registerTask('test', ['build', 'server', 'karma:continuous']);


    grunt.registerTask('lint', 'Check JS files for errors with JSHint', function() {
        build.lint();
    });

    grunt.registerTask('build', 'Combine and minify source files', function(arg1) {
        build.lint();
        build.build(arg1);
    });

    grunt.registerTask('server', '', function() {
        jsonpServer.init();
    });

    // Default task
    grunt.registerTask('default', 'foo');

    //Load karma plugin
    grunt.loadTasks('tasks');
};
