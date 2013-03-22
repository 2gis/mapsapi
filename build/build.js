var fs = require('fs'),
    argv = require('optimist').argv,
    jshint = require('jshint').JSHINT,
    uglify = require('uglify-js');

var config = require('./config.js').config,
    packages = require('./packages.js').packages,
    hint = require('./hint.js');

var modules,
    copyrights;

/**
 * Get content of all modules
 * Must run 1 time on start app or run cli script
 *
 * @param {Object} params
 * @returns {Object}
 */
function getModulesContent(params) {
    var modules = {};

    for (vendor in params) {
        if (params.hasOwnProperty(vendor)) {
            var deps = params[vendor].deps,
                path = params[vendor].path;

            for (var mod in deps) {
                if (deps.hasOwnProperty(mod)) {
                    var moduleContent = {},
                        src = deps[mod].src;

                    for (var i = 0, count = src.length; i < count; i++) {
                        var srcPath = path + src[i];
                        moduleContent[srcPath] = fs.readFileSync(srcPath, 'utf8') + '\n\n';
                    }

                    modules[mod] = moduleContent;
                }
            }
        }
    }

    return modules;
}

/**
 * Get content of all copyrights
 * Must run 1 time on start app or run cli script
 *
 * @param {Object} params
 * @returns {String}
 */
function getCopyrightsContent(params) {
    var copyright = '';

    for (var i = 0, count = params.length; i < count; i++) {
        copyright += fs.readFileSync(params[i], 'utf8') + '\n';
    }

    return copyright;
}


/**
 * Generates a list of modules by build name
 *
 * @param {String|Null} build
 * @returns {Array}
 */
function parcePackageName(build) {
    var modulesList = [];

    if (build && packages.hasOwnProperty(build) && packages[build].modules.length > 1) {
        modulesList = packages[build].modules;
    } else if (build && (modules.hasOwnProperty(build) || build.indexOf(',') > 0)) {
        modulesList = build.split(',');
    } else {
        for (var mod in modules) {
            if (modules.hasOwnProperty(mod)) {
                modulesList.push(mod);
            }
        }
    }

    return modulesList;
}

/**
 * Generates build content
 *
 * @param {Array} build
 * @param {Boolean} isMsg
 * @returns {String}
 */
function makePackage(build, isMsg) {
    var modulesResult = '',
        loadModules = {},
        modulesList = parcePackageName(build);

    for (var i = 0, count = modulesList.length; i < count; i++) {
        var moduleName = modulesList[i];
        var moduleContent = modules[moduleName];

        if (isMsg) {
            console.log('  * ' + moduleName);
        }

        for (var name in moduleContent) {
            if (moduleContent.hasOwnProperty(name)) {
                if (!loadModules[name]) {
                    modulesResult += moduleContent[name];
                    loadModules[name] = true;
                }
            }
        }
    }

    if (isMsg) {
        console.log('\nConcatenating ' + modulesList.length + ' modules...\n');
    }

    return copyrights + config.intro + modulesResult + config.outro;
}

function minifyPackage(content) {
    var min = uglify.minify(content, {
        warnings: true,
        fromString: true
    }).code;

    return copyrights + min;
}

/**
 * Write file to disc
 *
 * @param {String} path
 * @param {String} content
 */
function writeFile(path, content) {
    fs.writeFileSync(path, content);
}

/**
 * Check JS files for errors
 *
 * @param {Object} modules
 * @return {Number}
 */
function lintFiles(modules) {
    var errorsCount = 0;

    for (mod in modules) {
        if (modules.hasOwnProperty(mod)) {
            var fileList = modules[mod];
            for (file in fileList) {
                if (fileList.hasOwnProperty(file)) {

                    jshint(fileList[file], hint.config, hint.namespace);
                    var errors = jshint.errors;

                    for (var i = 0, count = errors.length; i < count; i++) {
                        var e = errors[i];
                        console.log(file + '\tline ' + e.line + ' col ' + e.character + '\t ' + e.reason);
                        errorsCount++;
                    }
                }
            }
        }
    }

    return errorsCount;
}


/**
 * Init (on start app)
 */
exports.init = function() {
    modules = getModulesContent(config.source);
    copyrights = getCopyrightsContent(config.copyrights);
};

/**
 * Get content (on request app)
 */
exports.get = function(build, callback) {
    var srcContent, minContent;
    srcContent = makePackage(build);
    minContent = minifyPackage(srcContent);
    callback(minContent);
};

/**
 * Lint (CLI command)
 */
exports.lint = function() {
    var errorsCount;

    console.log('Check all source JS files for errors with JSHint...\n');

    modules = getModulesContent(config.source);
    errorsCount = lintFiles(modules);

    console.log('\nJSHint find ' + errorsCount + ' errors.\n');
};

/**
 * Build (CLI command)
 */
exports.build = function() {
    var build = null,
        dest = config.dest.custom;

    modules = getModulesContent(config.source);
    copyrights = getCopyrightsContent(config.copyrights);

    if (process.env.b || process.env.m) {
        build = process.env.b || process.env.m;
    }

    if (build == 'public') {
        dest = config.dest.public;
        console.log('Build public GitHub full package!\n');
    }

    console.log('Build modules:');

    var srcContent = makePackage(build, true);
    writeFile(dest.src, srcContent);

    console.log('Compressing...\n');

    var minContent = minifyPackage(srcContent);
    writeFile(dest.min, minContent);

    console.log('Uncompressed size: ' + (srcContent.length/1024).toFixed(1) + ' KB');
    console.log('Compressed size:   ' + (minContent.length/1024).toFixed(1) + ' KB');

    console.log('\nSuccessfully completed!\n');
};

/**
 * Watch (CLI command, on develop)
 */
exports.watch = function () {

};
