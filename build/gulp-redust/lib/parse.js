"use strict";
var fs = require("fs");
var path = require("path");
var async = require("async");
var dust = require("dustjs-linkedin");


var tmpl = /__(.*)_TMPL__(?!\s\*\/)/img;

module.exports = {
    process: function (file, opts, done) {
        opts = opts || {};

        // Shift args if no options object is specified
        if (typeof opts === "function") {
            done = opts;
            opts = {};
        }

        function finish(err, result) {
            if (err) {
                done(err);
            }
            // console.log(JSON.str(result));
            // console.log(result);

            content = content.replace(tmpl, JSON.stringify(result));

            done(null, content);
        }

        function iterator(obj, tmpl, callback) {
            var name = path.basename(tmpl, ".dust");

            fs.readFile(path.join(dir + tmpl), function (err, data) {
                if (err) {
                    callback(err);
                }

                obj[name] = dust.compile(data.toString(), name);
                // console.log(Object.keys(obj));
                // console.log(obj);
                callback(null, obj);
            });
        }

        function readDir(err, files) {
            if (err) {
                done(err);
            }

            async.reduce(files, {}, iterator, finish);
        }

        function testDir(exist) {
            if (exist) {
                fs.readdir(dir, readDir);
            } else {
                done("specified module doesn\'t have folder \'templates\'");
            }
        }

        var result;

        var content = file.contents.toString();

        if ((result = tmpl.exec(content)) !== null) {
            var module = result[1];
            var dir = path.join(file.cwd, "src", module, "templates/");

            fs.exists(dir, testDir);

        } else {
            done(null, content);
        }
    }
};

// var fs = require("fs");
// var path = require("path");
// var mime = require("mime");

// var extend = require("extend");
// var async = require("async");

// // Internal Libs
// // var fetch = require("./fetch");

// // Cache regex's
// var rTmpl = /__(.*)_TMPL__(?!\s\*\/)/img;
// // var rImages = /([\s\S]*?)(url\(([^)]+)\))(?!\s*[;,]?\s*\/\*\s*base64:skip\s*\*\/)|([\s\S]+)/img;
// // var rExternal = /^(http|https|\/\/)/;
// // var rSchemeless = /^\/\//;
// // var rData = /^data:/;
// // var rQuotes = /['"]/g;
// // var rParams = /([?#].*)$/g;

// // Grunt export wrapper
// module.exports = (function () {
//     "use strict";

//     var exports = {};

//     /**
//      * Takes a CSS file as input, goes through it line by line, and base64
//      * encodes any images it finds.
//      *
//      * @param srcFile Relative or absolute path to a source stylesheet file.
//      * @param opts Options object
//      * @param done Function to call once encoding has finished.
//      */
//     exports.parse = function (file, opts, done) {
//         opts = opts || {};

//         // Cache of already converted images
//         // var cache = {};

//         // Shift args if no options object is specified
//         if (typeof opts === "function") {
//             done = opts;
//             opts = {};
//         }

//         // var deleteAfterEncoding = opts.deleteAfterEncoding;
//         var src = file.contents.toString();
//         var result = "";
//         var match, img, line, tasks, group;

//         // async.whilst(function () {
//         //     group = rImages.exec(src);
//         //     return group != null;
//         // },
//         // function (complete) {
//         //     // if there is another url to be processed, then:
//         //     //        group[1] will hold everything up to the url declaration
//         //     //        group[2] will hold the complete url declaration (useful if no encoding will take place)
//         //     //        group[3] will hold the contents of the url declaration
//         //     //        group[4] will be undefined
//         //     // if there is no other url to be processed, then group[1-3] will be undefined
//         //     //        group[4] will hold the entire string

//         //     // console.log(group[2]);

//         //     if (group[4] == null) {
//         //         result += group[1];

//         //         img = group[3].trim()
//         //             .replace(rQuotes, "")
//         //             .replace(rParams, ""); // remove query string/hash parmams in the filename, like foo.png?bar or foo.png#bar

//         //         if (opts.extensions) { //test for extensions if it provided
//         //             var imgExt = img.split('.').pop();
//         //             var test = opts.extensions.some(function (ext) {
//         //                 return ext == imgExt;
//         //             });
//         //             if (!test) {
//         //                 if (opts.debug) {
//         //                     console.log(img + ' skipped by extensions filter');
//         //                 }
//         //                 result += group[2];
//         //                 return complete();
//         //             }
//         //         }
//         //         // see if this img was already processed before...
//         //         if(cache[img]) {
//         //             // grunt.log.error("The image " + img + " has already been encoded elsewhere in your stylesheet. I'm going to do it again, but it's going to make your stylesheet a lot larger than it needs to be.");
//         //             result = result += cache[img];
//         //             complete();
//         //         } else {
//         //             // process it and put it into the cache
//         //             var loc = img,
//         //                 is_local_file = !rData.test(img) && !rExternal.test(img);

