L.DG.Entrance = L.Class.extend({

    includes: L.Mixin.Events,

    options: {
        vectors: []
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
            arrow.setStyle({ visibility: 'hidden' });
        });
        this._isShown = false;
    },

    addTo: function (map) { // (L.Map) -> L.DG.Entrance
        map.addLayer(this);
        return this;
    },

    onRemove: function () { // (L.Map)
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

    show: function (fitBounds) { // () -> L.DG.Entrance
        if (fitBounds !== false) {
            fitBounds = true;
        }

        if (!this.isShown() && this._arrows) {
            if (fitBounds) {
                this._fitBounds();
            }
            if (this._isAllowedZoom()) {
                this._arrows.eachLayer(function (arrow) {
                    arrow.setStyle({ visibility: 'visible' });
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
                arrow.setStyle({ visibility: 'hidden' });
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
            this._arrows.addLayer(L.DG.Entrance.arrow(latlngs, this._getArrowStrokeOptions()));

            // basis
            this._arrows.addLayer(L.DG.Entrance.arrow(latlngs, this._getArrowOptions()));
        }

        return this._arrows;
    },

    _removeArrows: function () {
        this._map.removeLayer(this._arrows.clearLayers());
    },

    _fitBounds: function () {
        var map = this._map,
            maxZoom;

        map.once('moveend', function () {
            if (this._map && !this._isAllowedZoom()) {
                maxZoom = map.dgProjectDetector.getProject().max_zoomlevel;
                map.setZoom(maxZoom, {animate: false});
            }
        }, this);

        if (!map.getBounds().contains(this.getBounds()) || !this._isAllowedZoom()) {
            map.panTo(this.getBounds().getCenter(), {animate: false});
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
            opacity: 1,
            byZoom: {
                16: {
                    marker: {
                        viewBox: '0 0 24 24',
                        refX: 12,
                        refY: 12,
                        markerHeight: 24,
                        markerWidth: 24,
                        path: {
                            d:  'M9.313,18.984c2.246-1.468,7.101-5.562,' +
                                '7.101-5.562c0.781-0.781,0.781-2.047,0-' +
                                '2.828c0,0-5.242-4.023-7.101-5.102C9.74' +
                                ',5.354,8.583,5.93,8.125,6.5C7.902,6.77' +
                                '7,9,11.614,9,11.614v0.789c0,0-0.879,4.' +
                                '237-0.905,5.285C8.09,17.891,9.108,19.1' +
                                '18,9.313,18.984z'
                        }
                    },
                    lastPointOffset: 2,
                    vmlEndArrow: 'none',
                    weight: 6
                },
                17: {
                    marker: {
                        viewBox: '0 0 24 24',
                        refX: 12,
                        refY: 12,
                        markerHeight: 24,
                        markerWidth: 24,
                        path: {
                            d:  'M7.912,21.498c3.106-2.029,9.859-7.873,' +
                                '9.859-7.873c2.059-1.807,2.142-1.542,0.' +
                                '146-3.208c0,0-7.434-6.084-10.005-7.576' +
                                'C7.583,2.649,6.903,3.446,6.271,4.233c-' +
                                '0.308,0.384,2.209,6.051,2.209,6.051v3.' +
                                '388c0,0-2.215,4.583-2.25,6.03C6.222,19' +
                                '.986,7.629,21.684,7.912,21.498z'
                        }
                    },
                    lastPointOffset: 0,
                    vmlEndArrow: 'none',
                    weight: 7
                },
                18: {
                    marker: {
                        viewBox: '0 0 24 24',
                        refX: 12,
                        refY: 12,
                        markerHeight: 24,
                        markerWidth: 24,
                        path: {
                            d:  'M7.61,22.688c4.045-2.642,11.312-8.906,' +
                                '11.312-8.906c1.92-1.781,1.938-2-0.124-' +
                                '3.781c0,0-8.151-6.334-11.5-8.276C6.87,' +
                                '1.475,5.516,2.62,5.732,3.093c2.146,4.6' +
                                '94,2.063,4.741,2.612,7.469l0.016,2.75c' +
                                '0,0-1.573,5.458-2.619,7.958C5.599,21.6' +
                                '11,7.241,22.93,7.61,22.688z'
                        }
                    },
                    lastPointOffset: !L.Browser.vml ? -5 : -2,
                    vmlEndArrow: 'none',
                    weight: 8
                }
            }
        };
    },

    _getArrowOptions: function () {
        return {
            clickable: false,
            color: '#6f8497',
            weight: 3,
            opacity: 1,
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
                    lastPointOffset: 2,
                    weight: 2
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
                    lastPointOffset: 0,
                    weight: 3
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
