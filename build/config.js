/**
 * Build config
 */
var basePath = __dirname + '/..'; // Set root application path

var config = {

    mainAppConfig: basePath + '/config.main.json',
    localAppConfig: basePath + '/config.local.json',

    source: {
        leaflet: {
            deps: require(basePath + '/vendors/leaflet/build/deps.js').deps,
            path: basePath + '/vendors/leaflet/src/',
            pathImg: basePath + '/vendors/leaflet/dist/images/'
        },
        dg: {
            deps: require(basePath + '/build/deps.js').deps,
            path: basePath + '/src/'
        }
    },

    js: {
        public: {
            src: basePath + '/dist/dg-map-src.js',
            min: basePath + '/dist/dg-map.js'
        },
        custom: {
            src: basePath + '/dist/dg-map-custom-src.js',
            min: basePath + '/dist/dg-map-custom.js'
        },

        copyrights: [basePath + '/vendors/leaflet/src/copyright.js'],

        intro: '(function (window, document, undefined) {\n',
        outro: '}(this, document));\n'
    },

    css: {
        public: {
            src: basePath + '/dist/dg-map-src.css',
            min: basePath + '/dist/dg-map.css'
        },
        custom: {
            src: basePath + '/dist/dg-map-custom-src.css',
            min: basePath + '/dist/dg-map-custom.css'
        }
    },

    img: {
        pattern: '**/img/*',
        dest: basePath + '/public/img/',
        patternVendor: '*',
        destVendor: basePath + '/public/img/vendors'
    },

    skin: {
        dir: 'skin',
        var: '{skin}'
    },

    loader: {
        dir: basePath + '/public/',
        name: 'loader.js'
    }

};

exports.config = config;
