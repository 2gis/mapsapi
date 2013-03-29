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
    packages = require('./packs.js').packages,
    hint = require('./hintrc.js');

/**
 * Global data stores
 */
var modules,
    copyrights;

/**
 * Get content of source files all modules
 * Must run only 1 time on start app or run CLI script
 *
 * @returns {Object}
 */
function getModulesData() {
    var source = config.source,
        modules = {};

    for (creator in source) {
        if (source.hasOwnProperty(creator)) {
            var modulesList = source[creator].deps,
                basePath = source[creator].path;

            for (var mod in modulesList) {
                if (modulesList.hasOwnProperty(mod)) {
                    var moduleContent = {},
                        src = modulesList[mod].src,
                        deps = modulesList[mod].deps;

                    for (var i = 0, count = src.length; i < count; i++) {
                        var srcPath = basePath + src[i];
                        moduleContent[srcPath] = fs.readFileSync(srcPath, 'utf8') + '\n\n';
                    }

                    modules[mod] = {};
                    modules[mod].src = moduleContent;
                    modules[mod].deps = deps;
                }
            }
        }
    }

    return modules;
}

/**
 * Get content of source files all copyrights
 * Must run only 1 time on start app or run CLI script
 *
 * @returns {String}
 */
function getCopyrightsData() {
    var source = config.copyrights,
        copyrights = '';

    for (var i = 0, count = source.length; i < count; i++) {
        copyrights += fs.readFileSync(source[i], 'utf8') + '\n';
    }

    return copyrights;
}

/**
 * Generates a list of modules by pkg
 *
 * @param {String|Null} pkg
 * @returns {Array}
 */
function getModulesList(pkg) {
    var modulesListOrig  = [],
        modulesList = [];

    if (pkg && packages.hasOwnProperty(pkg)) {
        modulesListOrig = packages[pkg].modules;
    } else if (pkg && (modules.hasOwnProperty(pkg) || pkg.indexOf(',') > 0)) {
        modulesListOrig = pkg.split(',');
    } else {
        for (var mod in modules) {
            if (modules.hasOwnProperty(mod)) {
                modulesListOrig.push(mod);
            }
        }
    }

    modulesList = modulesListOrig;

//    for (var i = 0, count = modulesListOrig.length; i < count; i++) {
//        var moduleName = modulesListOrig[i];
//        if (modules.hasOwnProperty(moduleName)) {
//            if (modules[moduleName].deps) {
//                var moduleDeps = modules[moduleName].deps;
//                modulesList = modulesList.concat(moduleDeps);
//            }
//            modulesList.push(moduleName);
//        }
//    }

//    console.log(modulesList);

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
    var modulesList,
        result = '',
        countModules = 0,
        loadingFiles = {};

    modulesList = getModulesList(pkg);

    for (var i = 0, count = modulesList.length; i < count; i++) {
        var moduleName = modulesList[i],
            moduleSrc = modules[moduleName].src;

        if (isMsg) {
            if (moduleSrc) {
                countModules++;
                console.log('  * ' + moduleName);
            } else {
                console.log('  - ' + moduleName + ' (module not found!)');
            }
        }

        for (var file in moduleSrc) {
            if (moduleSrc.hasOwnProperty(file)) {
                if (!loadingFiles[file]) {
                    result += moduleSrc[file];
                    loadingFiles[file] = true;
                }
            }
        }
    }

    if (isMsg) {
        console.log('\nConcatenating ' + count + ' modules...\n');
    }

    return copyrights + config.intro + result + config.outro;
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
 * Check JS files for errors
 *
 * @param {Object} modules
 * @return {Number}
 */
function lintFiles(modules) {
    var errorsCount = 0;

    for (mod in modules) {
        if (modules.hasOwnProperty(mod)) {
            var fileList = modules[mod].src;
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

    modules = getModulesData();
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

    modules = getModulesData();
    copyrights = getCopyrightsData();

    if (pkg === 'public') {
        dest = config.dest.public;
        console.log('Build public GitHub full package!\n');
    }

    console.log('Build modules:');

    var srcContent = makePackage(pkg, true);
    fs.writeFileSync(dest.src, srcContent);

    console.log('Compressing...\n');

    var minContent = minifyPackage(srcContent);
    fs.writeFileSync(dest.min, minContent);

    console.log('Uncompressed size: ' + (srcContent.length/1024).toFixed(1) + ' KB');
    console.log('Compressed size:   ' + (minContent.length/1024).toFixed(1) + ' KB');

    console.log('\nBuild successfully completed!');
};

/**
 * Init (web app)
 */
exports.init = function() {
    modules = getModulesData();
    copyrights = getCopyrightsData();
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
