/**
 * Main build script of 2GIS Maps API 2.0
 *
 * Version 2.0.0
 *
 * Copyright (c) 2013, 2GIS, Andrey Chizh
 */
var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    grunt = require('grunt'),
    jshint = require('jshint').JSHINT,
    uglify = require('uglify-js'),
    cleanCss = require('clean-css'),
    argv = require('optimist').argv,
    clc = require('cli-color'),
    execSync = require('execSync'),
    config = require(__dirname + '/config.js').config,
    packages = require(__dirname + '/packs.js').packages,
    hint = require(__dirname + '/hintrc.js'),
    /**
     * Global data stores
     */
    modules,
    copyrights,
    appConfig,
    errors = [],
    /**
     * CLI colors theme settings
     * See: https://github.com/medikoo/cli-color
     */
    okMsg = clc.xterm(34),
    errMsg = clc.xterm(9),
    depsMsg = clc.xterm(27);

/**
 * Get content of source files all modules
 * For best performance must run only 1 time on start app or run CLI script
 *
 * @return {Object} Return list of modules with some data:
 *
 * {
 *    js: {
 *       './path/to/src/Script1.js': 'Script1.js file connent...',
 *       './path/to/src/Script2.js': 'Script2.js file connent...'
 *    },
 *    css: {
 *       basic: {
 *           all: {
 *               './path/to/skin/basic/css/Style1.css': 'Style1.css file connent...',
 *               './path/to/skin/basic/css/Style2.css': 'Style2.css file connent...'
 *           },
 *           ie: {
 *               './path/to/skin/basic/css/Style1-ie.css': 'Style1-ie.css file connent...'
 *           }
 *       }
 *    },
 *    conf: {
 *       './path/to/skin/Config.js': 'Config.js file connent...'
 *    },
 *    deps: [ 'Module3, Module4' ]
 * }
 *
 */
function getModulesData() {
    var source = config.source,
        modulesData = {};

    appConfig = appConfig || getAppConfig();

    for (var creator in source) {
        if (source.hasOwnProperty(creator)) {
            var modulesList = source[creator].deps,
                basePath = source[creator].path;

            for (var moduleName in modulesList) {
                if (modulesList.hasOwnProperty(moduleName)) {
                    var moduleConf = modulesList[moduleName];

                    modulesData[moduleName] = {};
                    modulesData[moduleName].js = processJs(moduleConf.src, basePath, moduleName);
                    modulesData[moduleName].css = processCss(moduleConf.css, basePath);
                    modulesData[moduleName].conf = processSkinConf(moduleConf.src, basePath);
                    modulesData[moduleName].deps = modulesList[moduleName].deps;

                }
            }
        }
    }

    return modulesData;
}

/**
 * Get content of JS files
 *
 * @param {Array} srcList  List of path to JS files
 * @param {String} basePath  Base path of JS files
 * @return {Object}
 */
function processJs(srcList, basePath, moduleName) {
    var jsContent = {};

    if (srcList) {
        if (moduleName.indexOf("DG") === 0) {
            var tmplConfig = getTemplates(moduleName);

             // add template content to config vars
            for (var key in tmplConfig) {
                appConfig[key] = tmplConfig[key];
            }
        }
        for (var i = 0, count = srcList.length; i < count; i++) {
            var srcPath = basePath + srcList[i];
            if (srcPath.indexOf(config.skin.var) < 0) {
                if (fs.existsSync(srcPath)) {
                    var jsData = fs.readFileSync(srcPath, 'utf8') + '\n\n';
                    jsContent[srcPath] = setParams(jsData, appConfig);
                } else {
                    console.log(errMsg('Error! File ' + srcPath + ' not found!\n'));
                }
            }
        }
    }

    return jsContent;
}

/**
 * Get content of JS skins config files
 *
 * @param {Array} srcList  List of path to JS files
 * @param {String} basePath  Base path of JS files
 * @return {Object}
 */
function processSkinConf(srcList, basePath) {
    var skinConfContent = {},
        skinVar = config.skin.var;

    if (srcList) {
        for (var i = 0, count = srcList.length; i < count; i++) {
            var srcPath = basePath + srcList[i];

            if (srcPath.indexOf(skinVar) > 0) {
                var skinsPath = srcPath.split(skinVar),
                    skinsList = fs.readdirSync(skinsPath[0]);

                for (var j = 0, cnt = skinsList.length; j < cnt; j++) {
                    var skinName = skinsList[j],
                        skinPath = skinsPath[0] + skinName + skinsPath[1];
                    if (fs.existsSync(skinPath)) {
                        var skinConfData = fs.readFileSync(skinPath, 'utf8') + '\n';
                        skinConfContent[skinName] = setParams(skinConfData, appConfig);
                    }
                }
            }
        }
    }

    return skinConfContent;
}

