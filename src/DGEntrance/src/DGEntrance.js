L.DG.Entrance = L.Class.extend({

    includes: L.Mixin.Events,

    options: {
        points: [],
        vectors: []
    },

    statics: {
        SHOW_FROM_ZOOM: 16
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
        this._fitBounds();

        if (!this.isShown() && this._arrows) {
            this._arrows.eachLayer(function (arrow) {
                arrow.setStyle({opacity: 0.9});
                arrow.runAnimation('animateArrowPathGeom');
            });
            this._isShown = true;
            this._map.fire('dgEntranceShow');
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

            /*this._arrows.addLayer(L.DG.Entrance.arrow(latlngs, {
                clickable: false,
                color: '#fafeff',
                weight: 10,
                markerEndD: 'M19,9.001c0-1.137-0.643-2.174-1.658-2.684l-12-6C4.188-0.261,2.792-0.034,1.879,0.88l-1,1    C0.293,2.466,0,3.233,0,4.002s0.293,1.536,0.879,2.121L3,8.243v1.516L0.879,11.88C0.293,12.466,0,13.233,0,14.001 s0.293,1.535,0.879,2.121l1,1c0.913,0.913,2.309,1.141,3.463,0.563l12-6C18.357,11.176,19,10.138,19,9.001L19,9.001z'
            }));*/
            this._arrows.addLayer(L.DG.Entrance.arrow(latlngs, {
                clickable: false,
                color: '#6f8497',
                weight: 4,
                marker: {
                    16: {
                        attr: {
                            viewBox: '0 0 19 18',
                            refX: 12,
                            refY: 9,
                            markerHeight: 18,
                            markerWidth: 19,
                            markerUnits: 'userSpaceOnUse',
                            orient: 'auto'
                        },
                        path: {
                            d: 'M16,9.002 L4,3.002 3,4.002 6,7.002 6,11.002 3,14.002 4,15.002z',
                            fill: '#6f8497' 
                        }
                    },

                    17: {
                        attr: {
                            viewBox: '2.5 19 21 20',
                            refX: 12,
                            refY: 29,
                            markerHeight: 20,
                            markerWidth: 21,
                            markerUnits: 'userSpaceOnUse',
                            orient: 'auto'
                        },
                        path: {
                            d: 'M20.5,29.001 L6.5,22.001 5.5,23.001 9.5,27.001 9.5,31.001 5.5,35.001 6.5,36.001z',
                            fill: '#6f8497'
                        }
                    },
                    
                    18: {
                        attr: {
                            viewBox: '0 0 23 22',
                            refX: 12,
                            refY: 11,
                            markerHeight: 22,
                            markerWidth: 23,
                            markerUnits: 'userSpaceOnUse',
                            orient: 'auto',
                        },
                        path: {
                            d: 'M20,11 L4,3 3,4 7,8 7,14 3,18 4,19z',
                            fill: '#6f8497'
                        }
                    }
                }
            }));
        }

        return this._arrows;
    },

    _removeArrows: function () {
        this._map.removeLayer(this._arrows.clearLayers());
    },

    _fitBounds: function () {
        if (this._map.getZoom() < L.DG.Entrance.SHOW_FROM_ZOOM) {
            this._map.setView(this.getBounds().getCenter(), L.DG.Entrance.SHOW_FROM_ZOOM, { animate: true });
        }

        if (!this._map.getBounds().intersects(this.getBounds())) {
            this._map.panTo(this.getBounds().getCenter());
        }
    }
});
