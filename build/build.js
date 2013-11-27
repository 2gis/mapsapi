var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    grunt = require('grunt'),
    uglify = require('uglify-js'),
    cleanCss = require('clean-css'),
    argv = require('optimist').argv,
    clc = require('cli-color'),
    config = require(__dirname + '/config.js').config,
    packages = require(__dirname + '/packs.js').packages,
    async = require('async'),
    glob = require('glob'),
    defaultTheme = 'light',
    //Global data stores
    modules,
    appConfig,
    errors = [],
    //CLI colors theme settings
    okMsg = clc.xterm(28),
    errMsg = clc.xterm(9),
    depsMsg = clc.xterm(27);

// Get content of source files all modules
function getModulesData(callback) {
    var source = config.source,
        modulesData = {};

    appConfig = appConfig || getAppConfig();
    //console.log(source);
    Object.keys(source).forEach(function (creator) {
        var modulesList = source[creator].deps,
            basePath = source[creator].path;

        Object.keys(modulesList).forEach(function (moduleName) {
            var moduleConf = modulesList[moduleName];

            modulesData[moduleName] = {};
            modulesData[moduleName] = processJs(moduleConf.src, basePath, moduleName);
            modulesData[moduleName].css = processCss(moduleConf.css, basePath);
            modulesData[moduleName].conf = processSkinConf(moduleConf.src, basePath);
            modulesData[moduleName].deps = modulesList[moduleName].deps;
        });
    });

    callback(null, modulesData);
}

//Get content of JS files
function processJs(srcList, basePath, moduleName) { // (Array, String)->Object
    var jsContent = {js: {}, jsmin: {}}, key;

    if (!srcList) { return; }

    if (moduleName.indexOf('DG') === 0) {
        var tmplConfig = getTemplates(moduleName);

        // add template content to config vars
        for (key in tmplConfig) {
            if (tmplConfig.hasOwnProperty(key)) {
                appConfig[key] = tmplConfig[key];
            }
        }
    }
    srcList.forEach(function (src) {
        var srcPath = basePath + src;
        if (srcPath.indexOf(config.skin.var) < 0) {
            if (fs.existsSync(srcPath)) {
                var jsData = setParams(fs.readFileSync(srcPath, 'utf8') + '\n\n', appConfig);
                jsContent.js[srcPath] = jsData;
                jsContent.jsmin[srcPath] = minifyJSPackage(jsData);
            } else {
                console.log(errMsg('Error! File ' + srcPath + ' not found!\n'));
            }
        }
    });

    return jsContent;
}

// Get content of JS skins config files
function processSkinConf(srcList, basePath, callback) { //(Array, String)->Object
    var skinConfContent = {},
        skinVar = config.skin.var;

    if (srcList) {
        srcList.forEach(function (item) {
            var srcPath = basePath + item;

            if (srcPath.indexOf(skinVar) > 0) {
                var skinsPath = srcPath.split(skinVar);

                fs.readdir(skinsPath[0], function (err, skins) {
                    if (err) { return; }

                    skins.forEach(function (skin) {
                        var skinPath = skinsPath[0] + skin + skinsPath[1];
                        fs.readFile(skinPath,  {encoding: 'utf8'}, function (err, skinContent) {
                            if (err) { return; }
                            skinConfContent[skin] = setParams(skinContent, appConfig);
                        });
                    });
                });
            }
        });
    }
}

// Get content of CSS files each skins (+ IE support)
function processCss(srcConf, basePath) { //(Object, String)->Object
    var cssContent = {},
        skinVar = config.skin.var;

    for (var browser in srcConf) {
        if (srcConf.hasOwnProperty(browser)) {
            var browserCssList = srcConf[browser];

            for (var i = 0, count = browserCssList.length; i < count; i++) {
                var srcPath = basePath + browserCssList[i];

                if (srcPath.indexOf(skinVar) > -1) {
                    var skinsPath = srcPath.split(skinVar),
                        skinsList = fs.readdirSync(skinsPath[0]);

                    for (var j = 0, cnt = skinsList.length; j < cnt; j++) {
                        var skinName = skinsList[j],
                            skinPath = skinsPath[0] + skinName + skinsPath[1];
                        if (fs.existsSync(skinPath)) {
                            getCssSource(skinPath, skinName);
                        }
                    }
                } else {
                    getCssSource(srcPath, 'basic');
                }
            }
        }
    }

    function getCssSource(path, name) {
        var cssData = setParams(fs.readFileSync(path, 'utf8') + '\n', appConfig);
        cssContent[name] = cssContent[name] || {};
        cssContent[name][browser] = cssContent[name][browser] || {};
        cssContent[name][browser][path] = {source: cssData,
                                           sourcemin: minifyCSSPackage(cssData)};
    }

    return cssContent;
}

