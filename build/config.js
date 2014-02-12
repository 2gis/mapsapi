/**
 * Build config
 */
var fs = require('fs');
var extend = require('extend');
var basePath = __dirname + '/..'; // Set root application path

var config = {

    mainAppConfig: basePath + '/config.main.json',
    localAppConfig: basePath + '/config.local.json',

    packages: require(basePath + '/build/packs.js'),

    source: {
        deps: require(basePath + '/build/deps.js'),
        path: basePath + '/src/'
    },

    js: {
        intro: '(function (window, document, undefined) {\n',
        dustdebug: 'dust.debugLevel = \'ERROR\';\n',
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
        input: './src/',
        output: './public/doc'
    },

    copyright: fs.readFileSync('./src/copyright.js')
};

config.appConfig = getAppConfig();
config.cfgParams = cgfToFrep(config.appConfig);
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
        extend(mainConfig, localConfig);
    }
    return mainConfig;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}

function cgfToFrep(config) {
    return Object.keys(config).map(function (key) {
        return {
            pattern: new RegExp('__' + key + '__', 'g'),
            replacement: config[key]
        };
    });
}

function updateLoaderVersion(done) {
    var loaderPath = config.loader.dir,
        loaderFileName = config.loader.name,
        version = require('../package.json').version;

    fs.readFile(loaderPath + '/' + loaderFileName, {encoding: 'utf8'}, function (err, loaderContent) {
        if (err) { throw err; }

        console.log('Set version of stat files: ' + version);

        loaderContent = loaderContent.replace(/(version\s*=\s*['"]{1})()*.*(['"]{1})/g, '$1$2' + 'v' + version + '$3');
        fs.writeFile(loaderPath + '/' + loaderFileName, loaderContent, function () {
            done();
        });
    });
}
