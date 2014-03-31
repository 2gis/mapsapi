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

    /**
     * Build string with Less variables and imports
     *
     * @param {Object} options
     * @param {Object} options.variables Less variables, key is variable name and value is variable value
     * @param {Array} options.imports Imports array of strings, it is array because imports order matters
     * @param {String} options.imports[i] Path to file be imported. Supports specifying import type (inline, reference, less, css, etc.)
     *                                    using format: './path/to/file:importType', for example: './mixins/basic.less:reference',
     *                                    by default less type is used
     *
     * @returns {String} Variables and imports definitions, splitted by '\n'
     */
    function lessHeader(options) {
        options = options || {};

        var header = '';

        if (options.variables) {
            for (var varableName in options.variables) {
                header = header + '\n' +
                    '@' + varableName + ': ' + options.variables[varableName] + ';';
            }
        }

        var importsBase = '';

        if (typeof options.importsBase == 'string' && options.importsBase.length) {
            importsBase = options.importsBase.replace(/\/*$/, '/');
        }

        if (options.imports) {
            for (var i = 0, type = '', path = ''; i < options.imports.length; i += 1) {
                type = options.imports[i].replace(/^.*:/, '');
                path = options.imports[i].replace(/:.*$/, '');

                header = header + '\n' +
                    '@import (' + type + ') \'' + importsBase + path + '\';';
            }
        }

        return header;
    }

    function getCSSFiles(options) {
        options = options || {};

        var skin = options.skin || config.appConfig.DEFAULT_SKIN;

        return getModulesList(options.pkg)
            .map(function (name) {
                return modules[name];
            })
            .map(function (module) {
                return module[options.type || 'less'];
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

    function getImagesList(options) {
        var lessList = getCSSFiles(options),
            lessPrerequirements = lessHeader({
                variables: {
                    canUseSVG: !(options.sprite === 'true' || tasks.util.env.sprite),

                    baseURL: '"__BASE_URL__"',
                    analyticsBaseURL: '"http://maps.api.2gis.ru/analytics/"',

                    isModernBrowser: options.includeModernBrowsers,
                    isIE: options.includeIE
                },
                imports: [
                    './build/tmp/less/sprite.basic.less:reference',
                    './build/tmp/less/sprite.' + skin + '.less:reference',
                    'mixins.less: reference',
                    'mixins.ie.less: reference',
                    'sprite.basic@2x.less:reference',
                    'sprite.' + skin + '@2x.less:reference'
                ]
            });
    }

    function getRepeatableImages() {

    }

    function getNoRepeatableImages() {

    }

    return {
        getModulesList: getModulesList,

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
        getCSSFiles: getCSSFiles,

        lessHeader: lessHeader
    };
};




if (typeof module !== 'undefined' && module.exports) {
    module.exports = init;
}
