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
    test = require('./test/test.js'),
    gendoc = require('./docbuilder/gendoc.js');

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
        build.lint();
        build.build();
        grunt.task.run('karma:continuous');
    });

    // Generate documentation from source files
    grunt.registerTask('doc', function () {
        var doc = grunt.config.get("doc");
        gendoc.generateDocumentation(doc.menu, doc.input, doc.output);
    });

    // Set version API in loader.js and copy images
    grunt.registerTask('release', function () {
        build.setVersion();
        build.copyImages();
    });

    // Default task
    grunt.registerTask('default', function() {
        grunt.log.writeln('\nTasks list:\n');
        grunt.log.writeln('grunt lint        # Check JS files for errors with JSHint');
        grunt.log.writeln('grunt build       # Combine and minify source files');
        grunt.log.writeln('grunt doc         # Generate documentation from .md files');
        grunt.log.writeln('grunt test        # Rebuild and run unit tests');
        grunt.log.writeln('grunt release     # Preparation release (set version stat files and copy img)');
    });


    grunt.initConfig({
        karma: {
            options: {
                configFile: 'test/karma.conf.js',
                browsers: test.getBrowsers(),
                reporters: test.getReporters(),
                junitReporter: test.getJunitReporter()
            },
            continuous: {
                singleRun: true
            },
            dev: {
            }
        },
        doc:{
            menu: './src/menu.json',
            input: './src/',
            output: './public/doc'
        }
    });

    grunt.loadNpmTasks('grunt-karma');

};