/**
 * Get content of CSS files each skins (+ IE support)
 *
 * @param {Object} srcConf  Config of path to CSS files
 * @param {String} basePath  Base path of CSS files
 * @return {Object}
 */
function processCss(srcConf, basePath) {
    var cssContent = {},
        skinVar = config.skin.var;

    for (var browser in srcConf) {
        if (srcConf.hasOwnProperty(browser)) {
            var browserCssList = srcConf[browser];

            for (var i = 0, count = browserCssList.length; i < count; i++) {
                var srcPath = basePath + browserCssList[i];

                if (srcPath.indexOf(skinVar) > 0) {
                    var skinsPath = srcPath.split(skinVar),
                        skinsList = fs.readdirSync(skinsPath[0]);

                    for (var j = 0, cnt = skinsList.length; j < cnt; j++) {
                        var skinName = skinsList[j],
                            skinPath = skinsPath[0] + skinName + skinsPath[1];
                        if (fs.existsSync(skinPath)) {
                            var cssData = fs.readFileSync(skinPath, 'utf8') + '\n';
                            cssContent[skinName] = cssContent[skinName] || {};
                            cssContent[skinName][browser] = cssContent[skinName][browser] || {};
                            cssContent[skinName][browser][skinPath] = setParams(cssData, appConfig);
                        }
                    }
                } else {
                    var cssData = fs.readFileSync(srcPath, 'utf8') + '\n';
                    cssContent.basic = cssContent.basic || {};
                    cssContent.basic[browser] = cssContent.basic[browser] || {};
                    cssContent.basic[browser][srcPath] = setParams(cssData, appConfig);
                }
            }
        }
    }

    return cssContent;
}

