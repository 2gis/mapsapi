L.Map.mergeOptions({
    dgPoi: false
});

L.DG.Poi = L.Handler.extend({
    _isPoiHoverNow: false,
    currTile: 0,
    pois: {},

    initialize: function (map) { // (Object)
        this._map = map;
        this._tileSize = L.DG.TileLayer.prototype.options.tileSize;	// TODO
        this._poistorage = new L.DG.PoiStorage();
    },

    addHooks: function () {
        this._calcTilesAtZoom();
        this._limitedMouseMove = L.Util.limitExecByInterval(this._onMouseMove);
        this._map
                .on('mousemove', this._onMouseMove, this)
                .on('viewreset', this._calcTilesAtZoom, this);
    },

    removeHooks: function () {
        this._map.off('mousemove', this._limitedMouseMove, this);
    },

    getStorage: function () {
        return this._poistorage;
    },

    _calcTilesAtZoom : function () {
        this._tilesAtZoom = 1 << this._map.getZoom(); // counts tiles number on current zoom
    },

    _onMouseMove: function (e) { // (Object)
        if (this._map._panTransition && this._map._panTransition._inProgress) { return; }

        var xyz = this._getTileID(e);

        if (this._isTileChanged(xyz)) {
            this.currTile = xyz;
            this.pois = this._poistorage.getTilePois(xyz);

            //DELETE THIS CODE. Draw pois area for demo
            var wkt = new L.DG.Wkt(), self=this;
            this.pois.forEach(function (poi){
                self._poistorage.getPoi(poi).lObj.addTo(self._map);
            });
            //DELETE THIS CODE
        }

        var poiId = this._isPoiHovered(e.latlng);

        if (!this._isPoiHoverNow && poiId) {
            console.log('hovered ' + poiId + ' poi');

            this._isPoiHoverNow = true;
            this._map.fire('dgPoiHover', {'poiId': poiId});
        }
        if (this._isPoiHoverNow && !poiId) {
            console.log('leave poi');

            this._map.fire('dgPoiLeave');
            this._isPoiHoverNow = false;
        }
    },

    _getTileID: function (e) { // (L.Event)
        var p = this._map.project( e.latlng.wrap() ),
            x = Math.floor(p.x / 256) % this._tilesAtZoom,
            y = Math.floor(p.y / 256);

        return x + ',' +  y + ',' + this._map._zoom;
    },

    _isTileChanged: function (xyz) { // (String)
        return !(this.currTile === xyz);
    },

    _isPoiHovered: function (point) { // (L.Point)
        var poi = null,
            pois = this.pois;

        for (var i = 0, len = pois.length; i < len; i++) {
            var verts = this._poistorage.getPoi(pois[i]).lObj._latlngs;
            if (L.PolyUtil.contains(point, verts)) {
                poi = pois[i];
                break;
            }
        }

        return poi;
    }

});

L.Map.addInitHook('addHandler', 'dgPoi', L.DG.Poi);
