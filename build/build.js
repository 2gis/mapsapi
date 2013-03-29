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
    argv = require('optimist').argv,
    clc = require('cli-color');

var config = require('./config.js').config,
    packages = require('./packs.js').packages,
    hint = require('./hintrc.js');

/**
 * Global data stores
 */
var modules,
    copyrights,
    errors = [];

/**
 * CLI colors theme settings
 * See: https://github.com/medikoo/cli-color
 */
var okMsg = clc.xterm(34),
    errMsg = clc.xterm(9),
    depsMsg = clc.xterm(27);

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
 * @param {Boolean} isMsg
 * @returns {Array}
 */
function getModulesList(pkg, isMsg) {
    var modulesListOrig,
        modulesListRes = [],
        loadedModules = {};

    if (pkg && packages.hasOwnProperty(pkg)) {
        modulesListOrig = packages[pkg].modules;
    } else if (pkg && (modules.hasOwnProperty(pkg) || pkg.indexOf(',') > 0)) {
        modulesListOrig = pkg.split(',');
    } else {
        modulesListOrig = [];
        for (var mod in modules) {
            if (modules.hasOwnProperty(mod)) {
                modulesListOrig.push(mod);
            }
        }
    }

    if (isMsg) {
        console.log('Build modules:');
    }

    for (var i = 0, count = modulesListOrig.length; i < count; i++) {
        var moduleName = modulesListOrig[i];

        if (modules.hasOwnProperty(moduleName)) {
            if (modules[moduleName].deps) {
                var moduleDeps = modules[moduleName].deps;
                for (var j = 0, cnt = moduleDeps.length; j < cnt; j++) {
                    var moduleNameDeps = moduleDeps[j];
                    if (!loadedModules[moduleNameDeps]) {
                        modulesListRes.push(moduleNameDeps);
                        loadedModules[moduleNameDeps] = true;
                        if (isMsg) {
                            console.log(depsMsg('  + ' + moduleNameDeps + ' (deps of ' + moduleName + ')'));
                        }
                    }
                }
            }

            if (!loadedModules[moduleName]) {
                modulesListRes.push(moduleName);
                loadedModules[moduleName] = true;
                if (isMsg) {
                    console.log('  * ' + moduleName);
                }
            }
        } else {
            if (isMsg) {
                console.log(errMsg('  - ' + moduleName + ' (not found)'));
                errors.push('Unknown modules');
            }
        }
    }

    return modulesListRes;
}

/**
 * Generates build content
 *
 * @param {Array} modulesList
 * @param {Boolean} isMsg
 * @returns {String}
 */
function makePackage(modulesList, isMsg) {
    var loadedFiles = {},
        countModules = 0,
        result = '';

    for (var i = 0, count = modulesList.length; i < count; i++) {
        var moduleName = modulesList[i],
            moduleData = modules[moduleName];

        if (moduleData && moduleData.src) {
            var moduleSrc = moduleData.src;
            countModules++;

            for (var file in moduleSrc) {
                if (moduleSrc.hasOwnProperty(file)) {
                    if (!loadedFiles[file]) {
                        result += moduleSrc[file];
                        loadedFiles[file] = true;
                    }
                }
            }
        }
    }

    if (isMsg) {
        console.log('\nConcatenating ' + countModules + ' modules...\n');
    }

    return copyrights + config.intro + result + config.outro;
}

/**
 * Minify source files
 *
 * @param {String} content
 * @param {Boolean} isDebug
 * @return {String}
 */
function minifyPackage(content, isDebug) {
    if (isDebug) {
        return content;
    }

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
 */
function lintFiles(modules) {
    var errorsCount = 0;

    console.log('\nCheck all source JS files for errors with JSHint...\n');

    for (mod in modules) {
        if (modules.hasOwnProperty(mod)) {
            var fileList = modules[mod].src;
            for (file in fileList) {
                if (fileList.hasOwnProperty(file)) {

                    jshint(fileList[file], hint.config, hint.namespace);
                    var errorsList = jshint.errors;

                    for (var i = 0, count = errorsList.length; i < count; i++) {
                        var e = errorsList[i];
                        console.log('  ' + file + '    line ' + e.line + ' col ' + e.character + '    ' + e.reason);
                        errorsCount++;
                    }
                }
            }
        }
    }

    if (errorsCount > 0) {
        console.log(errMsg('\nJSHint find ' + errorsCount + ' errors.\n'));
        errors.push('JSHint');
    } else {
        console.log('JSHint not find errors.\n');
    }

}


/**
 * Lint (CLI command)
 */
exports.lint = function() {
    modules = getModulesData();
    lintFiles(modules);
};

/**
 * Build (CLI command)
 */
exports.build = function() {
    var dest = config.dest.custom,
        pkg = argv.p || argv.m;

    modules = getModulesData();
    copyrights = getCopyrightsData();

    if (pkg === 'public') {
        dest = config.dest.public;
        console.log('Build public GitHub full package!\n');
    }

    var modulesList = getModulesList(pkg, true);
    var srcContent = makePackage(modulesList, true);
    fs.writeFileSync(dest.src, srcContent);

    console.log('Compressing...\n');

    var minContent = minifyPackage(srcContent);
    fs.writeFileSync(dest.min, minContent);

    console.log('Uncompressed size: ' + (srcContent.length/1024).toFixed(1) + ' KB');
    console.log('Compressed size:   ' + (minContent.length/1024).toFixed(1) + ' KB');

    if (errors.length > 0) {
        console.log(errMsg('\nBuild ended with errors! [' + errors + ']'));
    } else {
        console.log(okMsg('\nBuild successfully completed!'));
    }

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
    var modulesList = getModulesList(pkg),
        contentSrc = makePackage(modulesList),
        contentRes = minifyPackage(contentSrc, isDebug);
    callback(contentRes);
};
