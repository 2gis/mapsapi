/**
 * Build config
 */
var fs = require('fs');
var extend = require('extend');
var basePath = __dirname + '/..'; // Set root application path
var toFrep, toFrepSsl;

var config = {

    mainAppConfig: basePath + '/config.main.json',
    localAppConfig: basePath + '/config.local.json',

    packages: require(basePath + '/build/packs.js'),

    relativeUrl: 'RELATIVE_URL',

    source: {
        deps: require(basePath + '/build/deps.js'),
        path: basePath + '/src/'
    },

    leaflet: {
        deps: require(basePath + '/vendors/leaflet/build/deps.js').deps,
        path: basePath + '/vendors/leaflet/src/'
    },

    js: {
        intro: '(function (window, document, undefined) {\n',
        outro: '}(this, document));\n'
    },

    tmpl: {
        dir: 'templates',
        pattern: '*.dust',
        ext: '.dust',
        varPostfix: '_TMPL'
    },

    doc: {
        menu: './src/menu.json',
        input: './src/doc/',
        output: './public/doc'
    },

    copyright: fs.readFileSync('./src/copyright.js')
};

config.appConfig = getAppConfig();

toFrep = cgfToFrep(config.appConfig);
toFrepSsl = cgfToFrep(config.appConfig, true);

config.cfgParams = cfgParams;
config.updateLoaderVersion = updateLoaderVersion;

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
        extend(true, mainConfig, localConfig);
    }
    return mainConfig;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}

function cgfToFrep(appConfig, enableSsl) {
    var result = [],
        appConfigRelativeUrl = appConfig[config.relativeUrl],
        protocol = enableSsl ? 'https:' : 'http:';

    Object.keys(appConfig).forEach(function (key) {
        if (key !== config.relativeUrl) {
            result.push({
                pattern: new RegExp('__' + key + '__', 'g'),
                replacement: appConfig[key]
            });
        }
    });

    if (appConfigRelativeUrl !== undefined) {
        Object.keys(appConfigRelativeUrl).forEach(function (key) {
            result.push ({
                pattern: new RegExp('__' + key + '__', 'g'),
                replacement: protocol + appConfigRelativeUrl[key]
            });
        });
    }

    return result;
}

function cfgParams(options) {
    options = options || {};

    if (options.ssl) {
        return toFrepSsl;
    } else {
        return toFrep;
    }
}

function updateLoaderVersion(done) {
    var loaderPath = config.loader.dir,
        loaderFileName = config.loader.name,
        version = require('../package.json').version;

    fs.readFile(loaderPath + '/' + loaderFileName, {encoding: 'utf8'}, function (err, loaderContent) {
        if (err) { throw err; }

        console.log('Set version of stat files: ' + version);

        loaderContent = loaderContent.replace(/(version\s*=\s*['"]{1})()*.*(['"]{1})/g, '$1$2' + 'v' + version + '$3');
        fs.writeFile(loaderPath + '/' + loaderFileName, loaderContent, done);
    });
}
