var fs = require('fs');

var init = function (config) {
    var source = config.source;
    var packages = config.packages;
    var modules = addBasePath(
        Object.keys(source)
            .map(function (creator) {//adding proper path to every module
                var pack = source[creator].deps;
                return Object.keys(pack).reduce(function (obj, name) {
                    pack[name].path = source[creator].path;
                    obj[name] = pack[name];
                    return obj;
                }, {});
            })
            .reduce(function (obj, pack) {
                Object.keys(pack).forEach(function (module) {
                    obj[module] = pack[module];
                });
                return obj;
            }, {})
        );

    function addBasePath (modules) {//adding base path on every file
        return Object.keys(modules)
            .map(function (name) {
                var module = modules[name],
                    path = module.path;
                module.name = name;
                module.js = module.js || module.src;

                function addPath (file) {
                    return path + file;
                };

                module.js = module.js.map(addPath);

                var css = module.css;
                if (css) {//if module has css we iterate in all his supported browsers and add path
                    module.css = Object.keys(css)
                        .reduce(function (obj, browser) {
                            obj[browser] = css[browser].map(addPath);
                            return obj;
                        }, {})
                }
                return module;
            })
            .reduce(function (obj, module) {
                obj[module.name] = module;
                return obj;
            }, {})
            ;
    }

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

        modulesListOrig.forEach(processModule);

        function processModule(moduleNameDeps) {
            if (modules[moduleNameDeps] && modules[moduleNameDeps].deps) {
                getDepsList(moduleNameDeps);
            }
            if (!loadedModules[moduleNameDeps]) {
                modulesListRes.push(moduleNameDeps);
                loadedModules[moduleNameDeps] = true;
            }
        }

        function getDepsList(moduleName) {
            var moduleDeps = modules[moduleName].deps;
            if (moduleDeps) {
                moduleDeps.forEach(processModule);
            }
        }

        return modulesListRes;
    }

    return {
        getJSFiles: function (pkg) {
            return getModulesList(pkg)
                .map(function (name) {
                    return modules[name];
                })
                .map(function (module) {
                    return module.js;
                })
                .reduce(function (array, items) {
                    return array.concat(items);
                })
                .filter(function (item, key, list) {//filter dublicates
                    return list.indexOf(item) === key;
                })
                ;
        },
        getCSSFiles: function (pkg, IE) {
            return getModulesList(pkg)
                .map(function (name) {
                    return modules[name];
                })
                .map(function (module) {
                    return module.css;
                })
                .filter(Boolean)
                .map(function (item) {
                    return item.all;
                })
                .reduce(function (array, items) {
                    return array.concat(items);
                })
                .reduce(function (array, item) {
                    if (item.indexOf('{skin}') > -1) {
                        array.push(item.replace('{skin}', 'basic'));
                    }
                    return array.concat(item);
                }, [])
                .map(function (file) {
                    return file.replace('{skin}', 'light');
                })
                .filter(fs.existsSync)
                ;
        }
    };
};




if (typeof module !== 'undefined' && module.exports) {
    module.exports = init;
}