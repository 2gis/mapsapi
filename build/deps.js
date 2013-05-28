var deps = {

    DGCore: {
        desc: 'Main DG module.',
        src: [
            'DGCore/skin/{skin}/theme.config.js',
            'DGCore/DGCore.js'
        ],
        css: {
            all: [
                '../vendors/leaflet/dist/leaflet.css',
                'DGCore/skin/basic/css/leaflet-reset.css',
                'DGCore/skin/{skin}/css/zoom.css',
                'DGCore/skin/{skin}/css/callout.css',
                'DGCore/skin/{skin}/css/marker.css'
            ],
            ie: ['../vendors/leaflet/dist/leaflet.ie.css']
        },
        heading: '2GIS modules',
        deps: ['DGDivIcon']
    },

    DGTileLayer: {
        desc: '2GIS Tile Layer module.',
        src: ['DGTileLayer/src/DGTileLayer.js'],
        css: {
            all: ['DGTileLayer/skin/{skin}/css/style.css']
        },
        deps: ['TileLayer', 'DGCore']
    },

    DGJsonp: {
        src: ['DGJsonp/src/DGJsonp.js'],
        desc: 'JSONP module.'
    },

    DGProjectDetector: {
        desc: 'DGProjectDetector module.',
        src: ['DGProjectDetector/src/DGProjectDetector.js'],
        deps: ['DGJsonp']
    },

    DGLocale: {
        desc: 'Localization module.',
        src: ['DGLocale/src/DGLocale.js']
    },

    DGGeoclicker: {
        desc: '2GIS Geoclicker.',
        src: [
            'DGGeoclicker/src/DGGeoclicker.js',
            'DGGeoclicker/src/lib/GeoCoder.js',
            'DGGeoclicker/src/handlers/default.js',
            'DGGeoclicker/src/lib/Controller.js',
            'DGGeoclicker/src/lib/MapHandler.js'
        ],
        deps: ['JSONP']
    },

    DGDivIcon: {
        desc: 'DG.DivIcon module.',
        src: ['DGDivIcon/src/DGDivIcon.js'],
        deps: ['DivIcon']

    }

};

if (typeof exports !== 'undefined') {
    exports.deps = deps;
}