// Generate templates object for specified module
function getTemplates(moduleName) { //(string)->Object
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

                (tmplContent.length > 0) ? tmpl[tmplName] = tmplContent : tmpl[tmplName] = '';
        }

        modulesTmpls[varName] = 'JSON.parse(\'' + escapeJson(JSON.stringify(tmpl)) + '\')';
    }

    function escapeJson(str) {
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

// Clear img folder and copy all images from skins folder
function copyImages(done) {
    var sourceDeps = config.source,
        publicImgPath = config.img.dest,
        countImg = 0;

    cleanImgDir();
    processImg();

    function cleanImgDir() {
        if (grunt.file.isDir(publicImgPath)) {
            grunt.file.delete(publicImgPath);
            grunt.file.mkdir(publicImgPath);
            console.log('Clear public/img folder.');
        }
    }

    function processImg() {

        console.log('Copy all skins and vendors images to public/img...');
        Object.keys(sourceDeps).forEach(function (creator) {
            var creatorPath = sourceDeps[creator].path;

            // need cache creator var since async function inside
            (function (creator) {
                fs.readdir(creatorPath, function (err, files) {
                    if (err) { return; }

                    files.forEach(function (module) {
                        var skinsPath = creatorPath + module + '/' + config.skin.dir + '/',
                            isDg = (creator === 'dg'),
                            pattern = isDg ? skinsPath + config.img.pattern : sourceDeps[creator].pathImg + config.img.patternVendor;

                        glob(pattern, {}, function (err, img) {
                            if (err) { return; }

                            img.forEach(function (src) {
                                copyImg(src, isDg, creator);
                            });
                        });
                    });
                });
            })(creator);
        });

        console.log('Done. Copy ' + countImg + ' images.');
        done(null);
    }

    function copyImg(imgPath, isDg, creator) {
        var fileName = path.basename(imgPath),
            destPath = isDg ? config.img.dest + fileName :
                              config.img.destVendor + '/' + creator + '/' + fileName;

        grunt.file.copy(imgPath, destPath);
        countImg++;
    }
}

// Clear fonts folder and copy all fonts from skins folder
function copyFonts(done) {
    var sourceDeps = config.source.dg.path,
        publicFontPath = config.font.dest,
        fontCount = 0;

    cleanFontsDir();
    processFont();

    function cleanFontsDir() {
        if (grunt.file.isDir(publicFontPath)) {
            grunt.file.delete(publicFontPath);
            grunt.file.mkdir(publicFontPath);

            console.log('Clear public/fonts folder.');
        }
    }

    function processFont() {
        fs.readdir(sourceDeps, function (err, files) {
            if (err) { return; }

            console.log('Copy all fonts to public/fonts...');

            files.forEach(function (module) {
                var skinsPath = sourceDeps + module + '/' + config.skin.dir + '/';


                glob(skinsPath + config.font.pattern, {}, function (err, files) {
                    if (err) { return; }

                    files.forEach(function (src) {
                        copyFont(src);
                    });
                });
            });

            console.log('Done. Copy fonts.');
            done(null);
        });
    }

    function copyFont(fontPath) {
        var fileName, destPath;

        if (grunt.file.isFile(fontPath)) {
            fileName = path.basename(fontPath);
            destPath = config.font.dest + fileName;
            grunt.file.copy(fontPath, destPath);
            fontCount++;
        }
    }
}

// Get content of source files all copyrights. Must run only 1 time on start app or run CLI script
function getCopyrightsData() { //()->String
    var source = config.js.copyrights,
        copyrights = '';

    for (var i = 0, count = source.length; i < count; i++) {
        copyrights += fs.readFileSync(source[i], 'utf8') + '\n';
    }

    return copyrights;
}

// Generates a list of modules by pkg
function getModulesList(pkg, isMsg) { //(String|Null, Boolean)->Array
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

// Generates JS content
function makeJSPackage(modulesList, params) { //(Array, Object)->String
    var loadedFiles = {},
        countModules = 0,
        result = '',
        moduleSkinName, moduleSkinId,
        skin = params.skin,
        isMsg = params.isMsg;

    for (var i = 0, count = modulesList.length; i < count; i++) {
        var moduleName = modulesList[i],
            moduleData = modules[moduleName];

        if (moduleData && moduleData.js) {
            var moduleSrc = params.isDebug ? moduleData.js : moduleData.jsmin;
            countModules++;

            // Load skins config (if exist) before main module code
            if (moduleData.conf) {
                var moduleSkins = moduleData.conf;
                var loadSkinsList = [];

                if (moduleSkins.hasOwnProperty('basic')) {
                    loadSkinsList.push('basic');
                }

                if (moduleSkins.hasOwnProperty(skin) || moduleSkins.hasOwnProperty(defaultTheme)) {
                    moduleSkinName = moduleSkins.hasOwnProperty(skin) ? skin : defaultTheme;
                    loadSkinsList.push(moduleSkinName);
                }

                // process list of skins
                for (var j = 0, cnt = loadSkinsList.length; j < cnt; j++) {
                    moduleSkinName = loadSkinsList[j];
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

    return getCopyrightsData() + config.js.intro + result + config.js.outro;
}

// Generates CSS content
function makeCSSPackage(modulesList, params) { //(Array, Object)->String
    var loadedFiles = {},
        countModules = 0,
        result = '', moduleBrowser,
        skin = params.skin;

    for (var i = 0, count = modulesList.length; i < count; i++) {
        var moduleName = modulesList[i],
            moduleData = modules[moduleName];

        if (moduleData && moduleData.css) {
            var moduleSkins = moduleData.css;

            if (moduleSkins.hasOwnProperty('basic')) {
                moduleBrowser = moduleSkins.basic;
                processBrowsers(moduleBrowser);
                countModules++;
            }

            if (moduleSkins.hasOwnProperty(skin) || moduleSkins.hasOwnProperty(defaultTheme)) {
                var skinName = moduleSkins.hasOwnProperty(skin) ? skin : defaultTheme;
                moduleBrowser = moduleSkins[skinName];
                processBrowsers(moduleBrowser);
            }
        }
    }

    if (params.isMsg) {
        console.log('Concatenating CSS in ' + countModules + ' modules...\n');
    }

    function concatenateFiles(moduleSrc) {
        for (var file in moduleSrc) {
            if (moduleSrc.hasOwnProperty(file)) {
                if (!loadedFiles[file]) {
                    result += params.isDebug ? moduleSrc[file].source : moduleSrc[file].sourcemin;
                    loadedFiles[file] = true;
                }
            }
        }
    }

    function processCssByType(type) {
        if (moduleBrowser.hasOwnProperty(type)) {
            var moduleSrc = moduleBrowser[type];
            concatenateFiles(moduleSrc);
        }
    }

    function processBrowsers(moduleBrowser) {
        if (params.addClean) {
            processCssByType('all');
        }
        if (params.addIE) {
            processCssByType('ie');
        }
    }

    return getCopyrightsData() + result;
}

// Minify JS source files
function minifyJSPackage(source) { //(String)->String
    return uglify.minify(source, {
        warnings: !true,
        fromString: true
    }).code;
}

// Minify CSS source files
function minifyCSSPackage(source) { //(String)->String
    return cleanCss.process(source);
}

// Reeturn actual configuration for replace
function getAppConfig() { // ()->Object
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

// Replace content according to the configuration files
function setParams(content, config) { //(String, Object)->String
    Object.keys(config).forEach(function (pattern) {
        var search = '__' + pattern + '__',
            replace = config[pattern];
        content = content.split(search).join(replace);
    });

    return content;
}


function setVersion(done) {
    var loaderPath = config.loader.dir,
        loaderFileName = config.loader.name,
        command = 'git rev-parse --verify HEAD',
        hash;

    fs.exists(loaderPath + '/' + loaderFileName, function (exists) {

        if (!exists) { throw new Error('Not search file \'loader.js\' in ' + loaderPath); }
        exec(command, function (error, stdout) {

            if (error) { return; }
            fs.readFile(loaderPath + '/' + loaderFileName, {encoding: 'utf8'}, function (err, loaderContent) {

                if (err) { throw err; }

                hash = stdout.substr(0, 6);

                console.log('Set version of stat files: ' + hash + '\n');

                loaderContent = loaderContent.replace(/(version\s*=\s*['"]{1})([\w]+=)*.*(['"]{1})/g, '$1$2' + hash + '$3');
                fs.writeFile(loaderPath + '/' + loaderFileName, loaderContent, function () {
                    done();
                });
            });
        });
    });
}

// Copy all images (CLI command)
exports.copyImages = function () {
    copyImages();
};

// Copy all fonts (CLI command)
exports.copyFonts = function () {
    copyFonts();
};

//Make preperations for release (CLI command)
exports.release = function (done) {
    async.parallel([copyImages, copyFonts, setVersion],
    function (err) {
        if (!err) {
            done();
        }
    });
};

// Build (CLI command)
exports.build = function () {
    var modulesList,
        jsSrcContent,
        jsMinContent,
        jsDest = config.js.public,
        jsDir = jsDest.dir,
        cssDest = config.css.public,
        cssDir = cssDest.dir,
        pkg = argv.p || argv.m || argv.pkg || argv.mod,
        skin = argv.skin || defaultTheme;

    /*modules = modules || getModulesData(function (result) {
        modules = result;
    });*/

    console.log('Skin: ' + skin + '\n');

    /*copyImages();
    copyFonts();*/

    async.parallel({img: copyImages, fonts: copyFonts, modules: getModulesData},
    function (err, results) {
        modulesList = getModulesList(pkg, true);

        var packAndConcatCss = function (name, addIE, addClean) {
            var cssSrcContent = makeCSSPackage(modulesList, {skin: skin, addIE: addIE, addClean: addClean, isMsg: true});
            fs.writeFileSync(cssDest[nname], cssSrcContent);

            console.log('\nCompressing CSS...\n');

            var cssMinContent = makeCSSPackage(modulesList, {skin: skin, addIE: addIE, addClean: addClean, isDebug: true});
            fs.writeFileSync(cssDest[name + '_min'], cssMinContent);

            console.log('   Uncompressed size: ' + (cssSrcContent.length / 1024).toFixed(1) + ' KB');
            console.log('   Compressed size:   ' + (cssMinContent.length / 1024).toFixed(1) + ' KB');
        };

        jsSrcContent = makeJSPackage(modulesList, {skin: skin, isMsg: true});

        if (!fs.existsSync(jsDir)) {
            console.log('Creating ' + jsDir + ' dir...');
            fs.mkdirSync(jsDir);
        }
        fs.writeFileSync(jsDest.src, jsSrcContent);

        console.log('Compressing JS...\n');

        jsMinContent = makeJSPackage(modulesList, {skin: skin, isDebug: true});
        fs.writeFileSync(jsDest.min, jsMinContent);

        console.log('   Uncompressed size: ' + (jsSrcContent.length / 1024).toFixed(1) + ' KB');
        console.log('   Compressed size:   ' + (jsMinContent.length / 1024).toFixed(1) + ' KB');

        if (!fs.existsSync(cssDir)) {
            console.log('Creating ' + cssDir + ' dir...');
            fs.mkdirSync(cssDir);
        }
        packAndConcatCss('full', true, true);
        packAndConcatCss('clean', false, true);
        packAndConcatCss('ie', true, false);

        if (errors.length > 0) {
            console.log(errMsg('\nBuild ended with errors! [' + errors + ']'));
        } else {
            console.log(okMsg('\nBuild successfully completed!'));
        }

    });


};

// Get params of app from config files (web app)
exports.getConfig = function () {
    return getAppConfig();
};

// Load content of all source files to memory (web app). Must run only 1 time on start app
exports.init = function (callback) {
    async.parallel({img: copyImages, fonts: copyFonts, modules: getModulesData},
    function (err, results) {
        if (results.modules) {
            modules = results.modules;
            console.log(okMsg('Load source files successfully completed'));
            callback();
        } else {
            console.log(errMsg('Load source files ended with errors!'));
        }
    });
};

// Get JS content (web app)
exports.getJS = function (params, callback) { // (Object, Function)
    var modulesList, contentSrc;
    modulesList = getModulesList(params.pkg);
    contentSrc = makeJSPackage(modulesList, {skin: params.skin, isDebug: params.isDebug});
    callback(contentSrc);
};

// Get CSS content (web app)
exports.getCSS = function (params, callback) { // (Object, Function)
    var modulesList, contentSrc;
    modulesList = getModulesList(params.pkg);
    contentSrc = makeCSSPackage(modulesList, {skin: params.skin, addIE: params.isIE, addClean: true, isMsg: false, isDebug: params.isDebug});
    callback(contentSrc);
};
