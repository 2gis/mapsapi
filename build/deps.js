var deps = {

    Leaflet: {
        desc: 'Leaflet dist',
        src: ['../vendors/leaflet/dist/leaflet-src.js'],
        less: {
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
        less: {
            all: ['DGLabel/skin/{skin}/less/dg-label.less']
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
        less: {
            all: [
                'DGCustomization/skin/{skin}/less/leaflet.less',
                '../vendors/baron/baron.css',
                'DGCustomization/skin/{skin}/less/dg-zoom.less',
                'DGCustomization/skin/{skin}/less/scroller.less',
                'DGCustomization/skin/{skin}/less/dg-customization.less',
                'DGCustomization/skin/{skin}/less/dg-popup.less',
                'DGCustomization/skin/{skin}/less/dg-firm-card.less'
            ],
            ie: [
                'DGCustomization/skin/{skin}/less/leaflet.ie.less',
                'DGCustomization/skin/{skin}/less/dg-popup.ie.less',
                'DGCustomization/skin/{skin}/less/dg-zoom.ie.less',
                'DGCustomization/skin/{skin}/less/dg-customization.ie.less',
                'DGCustomization/skin/{skin}/less/dg-schedule.ie.less'
            ]
        },
        deps: ['DGCore', 'DGLocale', 'DGRoundControl', 'DGProjectDetector']
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
        less: {
            all: [
                'DGAttribution/skin/{skin}/less/dg-mapcopyright.less',
                'DGAttribution/skin/{skin}/less/leaflet.less'
            ],
            ie: ['DGAttribution/skin/{skin}/less/dg-mapcopyright.ie.less']
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
        less: {
            all: [
                'DGLocation/skin/{skin}/less/dg-location.less',
                'DGLocation/skin/{skin}/less/dg-control-round.less'
            ]
        },
        deps: ['DGCore', 'DGLocale', 'DGLabel', 'DGRoundControl']
    },

    DGFullScreen: {
        desc: 'Full screen module',
        src: [
            'DGFullScreen/src/DGScreenfull.js',
            'DGFullScreen/src/LegacyFullScreen.js',
            'DGFullScreen/src/DGFullScreen.js',
            'DGFullScreen/lang/ru.js',
            'DGFullScreen/lang/it.js',
            'DGFullScreen/lang/cs.js',
            'DGFullScreen/lang/en.js'
        ],
        less: {
            all: [
                'DGFullScreen/skin/{skin}/less/leaflet.less',
                'DGFullScreen/skin/{skin}/less/dg-fullscreen.less'
            ],
            ie: [
                'DGFullScreen/skin/{skin}/less/leaflet.ie.less',
                'DGFullScreen/skin/{skin}/less/dg-fullscreen.ie.less'
            ]
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
        deps: ['DGCore']
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
        less: {
            all: [
                'DGGeoclicker/skin/{skin}/less/dg-building-callout.less',
                'DGGeoclicker/skin/{skin}/less/dg-map-geoclicker.less',
                'DGGeoclicker/skin/{skin}/less/dg-preloader.less',
                'DGGeoclicker/skin/{skin}/less/dg-popup.less',
                'DGGeoclicker/skin/{skin}/less/dg-firm-card.less',
                'DGGeoclicker/skin/{skin}/less/dg-schedule.less',
                'DGGeoclicker/skin/{skin}/less/dg-link.less'
            ],
            ie: ['DGGeoclicker/skin/{skin}/less/dg-popup.ie.less']
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
        less: {
            all: [
                'DGRoundControl/skin/{skin}/less/leaflet.less',
                'DGRoundControl/skin/{skin}/less/dg-control-round.less'
            ],
            ie: ['DGRoundControl/skin/{skin}/less/dg-control-round.ie.less']
        },
        deps: ['DGCore', 'DGLocale']
    },

    DGRuler: {
        desc: 'Ruler module',
        src: [
            'DGRuler/src/Ruler.js',
            'DGRuler/src/LayeredMarker.js',
            'DGRuler/src/GeometryStyles.js',
            'DGRuler/lang/ru.js',
            'DGRuler/lang/it.js',
            'DGRuler/lang/en.js'
        ],
        less: {
            all: [
                'DGRuler/skin/{skin}/less/dg-ruler.less'
            ],
            ie: [
                'DGRuler/skin/{skin}/less/dg-ruler.ie.less'
            ]
        },
        deps: ['DGCore', 'DGLocale', 'DGDust']
    },

    DGRulerControl: {
        desc: 'Ruler control module',
        src: [
            'DGRulerControl/src/Control.Ruler.js',
            'DGRulerControl/lang/ru.js',
            'DGRulerControl/lang/it.js',
            'DGRulerControl/lang/en.js'
        ],
        less: {
            all: [
                'DGRulerControl/skin/{skin}/less/dg-control-round.less'
            ]
        },
        deps: ['DGRuler', 'DGRoundControl']
    }

};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = deps;
}
