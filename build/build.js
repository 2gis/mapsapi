var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    grunt = require('grunt'),
    uglify = require('uglify-js'),
    cleanCss = require('clean-css'),
    extend = require('extend'),
    argv = require('optimist').argv,
    clc = require('cli-color'),
    config = require(__dirname + '/config.js').config,
    packages = require(__dirname + '/packs.js').packages,
    //Global data stores
    modules,
    defaultSkin,
    appConfig,
    errors = [],
    skinVar = config.skin.var,
    //CLI colors theme settings
    okMsg = clc.xterm(28),
    errMsg = clc.xterm(9),
    depsMsg = clc.xterm(27);

// Get content of source files all modules
function getModulesData() {
    var source = config.source,
        modulesData = {};

    appConfig = appConfig || getAppConfig();
    defaultSkin = appConfig.DEFAULT_SKIN;

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

    return modulesData;
}

//Get content of JS files
function processJs(srcList, basePath, moduleName) { // (Array, String, String)->Object
    var jsContent = {js: {}, jsmin: {}};

    if (!srcList) { return; }

    if (moduleName.indexOf('DG') > -1) {
        setTemplates(moduleName);
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
function processSkinConf(srcList, basePath) { //(Array, String)->Object
    var skinConfContent = {};

    srcList.forEach(function (src) {
        var srcPath = basePath + src;

        if (srcPath.indexOf(skinVar) > -1) {
            var skinsPath = srcPath.split(skinVar),
                skinsList = fs.readdirSync(skinsPath[0]);

            skinsList.forEach(function (skin) {
                var skinName = skin,
                    skinPath = skinsPath[0] + skinName + skinsPath[1];
                if (fs.existsSync(skinPath)) {
                    var skinConfData = fs.readFileSync(skinPath, 'utf8') + '\n';
                    skinConfContent[skinName] = setParams(skinConfData, appConfig);
                }
            });
        }
    });

    return skinConfContent;
}

// Get content of CSS files each skins (+ IE support)
function processCss(srcConf, basePath) { //(Object, String)->Object
    var cssContent = {};

    if (srcConf) {
        //browser here: "all" || "ie" from deps file
        Object.keys(srcConf).forEach(function (browser) {
            var browserCssList = srcConf[browser];

            browserCssList.forEach(function (pathToCssFile) {
                var srcPath = basePath + pathToCssFile;

                if (srcPath.indexOf(skinVar) > -1) {
                    var skinsPath = srcPath.split(skinVar),
                        skinsList = fs.readdirSync(skinsPath[0]);

                    skinsList.forEach(function (skin) {
                        var skinName = skin,
                            skinPath = skinsPath[0] + skinName + skinsPath[1];
                        if (fs.existsSync(skinPath)) {
                            getCssSource(skinPath, skinName, browser);
                        }
                    });
                } else {
                    getCssSource(srcPath, 'basic', browser);
                }
            });
        });
    }

    function getCssSource(path, name, browser) {
        var cssData = setParams(fs.readFileSync(path, 'utf8') + '\n', appConfig);
        cssContent[name] = cssContent[name] || {};
        cssContent[name][browser] = cssContent[name][browser] || {};
        cssContent[name][browser][path] = {source: cssData,
                                           sourcemin: minifyCSSPackage(cssData)};
    }

    return cssContent;
}

// Generate templates object for specified module
function setTemplates(moduleName) { //(string)->Object
    var tmplConf = config.tmpl,
        tmplPath = config.source.dg.path + moduleName + '/' + tmplConf.dir + '/',
        modulesTmpls = {};

    if (fs.existsSync(tmplPath)) {
        readTemplates(tmplPath, moduleName + tmplConf.varPostfix);
    }

    function readTemplates(tmplPath, varName) {

        var tmplList = grunt.file.expand([tmplPath + tmplConf.pattern]),
            tmpl = {};

        tmplList.forEach(function (template) {
            var srcPath = template,
                tmplName = path.basename(srcPath, tmplConf.ext),
                tmplContent = fs.readFileSync(srcPath, 'utf8');

                (tmplContent.length > 0) ? tmpl[tmplName] = tmplContent : tmpl[tmplName] = '';
        });

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

    extend(appConfig, modulesTmpls);
}

// Get content of source files all copyrights. Must run only 1 time on start app or run CLI script
function getCopyrightsData() { //()->String
    var source = config.js.copyrights,
        copyrights = '';

    source.forEach(function (src) {
        copyrights += fs.readFileSync(src, 'utf8') + '\n';
    });

    return copyrights;
}

// Generates a list of modules by pkg
function getModulesList(pkg, isMsg) { //(String|Null, Boolean)->Array
    var modulesListOrig = ['Core'],
        modulesListRes = [],
        loadedModules = {};

    // Package name with no empty modules list on packs.js (example: 'base')
    // Package name with no empty modules list on packs.js (example: 'base')
    if (pkg && pkg in packages && packages[pkg].modules.length > 0) {
        modulesListOrig = packages[pkg].modules;

    // Modules list (example: 'Core,JSONP,TileLayer')
    } else if (pkg && pkg.indexOf(',') > -1) {
        modulesListOrig = pkg.split(',');

    // Modules single (example: 'Core')
    } else if (pkg && pkg in modules) {
        modulesListOrig.push(pkg);

    // Others (null / full package / not correct value)
    } else {
        Object.keys(modules).forEach(function (mod) {
            modulesListOrig.push(mod);
        });
    }

    if (isMsg) {
        console.log('\nBuild modules:');
    }

    modulesListOrig.forEach(function (moduleName) {
        if (moduleName in modules) {
            processModule(moduleName);
        } else {
            if (isMsg) {
                console.log(errMsg('  - ' + moduleName + ' (not found)'));
                errors.push('Unknown modules');
            }
        }
    });

    function processModule(moduleName) {
        if (!loadedModules[moduleName]) {
            getDepsList(moduleName);
            modulesListRes.push(moduleName);
            loadedModules[moduleName] = true;
            if (isMsg) {
                console.log('  * ' + moduleName);
            }
        }
    }

    function getDepsList(moduleName) {
        if (modules[moduleName] && modules[moduleName].deps) {
            var moduleDeps = modules[moduleName].deps;
            moduleDeps.forEach(function (module) {
                var moduleNameDeps = module;
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
            });
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

    modulesList.forEach(function (moduleName) {
        var moduleData = modules[moduleName];

        if (moduleData && moduleData.js) {
            var moduleSrc = params.isDebug ? moduleData.js : moduleData.jsmin;
            countModules++;

            // Load skins config (if exist) before main module code
            if (moduleData.conf) {
                var moduleSkins = moduleData.conf;
                var loadSkinsList = [];

                if ('basic' in moduleSkins) {
                    loadSkinsList.push('basic');
                }

                if (skin in moduleSkins || defaultSkin in moduleSkins) {
                    moduleSkinName = (skin in moduleSkins) ? skin : defaultSkin;
                    loadSkinsList.push(moduleSkinName);
                }

                // process list of skins
                loadSkinsList.forEach(function (skin) {
                    moduleSkinName = skin;
                    moduleSkinId = moduleSkinName + ':' + moduleName;

                    if (!loadedFiles[moduleSkinId]) {
                        result += moduleSkins[moduleSkinName];
                        loadedFiles[moduleSkinId] = true;
                    }
                });
            }

            // Load main module code
            Object.keys(moduleSrc).forEach(function (file) {
                if (!loadedFiles[file]) {
                    result += moduleSrc[file];
                    loadedFiles[file] = true;
                }
            });
        }
    });

    if (isMsg) {
        console.log('\nConcatenating JS in ' + countModules + ' modules...\n');
    }

    return getCopyrightsData() + config.js.intro + result + config.js.outro;
}

// Generates CSS content
function makeCSSPackage(modulesList, params) { //(Array, Object)->String
    var loadedFiles = {},
        countModules = 0,
        result = '',
        moduleBrowser,
        skin = params.skin;

    modulesList.forEach(function (module) {
        var moduleName = module,
            moduleData = modules[moduleName];

        if (moduleData && moduleData.css) {
            var moduleSkins = moduleData.css;

            if ('basic' in moduleSkins) {
                moduleBrowser = moduleSkins.basic;
                processBrowsers(moduleBrowser);
                countModules++;
            }

            if (skin in moduleSkins || defaultSkin in moduleSkins) {
                var skinName = (skin in moduleSkins) ? skin : defaultSkin;
                moduleBrowser = moduleSkins[skinName];
                processBrowsers(moduleBrowser);
            }
        }
    });

    if (params.isMsg) {
        console.log('Concatenating CSS in ' + countModules + ' modules...\n');
    }

    function concatenateFiles(moduleSrc) {
        Object.keys(moduleSrc).forEach(function (file) {
            if (!loadedFiles[file]) {
                result += params.isDebug ? moduleSrc[file].source : moduleSrc[file].sourcemin;
                loadedFiles[file] = true;
            }
        });
    }

    function processCssByType(type) {
        if (type in moduleBrowser) {
            var moduleSrc = moduleBrowser[type];
            concatenateFiles(moduleSrc);
        }
    }

    function processBrowsers(moduleBrowser) {
        if (params.addClean) {
            processCssByType('all');
        }
        if (params.isIE) {
            processCssByType('ie');
        }
    }

    return getCopyrightsData() + result;
}

// Minify JS source files
function minifyJSPackage(source) { //(String)->String
    return uglify.minify(source, {
        warnings: false,
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
        localConfig;

    if (!fs.existsSync(mainConfigPath)) {
        throw new Error('File \'config.main.json\' was not found in ' + mainConfigPath);
    }

    mainConfig = JSON.parse(fs.readFileSync(mainConfigPath));
    if (fs.existsSync(localConfigPath)) {
        localConfig = JSON.parse(fs.readFileSync(localConfigPath));
        extend(mainConfig, localConfig);
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

// Update code version in loader.js (CLI command)
exports.setVersion =  function (done) {
    var loaderPath = config.loader.dir,
        loaderFileName = config.loader.name,
        command = 'git rev-parse --verify HEAD',
        hash;

    fs.exists(loaderPath + '/' + loaderFileName, function (exists) {

        if (!exists) { throw new Error('File \'loader.js\' was not found in ' + loaderPath); }
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

// Combine and minify source files (CLI command)
exports.buildSrc = function (isMsg) {
    var modulesList,
        jsSrcContent,
        jsMinContent,
        jsDest = config.js.public,
        jsDir = jsDest.dir,
        cssDest = config.css.public,
        cssDir = cssDest.dir,
        pkg = argv.mod || argv.pkg,
        skin;

    if (typeof isMsg === 'undefined') { isMsg = true; }

    modules = getModulesData();

    skin = argv.skin ? argv.skin : defaultSkin;

    if (isMsg) {
        console.log('Skin: ' + skin + '\n');
    }

    modulesList = getModulesList(pkg, isMsg);

    var packAndConcatCss = function (opt) {
        var cssSrcContent = makeCSSPackage(modulesList, extend(opt, {skin: skin, isMsg: isMsg, isDebug: true}));
        fs.writeFileSync(cssDest[opt.name], cssSrcContent);

        if (isMsg) {
            console.log('\nCompressing CSS...\n');
        }

        var cssMinContent = makeCSSPackage(modulesList, extend(opt, {skin: skin, isDebug: false}));
        fs.writeFileSync(cssDest[opt.name + '_min'], cssMinContent);

        if (isMsg) {
            console.log('   Uncompressed size: ' + (cssSrcContent.length / 1024).toFixed(1) + ' KB');
            console.log('   Compressed size:   ' + (cssMinContent.length / 1024).toFixed(1) + ' KB');
        }
    };

    jsSrcContent = makeJSPackage(modulesList, {skin: skin, isMsg: isMsg, isDebug: true});

    if (!fs.existsSync(jsDir)) {
        if (isMsg) {
            console.log('Creating ' + jsDir + ' dir...');
        }
        fs.mkdirSync(jsDir);
    }
    fs.writeFileSync(jsDest.src, jsSrcContent);

    if (isMsg) {
        console.log('Compressing JS...\n');
    }

    jsMinContent = makeJSPackage(modulesList, {skin: skin, isDebug: false});
    fs.writeFileSync(jsDest.min, jsMinContent);

    if (isMsg) {
        console.log('   Uncompressed size: ' + (jsSrcContent.length / 1024).toFixed(1) + ' KB');
        console.log('   Compressed size:   ' + (jsMinContent.length / 1024).toFixed(1) + ' KB');
    }

    if (!fs.existsSync(cssDir)) {
        if (isMsg) {
            console.log('Creating ' + cssDir + ' dir...');
        }
        fs.mkdirSync(cssDir);
    }
    packAndConcatCss({name: 'full', isIE: true, addClean: true});
    packAndConcatCss({name: 'clean', isIE: false, addClean: true});
    packAndConcatCss({name: 'ie', isIE: true, addClean: false});

    if (errors.length > 0) {
        console.log(errMsg('\nBuild ended with errors! [' + errors + ']'));
    } else {
        console.log(okMsg('\nBuild successfully completed!'));
    }
};

// Get params of app from config files (web app)
exports.getConfig = function () {
    return getAppConfig();
};

// Load content of all source files to memory (web app). Should be run once
exports.init = function () {
    modules = getModulesData();

    if (modules) {
        console.log(okMsg('Load source files successfully completed'));
    } else {
        console.log(errMsg('Load source files ended with errors!'));
    }
};

// Get JS content (web app)
exports.getJS = function (params, callback) { // (Object, Function)
    var modulesList, contentSrc;
    modulesList = getModulesList(params.mod || params.pkg);
    contentSrc = makeJSPackage(modulesList, params);
    callback(contentSrc);
};

// Get CSS content (web app)
exports.getCSS = function (params, callback) { // (Object, Function)
    var modulesList, contentSrc, options = {addClean: true, isMsg: false};
    modulesList = getModulesList(params.mod || params.pkg);
    contentSrc = makeCSSPackage(modulesList, extend(options, params));
    callback(contentSrc);
};
