var deps = {

    DGCore: {
        desc: 'Main module',
        js: [
            '/vendors/polyfills/json2.js',
            '/vendors/polyfills/html5shiv.js',
            '/vendors/polyfills/es5.js',
            'src/DGCore/src/DGCore.js',
            'src/DGCore/src/DGplugin.js',
            'src/DGCore/src/DGthen.js'
        ],
        css: {
            all: ['/vendors/leaflet/dist/leaflet.css']
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
        js: [ 'src/DGWhen/src/DGWhen.js']
    },

    DGAjax: {
        desc: '2GIS Ajax module',
        js: ['src/DGAjax/src/DGAjax.js'],
        deps: ['DGCore']
    },

    DGLabel: {
        desc: '2GIS Label module',
        js: [
            'src/DGLabel/src/DGLabel.js',
            'src/DGLabel/src/Marker.DGLabel.js',
            'src/DGLabel/src/Path.DGLabel.js'
        ],
        css: {
            all: ['src/DGLabel/skin/{skin}/css/DGLabel.css']
        },
        deps: ['DGCore']
    },

    DGWkt: {
        desc: 'WKT parser module',
        js: [
            'src/DGWkt/Wkt.js',
            'src/DGWkt/DGWkt.js'
        ],
        deps: ['DGCore']
    },

    DGCustomization: {
        desc: 'LeafLet customization module',
        js: [
            'src/DGCustomization/skin/basic/skin.config.js',
            '/vendors/baron/baron.js',
            '/vendors/baron/js/bonzo.js',
            '/vendors/baron/js/bean.js',
            '/vendors/baron/js/qwery.js',
            'src/DGCustomization/src/DGCustomization.js',
            'src/DGCustomization/src/DGPopup.js',
            'src/DGCustomization/src/DGZoom.js',
            'src/DGCustomization/lang/DGZoom/ru.js',
            'src/DGCustomization/lang/DGZoom/it.js',
            'src/DGCustomization/lang/DGZoom/cs.js',
            'src/DGCustomization/lang/DGZoom/en.js'
        ],
        css: {
            all: [
                'src/DGCustomization/skin/basic/css/leaflet-reset.css',
                '/vendors/baron/baron.css',
                'src/DGCustomization/skin/{skin}/css/zoom.css',
                'src/DGCustomization/skin/{skin}/css/baron.css',
                'src/DGCustomization/skin/{skin}/css/marker.css',
                'src/DGCustomization/skin/{skin}/css/callout.css',
                'src/DGCustomization/skin/{skin}/css/baron.css'
            ],
            ie: [
                'src/DGCustomization/skin/{skin}/css/baron.ie.css',
                'src/DGCustomization/skin/{skin}/css/callout.ie.css',
                'src/DGCustomization/skin/{skin}/css/zoom.ie.css',
                'src/DGCustomization/skin/{skin}/css/marker.ie.css'
            ]
        },
        deps: ['DGCore', 'DGLocale', 'DGRoundControl']
    },

    DGAttribution: {
        desc: '2GIS copyright',
        js: [
            'src/DGAttribution/src/DGAttribution.js',
            'src/DGAttribution/lang/ru.js',
            'src/DGAttribution/lang/it.js',
            'src/DGAttribution/lang/cs.js',
            'src/DGAttribution/lang/en.js'
        ],
        css: {
            all: ['DGAttribution/skin/{skin}/css/DGAttribution.css'],
            ie: ['DGAttribution/skin/{skin}/css/DGAttribution.ie.css']
        },
        deps: ['DGCore', 'DGTemplate', 'DGLocale']
    },

    DGLocale: {
        desc: 'Localization module',
        js: [
            'src/DGLocale/src/DGDictionary.js',
            'src/DGLocale/src/DGLocale.js'
        ],
        deps: ['DGCore']
    },

    DGLocation: {
        desc: 'Location control module',
        js: [
            'src/DGLocation/src/DGLocation.js',
            'src/DGLocation/lang/ru.js',
            'src/DGLocation/lang/it.js',
            'src/DGLocation/lang/cs.js',
            'src/DGLocation/lang/en.js'
        ],
        css: {
            all: ['src/DGLocation/skin/{skin}/css/DGLocation.css']
        },
        deps: ['DGCore', 'DGLocale', 'DGLabel', 'DGRoundControl']
    },

    DGFullScreen: {
        desc: 'Full screen module',
        js: [
            './src/DGFullScreen/src/DGFullScreen.js',
            './src/DGFullScreen/lang/ru.js',
            './src/DGFullScreen/lang/it.js',
            './src/DGFullScreen/lang/cs.js',
            './src/DGFullScreen/lang/en.js'
        ],
        css: {
            all: ['src/DGFullScreen/skin/{skin}/css/DGFullScreen.css'],
            ie: ['src/DGFullScreen/skin/{skin}/css/DGFullScreen.ie.css']
        },
        deps: ['DGCore', 'DGLocale', 'DGRoundControl']
    },

    DGTileLayer: {
        desc: '2GIS tile layer module',
        js: ['src/DGTileLayer/src/DGTileLayer.js'],
        deps: ['DGCore']
    },

    DGProjectDetector: {
        desc: '2GIS project detector module',
        js: ['src/DGProjectDetector/src/DGProjectDetector.js'],
        deps: ['DGCore', 'DGAjax']
    },

    DGMeta: {
        desc: '2GIS POI & buildings data support module',
        js: [
            'src/DGMeta/src/DGMeta.js',
            'src/DGMeta/src/storage/Storage.js',
            'src/DGMeta/src/storage/PoiStorage.js',
            'src/DGMeta/src/storage/BuildingStorage.js',
            'src/DGMeta/src/StorageHost.js',
            'src/DGMeta/src/PolyUtilContains.js'
        ],
        deps: ['DGAjax', 'DGCore', 'DGTileLayer', 'DGWkt']
    },

    DGPoi: {
        desc: '2GIS POI module',
        js: ['src/DGPoi/src/DGPoi.js'],
        deps: ['DGMeta', 'DGLabel']
    },

    DGBuildings: {
        desc: '2GIS buildings module',
        js: ['src/DGBuildings/src/DGBuildings.js'],
        deps: ['DGMeta']
    },

    DGGeoclicker: {
        desc: '2GIS Geoclicker',
        css: {
            all: [
                'src/DGGeoclicker/skin/{skin}/css/DGGeoclicker.css',
                'src/DGGeoclicker/skin/{skin}/css/DGFirmCard.css',
                'src/DGGeoclicker/skin/{skin}/css/DGFirmCardSkinSetup.css'
            ],
            ie: ['src/DGGeoclicker/skin/{skin}/css/DGGeoclicker.ie.css']
        },
        js: [
            'src/DGGeoclicker/src/DGGeoclicker.js',
            'src/DGGeoclicker/src/ClampHelper.js',
            'src/DGGeoclicker/src/provider/Provider.js',
            'src/DGGeoclicker/src/provider/CatalogApi.js',
            'src/DGGeoclicker/src/handler/Handler.js',
            'src/DGGeoclicker/src/handler/Default.js',
            'src/DGGeoclicker/src/handler/CityArea.js',
            'src/DGGeoclicker/src/handler/House.js',
            'src/DGGeoclicker/src/handler/House.View.js',
            'src/DGGeoclicker/src/handler/Sight.js',
            'src/DGGeoclicker/src/View.js',
            'src/DGGeoclicker/src/Controller.js',
            'src/DGGeoclicker/lang/it.js',
            'src/DGGeoclicker/lang/ru.js',
            'src/DGGeoclicker/lang/en.js',
            'src/DGGeoclicker/lang/cs.js',

            '/vendors/firmcard/src/FirmCard.js',
            '/vendors/firmcard/src/FirmCard.DataHelper.js',
            '/vendors/firmcard/src/FirmList.js',
            '/vendors/firmcard/src/vendors/underscore1.5.1.js',
            '/vendors/firmcard/src/vendors/momentjs/moment.min.js',
            '/vendors/firmcard/src/vendors/momentjs/lang/moment.ru.js',
            '/vendors/firmcard/src/vendors/momentjs/lang/moment.cs.js',
            '/vendors/firmcard/src/vendors/momentjs/lang/moment.it.js',
            '/vendors/firmcard/src/Schedule.js',
            '/vendors/firmcard/src/Dictionary.js'
        ],
        deps: ['DGAjax', 'DGWhen', 'DGCore', 'DGTemplate', 'DGLocale', 'DGPoi', 'DGEntrance', 'DGProjectDetector']
    },

    DGTemplate: {
        desc: '2GIS Template',
        js: ['src/DGTemplate/src/DGTemplate.js']
    },

    DGEntrance: {
        desc: '2GIS Entrances',
        js: [
            'src/DGEntrance/src/DGEntrance.js',
            'src/DGEntrance/src/PathAnimation.js',
            'src/DGEntrance/src/Arrow.js',
            'src/DGEntrance/src/ArrowSvg.js',
            'src/DGEntrance/src/ArrowVml.js',
            'src/DGEntrance/src/ArrowSvgAnimationOptions.js',
            'src/DGEntrance/src/EventHandler.js'
        ],
        deps: ['DGCore', 'DGWkt', 'DGProjectDetector']
    },


    DGRoundControl: {
        desc: 'Control helper',
        js: ['src/DGRoundControl/src/DGRoundControl.js'],
        css: {
            all: ['src/DGRoundControl/skin/{skin}/css/DGRoundControl.css'],
            ie: ['src/DGRoundControl/skin/{skin}/css/DGRoundControl.ie.css']
        },
        deps: ['DGCore', 'DGLocale']
    }
};

if (typeof exports !== 'undefined') {
    exports.deps = deps;
}
