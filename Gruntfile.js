// Main CLI 2GIS Maps API 2.0
// See tasks list: grunt

var build = require('./build/build.js'),
    test = require('./test/test.js'),
    gendoc = require('./docbuilder/gendoc.js');

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
    grunt.registerTask('jshint', ['jshint']);

    // Lint, combine and minify source files, copy assets
    grunt.registerTask('build', ['jshint', 'assets', 'buildSrc']);

    // Generate documentation from source files
    grunt.registerTask('doc', function () {
        var doc = grunt.config.get('doc');
        gendoc.generateDocumentation(doc.menu, doc.input, doc.output);
    });

    // Rebuild and run unit tests
    grunt.registerTask('test', function () {
        build.buildSrc();
        grunt.task.run('karma:continuous');
    });

    // Set version API in loader.js, copy all assets
    grunt.registerTask('release', ['setVersion', 'assets']);

    // Default task
    grunt.registerTask('default', function () {
        grunt.log.writeln('\nTasks list:\n');
        grunt.log.writeln('grunt assets      # Copy all assets to public/');
        grunt.log.writeln('grunt jshint      # Check JS files for errors with JSHint');
        grunt.log.writeln('grunt build       # Lint, combine and minify source files, copy assets');
        grunt.log.writeln('grunt doc         # Generate documentation from .md files');
        grunt.log.writeln('grunt test        # Rebuild and run unit tests');
        grunt.log.writeln('grunt release     # Preparation for release (set version stat files and copy assets)');
    });


    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: ['src/**/img/*'], dest: 'public/img/', filter: 'isFile'}, //dg images
                    {expand: true, flatten: true, src: ['vendors/leaflet/dist/images/*'], dest: 'public/img/vendors/leaflet', filter: 'isFile'}, //leaflet images
                    {expand: true, flatten: true, src: ['src/**/fonts/**'], dest: 'public/fonts', filter: 'isFile'}, //dg fonts
                    {expand: true, flatten: true, src: ['src/**/svg/*'], dest: 'public/svg', filter: 'isFile'} //dg svg
                ]
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            src: ['src/*/src/**/*.js']
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
    grunt.loadNpmTasks('grunt-contrib-copy');

};
