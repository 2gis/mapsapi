var deps = {

    DGCore: {
        desc: 'Main module',
        src: [
            '../vendors/polyfills/json2.js',
            '../vendors/polyfills/html5shiv.js',
            '../vendors/polyfills/es5.js',
            'DGCore/src/DGCore.js',
            'DGCore/src/DGplugin.js',
            'DGCore/src/DGthen.js'
        ],
        css: {
            all: ['../vendors/leaflet/dist/leaflet.css']
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
                'ControlAttrib',
                'ControlZoom',
                'ControlScale',
                'ControlLayers',
                'AnimationPan',
                'AnimationTimer',
                'AnimationZoom',
                'Geolocation',
                'DGWhen']
    },

    DGWhen: {
        desc: 'Promise/Deffered object module',
        src: [
            'DGWhen/src/DGCore.js',
            'DGWhen/src/DGWhen.js'
        ]
    },

    DGAjax: {
        desc: '2GIS Ajax module',
        src: ['DGAjax/src/DGAjax.js'],
        deps: ['DGCore']
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
        desc: 'WKT parser module',
        src: [
            'DGWkt/Wkt.js',
            'DGWkt/DGWkt.js'
        ],
        deps: ['DGCore']
    },

    DGCustomization: {
        desc: 'LeafLet customization module',
        src: [
            'DGCustomization/skin/basic/skin.config.js',
            '../vendors/baron/baron.js',
            '../vendors/baron/js/bonzo.js',
            '../vendors/baron/js/bean.js',
            '../vendors/baron/js/qwery.js',
            'DGCustomization/src/DGCustomization.js',
            'DGCustomization/src/DGPopup.js',
            'DGCustomization/src/DGZoom.js',
            'DGCustomization/lang/DGZoom/ru.js',
            'DGCustomization/lang/DGZoom/it.js',
            'DGCustomization/lang/DGZoom/cs.js',
            'DGCustomization/lang/DGZoom/en.js'
        ],
        css: {
            all: [
                'DGCustomization/skin/basic/css/leaflet-reset.css',
                '../vendors/baron/baron.css',
                'DGCustomization/skin/{skin}/css/zoom.css',
                'DGCustomization/skin/{skin}/css/baron.css',
                'DGCustomization/skin/{skin}/css/marker.css',
                'DGCustomization/skin/{skin}/css/callout.css',
                'DGCustomization/skin/{skin}/css/baron.css'
            ],
            ie: [
                'DGCustomization/skin/{skin}/css/baron.ie.css',
                'DGCustomization/skin/{skin}/css/callout.ie.css',
                'DGCustomization/skin/{skin}/css/zoom.ie.css',
                'DGCustomization/skin/{skin}/css/marker.ie.css'
            ]
        },
        deps: ['DGCore', 'DGLocale', 'DGRoundControl']
    },

    DGAttribution: {
        desc: '2GIS copyright',
        src: [
            'DGAttribution/src/DGAttribution.js',
            'DGAttribution/lang/ru.js',
            'DGAttribution/lang/it.js',
            'DGAttribution/lang/cs.js',
            'DGAttribution/lang/en.js'
        ],
        css: {
            all: ['DGAttribution/skin/{skin}/css/DGAttribution.css'],
            ie: ['DGAttribution/skin/{skin}/css/DGAttribution.ie.css']
        },
        deps: ['DGCore', 'DGTemplate', 'DGLocale']
    },

    DGLocale: {
        desc: 'Localization module',
        src: [
            'DGLocale/src/DGDictionary.js',
            'DGLocale/src/DGLocale.js'
        ],
        deps: ['DGCore']
    },

    DGLocation: {
        desc: 'Location control module',
        src: [
            'DGLocation/src/DGLocation.js',
            'DGLocation/lang/ru.js',
            'DGLocation/lang/it.js',
            'DGLocation/lang/cs.js',
            'DGLocation/lang/en.js'
        ],
        css: {
            all: ['DGLocation/skin/{skin}/css/DGLocation.css']
        },
        deps: ['DGCore', 'DGLocale', 'DGLabel', 'DGRoundControl']
    },

    DGFullScreen: {
        desc: 'Full screen module',
        src: [
            'DGFullScreen/src/DGFullScreen.js',
            'DGFullScreen/lang/ru.js',
            'DGFullScreen/lang/it.js',
            'DGFullScreen/lang/cs.js',
            'DGFullScreen/lang/en.js'
        ],
        css: {
            all: ['DGFullScreen/skin/{skin}/css/DGFullScreen.css'],
            ie: ['DGFullScreen/skin/{skin}/css/DGFullScreen.ie.css']
        },
        deps: ['DGCore', 'DGLocale', 'DGRoundControl']
    },

    DGTileLayer: {
        desc: '2GIS tile layer module',
        src: ['DGTileLayer/src/DGTileLayer.js'],
        deps: ['DGCore']
    },

    DGProjectDetector: {
        desc: '2GIS project detector module',
        src: ['DGProjectDetector/src/DGProjectDetector.js'],
        deps: ['DGCore', 'DGAjax']
    },

    DGMeta: {
        desc: '2GIS POI & buildings data support module',
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
        desc: '2GIS POI module',
        src: ['DGPoi/src/DGPoi.js'],
        deps: ['DGMeta', 'DGLabel']
    },

    DGBuildings: {
        desc: '2GIS buildings module',
        src: ['DGBuildings/src/DGBuildings.js'],
        deps: ['DGMeta']
    },

    DGGeoclicker: {
        desc: '2GIS Geoclicker',
        css: {
            all: [
                'DGGeoclicker/skin/{skin}/css/DGGeoclicker.css',
                'DGGeoclicker/skin/{skin}/css/DGFirmCard.css',
                'DGGeoclicker/skin/{skin}/css/DGFirmCardSkinSetup.css'
            ],
            ie: ['DGGeoclicker/skin/{skin}/css/DGGeoclicker.ie.css']
        },
        src: [
            'DGGeoclicker/src/DGGeoclicker.js',
            'DGGeoclicker/src/ClampHelper.js',
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
            '../vendors/firmcard/src/Dictionary.js'
        ],
        deps: ['DGAjax', 'DGWhen', 'DGCore', 'DGTemplate', 'DGLocale', 'DGPoi', 'DGEntrance', 'DGProjectDetector']
    },

    DGTemplate: {
        desc: '2GIS Template',
        src: [
            '../vendors/dustjs/dist/dust-core.js',
            'DGTemplate/src/DGTemplate.js'
        ]
    },

    DGEntrance: {
        desc: '2GIS Entrances',
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


    DGRoundControl: {
        desc: 'Control helper',
        src: ['DGRoundControl/src/DGRoundControl.js'],
        css: {
            all: ['DGRoundControl/skin/{skin}/css/DGRoundControl.css'],
            ie: ['DGRoundControl/skin/{skin}/css/DGRoundControl.ie.css']
        },
        deps: ['DGCore', 'DGLocale']
    }
};

if (typeof exports !== 'undefined') {
    exports.deps = deps;
}
