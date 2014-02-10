var deps = {

    Leaflet: {
        desc: 'Leaflet dist',
        src: ['../vendors/leaflet/dist/leaflet-src.js'],
        styl: {
            all: ['../vendors/leaflet/dist/leaflet.css']
        }
    },

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
        heading: '2GIS modules',
        deps: ['DGWhen']
    },

    DGWhen: {
        desc: 'Promise/Deffered object module',
        src: [
            'DGWhen/src/DGCore.js',
            'DGWhen/src/DGWhen.js'
        ],
        deps: ['Leaflet']
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
        styl: {
            all: ['DGLabel/skin/{skin}/styl/DGLabel.styl']
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
        styl: {
            all: [
                'DGCustomization/skin/basic/styl/leaflet-reset.styl',
                '../vendors/baron/baron.css',
                'DGCustomization/skin/{skin}/styl/zoom.styl',
                'DGCustomization/skin/{skin}/styl/baron.styl',
                'DGCustomization/skin/{skin}/styl/marker.styl',
                'DGCustomization/skin/{skin}/styl/callout.styl',
                'DGCustomization/skin/{skin}/styl/baron.styl'
            ],
            ie: [
                'DGCustomization/skin/{skin}/styl/baron.ie.styl',
                'DGCustomization/skin/{skin}/styl/callout.ie.styl',
                'DGCustomization/skin/{skin}/styl/zoom.ie.styl',
                'DGCustomization/skin/{skin}/styl/marker.ie.styl'
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
        styl: {
            all: ['DGAttribution/skin/{skin}/styl/DGAttribution.styl'],
            ie: ['DGAttribution/skin/{skin}/styl/DGAttribution.ie.styl']
        },
        deps: ['DGCore', 'DGDust', 'DGLocale']
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
        styl: {
            all: ['DGLocation/skin/{skin}/styl/DGLocation.styl']
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
        styl: {
            all: ['DGFullScreen/skin/{skin}/styl/DGFullScreen.styl'],
            ie: ['DGFullScreen/skin/{skin}/styl/DGFullScreen.ie.styl']
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
        styl: {
            all: [
                'DGGeoclicker/skin/{skin}/styl/DGGeoclicker.styl',
                'DGGeoclicker/skin/{skin}/styl/DGFirmCard.styl',
                'DGGeoclicker/skin/{skin}/styl/DGFirmCardSkinSetup.styl'
            ],
            ie: ['DGGeoclicker/skin/{skin}/styl/DGGeoclicker.ie.styl']
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
        deps: ['DGAjax', 'DGWhen', 'DGCore', 'DGDust', 'DGLocale', 'DGPoi', 'DGEntrance', 'DGProjectDetector']
    },

    DGDust: {
        desc: '2GIS Template',
        src: [
            '../vendors/dustjs/dist/dust-core.js',
            '../vendors/dustjs-helpers/dist/dust-helpers-1.1.2.js',
            'DGDust/src/DGDust.js'
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
        styl: {
            all: ['DGRoundControl/skin/{skin}/styl/DGRoundControl.styl'],
            ie: ['DGRoundControl/skin/{skin}/styl/DGRoundControl.ie.styl']
        },
        deps: ['DGCore', 'DGLocale']
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = deps;
}
