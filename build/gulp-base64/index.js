'use strict';
var through = require('through2');
    // merge = require('deepmerge'),
    // Vinyl = require('vinyl');

var encode = require('./lib/encode').init();

module.exports = function (opts) {

    function minify(file, encoding, callback) {
        /*jshint validthis:true */
        // var options = merge(opt || {}, {
        //  fromString: true,
        //  output: {}
        // });

        // var mangled,
        //  map;

        // if (options.outSourceMap === true) {
        //  options.outSourceMap = file.relative + '.map';
        // }

        // if (options.preserveComments === 'all') {
        //  options.output.comments = true;
        // } else if (options.preserveComments === 'some') {
        //  // preserve comments with directives or that start with a bang (!)
        //  options.output.comments = /^!|@preserve|@license|@cc_on/i;
        // } else if (typeof options.preserveComments === 'function') {
        //  options.output.comments = options.preserveComments;
        // }

        // try {
        //  mangled = uglify.minify(String(file.contents), options);
        //  file.contents = new Buffer(mangled.code);
        //  this.push(file);
        // } catch (e) {
        //  console.warn('Error caught from uglify: ' + e.message + ' in ' + file.path + '. Returning unminifed code');
        //  this.push(file);
        //  return callback();
        // }

        // if (options.outSourceMap) {
        //  map = new Vinyl({
        //      cwd: file.cwd,
        //      base: file.base,
        //      path: file.path + '.map',
        //      contents: new Buffer(mangled.map)
        //  });
        //  this.push(map);
        // }
        var src = file.contents.toString();
        var srcFile = file.relative;
        encode.stylesheet(srcFile, src, opts, callback);
        // console.log(file.relative, file.contents);

        // callback();
    }

    return through.obj(minify);
};

// // Internal libs

// module.exports = function(grunt) {
//   "use strict";

//   // Grunt lib init
//   var encode = grunt_encode.init(grunt);

//   // Grunt utils
//   var async = grunt.util.async;

//   grunt.registerMultiTask("imageEmbed", "Embed images as base64 data URIs inside your stylesheets", function() {
//     var opts = this.options();
//     var done = this.async();

//     // Process each src file
    // this.files.forEach(function(file) {
    //     var dest = file.dest;
    //     var tasks;

    //     tasks = file.src.map(function(srcFile) {
    //         return function(callback) {
    //             encode.stylesheet(srcFile, opts, callback);
    //         };
    //     });

    //     // Once all files have been processed write them out.
    //     async.parallel(tasks, function (err, output) {
    //         grunt.file.write(dest, output);
    //         grunt.log.writeln('File "' + dest + '" created.');
    //         done();
    //     });
    // });
//   });

// };
