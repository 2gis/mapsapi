// Main CLI 2GIS Maps API 2.0
// See tasks list: grunt

var build = require('./build/build.js'),
    test = require('./test/test.js'),
    gendoc = require('./docbuilder/gendoc.js'),
    config = require('./build/config.js').config;

module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('buildSrc', function () {
        build.buildSrc();
    });

    grunt.registerTask('setVersion', function () {
        var done = this.async();

        build.setVersion(done);
    });

    // Copy all assets
    grunt.registerTask('assets', ['copy']);

    // Check JS files for errors with JSHint
    grunt.registerTask('hint', ['jshint:force']);

    // Lint, combine and minify source files, update doc, copy assets and add hook on push
    grunt.registerTask('build', ['hint', 'assets', 'buildSrc', 'doc', 'githooks']);

    // Generate documentation from source files
    grunt.registerTask('doc', function () {
        var doc = grunt.config.get('doc');
        gendoc.generateDocumentation(doc.menu, doc.input, doc.output);
    });

    // Rebuild and run unit tests
    grunt.registerTask('test', function () {
        build.buildSrc(false);
        grunt.task.run('karma:continuous');
    });

    // Set version API in loader.js, copy all assets, increment product version, push to production repo
    grunt.registerTask('release', function (incType) {
        grunt.task.run('setVersion');
        grunt.task.run('assets');
        incType ? grunt.task.run('push:' + incType) : grunt.task.run('push');
    });

    // Default task
    grunt.registerTask('default', function () {
        grunt.log.writeln('\nTasks list:\n');
        grunt.log.writeln('grunt assets      # Create public folder and copy all assets there');
        grunt.log.writeln('grunt hint        # Check JS files for errors with JSHint');
        grunt.log.writeln('grunt build       # Lint, combine and minify source files, update doc, copy assets');
        grunt.log.writeln('grunt doc         # Generate documentation from .md files');
        grunt.log.writeln('grunt test        # Rebuild source and run unit tests');
    });

    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: [config.img.pattern], dest: config.img.dest, filter: 'isFile'}, //dg images
                    {expand: true, flatten: true, src: [config.img.patternLeaflet], dest: config.img.destLeaflet, filter: 'isFile'}, //leaflet images
                    {expand: true, flatten: true, src: [config.font.pattern], dest: config.font.dest, filter: 'isFile'}, //dg fonts
                    {expand: true, flatten: true, src: [config.svg.pattern], dest: config.svg.dest, filter: 'isFile'} //dg svg
                ]
            },
            priv: {
                src: 'private/*',
                dest: 'public/',
                expand: true,
                flatten: true,
                options: {
                    processContent: function (content) {
                        //console.log(content);
                        return content.replace(/\\s/g, '');
                    }/*,
                    processContentExclude: function () {
                        //console.log(arguments);
                    }*/
                }
            }
        },
        jshint: {
            force: {
                options: {
                    jshintrc: true,
                    force: true
                },
                src: config.hint
            },
            hook: {
                options: {
                    jshintrc: true
                },
                src: config.hint
            }
        },
        githooks: {
            all: {
                // Will run the jshint and test:unit tasks at every push
                'pre-push': 'jshint:hook test'
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
        push: {
            options: {
                files: ['package.json'],
                addFiles: ['package.json', 'public/loader.js'],
                commitMessage: 'Release %VERSION%',
                tagName: '%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'all'
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
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-push-release');
};
