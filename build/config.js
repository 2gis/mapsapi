/**
 * Build config
 */
var config = {

    mainAppConfig: './config.main.json',
    localAppConfig: './config.local.json',

    source: {
        leaflet: {
            deps: require('../vendors/leaflet/build/deps.js').deps,
            path: './vendors/leaflet/src/'
        },
        dg: {
            deps: require('./deps.js').deps,
            path: './src/'
        }
    },

    js: {
        public: {
            src: './dist/dg-map-src.js',
            min: './dist/dg-map.js'
        },
        custom: {
            src: './dist/dg-map-custom-src.js',
            min: './dist/dg-map-custom.js'
        }
    },

    css: {
        public: {
            src: './dist/dg-map-src.css',
            min: './dist/dg-map.css'
        },
        custom: {
            src: './dist/dg-map-custom-src.css',
            min: './dist/dg-map-custom.css'
        }
    },

    img: {
        dir: 'img',
        dest: './public/img/'
    },

    skin: {
        var: '{skin}',
        dir: 'skin'
    },

    copyrights: ['./vendors/leaflet/src/copyright.js'],

    intro: '(function (window, document, undefined) {\n',
    outro: '}(this, document));\n'

};

exports.config = config;
