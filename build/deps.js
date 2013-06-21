var deps = {

    DGCore: {
        desc: 'Main module',
        src: [
            'DGCore/DGCore.js'
        ],
        css: {
            all: ['../vendors/leaflet/dist/leaflet.css'],
            ie: ['../vendors/leaflet/dist/leaflet.ie.css']
        },
        heading: '2GIS modules',
        deps: ['Core', 'TileLayer', 'ControlLayers', 'ControlZoom', 'Popup', 'MapDrag', 'ControlAttrib', 'Marker', 'DivIcon']
    },

    DGDivIcon: {
        desc: '2GIS DivIcon module',
        src: ['DGDivIcon/src/DGDivIcon.js'],
        deps: ['DGCore']
    },

    DGWicket: {
        desc: 'WKT parser module.',
        src: ['DGWicket/DGWicket.js',
              'DGWicket/wicket-leaflet.js'
        ],
        deps: ['DGCore']
    },

    DGCustomization: {
        desc: 'LeafLet customization module',
        src: [
            'DGCustomization/skin/{skin}/theme.config.js',
            'DGCustomization/DGCustomization.js'
        ],
        css: {
            all: [
                'DGCustomization/skin/basic/css/leaflet-reset.css',
                'DGCustomization/skin/{skin}/css/zoom.css',
                'DGCustomization/skin/{skin}/css/callout.css',
                'DGCustomization/skin/{skin}/css/marker.css'
            ]
        },
        deps: ['DGCore', 'DGDivIcon', 'DGWicket']
    },

    DGFullScreen: {
        desc: 'Full screen module',
        src: ['DGFullScreen/src/DGFullScreen.js',
              'DGFullScreen/lang/ru.js',
              'DGFullScreen/lang/it.js'
        ],
        css: {
            all: ['DGFullScreen/skin/{skin}/css/DGFullScreen.css']
        },
        deps: ['DGCore', 'DGLocale']
    },

    DGTileLayer: {
        desc: '2GIS tile layer module',
        src: ['DGTileLayer/src/DGTileLayer.js'],
        css: {
            all: ['DGTileLayer/skin/{skin}/css/style.css']
        },
        deps: ['DGCore']
    },

    DGJsonp: {
        desc: 'JSONP module',
        src: ['DGJsonp/src/DGJsonp.js'],
        deps: ['DGCore']
    },

    DGProjectDetector: {
        desc: '2GIS project detector module.',
        src: ['DGProjectDetector/src/DGProjectDetector.js'],
        deps: ['DGCore', 'DGJsonp']
    },

    DGLocale: {
        desc: 'Localization module',
        src: ['DGLocale/src/DGDictionary.js', 'DGLocale/src/DGLocale.js'],
        deps: ['DGCore']
    },

    DGGeoclicker: {
        desc: '2GIS Geoclicker.',
        src: [
            'DGGeoclicker/src/DGGeoclicker.js',
            'DGGeoclicker/src/provider/Provider.js',
            'DGGeoclicker/src/provider/CatalogApi.js',
            'DGGeoclicker/src/handler/Handler.js',
            'DGGeoclicker/src/handler/Default.js',
            'DGGeoclicker/src/lang/it/handler/Default.js',
            'DGGeoclicker/src/lang/ru/handler/Default.js',
            'DGGeoclicker/src/handler/House.js',
            'DGGeoclicker/src/lang/it/handler/House.js',
            'DGGeoclicker/src/lang/ru/handler/House.js',
            'DGGeoclicker/src/View.js',
            'DGGeoclicker/src/Controller.js'
        ],
        deps: ['DGJsonp', 'DGCore']
    }
};

if (typeof exports !== 'undefined') {
    exports.deps = deps;
}
