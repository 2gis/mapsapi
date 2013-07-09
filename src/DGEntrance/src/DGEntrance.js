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
        this._arrows = L.featureGroup();
    },

    onAdd: function (map) { // (L.Map)
        this._map = map;
        this._initArrows().addTo(map);
        this._eventHandler = new L.DG.Entrance.EventHandler(map, this);

        this.hide();

        if (map.getZoom() < L.DG.Entrance.SHOW_FROM_ZOOM) {
            map.setView(this.getBounds().getCenter(), L.DG.Entrance.SHOW_FROM_ZOOM);
        };
    },

    addTo: function (map) { // (L.Map) -> L.DG.Entrance
        map.addLayer(this);
        return this;
    },

    onRemove: function (map) { // (L.Map)
        this._map.removeLayer(this._arrows.clearLayers());
        this._map = null;
        this._eventHandler.remove();
        this._eventHandler = null;
    },

    removeFrom: function (map) { // (L.Map) -> L.DG.Entrance
        map.removeLayer(this);
        return this;
    },

    show: function (animation) { // (Object) -> L.DG.Entrance
        var self = this;

        if (!this.isShown()) {
            this._arrows.eachLayer(function (arrow) {
                arrow.runAnimation({opacity: 1});
            });
            this._isShown = true;
            this._map.fire('dgEntranceShow');
        };

        return this;
    },

    hide: function () { // () -> L.DG.Entrance
        var self = this;

        if (this.isShown()) {
            this._arrows.eachLayer(function (arrow) {
                arrow.runAnimation({opacity: 0});
            });
            this._isShown = false;
            this._map.fire('dgEntranceHide');
        };

        return this;
    },

    isShown: function () { // () -> Boolean
        return this._isShown;
    },

    getBounds: function () { // () -> LatLngBounds
        return this._arrows.getBounds();
    },

    _initArrows: function () { // () -> L.FeatureGroup
        var wkt, components, latlngs;

        for (var i = 0; i < this.options.vectors.length; i++) {
            wkt = new L.DG.Wkt();
            components = wkt.read(this.options.vectors[i]);
            latlngs = [];

            for (var j = 0; j < components.length; j++) {
                latlngs.push([components[j].y, components[j].x]);
            };

            this._arrows.addLayer(L.DG.Entrance.arrow(latlngs, {
                clickable: false
            }));
        };

        return this._arrows;
    }
});
