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
        if (!this._isAllowedZoom()) {
            this._map.setView(this.getBounds().getCenter(), this._map.dgProjectDetector.getProject().max_zoomlevel, { animate: false });
        }

        if (!this._map.getBounds().intersects(this.getBounds())) {
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
                weight: 10,
                byZoom: {
                    16: {
                        marker: {
                            viewBox: '0 0 19 18',
                            refX: 12,
                            refY: 9,
                            markerHeight: 18,
                            markerWidth: 19
                        },
                        markerPath: {
                            d: 'M19,9.001c0-1.137-0.643-2.174-1.658-2.684l-12-6C4.188-0.261,2.792-0.034,1.879,0.88l-1,1 C0.293,2.466,0,3.233,0,4.002s0.293,1.536,0.879,2.121L3,8.243v1.516L0.879,11.88C0.293,12.466,0,13.233,0,14.001 s0.293,1.535,0.879,2.121l1,1c0.913,0.913,2.309,1.141,3.463,0.563l12-6C18.357,11.176,19,10.138,19,9.001L19,9.001z'
                        },
                        lastPointOffset: 0,
                        vmlEndArrow: 'none'
                    },
                    17: {
                        marker: {
                            viewBox: '2.5 19 21 20',
                            refX: 12,
                            refY: 29,
                            markerHeight: 20,
                            markerWidth: 21
                        },
                        markerPath: {
                            d: 'M23.5,29c0-1.137-0.643-2.174-1.658-2.683l-14-7c-1.154-0.578-2.55-0.352-3.463,0.562l-1,1 C2.793,21.465,2.5,22.233,2.5,23.001c0,0.769,0.293,1.536,0.879,2.121l3.121,3.12v1.516l-3.121,3.121 C2.793,33.465,2.5,34.232,2.5,35s0.293,1.535,0.879,2.121l1,1c0.913,0.913,2.309,1.141,3.463,0.563l14-7 C22.857,31.175,23.5,30.137,23.5,29L23.5,29z'
                        },
                        lastPointOffset: 5,
                        vmlEndArrow: 'none'
                    },
                    18: {
                        marker: {
                            viewBox: '0 0 23 22',
                            refX: 12,
                            refY: 11,
                            markerHeight: 22,
                            markerWidth: 23
                        },
                        markerPath: {
                            d: 'M23,11.001c0-1.139-0.643-2.174-1.658-2.686l-16-7.998C4.188-0.261,2.792-0.034,1.879,0.88 l-1,1C0.293,2.466,0,3.233,0,4.002s0.293,1.536,0.879,2.12L4,9.244v3.515L0.879,15.88C0.293,16.466,0,17.231,0,18.001 c0,0.768,0.293,1.534,0.879,2.12l1,1c0.913,0.913,2.309,1.142,3.463,0.563l16-8C22.357,13.176,23,12.14,23,11.001L23,11.001z'
                        },
                        lastPointOffset: 5,
                        vmlEndArrow: 'none'
                    }
                }
            };
    },

    _getArrowOptions: function () {
        return {
                clickable: false,
                color: '#6f8497',
                weight: 4,
                byZoom: {
                    16: {
                        marker: {
                            viewBox: '0 0 19 18',
                            refX: 12,
                            refY: 9,
                            markerHeight: 18,
                            markerWidth: 19
                        },
                        markerPath: {
                            d: 'M16,9.002 L4,3.002 3,4.002 6,7.002 6,11.002 3,14.002 4,15.002z'
                        },
                        lastPointOffset: 0
                    },
                    17: {
                        marker: {
                            viewBox: '2.5 19 21 20',
                            refX: 12,
                            refY: 29,
                            markerHeight: 20,
                            markerWidth: 21
                        },
                        markerPath: {
                            d: 'M20.5,29.001 L6.5,22.001 5.5,23.001 9.5,27.001 9.5,31.001 5.5,35.001 6.5,36.001z'
                        },
                        lastPointOffset: 5
                    },
                    18: {
                        marker: {
                            viewBox: '0 0 23 22',
                            refX: 12,
                            refY: 11,
                            markerHeight: 22,
                            markerWidth: 23
                        },
                        markerPath: {
                            d: 'M20,11 L4,3 3,4 7,8 7,14 3,18 4,19z'
                        },
                        lastPointOffset: 5
                    }
                }
            };
    }
});