//         //             // Resolve the image path relative to the CSS file
//         //             if (is_local_file) {
//         //                 // local file system.. fix up the path
//         //                 // loc = path.join(path.dirname(file.path), img);

//         //                 loc = opts.baseDir ? path.join(file.cwd, opts.baseDir, img) :
//         //                         path.join(path.dirname(file.path), img);

//         //                 // If that didn't work, try finding the image relative to
//         //                 // the current file instead.
//         //                 if(!fs.existsSync(loc)) {
//         //                     if (opts.debug) {
//         //                         console.log('in ' + loc + ' file doesn\'t exist');
//         //                     }
//         //                     loc = path.join(file.cwd, img);
//         //                 }
//         //             }

//         //             // Test for scheme less URLs => "//example.com/image.png"
//         //             if (!is_local_file && rSchemeless.test(loc)) {
//         //                 loc = 'http:' + loc;
//         //             }

//         //             exports.image(loc, opts, function (err, resp, cacheable) {
//         //                 if (err == null) {
//         //                     var url = "url(" + resp + ")";
//         //                     result += url;

//         //                     if(cacheable !== false) {
//         //                         cache[img] = url;
//         //                     }

//         //                     if(deleteAfterEncoding && is_local_file) {
//         //                         // grunt.log.writeln("deleting " + loc);
//         //                         fs.unlinkSync(loc);
//         //                     }
//         //                 } else {
//         //                     result += group[2];
//         //                 }

//         //                 complete();
//         //             });
//         //         }
//         //     } else {
//         //         result += group[4];
//         //         complete();
//         //     }
//         // },
//         // function() {
//         //     done(null, result);
//         // });
//     };


//     /**
//      * Takes an image (absolute path or remote) and base64 encodes it.
//      *
//      * @param img Absolute, resolved path to an image
//      * @param opts Options object
//      * @return A data URI string (mime type, base64 img, etc.) that a browser can interpret as an image
//      */
//     exports.image = function(img, opts, done) {

//         // Shift args
//         if(typeof opts === "function") {
//             done = opts;
//             opts = {};
//         }

//         // Set default, helper-specific options
//         opts = extend({
//             maxImageSize: 32768
//         }, opts);

//         var complete = function(err, encoded, cacheable) {
//             // Too long?
//             if(cacheable && encoded && opts.maxImageSize && encoded.length > opts.maxImageSize) {
//                 err = "Skipping " + img + " (greater than " + opts.maxImageSize + " bytes)";
//             }

//             // Return the original source if an error occurred
//             if(err) {
//                 // grunt.log.error(err);
//                 done(err, img, false);

//                 // Otherwise cache the processed image and return it
//             } else {
//                 done(null, encoded, cacheable);
//             }
//         };

//         // Already base64 encoded?
//         if(rData.test(img)) {
//             complete(null, img, false);

//             // External URL?
//         } else if(rExternal.test(img)) {
//             // grunt.log.writeln("Encoding file: " + img);
//             fetch.image(img, function(err, src, cacheable) {
//                 var encoded, type;
//                 if (err == null) {
//                     type = mime.lookup(img);
//                     encoded = exports.getDataURI(type, src);
//                 }
//                 complete(err, encoded, cacheable);
//             } );

//             // Local file?
//         } else {
//             // Does the image actually exist?
//             if(!fs.existsSync(img) || !fs.lstatSync(img).isFile()) {
//                 // grunt.fail.warn("File " + img + " does not exist");
//                 if (opts.debug) {
//                     console.warn("File " + img + " does not exist");
//                 }
//                 complete(true, img, false);
//                 return;
//             }

//             // grunt.log.writeln("Encoding file: " + img);
//             if (opts.debug) {
//                 console.info("Encoding file: " + img);
//             }

//             // Read the file in and convert it.
//             var src = fs.readFileSync(img);
//             var type = mime.lookup(img);
//             var encoded = exports.getDataURI(type, src);
//             complete(null, encoded, true);
//         }
//     };


//     /**
//      * Base64 encodes an image and builds the data URI string
//      *
//      * @param mimeType Mime type of the image
//      * @param img The source image
//      * @return Data URI string
//      */
//     exports.getDataURI = function(mimeType, img) {
//         var ret = "data:";
//         ret += mimeType;
//         ret += ";base64,";
//         ret += img.toString("base64");
//         return ret;
//     };

//     return exports;
// })();