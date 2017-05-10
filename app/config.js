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

    coreModules: ['DGCore', 'DGCustomization', 'DGAjax']
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

config.mainConfig = getMainConfig();
config.localConfig = getLocalConfig();
config.appConfig = getAppConfig();

module.exports = config;
