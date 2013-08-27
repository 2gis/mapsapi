L.Map.mergeOptions({
    dgPoi: false
});

L.DG.Poi = L.Handler.extend({
    _isPoiHoverNow: false,
    _currTile: null,
    _pois: {},

    initialize: function (map) { // (Object)
        this._map = map;
        this._tileSize = L.DG.TileLayer.prototype.options.tileSize;	// TODO: tileSize getter
        this._poistorage = new L.DG.PoiStorage();
    },

    addHooks: function () {
        this._calcTilesAtZoom();
        this._map
                .on('mousemove', this._onMouseMove, this)
                .on('viewreset', this._calcTilesAtZoom, this);
    },

    removeHooks: function () {
        this._map
                .off('mousemove', this._onMouseMove, this)
                .off('viewreset', this._calcTilesAtZoom, this);
    },

    getStorage: function () {
        return this._poistorage;
    },

    _calcTilesAtZoom : function () {
        this._tilesAtZoom = Math.pow(2, this._map.getZoom()); // counts tiles number on current zoom
    },

    _onMouseMove: function (e) { // (Object)
        if (this._map._panTransition && this._map._panTransition._inProgress) { return; }

        var xyz = this._getTileID(e);

        if (this._isTileChanged(xyz)) {
            this._currTile = xyz;
            this._pois = this._poistorage.getTilePoiIds(xyz);
        }

        var poiId = this._isPoiHovered(e.latlng, this._pois);

        if (!this._isPoiHoverNow && poiId) {
            this._isPoiHoverNow = true;
            this._map.fire('dgPoiHover', {'poiId': poiId});
        }
        if (this._isPoiHoverNow && !poiId) {
            this._map.fire('dgPoiLeave');
            this._isPoiHoverNow = false;
        }
    },

    _getTileID: function (e) { // (L.Event)
        var p = this._map.project( e.latlng.wrap() ),
            x = Math.floor(p.x / this._tileSize) % this._tilesAtZoom, // prevent leaflet bug with tile number detection on worldwrap
            y = Math.floor(p.y / this._tileSize);

        return x + ',' +  y + ',' + this._map._zoom;
    },

    _isTileChanged: function (xyz) { // (String)
        return !(this._currTile === xyz);
    },

    _isPoiHovered: function (point, pois) { // (L.Point)
        var poi = null;

        for (var i = 0, len = pois.length; i < len; i++) {
            var verts = this._poistorage.getPoi(pois[i]).vertices;
            if (L.PolyUtil.contains(point, verts)) {
                poi = pois[i];
                break;
            }
        }

        return poi;
    }

});

L.Map.addInitHook('addHandler', 'dgPoi', L.DG.Poi);
