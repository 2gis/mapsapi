/**
 * Documentation building CLI 2GIS Maps API 2.0
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
 *   grunt build
 *
 */

var gendoc = require('./gendoc.js');

module.exports = function (grunt) {
    "use strict";

    // Generate documentation from source files
    grunt.registerTask('build', function () {
        console.log(  grunt.config.get('all'));
        //gendoc.generateDocumentation();
    });


    // Default task
    grunt.registerTask('default', function () {
        grunt.log.writeln('\nTasks list:\n');
        grunt.log.writeln('grunt build    # Generate documentation from .md source files');

    });


    grunt.initConfig({
        all: {
            menu: '../src/menu.json',
            input: '../src/',
            output: './dist/doc'
        }
    });
};
