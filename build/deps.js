var deps = {

    DGCore: {
        desc: 'Main DG module.',
        src: [
            'DGCore/DGCore.js'
        ],
        heading: '2GIS modules'
    },

    DGCustomization: {
        desc: 'Customization DG module.',
        src: [
            'DGCustomization/skin/{skin}/theme.config.js',
            'DGCustomization/DGCustomization.js'
        ],
        css: {
            all: [
                '../vendors/leaflet/dist/leaflet.css',
                'DGCustomization/skin/basic/css/leaflet-reset.css',
                'DGCustomization/skin/{skin}/css/zoom.css',
                'DGCustomization/skin/{skin}/css/callout.css',
                'DGCustomization/skin/{skin}/css/marker.css'
            ],
            ie: ['../vendors/leaflet/dist/leaflet.ie.css']
        },
        deps: ['DGDivIcon', 'DGCore']
    },



    DGFullScreen: {
        desc: 'Full screen module.',
        src: ['DGFullScreen/src/DGFullScreen.js',
              'DGFullScreen/lang/ru.js',
              'DGFullScreen/lang/it.js'
        ],
        css: {
            all: ['DGFullScreen/skin/{skin}/css/DGFullScreen.css']
        },
        deps: ['DGLocale', 'DGCore']
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
        desc: 'JSONP module.',
        deps: ['DGCore']
    },

    DGProjectDetector: {
        desc: 'DGProjectDetector module.',
        src: ['DGProjectDetector/src/DGProjectDetector.js'],
        deps: ['DGJsonp', 'DGCore']
    },

    DGLocale: {
        desc: 'Localization module.',
        src: ['DGLocale/src/DGDictionary.js', 'DGLocale/src/DGLocale.js'],
        deps: ['DGCore']
    },

    DGDivIcon: {
        desc: 'DG.DivIcon module.',
        src: ['DGDivIcon/src/DGDivIcon.js'],
        deps: ['DivIcon', 'DGCore']

    }

};

if (typeof exports !== 'undefined') {
    exports.deps = deps;
}
