/**
 * Build config
 */
var fs = require('fs');
var _ = require('lodash');
var basePath = __dirname + '/..'; // Set root application path

var config = {
    mainAppConfig: basePath + '/config.main.json',
    localAppConfig: basePath + '/config.local.json',

    packages: require(basePath + '/gulp/deps/packs.js'),

    skins: ['dark', 'light'],

    source: {
        deps: require(basePath + '/gulp/deps/deps.js'),
        path: basePath + '/src/'
    },

    testSource: {
        deps: require(basePath + '/gulp/deps/deps.js'),
        path: basePath + '/gulp/tmp/testJS/src/'
    },

    leaflet: {
        deps: require(basePath + '/node_modules/leaflet/build/deps.js').deps,
        path: basePath + '/node_modules/leaflet/src/'
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
        output: './dist/doc'
    },

    copyright: fs.readFileSync('./src/copyright.js'),

    coreModules: ['Leaflet', 'DGCore', 'DGCustomization']
};

function getMainConfig() {
    return require(config.mainAppConfig);
}

function getLocalConfig() {
    try {
        return require(config.localAppConfig);
    } catch (e) {
        return {};
    }
}

function getAppConfig() {
    return _.assign({}, getMainConfig(), getLocalConfig());
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

config.mainConfig = getMainConfig();
config.localConfig = getLocalConfig();
config.appConfig = getAppConfig();

config.updateLoaderVersion = updateLoaderVersion;

module.exports = config;
