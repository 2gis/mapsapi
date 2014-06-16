var fs = require('fs'),
    glob = require('glob'),
    path = require('path');

var init = function (config) {
    var packages = config.packages;

    // Generates a list of modules by pkg
    function getModulesList(pkg, modules) { //(String|Null)->Array
        modules = modules || config.source.deps;
        var modulesListOrig = [],
            modulesListRes = [],
            loadedModules = {};

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
            modulesListOrig = modulesListOrig.concat(Object.keys(modules));
        }

        function processModule(name) {
            var module = modules[name];
            if (module && module.deps) {
                module.deps.forEach(processModule);
            }
            if (!loadedModules[name]) {
                modulesListRes.push(name);
                loadedModules[name] = true;
            }
        }

        modulesListOrig.forEach(processModule);

        return modulesListRes;
    }

    function getJSFiles(options) {
        options = options || {};
        var source = config[options.source || 'source'],
            modules = source.deps,
            sourcePath = source.path;

        return getModulesList(options.pkg, modules)
            .map(function (name) {
                return modules[name];
            })
            .map(function (module) {
                return module.src;
            })
            .reduce(function (array, items) {
                return array.concat(items);
            })
            .filter(function (item, key, list) {//filter dublicates
                return list.indexOf(item) === key;
            })
            .map(function (file) {
                return sourcePath + file;
            })
            ;
    }

    function getCSSFiles(options) {
        options = options || {};
        var source = config[options.source || 'source'],
            modules = source.deps,
            sourcePath = source.path,
            skin = options.skin || config.appConfig.DEFAULT_SKIN;

        return getModulesList(options.pkg, modules)
            .map(function (name) {
                return modules[name];
            })
            .map(function (module) {
                return module[options.type || 'less'];
            })
            .filter(Boolean)
            .reduce(function (array, item) {
                var items = [];

                if (!options.excludeBaseCss && item.all) {
                    items.push(item.all);
                }

                if (options.ie8 && item.ie) {
                    items.push(item.ie);
                }

                return array.concat(items);
            }, [])
            .reduce(function (array, items) {
                return array.concat(items);
            })
            .reduce(function (array, item) {//if css have skin, we add basic theme
                if (item.indexOf('{skin}') > -1) {
                    array.push(item.replace('{skin}', 'basic'));
                }
                return array.concat(item);
            }, [])
            .map(function (file) {//add selected theme
                return file.replace('{skin}', skin);
            })
            .map(function (file) {
                return sourcePath + file;
            })
            .filter(fs.existsSync)
            ;
    }

    // Build string with Less variables and imports
    function lessHeader(options) {
        options = options || {};

        var header = '';

        if (options.variables) {
            Object.keys(options.variables).forEach(function (varableName) {
                header = header + '\n' +
                    '@' + varableName + ': ' + options.variables[varableName] + ';';
            });
        }

        var importsBase = '';

        if (typeof options.importsBase === 'string' && options.importsBase.length) {
            importsBase = options.importsBase.replace(/\/*$/, '/');
        }

        if (options.imports) {
            for (var i = 0, type = '', imoportPath = ''; i < options.imports.length; i += 1) {
                type = options.imports[i].replace(/^.*:/, '');
                imoportPath = options.imports[i].replace(/:.*$/, '');

                header = header + '\n' +
                    '@import (' + type + ') \'' + importsBase + imoportPath + '\';';
            }
        }

        return header;
    }

    // Scans the project for skins directories to get skins names
    function getSkinsList() {
        var skinsDirectories = glob.sync(__dirname + '/../src/**/skin/*'),
            skins = [];

        skinsDirectories.forEach(function (directory) {
            var skinName = path.basename(directory);

            if (skins.indexOf(skinName) === -1) {
                skins.push(skinName);
            }
        });

        return skins;
    }

    // Gets images per skin formats statistics
    function getImagesFilesStats(skins) {
        skins = skins || getSkinsList();

        var perSkinStats = {};

        skins.forEach(function (skinName) {
            var imagesPaths = glob.sync(__dirname + '/../build/tmp/img/' + skinName + '/*'),
                skinStats = {};

            imagesPaths.forEach(function (imagePath) {
                var basename = path.basename(imagePath),
                    extname = path.extname(imagePath),

                    name = path.basename(imagePath, extname);

                if (!(name in skinStats)) {
                    skinStats[name] = {};
                }

                if (extname === '.svg') {
                    skinStats[name].hasVectorVersion = true;
                }
                else {
                    skinStats[name].extension = extname.replace('.', '');
                }
            });

            perSkinStats[skinName] = skinStats;
        });

        return perSkinStats;
    }

    // Analyzes Less, gets images usage statistics per skin
    function getImagesUsageStats(skins) {
        skins = skins || getSkinsList();

        var perSkinStats = {};

        skins.forEach(function (skinName) {
            var stats = {},

                statsFilePath = __dirname + '/tmp/less/images-usage-statistics.' + skinName + '.less',
                statsFileContent = fs.readFileSync(statsFilePath).toString(),
                preparedStatsFileContent = statsFileContent.slice(6).replace(/\;/g, ','), // 6 is 'stats '.length

                rawStats = (new Function('return ' + preparedStatsFileContent))();

            stats.repeatable = rawStats.repeatable.split(',');
            stats.noRepeatableSprited = rawStats.noRepeatableSprited.split(',');
            stats.noRepeatableNotSprited = rawStats.noRepeatableNotSprited.split(',');
            // Repeatable images can be used as no-repeatable images,
            // so we should exclude repeatable images from no-repeatable images list
            stats.noRepeatableSprited = rawStats.noRepeatableSprited.split(',').filter(function (name) {
                return stats.repeatable.indexOf(name) === -1;
            });

            perSkinStats[skinName] = stats;
        });

        return perSkinStats;
    }

    return {
        getModulesList: getModulesList,

        getJSFiles: getJSFiles,
        getCSSFiles: getCSSFiles,

        lessHeader: lessHeader,

        getSkinsList: getSkinsList,

        getImagesFilesStats: getImagesFilesStats,
        getImagesUsageStats: getImagesUsageStats
    };
};


if (typeof module !== 'undefined' && module.exports) {
    module.exports = init;
}