function getTemplates(moduleName) {

    var tmplConf = config.tmpl,
        tmplPath = config.source.dg.path + moduleName + '/' + tmplConf.dir + '/',
        modulesTmpls = {};

    if (fs.existsSync(tmplPath)) {
        readTemplates(tmplPath, moduleName + tmplConf.varPostfix);
    }

    function readTemplates(tmplPath, varName) {

        var tmplList = grunt.file.expand([tmplPath + tmplConf.pattern]),
            tmpl = {};

        for (var i = 0, len = tmplList.length; i < len; i++) {
            var srcPath = tmplList[i],
                tmplName = path.basename(srcPath, tmplConf.ext);
                tmplContent = fs.readFileSync(srcPath, 'utf8');

                (tmplContent.length > 0) ? tmpl[tmplName] = tmplContent : tmpl[tmplName] = "";
        }

        modulesTmpls[varName] = escapeJson(JSON.stringify(tmpl));
    }

    function escapeJson (str) {
        return str
                .replace(/[\\]/g, '\\\\')
                .replace(/[\']/g, '\\\\"')
                .replace(/[\b]/g, '\\b')
                .replace(/[\v]/g, '\\v')
                .replace(/[\f]/g, '\\f')
                .replace(/[\n]/g, '\\n')
                .replace(/[\r]/g, '\\r')
                .replace(/[\t]/g, '\\t');
    }

    return modulesTmpls;
}

/**
 * Clear img folder and copy all images from skins folder
 */
function copyImages() {
    var sourceDeps = config.source,
        publicImgPath = config.img.dest,
        countImg = 0;

    console.log('Clear public/img folder.');
    cleanImgDir();
    console.log('Copy all skins and vendors images to public/img...');
    copyImg();
    console.log('Done. Copy ' + countImg + ' images.');

    function cleanImgDir() {
        if (grunt.file.isDir(publicImgPath)) {
            grunt.file.delete(publicImgPath);
            grunt.file.mkdir(publicImgPath);
        }
    }

    function copyImg() {
        for (var creator in sourceDeps) {
            if (sourceDeps.hasOwnProperty(creator)) {
                var basePath = sourceDeps[creator].path,
                    modulesList = fs.readdirSync(basePath);

                if (creator !== 'dg') {
                    var imgPath = sourceDeps[creator].pathImg;
                    if (fs.existsSync(imgPath)) {
                        copyVendorImg(imgPath, creator);
                    }
                }

                for (var i = 0, count = modulesList.length; i < count; i++) {
                    var moduleName = modulesList[i],
                        skinsPath = basePath + moduleName + '/' + config.skin.dir + '/';
                    if (fs.existsSync(skinsPath)) {
                        copySkinImg(skinsPath);
                    }
                }
            }
        }
    }

    function copySkinImg(skinsPath) {
        var imgList = grunt.file.expand([skinsPath + config.img.pattern]);

        for (var i = 0, count = imgList.length; i < count; i++) {
            var srcPath = imgList[i],
                fileName = path.basename(srcPath),
                destPath = config.img.dest + fileName;

            if (fs.existsSync(srcPath)) {
                grunt.file.copy(srcPath, destPath);
                countImg++;
            }
        }
    }

    function copyVendorImg(vendorPath, creator) {
        var imgList = grunt.file.expand([vendorPath + config.img.patternVendor]);

        for (var i = 0, count = imgList.length; i < count; i++) {
            var srcPath = imgList[i],
                fileName = path.basename(srcPath),
                destPath = config.img.destVendor + '/' + creator + '/' + fileName;

            if (fs.existsSync(srcPath)) {
                grunt.file.copy(srcPath, destPath);
                countImg++;
            }
        }
    }
}

/**
 * Get content of source files all copyrights
 * Must run only 1 time on start app or run CLI script
 *
 * @return {String}
 */
function getCopyrightsData() {
    var source = config.js.copyrights,
        copyrights = '';

    for (var i = 0, count = source.length; i < count; i++) {
        copyrights += fs.readFileSync(source[i], 'utf8') + '\n';
    }

    return copyrights;
}

/**
 * Generates a list of modules by pkg
 *
 * @param {String|Null} pkg  Name of package, module or list of modules
 * @param {Boolean} isMsg  Show messages on run CLI mode
 * @return {Array}
 */
function getModulesList(pkg, isMsg) {
    var modulesListOrig = ['Core'],
        modulesListRes = [],
        loadedModules = {};

    // Package name with no empty modules list on packs.js (example: 'base')
    if (pkg && packages.hasOwnProperty(pkg) && packages[pkg].modules.length > 0) {
        modulesListOrig = packages[pkg].modules;

    // Modules list (example: 'Core,JSONP,TileLayer')
    } else if (pkg && pkg.indexOf(',') > 0) {
        modulesListOrig = pkg.split(',');

    // Modules single (example: 'Core')
    } else if (pkg && modules.hasOwnProperty(pkg)) {
        modulesListOrig.push(pkg);

    // Others (null / full package / not correct value)
    } else {
        for (var mod in modules) {
            if (modules.hasOwnProperty(mod)) {
                modulesListOrig.push(mod);
            }
        }
    }

    if (isMsg) {
        console.log('\nBuild modules:');
    }

    for (var i = 0, count = modulesListOrig.length; i < count; i++) {
        var moduleName = modulesListOrig[i];

        if (modules.hasOwnProperty(moduleName)) {
            if (!loadedModules[moduleName]) {
                getDepsList(moduleName);
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

    function getDepsList(moduleName) {
        if (modules[moduleName] && modules[moduleName].deps) {
            var moduleDeps = modules[moduleName].deps;
            for (var i = 0, count = moduleDeps.length; i < count; i++) {
                var moduleNameDeps = moduleDeps[i];
                if (modules[moduleNameDeps] && modules[moduleNameDeps].deps) {
                    getDepsList(moduleNameDeps);
                }
                if (!loadedModules[moduleNameDeps]) {
                    modulesListRes.push(moduleNameDeps);
                    loadedModules[moduleNameDeps] = true;
                    if (isMsg) {
                        console.log(depsMsg('  + ' + moduleNameDeps + ' (deps of ' + moduleName + ')'));
                    }
                }
            }
        }
    }

    return modulesListRes;
}

/**
 * Generates build content
 *
 * @param {Array} modulesList
 * @param {String} skin  Set skin for builder
 * @param {Boolean} isMsg  Show messages on run CLI mode
 * @return {String}
 */
function makeJSPackage(modulesList, skin, isMsg) {
    var loadedFiles = {},
        countModules = 0,
        result = '';

    for (var i = 0, count = modulesList.length; i < count; i++) {
        var moduleName = modulesList[i],
            moduleData = modules[moduleName];

        if (moduleData && moduleData.js) {
            var moduleSrc = moduleData.js;
            countModules++;

            // Load skins config (if exist) before main module code
            if (moduleData.conf) {
                var moduleSkins = moduleData.conf;
                var loadSkinsList = [];

                if (moduleSkins.hasOwnProperty('basic')) {
                    loadSkinsList.push('basic');
                }

                if (moduleSkins.hasOwnProperty(skin) || moduleSkins.hasOwnProperty('default')) {
                    var moduleSkinName = moduleSkins.hasOwnProperty(skin) ? skin : 'default';
                    loadSkinsList.push(moduleSkinName);
                }

                // process list of skins
                for (var j = 0, cnt = loadSkinsList.length; j < cnt; j++) {
                    var moduleSkinName = loadSkinsList[j],
                        moduleSkinId = moduleSkinName + ':' + moduleName;
                    if (!loadedFiles[moduleSkinId]) {
                        result += moduleSkins[moduleSkinName];
                        loadedFiles[moduleSkinId] = true;
                    }
                }
            }

            // Load main module code
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
        console.log('\nConcatenating JS in ' + countModules + ' modules...\n');
    }

    return copyrights + config.js.intro + result + config.js.outro;
}

/**
 * Generates build content
 *
 * @param {Array} modulesList
 * @param {String} skin
 * @param {Boolean} isIE
 * @param {Boolean} isMsg  Show messages on run CLI mode
 * @return {String}
 */
function makeCSSPackage(modulesList, skin, isIE, isMsg) {
    var loadedFiles = {},
        countModules = 0,
        result = '';

    for (var i = 0, count = modulesList.length; i < count; i++) {
        var moduleName = modulesList[i],
            moduleData = modules[moduleName];

        if (moduleData && moduleData.css) {
            var moduleSkins = moduleData.css;

            if (moduleSkins.hasOwnProperty('basic')) {
                var moduleBrowser = moduleSkins['basic'];
                processBrowsers(moduleBrowser);
                countModules++;
            }

            if (moduleSkins.hasOwnProperty(skin) || moduleSkins.hasOwnProperty('default')) {
                var skinName = moduleSkins.hasOwnProperty(skin) ? skin : 'default';
                var moduleBrowser = moduleSkins[skinName];
                processBrowsers(moduleBrowser);
            }
        }
    }

    if (isMsg) {
        console.log('Concatenating CSS in ' + countModules + ' modules...\n');
    }

    function concatenateFiles(moduleSrc) {
        for (var file in moduleSrc) {
            if (moduleSrc.hasOwnProperty(file)) {
                if (!loadedFiles[file]) {
                    result += moduleSrc[file];
                    loadedFiles[file] = true;
                }
            }
        }
    }

    function processBrowsers(moduleBrowser) {
        if (moduleBrowser.hasOwnProperty('all')) {
            var moduleSrcAll = moduleBrowser['all'];
            concatenateFiles(moduleSrcAll);
        }
        if (isIE && moduleBrowser.hasOwnProperty('ie')) {
            var moduleSrcIE = moduleBrowser['ie'];
            concatenateFiles(moduleSrcIE);
        }
    }

    return result;
}

/**
 * Minify JS source files
 *
 * @param {String} source  Source content of JS file
 * @param {Boolean} isDebug  Is minify JS file
 * @return {String} Result content of JS file
 */
function minifyJSPackage(source, isDebug) {
    if (isDebug) {
        return source;
    }

    //@todo async this blocked operation
    var min = uglify.minify(source, {
        warnings: true,
        fromString: true
    }).code;

    return copyrights + min;
}

/**
 * Minify CSS source files
 *
 * @param {String} source  Source content of JS file
 * @param {Boolean} isDebug  Is minify JS file
 * @return {String} Result content of JS file
 */
function minifyCSSPackage(source, isDebug) {
    if (isDebug) {
        return source;
    }

    //@todo async this blocked operation
    var min = cleanCss.process(source);

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

    for (var mod in modules) {
        if (modules.hasOwnProperty(mod)) {
            var fileList = modules[mod].src;
            for (var file in fileList) {
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
 * Reeturn actual configuration for replace
 * @return {Object} config to replace
 */
function getAppConfig() {
    var mainConfigPath = config.mainAppConfig,
        localConfigPath = config.localAppConfig,
        mainConfig,
        localConfig,
        key;

    if (!fs.existsSync(mainConfigPath)) {
        throw new Error("Not search file 'config.main.json' in " + mainConfigPath);
    }

    mainConfig = JSON.parse(fs.readFileSync(mainConfigPath));
    if (fs.existsSync(localConfigPath)) {
        localConfig = JSON.parse(fs.readFileSync(localConfigPath));
        for (key in localConfig) {
            mainConfig[key] = localConfig[key];
        }
    }
    return mainConfig;
}

/**
 * Replaces the content according to the configuration files
 *
 * Demo using:
 *
 * var config = getMainConfig("./src");
 * var content = fs.readFileSync("./src/DGTileLayer/src/DGTileLayer.js", "utf8");
 * console.log(setParams(content, config));
 *
 * @param {String}  content to replace
 * @param {Object} config to replace
 * @return {String} modified content
 *
 */
function setParams(content, config) {
    for (var pattern in config ) {
        var search = "__" + pattern + "__",
            replace = config[pattern];
        content = content.split(search).join(replace);
    }
    return content;
}

/**
 * Write version api in loader.js
 *
 */
exports.setVersion = function () {
    var loaderPath = config.loader.dir,
        loaderFileName = config.loader.name,
        command = "git rev-parse --verify HEAD",
        loaderContent,
        smallHash,
        hash;

    if (!fs.existsSync(loaderPath + '/' + loaderFileName)) {
        throw new Error("Not search file 'loader.js' in " + loaderPath);
    }

    loaderContent = fs.readFileSync(loaderPath + '/' + loaderFileName).toString();
    hash = execSync.stdout(command);
    smallHash = hash.substr(0, 6);

    console.log('Set version of stat files: ' + smallHash + '\n');

    loaderContent = loaderContent.replace(/(version\s*=\s*['"]{1})([\w]+=)*.*(['"]{1})/g, "$1$2" + smallHash + "$3");
    fs.writeFileSync(loaderPath + '/' + loaderFileName, loaderContent);
};

/**
 * Copy all images (CLI command)
 */
exports.copyImages = function() {
    copyImages();
};

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
    var modulesList,
        jsSrcContent,
        jsMinContent,
        cssSrcContent,
        cssMinContent,
        jsDest = config.js.custom,
        cssDest = config.css.custom,
        pkg = argv.p || argv.m || argv.pkg || argv.mod,
        skin = argv.skin || 'default';

    modules = modules || getModulesData();
    copyrights = getCopyrightsData();

    if (pkg === 'public') {
        jsDest = config.js.public;
        cssDest = config.css.public;
        console.log('Build public GitHub full package!\n');
    }

    console.log('Skin: ' + skin + '\n');

    copyImages();

    modulesList = getModulesList(pkg, true);

    jsSrcContent = makeJSPackage(modulesList, skin, true);
    cssSrcContent = makeCSSPackage(modulesList, skin, true, true);

    fs.writeFileSync(jsDest.src, jsSrcContent);
    fs.writeFileSync(cssDest.src, cssSrcContent);

    console.log('Compressing JS...\n');

    jsMinContent = minifyJSPackage(jsSrcContent);
    fs.writeFileSync(jsDest.min, jsMinContent);

    console.log('   Uncompressed size: ' + (jsSrcContent.length/1024).toFixed(1) + ' KB');
    console.log('   Compressed size:   ' + (jsMinContent.length/1024).toFixed(1) + ' KB');

    console.log('\nCompressing CSS...\n');

    cssMinContent = minifyCSSPackage(cssSrcContent);
    fs.writeFileSync(cssDest.min, cssMinContent);

    console.log('   Uncompressed size: ' + (cssSrcContent.length/1024).toFixed(1) + ' KB');
    console.log('   Compressed size:   ' + (cssMinContent.length/1024).toFixed(1) + ' KB');

    if (errors.length > 0) {
        console.log(errMsg('\nBuild ended with errors! [' + errors + ']'));
    } else {
        console.log(okMsg('\nBuild successfully completed!'));
    }

};

/**
 * Get params of app from config files (web app)
 */
exports.getConfig = function() {
    return getAppConfig();
};

/**
 * Load content of all source JS files to memory (web app)
 * Must run only 1 time on start app
 */
exports.init = function() {
    modules = getModulesData();
    copyrights = getCopyrightsData();
    if (modules && copyrights) {
        console.log(okMsg('Load source files successfully completed'));
    } else {
        console.log(errMsg('Load source files ended with errors!'));
    }
};

/**
 * Get JS content (web app)
 *
 * @param {Object} params  Params of build (pkg, debug, skin, etc)
 * @param {Function} callback  Return JS result file
 */
exports.getJS = function(params, callback) {
    var modulesList, contentSrc, contentRes;
    modulesList = getModulesList(params.pkg);
    contentSrc = makeJSPackage(modulesList, params.skin);
    contentRes = minifyJSPackage(contentSrc, params.isDebug); //@todo async this blocked operation
    callback(contentRes);
};

/**
 * Get CSS content (web app)
 *
 * @param {Object} params  Params of build (pkg, debug, skin, etc)
 * @param {Function} callback  Return CSS result file
 */
exports.getCSS = function(params, callback) {
    var modulesList, contentSrc, contentRes;
    modulesList = getModulesList(params.pkg);
    contentSrc = makeCSSPackage(modulesList, params.skin, params.isIE);
    contentRes = minifyCSSPackage(contentSrc, params.isDebug); //@todo async this blocked operation
    callback(contentRes);
};
