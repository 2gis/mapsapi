// Main CLI 2GIS Maps API 2.0
// See tasks list: grunt

var build = require('./build/build.js'),
    test = require('./test/test.js'),
    gendoc = require('./docbuilder/gendoc.js');

module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('githooks', ['githooks']);

    // Check JS files for errors with JSHint
    grunt.registerTask('jshint', ['jshint']);

    grunt.registerTask('prepare', function () {
        build.build();
    });

    // Combine and minify source files
    grunt.registerTask('build', ['jshint', 'prepare']);

    //Rebuild and run unit tests
    grunt.registerTask('test', function () {
        build.build();
        grunt.task.run('karma:continuous');
    });

    // Generate documentation from source files
    grunt.registerTask('doc', function () {
        var doc = grunt.config.get('doc');
        gendoc.generateDocumentation(doc.menu, doc.input, doc.output);
    });

    // Set version API in loader.js, copy images and fonts
    grunt.registerTask('release', function () {
        var done = this.async();

        build.release(done);
    });

    // Default task
    grunt.registerTask('default', function () {
        grunt.log.writeln('\nTasks list:\n');
        grunt.log.writeln('grunt jshint      # Check JS files for errors with JSHint');
        grunt.log.writeln('grunt build       # Combine and minify source files');
        grunt.log.writeln('grunt doc         # Generate documentation from .md files');
        grunt.log.writeln('grunt test        # Rebuild and run unit tests');
        grunt.log.writeln('grunt release     # Preparation release (set version stat files and copy img)');
    });

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true
            },
            src: ['src/*/src/**/*.js']
        },
        githooks: {
            all: {
                // Will run the jshint and test:unit tasks at every push
                options: {
                    template: 'hooks/pre-push.js'
                },
                'pre-push': 'test'
            }
        },
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
        doc: {
            menu: './src/menu.json',
            input: './src/',
            output: './public/doc'
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-githooks');
};
