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
                weight: 10
            }));*/
            this._arrows.addLayer(L.DG.Entrance.arrow(latlngs, {
                clickable: false,
                color: '#6f8497',
                weight: 4
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
