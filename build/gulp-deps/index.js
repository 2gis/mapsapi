var fs = require('fs');

var init = function (config) {
    var source = config.source;
    var packages = config.packages;
    var modules = source.deps;
    var path = source.path;

    // Generates a list of modules by pkg
    function getModulesList(pkg) { //(String|Null)->Array
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

    return {
        getJSFiles: function (options) {
            options = options || {};

            return getModulesList(options.pkg)
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
                    return path + file;
                })
                ;
        },
        getCSSFiles: function (options) {
            options = options || {};

            var skin = options.skin || config.appConfig.DEFAULT_SKIN;

            return getModulesList(options.pkg)
                .map(function (name) {
                    return modules[name];
                })
                .map(function (module) {
                    return module[options.type || 'styl'];
                })
                .filter(Boolean)
                .reduce(function (array, item) {
                    var items = [];
                    if (!options.onlyIE && item.all) {
                        items.push(item.all);
                    }
                    if ((options.isIE || options.onlyIE) && item.ie) {
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
                    return path + file;
                })
                .filter(fs.existsSync)
                ;
        }
    };
};




if (typeof module !== 'undefined' && module.exports) {
    module.exports = init;
}