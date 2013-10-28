var deps = {

    DGCore: {
        desc: 'Main module',
        src: [
            'DGCore/DGCore.js',
            '../vendors/polyfills/json2.js'
        ],
        css: {
            all: [
                '../vendors/leaflet/dist/leaflet.css'
            ],
            ie: ['../vendors/leaflet/dist/leaflet.ie.css']
        },
        heading: '2GIS modules',
        deps: [ 'Core',
                'EPSG3395',
                'TileLayer',
                'TileLayerWMS',
                'TileLayerCanvas',
                'ImageOverlay',
                'Marker',
                'DivIcon',
                'Popup',
                'LayerGroup',
                'FeatureGroup',
                'Path',
                'PathVML',
                'PathCanvas',
                'Polyline',
                'Polygon',
                'MultiPoly',
                'Rectangle',
                'Circle',
                'CircleMarker',
                'VectorsCanvas',
                'GeoJSON',
                'MapDrag',
                'MouseZoom',
                'TouchZoom',
                'BoxZoom',
                'Keyboard',
                'MarkerDrag',
                'ControlZoom',
                'ControlAttrib',
                'ControlScale',
                'ControlLayers',
                'AnimationPan',
                'AnimationTimer',
                'AnimationZoom',
                'Geolocation']
    },

    DGWhen: {
        desc: 'Promise/Deffered object module',
        src: [ 'DGWhen/src/DGWhen.js' ],
        deps: ['DGCore']
    },

    DGAjax: {
        desc: '2GIS Ajax module',
        src: ['DGAjax/src/DGAjax.js'],
        deps: ['DGCore', 'DGWhen']
    },

    DGLabel: {
        desc: '2GIS Label module',
        src: [
            'DGLabel/src/DGLabel.js',
            'DGLabel/src/Marker.DGLabel.js',
            'DGLabel/src/Path.DGLabel.js'
        ],
        css: {
            all: ['DGLabel/skin/{skin}/css/DGLabel.css']
        },
        deps: ['DGCore']
    },

    DGWkt: {
        desc: 'WKT parser module.',
        src: ['DGWkt/Wkt.js',
              'DGWkt/DGWkt.js'
        ],
        deps: ['DGCore']
    },

    DGCustomization: {
        desc: 'LeafLet customization module',
        src: [
            'DGCustomization/skin/{skin}/theme.config.js',
            '../vendors/baron/baron.js',
            '../vendors/baron/js/bonzo.js',
            '../vendors/baron/js/bean.js',
            '../vendors/baron/js/qwery.js',
            'DGCustomization/src/DGCustomization.js',
            'DGCustomization/src/DGAttribution.js',
            'DGCustomization/src/DGPopup.js',
            'DGCustomization/src/DGZoom.js',
            'DGCustomization/lang/DGAttribution/ru.js',
            'DGCustomization/lang/DGAttribution/it.js',
            'DGCustomization/lang/DGAttribution/cs.js',
            'DGCustomization/lang/DGAttribution/en.js',
            'DGCustomization/lang/DGZoom/ru.js',
            'DGCustomization/lang/DGZoom/it.js',
            'DGCustomization/lang/DGZoom/cs.js',
            'DGCustomization/lang/DGZoom/en.js'
        ],
        css: {
            all: [
                'DGCustomization/skin/basic/css/leaflet-reset.css',
                '../vendors/baron/baron.css',
                'DGCustomization/skin/basic/css/zoom.css',
                'DGCustomization/skin/basic/css/callout.css',
                'DGCustomization/skin/basic/css/baron.css',
                'DGCustomization/skin/basic/css/marker.css',
                'DGCustomization/skin/{skin}/css/callout.css',
                'DGCustomization/skin/{skin}/css/baron.css'
            ],
            ie: [
                'DGCustomization/skin/basic/css/baron.ie.css',
                'DGCustomization/skin/basic/css/marker.ie.css'
            ]
        },
        deps: ['DGCore', 'DGLocale']
    },

    DGLocale: {
        desc: 'Localization module',
        src: ['DGLocale/src/DGDictionary.js', 'DGLocale/src/DGLocale.js'],
        deps: ['DGCore']
    },

    DGFullScreen: {
        desc: 'Full screen module',
        src: ['DGFullScreen/src/DGFullScreen.js',
              'DGFullScreen/lang/ru.js',
              'DGFullScreen/lang/it.js',
              'DGFullScreen/lang/cs.js',
              'DGFullScreen/lang/en.js'
        ],
        css: {
            all: ['DGFullScreen/skin/{skin}/css/DGFullScreen.css'],
            ie: ['DGFullScreen/skin/{skin}/css/DGFullScreen.ie.css']
        },
        deps: ['DGCore', 'DGLocale']
    },

    DGJsonp: {
        desc: 'JSONP module',
        src: ['DGJsonp/src/DGJsonp.js'],
        deps: ['DGCore']
    },

    DGTileLayer: {
        desc: '2GIS tile layer module',
        src: [
            'DGTileLayer/src/DGTileLayer.js'
        ],
        css: {
            all: ['DGTileLayer/skin/{skin}/css/style.css'],
            ie: ['DGTileLayer/skin/{skin}/css/ie.css']
        },
        deps: ['DGCore', 'DGTemplate', 'DGLocale']
    },

    DGProjectDetector: {
        desc: '2GIS project detector module.',
        src: ['DGProjectDetector/src/DGProjectDetector.js'],
        deps: ['DGCore', 'DGJsonp']
    },

    DGMeta: {
        desc: '2GIS POI & buildings data support module.',
        src: [
            'DGMeta/src/DGMeta.js',
            'DGMeta/src/storage/Storage.js',
            'DGMeta/src/storage/PoiStorage.js',
            'DGMeta/src/storage/BuildingStorage.js',
            'DGMeta/src/StorageHost.js',
            'DGMeta/src/PolyUtilContains.js'
        ],
        deps: ['DGAjax', 'DGCore', 'DGTileLayer', 'DGWkt']
    },

    DGPoi: {
        desc: '2GIS POI module.',
        src: ['DGPoi/src/DGPoi.js'],
        deps: ['DGMeta', 'DGLabel']
    },

    DGBuildings: {
        desc: '2GIS buildings module.',
        src: ['DGBuildings/src/DGBuildings.js'],
        deps: ['DGMeta']
    },

    DGGeoclicker: {
        desc: '2GIS Geoclicker.',
        css: {
            all: [
                'DGGeoclicker/skin/{skin}/css/DGGeoclicker.css',
                'DGGeoclicker/skin/{skin}/css/DGFirmCard.css',
                'DGGeoclicker/skin/basic/css/DGFirmCardThemeSetup.css',
                'DGGeoclicker/skin/{skin}/css/DGFirmCardThemeSetup.css'
            ]
        },
        src: [
            'DGGeoclicker/src/DGGeoclicker.js',
            'DGGeoclicker/src/provider/Provider.js',
            'DGGeoclicker/src/provider/CatalogApi.js',
            'DGGeoclicker/src/handler/Handler.js',
            'DGGeoclicker/src/handler/Default.js',
            'DGGeoclicker/src/handler/CityArea.js',
            'DGGeoclicker/src/handler/House.js',
            'DGGeoclicker/src/handler/House.View.js',
            'DGGeoclicker/src/handler/Sight.js',
            'DGGeoclicker/src/View.js',
            'DGGeoclicker/src/Controller.js',
            'DGGeoclicker/lang/it.js',
            'DGGeoclicker/lang/ru.js',
            'DGGeoclicker/lang/en.js',
            'DGGeoclicker/lang/cs.js',

            '../vendors/firmcard/src/FirmCard.js',
            '../vendors/firmcard/src/FirmCard.DataHelper.js',
            '../vendors/firmcard/src/FirmList.js',
            '../vendors/firmcard/src/vendors/underscore1.5.1.js',
            '../vendors/firmcard/src/vendors/momentjs/moment.min.js',
            '../vendors/firmcard/src/vendors/momentjs/lang/moment.ru.js',
            '../vendors/firmcard/src/vendors/momentjs/lang/moment.cs.js',
            '../vendors/firmcard/src/vendors/momentjs/lang/moment.it.js',
            '../vendors/firmcard/src/Schedule.js',
            '../vendors/firmcard/src/Dictionary.js',

        ],
        deps: ['DGJsonp', 'DGWhen', 'DGCore', 'DGTemplate', 'DGLocale', 'DGPoi']
    },

    DGTemplate: {
        desc: '2GIS Template',
        src: [
            'DGTemplate/src/DGTemplate.js'
        ]
    },

    DGEntrance: {
        desc: '2GIS Entrances.',
        src: [
            'DGEntrance/src/DGEntrance.js',
            'DGEntrance/src/PathAnimation.js',
            'DGEntrance/src/Arrow.js',
            'DGEntrance/src/ArrowSvg.js',
            'DGEntrance/src/ArrowVml.js',
            'DGEntrance/src/ArrowSvgAnimationOptions.js',
            'DGEntrance/src/EventHandler.js'
        ],
        deps: ['DGCore', 'DGWkt', 'DGProjectDetector']
    },

    DGLocation: {
        desc: 'Location control module',
        src: [
            'DGLocation/src/DGLocation.js',
            'DGLocation/lang/ru.js',
            'DGLocation/lang/it.js',
            'DGLocation/lang/en.js'
        ],
        css: {
            all: [
                'DGLocation/skin/{skin}/css/DGLocation.css'
            ],
        },
        deps: ['DGCore', 'DGLocale']
    }
};

if (typeof exports !== 'undefined') {
    exports.deps = deps;
}
