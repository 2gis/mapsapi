L.DG.Entrance = L.Class.extend({

    includes: L.Mixin.Events,

    options: {
        vectors: [],
        fitBounds: true
    },

    statics: {
        SHOW_FROM_ZOOM: L.Browser.svg ? 16 : 17
    },

    _map: null,
    _arrows: null,
    _eventHandler: null,
    _isShown: true,

    initialize: function (options) { // (Object)
        L.setOptions(this, options);
    },

    onAdd: function (map) { // (L.Map)
        this._map = map;
        this._initArrows().addTo(map);
        this._eventHandler = new L.DG.Entrance.EventHandler(map, this);

        // hide without event by default
        this._arrows.eachLayer(function (arrow) {
            arrow.setStyle({ opacity: 0 });
        });
        this._isShown = false;
    },

    addTo: function (map) { // (L.Map) -> L.DG.Entrance
        map.addLayer(this);
        return this;
    },

    onRemove: function (map) { // (L.Map)
        this._isShown = false;
        this._removeArrows();
        this._map = null;
        this._eventHandler.remove();
        this._eventHandler = null;
        this._arrows = null;
    },

    removeFrom: function (map) { // (L.Map) -> L.DG.Entrance
        map.removeLayer(this);
        return this;
    },

    show: function () { // () -> L.DG.Entrance

        if (!this.isShown() && this._arrows) {
            if (this.options.fitBounds) {
                this._fitBounds();
            }
            if (this._isAllowedZoom()) {
                this._arrows.eachLayer(function (arrow) {
                    arrow.setStyle({opacity: 1});
                    if (L.Path.ANIMATION_AVAILABLE) {
                        arrow.runAnimation('animateArrowPathGeom');
                    }
                });

                this._isShown = true;
                this._map.fire('dgEntranceShow');
            }
        }

        return this;
    },

    hide: function () { // () -> L.DG.Entrance

        if (this.isShown() && this._arrows) {
            this._arrows.eachLayer(function (arrow) {
                arrow.setStyle({opacity: 0});
            });
            this._isShown = false;
            this._map.fire('dgEntranceHide');
        }

        return this;
    },

    isShown: function () { // () -> Boolean
        return this._isShown;
    },

    getBounds: function () { // () -> L.LatLngBounds
        return this._arrows.getBounds();
    },

    _initArrows: function () { // () -> L.FeatureGroup
        var wkt, components, latlngs;

        this._arrows = L.featureGroup();

        for (var i = 0; i < this.options.vectors.length; i++) {
            wkt = new L.DG.Wkt();
            components = wkt.read(this.options.vectors[i]);
            latlngs = [];

            for (var j = 0; j < components.length; j++) {
                latlngs.push([components[j].y, components[j].x]);
            }

            // stroke
            //this._arrows.addLayer(L.DG.Entrance.arrow(latlngs, this._getArrowStrokeOptions()));
            this._arrows.addLayer(L.DG.Entrance.arrow(latlngs, this._getArrowStrokeOptionsBlunt()));

            // basis
            //this._arrows.addLayer(L.DG.Entrance.arrow(latlngs, this._getArrowOptions()));
            this._arrows.addLayer(L.DG.Entrance.arrow(latlngs, this._getArrowOptionsBlunt()));
        }

        return this._arrows;
    },

    _removeArrows: function () {
        this._map.removeLayer(this._arrows.clearLayers());
    },

    _fitBounds: function () {
        if (!this._isAllowedZoom()) {
            this._map.panTo(this.getBounds().getCenter(), {animate: false});
            this._map.setZoom(this._map.dgProjectDetector.getProject().max_zoomlevel, {animate: false});
        }

        if (!this._map.getBounds().contains(this.getBounds())) {
            this._map.panTo(this.getBounds().getCenter(), {animate: false});
        }
    },

    _isAllowedZoom: function () {
        return !(this._map.getZoom() < L.DG.Entrance.SHOW_FROM_ZOOM);
    },

    _getArrowStrokeOptions: function () {
        return {
            clickable: false,
            color: '#fff',
            weight: 6,
            byZoom: {
                16: {
                     marker: {
                        viewBox: '0 0 24 24',
                        refX: 12,
                        refY: 12,
                        markerHeight: 24,
                        markerWidth: 24,
                        path: {
                            d: 'M7,6C6.481,6,5.97,6.202,5.586,6.586l-1,1c-0.781,0.781-0.781,2.047,0,2.828L6,11.828v0.344l-1.414,1.413 C4.211,13.961,4,14.47,4,15s0.21,1.039,0.586,1.414l1,1C5.97,17.798,6.482,18,7,18c0.304,0,0.61-0.069,0.894-0.211l8-4 C16.572,13.45,17,12.758,17,12s-0.428-1.45-1.105-1.789l-8-4C7.61,6.069,7.304,6,7,6L7,6z'
                        }
                    },
                    lastPointOffset: 0,
                    vmlEndArrow: 'none'
                },
                17: {
                    marker: {
                        viewBox: '0 0 24 24',
                        refX: 12,
                        refY: 12,
                        markerHeight: 24,
                        markerWidth: 24,
                        path: {
                            d: 'M6,4C5.481,4,4.97,4.202,4.586,4.586l-1,1c-0.781,0.781-0.781,2.047,0,2.828L6,10.828v2.344l-2.414,2.414 c-0.781,0.781-0.781,2.047,0,2.828l1,1C4.97,19.798,5.482,20,6,20c0.304,0,0.61-0.069,0.894-0.211l12-6 C19.572,13.45,20,12.758,20,12s-0.428-1.45-1.105-1.789l-12-6C6.61,4.069,6.304,4,6,4L6,4z'
                        }
                    },
                    lastPointOffset: !L.Browser.vml ? -3 : 0,
                    vmlEndArrow: 'none'
                },
                18: {
                    marker: {
                        viewBox: '0 0 24 24',
                        refX: 12,
                        refY: 12,
                        markerHeight: 24,
                        markerWidth: 24,
                        path: {
                            d: 'M5,2C4.481,2,3.97,2.202,3.586,2.586l-1,1c-0.781,0.781-0.781,2.047,0,2.828L6,9.829v4.343 l-3.414,3.414c-0.781,0.781-0.781,2.047,0,2.828l1,1C3.97,21.798,4.482,22,5,22c0.304,0,0.61-0.069,0.894-0.211l16-8 C22.572,13.45,23,12.758,23,12s-0.428-1.45-1.105-1.789l-16-8C5.61,2.069,5.304,2,5,2L5,2z'
                        }
                    },
                    lastPointOffset: !L.Browser.vml ? -5 : -2,
                    vmlEndArrow: 'none',
                    weight: 10
                }
            }
        };
    },

    _getArrowOptions: function () {
        return {
            clickable: false,
            color: '#6f8497',
            weight: 3,
            byZoom: {
                16: {
                    marker: {
                        viewBox: '0 0 24 24',
                        refX: 12,
                        refY: 12,
                        markerHeight: 24,
                        markerWidth: 24,
                        polygon: {
                            points: '15,12 7,8 6,9 8,11 8,13.001 6,15 7,16'
                        }
                    },
                    lastPointOffset: 0
                },
                17: {
                    marker: {
                        viewBox: '0 0 24 24',
                        refX: 12,
                        refY: 12,
                        markerHeight: 24,
                        markerWidth: 24,
                        polygon: {
                            points: '18,12 6,6 5,7 8,10 8,14 5,17 6,18'
                        }
                    },
                    lastPointOffset: !L.Browser.vml ? -3 : 0
                },
                18: {
                    marker: {
                        viewBox: '0 0 24 24',
                        refX: 12,
                        refY: 12,
                        markerHeight: 24,
                        markerWidth: 24,
                        polygon: {
                            points: '21,12 5,4 4,5 8,9 8,15 4,19 5,20'
                        }
                    },
                    lastPointOffset: !L.Browser.vml ? -5 : 0,
                    weight: 4
                }
            }
        };
    },

    _getArrowStrokeOptionsBlunt: function () {
        return {
            clickable: false,
            color: '#fff',
            weight: 6,
            byZoom: {
                16: {
                     marker: {
                        viewBox: '0 0 24 24',
                        refX: 12,
                        refY: 12,
                        markerHeight: 24,
                        markerWidth: 24,
                        path: {
                            d: 'M10,5C9.488,5,8.976,5.195,8.586,5.586l-1,1c-0.674,0.674-0.779,1.73-0.25,2.523L9,11.605v0.789 l-1.664,2.496c-0.529,0.793-0.424,1.85,0.25,2.523l1,1C8.976,18.805,9.488,19,10,19s1.023-0.195,1.414-0.586l5-5 c0.781-0.781,0.781-2.047,0-2.828l-5-5C11.023,5.195,10.512,5,10,5L10,5z'
                        }
                    },
                    lastPointOffset: 0,
                    vmlEndArrow: 'none'
                },
                17: {
                    marker: {
                        viewBox: '0 0 24 24',
                        refX: 12,
                        refY: 12,
                        markerHeight: 24,
                        markerWidth: 24,
                        path: {
                            d: 'M10,3C9.488,3,8.976,3.195,8.586,3.586l-1,1c-0.609,0.608-0.76,1.539-0.375,2.309L9,10.472v3.057 l-1.789,3.577c-0.385,0.771-0.234,1.7,0.375,2.309l1,1C8.976,20.805,9.488,21,10,21s1.023-0.195,1.414-0.586l7-7 c0.781-0.781,0.781-2.047,0-2.828l-7-7C11.023,3.195,10.512,3,10,3L10,3z'
                        }
                    },
                    lastPointOffset: !L.Browser.vml ? -3 : 0,
                    vmlEndArrow: 'none'
                },
                18: {
                    marker: {
                        viewBox: '0 0 24 24',
                        refX: 12,
                        refY: 12,
                        markerHeight: 24,
                        markerWidth: 24,
                        path: {
                            d: 'M8,1C7.488,1,6.976,1.195,6.586,1.586l-1,1c-0.674,0.674-0.779,1.73-0.25,2.523L9,10.605v2.789l-3.664,5.496 c-0.529,0.793-0.424,1.85,0.25,2.523l1,1C6.976,22.805,7.488,23,8,23s1.024-0.195,1.414-0.586l9-9c0.781-0.781,0.781-2.047,0-2.828 l-9-9C9.024,1.195,8.512,1,8,1L8,1z'
                        }
                    },
                    lastPointOffset: !L.Browser.vml ? -5 : -2,
                    vmlEndArrow: 'none',
                    weight: 10
                }
            }
        };
    },

    _getArrowOptionsBlunt: function () {
        return {
            clickable: false,
            color: '#6f8497',
            weight: 3,
            byZoom: {
                16: {
                    marker: {
                        viewBox: '0 0 24 24',
                        refX: 12,
                        refY: 12,
                        markerHeight: 24,
                        markerWidth: 24,
                        polygon: {
                            points: '15,12 10,7 9,8 11,11 11,13 9,16 10,17'
                        }
                    },
                    lastPointOffset: 0
                },
                17: {
                    marker: {
                        viewBox: '0 0 24 24',
                        refX: 12,
                        refY: 12,
                        markerHeight: 24,
                        markerWidth: 24,
                        polygon: {
                            points: '17,12 10,5 9,6 11,10 11,14 9,18 10,19'
                        }
                    },
                    lastPointOffset: !L.Browser.vml ? -3 : 0
                },
                18: {
                    marker: {
                        viewBox: '0 0 24 24',
                        refX: 12,
                        refY: 12,
                        markerHeight: 24,
                        markerWidth: 24,
                        polygon: {
                            points: '17,12 8,3 7,4 11,10 11,14 7,20 8,21'
                        }
                    },
                    lastPointOffset: !L.Browser.vml ? -5 : 0,
                    weight: 4
                }
            }
        };
    }
});