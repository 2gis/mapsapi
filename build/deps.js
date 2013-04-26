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

    DGLayer: {
        desc: '2GIS Tile Layer module.',
        src: ['DGLayer/src/DGLayer.js'],
        css: {
            all: ['DGLayer/skin/{skin}/css/style.css']
        },
        deps: ['TileLayer', 'DGCore']
    },

    JSONP: {
        src: ['Jsonp/src/Jsonp.js'],
        desc: 'JSONP module.'
    },

    ProjectDetector: {
        desc: 'ProjectDetector module.',
        src: ['ProjectDetector/src/ProjectDetector.js'],
        deps: ['JSONP']
    },

    Localization: {
        desc: 'Localization module.',
        src: ['Localization/src/Localization.js']
    },

    DGControlZoom: {
        desc: '2GIS control zoom.',
        src: ['DGControlZoom/src/DGControlZoom.js'],
        css: {
            all: ['DGControlZoom/skin/{skin}/zoom.css']
        },
        deps: ['ControlZoom']
    },
    DGGeoclickerHandlers: {
        desc: '2GIS Geoclicker.',
        src: ['DGGeoclicker/src/GeoclickerHandlers.js']
    },
    DGGeoclickerHandlersManager: {
        desc: '2GIS Geoclicker.',
        src: ['DGGeoclicker/src/GeoclickerHandlersManager.js'],
        deps: ['DGGeoclickerHandlers']
    },
    DGGeoclicker: {
        desc: '2GIS Geoclicker.',
        src: ['DGGeoclicker/src/Geoclicker.js'],
        deps: ['JSONP', 'DGGeoclickerHandlersManager']
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
