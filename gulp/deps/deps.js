var deps = {
    DGCore: {
        desc: 'Main module',
        src: [
            '../vendors/polyfills/es5.js',
            '../vendors/polyfills/promise.js',
            'DGCore/src/DGCore.js',
            'DGCore/src/DGthen.js',
            'DGCore/src/DGplugin.js'
        ],
        less: {
            all: [
                '../node_modules/leaflet/dist/leaflet.css',
                'DGCore/skin/basic/less/dg-core.less'
            ]
        },
        heading: '2GIS modules'
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
            'DGLabel/src/Path.DGLabel.js',
            'DGLabel/src/Entrance.DGLabel.js'
        ],
        less: {
            all: ['DGLabel/skin/{skin}/less/dg-label.less']
        },
        deps: ['DGCore', 'DGEntrance']
    },

    DGWkt: {
        desc: 'WKT parser module',
        src: [
            'DGWkt/DGWkt.js'
        ],
        deps: ['DGCore']
    },

    DGPopup: {
        desc: '2GIS Popup module',
        src: [
            'DGPopup/skin/basic/skin.config.js',
            'DGPopup/src/DGPopup.js'
        ],
        less: {
            all: [
                'DGPopup/skin/{skin}/less/leaflet.less',
                '../vendors/baron/baron.css',
                'DGPopup/skin/{skin}/less/scroller.less',
                'DGPopup/skin/{skin}/less/dg-popup.less'
            ],
            ie: [
                'DGPopup/skin/{skin}/less/leaflet.ie.less',
                'DGPopup/skin/{skin}/less/dg-popup.ie.less'
            ]
        },
        deps: ['DGCore']
    },

    DGCustomization: {
        desc: 'LeafLet customization module',
        src: [
            'DGCustomization/skin/basic/skin.config.js',
            'DGCustomization/src/DGCustomization.js',
            'DGCustomization/src/DGMap.js',
            'DGCustomization/src/DGMap.BaseLayer.js',
            'DGCustomization/src/DGMap.TilesCheck.js',
            'DGCustomization/src/DGMap.Drag.js',
            'DGCustomization/src/DGPolyUtil.js',
            'DGCustomization/src/DGMobileImprove.js'
        ],
        less: {
            all: [
                'DGCustomization/skin/{skin}/less/leaflet.less',
                '../vendors/baron/baron.css',
                'DGCustomization/skin/{skin}/less/scroller.less',
                'DGCustomization/skin/{skin}/less/dg-customization.less'
            ],
            ie: [
                'DGCustomization/skin/{skin}/less/leaflet.ie.less',
                'DGCustomization/skin/{skin}/less/dg-customization.ie.less'
            ]
        },
        deps: ['DGCore', 'DGLocale', 'DGRoundControl', 'DGProjectDetector', 'DGMuseum']
    },

    DGZoomControl: {
        desc: '2GIS zoom control module',
        src: [
            'DGZoomControl/src/DGZoomControl.js',
            'DGZoomControl/lang/ru.js',
            'DGZoomControl/lang/it.js',
            'DGZoomControl/lang/cs.js',
            'DGZoomControl/lang/en.js',
            'DGZoomControl/lang/es.js',
            'DGZoomControl/lang/ar.js'
        ],
        less: {
            all: [
                'DGZoomControl/skin/{skin}/less/dg-zoom-control.less'
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
            'DGAttribution/lang/en.js',
            'DGAttribution/lang/es.js',
            'DGAttribution/lang/ar.js'
        ],
        less: {
            all: [
                'DGAttribution/skin/{skin}/less/dg-mapcopyright.less'
            ]
        },
        deps: ['DGCore', 'DGDust', 'DGLocale']
    },

    DGLocale: {
        desc: 'Localization module',
        src: [
            'DGLocale/src/DGDictionary.js',
            'DGLocale/src/DGLocale.js'
        ],
        deps: ['DGCore', 'DGProjectDetector']
    },

    DGLocation: {
        desc: 'Location control module',
        src: [
            'DGLocation/src/DGLocation.js',
            'DGLocation/lang/ru.js',
            'DGLocation/lang/it.js',
            'DGLocation/lang/cs.js',
            'DGLocation/lang/en.js',
            'DGLocation/lang/es.js',
            'DGLocation/lang/ar.js'
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
            'DGFullScreen/src/DGFullScreen.js',
            'DGFullScreen/lang/ru.js',
            'DGFullScreen/lang/it.js',
            'DGFullScreen/lang/cs.js',
            'DGFullScreen/lang/en.js',
            'DGFullScreen/lang/es.js',
            'DGFullScreen/lang/ar.js'
        ],
        less: {
            all: [
                'DGFullScreen/skin/{skin}/less/dg-fullscreen.less',
                'DGFullScreen/skin/{skin}/less/dg-control-round.less'
            ],
            ie: ['DGFullScreen/skin/{skin}/less/dg-fullscreen.ie.less']
        },
        deps: ['DGCore', 'DGLocale', 'DGRoundControl']
    },

    DGProjectDetector: {
        desc: '2GIS project detector module',
        src: ['DGProjectDetector/src/DGProjectDetector.js'],
        deps: ['DGCore', 'DGWkt']
    },

    DGMeta: {
        desc: '2GIS additional metalayers support',
        src: [
            'DGMeta/src/DGMeta.Layer.js',
            'DGMeta/src/DGMeta.Origin.js'
        ],
        deps: ['DGAjax', 'DGCore', 'DGCustomization', 'DGWkt', 'DGProjectDetector']
    },

    DGPoi: {
        desc: '2GIS POI module',
        src: ['DGPoi/src/DGPoi.js'],
        deps: ['DGMeta', 'DGLabel']
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
            ie: [
                'DGGeoclicker/skin/{skin}/less/dg-popup.ie.less',
                'DGGeoclicker/skin/{skin}/less/dg-schedule.ie.less'
            ]
        },
        src: [
            'DGGeoclicker/src/DGGeoclicker.js',
            'DGGeoclicker/src/ClampHelper.js',
            'DGGeoclicker/src/provider/Provider.js',
            'DGGeoclicker/src/provider/CatalogApi.js',
            'DGGeoclicker/src/handler/Handler.js',
            'DGGeoclicker/src/handler/Default.js',
            'DGGeoclicker/src/handler/ApiError.js',
            'DGGeoclicker/src/handler/CityArea.js',
            'DGGeoclicker/src/handler/House.js',
            'DGGeoclicker/src/handler/House.View.js',
            'DGGeoclicker/src/handler/POI.js',
            'DGGeoclicker/src/handler/Sight.js',
            'DGGeoclicker/src/View.js',
            'DGGeoclicker/src/Controller.js',
            'DGGeoclicker/lang/it.js',
            'DGGeoclicker/lang/ru.js',
            'DGGeoclicker/lang/en.js',
            'DGGeoclicker/lang/cs.js',
            'DGGeoclicker/lang/es.js',

            '../vendors/firmcard/src/FirmCard.js',
            '../vendors/firmcard/src/FirmCard.DataHelper.js',
            '../vendors/firmcard/src/FirmList.js',
            '../vendors/firmcard/src/Schedule.js',
            '../vendors/firmcard/src/Dictionary.js'
        ],
        deps: ['DGAjax', 'DGCore', 'DGDust', 'DGLocale', 'DGPoi', 'DGEntrance', 'DGProjectDetector', 'DGPopup']
    },

    DGDust: {
        desc: '2GIS Template',
        src: [
            'DGDust/src/DGDust.js'
        ],
        deps: ['DGCore']
    },

    DGEntrance: {
        desc: '2GIS Entrances',
        src: [
            'DGEntrance/src/DGMetric.js',
            'DGEntrance/src/DGVertexTransform.js',
            'DGEntrance/src/DGArrowPathTransform.js',
            'DGEntrance/src/DGArrowTipTransform.js',
            'DGEntrance/src/DGComplexPath.js',
            'DGEntrance/src/DGRenderer.js',
            'DGEntrance/src/DGBezierCurves.js',
            'DGEntrance/src/DGAnimation.js',
            'DGEntrance/src/DGEntrance.js',
            'DGEntrance/src/DGEntranceArrow.js',
            'DGEntrance/src/DGEntranceArrowShape.js'
        ],
        deps: ['DGCore', 'DGWkt', 'DGProjectDetector']
    },


    DGRoundControl: {
        desc: 'Control helper',
        src: ['DGRoundControl/src/DGRoundControl.js'],
        less: {
            all: ['DGRoundControl/skin/{skin}/less/dg-control-round.less']
        },
        deps: ['DGCore', 'DGLocale']
    },

    DGTraffic: {
        desc: 'Traffic',
        src: [
            'DGTraffic/src/DGTraffic.js',
            'DGTraffic/lang/ru.js',
            'DGTraffic/lang/it.js',
            'DGTraffic/lang/cs.js',
            'DGTraffic/lang/es.js',
            'DGTraffic/lang/en.js',
            'DGTraffic/lang/ar.js'
        ],
        deps: ['DGMeta', 'DGLabel', 'DGLocale']
    },

    DGTrafficControl: {
        desc: 'Traffic control module',
        src: [
            'DGTrafficControl/src/Control.Traffic.js',
            'DGTrafficControl/lang/ru.js',
            'DGTrafficControl/lang/it.js',
            'DGTrafficControl/lang/cs.js',
            'DGTrafficControl/lang/es.js',
            'DGTrafficControl/lang/en.js',
            'DGTrafficControl/lang/ar.js'
        ],
        less: {
            all: [
                'DGTrafficControl/skin/{skin}/less/dg-control-round.less',
                'DGTrafficControl/skin/{skin}/less/dg-traffic-control.less'
            ],
            ie: ['DGTrafficControl/skin/{skin}/less/dg-traffic-control.ie.less']
        },
        deps: ['DGTraffic', 'DGRoundControl']
    },

    DGRuler: {
        desc: 'Ruler module',
        src: [
            'DGRuler/src/Ruler.js',
            'DGRuler/src/LayeredMarker.js',
            'DGRuler/src/GeometryStyles.js',
            'DGRuler/lang/ru.js',
            'DGRuler/lang/it.js',
            'DGRuler/lang/cs.js',
            'DGRuler/lang/es.js',
            'DGRuler/lang/en.js',
            'DGRuler/lang/ar.js'
        ],
        less: {
            all: ['DGRuler/skin/{skin}/less/dg-ruler.less'],
            ie: ['DGRuler/skin/{skin}/less/dg-ruler.ie.less']
        },
        deps: ['DGCore', 'DGLocale']
    },

    DGRulerControl: {
        desc: 'Ruler control module',
        src: [
            'DGRulerControl/src/Control.Ruler.js',
            'DGRulerControl/lang/ru.js',
            'DGRulerControl/lang/it.js',
            'DGRulerControl/lang/cs.js',
            'DGRulerControl/lang/es.js',
            'DGRulerControl/lang/en.js',
            'DGRulerControl/lang/ar.js'
        ],
        less: {
            all: ['DGRulerControl/skin/{skin}/less/dg-control-round.less']
        },
        deps: ['DGRuler', 'DGRoundControl']
    },

    DGMuseum: {
        desc: 'Museum module',
        src: [
            'DGMuseum/src/DGMuseum.js'
        ],
        less: {
            all: ['DGMuseum/skin/{skin}/less/dg-museum.less']
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = deps;
}
