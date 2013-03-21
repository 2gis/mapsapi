/**
 * Build config
 */
var config = {
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

    dest: {
        src: './dist/dg-map-src.js',
        min: './dist/dg-map.js'
    },

    copyrights: ['./vendors/leaflet/src/copyright.js'],

    intro: '(function (window, document, undefined) {\n',
    outro: '}(this, document));\n'
};

exports.config = config;
