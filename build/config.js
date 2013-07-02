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
            src: basePath + '/public/js/dg-map-src.js',
            min: basePath + '/public/js/dg-map.js'
        },
        custom: {
            src: basePath + '/public/js/dg-map-custom-src.js',
            min: basePath + '/public/js/dg-map-custom.js'
        },

        copyrights: [basePath + '/vendors/leaflet/src/copyright.js'],

        intro: '(function (window, document, undefined) {\n',
        outro: '}(this, document));\n'
    },

    css: {
        public: {
            src: basePath + '/public/css/dg-map-src.css',
            min: basePath + '/public/css/dg-map.css'
        },
        custom: {
            src: basePath + '/public/css/dg-map-custom-src.css',
            min: basePath + '/public/css/dg-map-custom.css'
        }
    },

    tmpl: {
        dir: 'templates',
        pattern: '*.tmpl',
        ext: '.tmpl',
        varPostfix: '_TMPL'
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
