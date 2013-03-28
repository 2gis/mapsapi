/**
 * Main build script of 2GIS Maps API 2.0
 *
 * Version 2.0.0
 *
 * Copyright (c) 2013, 2GIS, Andrey Chizh
 */
var fs = require('fs'),
    jshint = require('jshint').JSHINT,
    uglify = require('uglify-js'),
    argv = require('optimist').argv;

var config = require('./config.js').config,
    packages = require('./packages.js').packages,
    hint = require('./hint.js');

/**
 * Global data stores
 */
var modules,
    copyrights;

/**
 * Get content of all modules
 * Must run only 1 time on start app or run CLI script
 *
 * @returns {Object}
 */
function getModulesContent() {
    var source = config.source,
        modules = {};

    for (vendor in source) {
        if (source.hasOwnProperty(vendor)) {
            var deps = source[vendor].deps,
                path = source[vendor].path;

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
 * Must run only 1 time on start app or run CLI script
 *
 * @returns {String}
 */
function getCopyrightsContent() {
    var source = config.copyrights,
        copyrights = '';

    for (var i = 0, count = source.length; i < count; i++) {
        copyrights += fs.readFileSync(source[i], 'utf8') + '\n';
    }

    return copyrights;
}

/**
 * Generates a list of modules by pkg name
 *
 * @param {String|Null} pkg
 * @returns {Array}
 */
function parcePackageName(pkg) {
    var modulesList = [];

    if (pkg && packages.hasOwnProperty(pkg)) {
        modulesList = packages[pkg].modules;
    } else if (pkg && (modules.hasOwnProperty(pkg) || pkg.indexOf(',') > 0)) {
        modulesList = pkg.split(',');
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
 * @param {String} pkg
 * @param {Boolean} isMsg
 * @returns {String}
 */
function makePackage(pkg, isMsg) {
    var modulesResult = '',
        countModules = 0,
        loadModules = {},
        modulesList = parcePackageName(pkg);

    for (var i = 0, count = modulesList.length; i < count; i++) {
        var moduleName = modulesList[i],
            moduleContent = modules[moduleName];

        if (isMsg) {
            if (moduleContent) {
                countModules++;
                console.log('  * ' + moduleName);
            } else {
                console.log('  - ' + moduleName + ' (module not found!)');
            }
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
        console.log('\nConcatenating ' + countModules + ' modules...\n');
    }

    return copyrights + config.intro + modulesResult + config.outro;
}

/**
 * Minify source files
 *
 * @param {String} content
 * @return {String}
 */
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
                        console.log(file + '    line ' + e.line + ' col ' + e.character + '    ' + e.reason);
                        errorsCount++;
                    }
                }
            }
        }
    }

    return errorsCount;
}


/**
 * Lint (CLI command)
 */
exports.lint = function() {
    var errorsCount, str;

    console.log('\nCheck all source JS files for errors with JSHint...\n');

    modules = getModulesContent();
    errorsCount = lintFiles(modules);
    str = (errorsCount > 0) ? '\n' : '';

    console.log(str + 'JSHint find ' + errorsCount + ' errors.\n');
};

/**
 * Build (CLI command)
 */
exports.build = function() {
    var dest = config.dest.custom,
        pkg = argv.p || argv.m || null;

    modules = getModulesContent();
    copyrights = getCopyrightsContent();

    if (pkg === 'public') {
        dest = config.dest.public;
        console.log('Build public GitHub full package!\n');
    }

    console.log('Build modules:');

    var srcContent = makePackage(pkg, true);
    writeFile(dest.src, srcContent);

    console.log('Compressing...\n');

    var minContent = minifyPackage(srcContent);
    writeFile(dest.min, minContent);

    console.log('Uncompressed size: ' + (srcContent.length/1024).toFixed(1) + ' KB');
    console.log('Compressed size:   ' + (minContent.length/1024).toFixed(1) + ' KB');

    console.log('\nBuild successfully completed!');
};

/**
 * Init (web app)
 */
exports.init = function() {
    modules = getModulesContent();
    copyrights = getCopyrightsContent();
};

/**
 * Get content (web app)
 */
exports.get = function(pkg, isDebug, callback) {
    var content = makePackage(pkg);
    if (!isDebug) {
        content = minifyPackage(content);
    }
    callback(content);
};
