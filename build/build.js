var fs = require('fs'),
    watch = require('watch');

var config = require('./config.js').config,
    packages = require('./packages.js').packages;

var modules,
    copyrights;

/**
 * Get content of all modules
 * Must run 1 time on start app or run cli script
 *
 * @param {Object} params
 * @returns {Object}
 */
function getModulesContent(params) {
    var modules = {};

    for (vendor in params) {
        if (params.hasOwnProperty(vendor)) {
            var deps = params[vendor].deps,
                path = params[vendor].path;

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
 * Must run 1 time on start app or run cli script
 *
 * @param {Object} params
 * @returns {String}
 */
function getCopyrightsContent(params) {
    var copyright = '';

    for (var i = 0, count = params.length; i < count; i++) {
        copyright += fs.readFileSync(params[i], 'utf8') + '\n';
    }

    return copyright;
}


/**
 * Generates a list of modules by build name
 *
 * @param {String|Null} build
 * @returns {Array}
 */
function parcePackageName(build) {
    var modulesList = [];

    if (build && packages.hasOwnProperty(build) && packages[build].modules.length > 1) {
        modulesList = packages[build].modules;
    } else if (build && (modules.hasOwnProperty(build) || build.indexOf(',') > 0)) {
        modulesList = build.split(',');
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
 * @param {Array} build
 * @param {Boolean} isCli
 * @returns {String}
 */
function makePackage(build, isCli) {
    var modulesResult = '',
        loadModules = {},
        modulesList = parcePackageName(build);

    for (var i = 0, count = modulesList.length; i < count; i++) {
        var moduleName = modulesList[i];
        var moduleContent = modules[moduleName];

        if (isCli) {
            console.log('  * ' + moduleName);
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

    if (isCli) {
        console.log('Concatenating ' + modulesList.length + ' files...');
    }

    return copyrights + config.intro + modulesResult + config.outro;
}

/**
 * Write file to disc
 *
 * @param {String} path
 * @param {String} content
 */
function writeFile(path, content) {
    fs.writeFile(path, content, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
}


/**
 * Init (on start app)
 */
exports.init = function() {
    modules = getModulesContent(config.source);
    copyrights = getCopyrightsContent(config.copyrights);
};

/**
 * Get content (on request app)
 */
exports.get = function(build) {
   return makePackage(build);
};

/**
 * Build (on run cli script)
 */
exports.build = function(build) {
    modules = getModulesContent(config.source);
    copyrights = getCopyrightsContent(config.copyrights);
    var content = makePackage(build, true);
    writeFile(config.dest.path, content);
};

/**
 * Watch (on develop mode)
 */
exports.watch = function () {
    watch.watchTree(__dirname + '/../src', function (f, curr, prev) {
        console.log('Rebuild dist');
    });
};

exports.test = function () {
    console.log('Run tests');
};




exports.build();