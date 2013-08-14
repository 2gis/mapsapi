L.Map.mergeOptions({
    dgPoi: false
});

L.DG.Poi = L.Handler.extend({

    currTile: 0,
    currPois: {},

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

    getStorage: function() {
        return this._poistorage;
    },

    _calcTilesAtZoom : function(){
        this._tilesAtZoom = 1 << this._map.getZoom(); // считает кол-во тайлов на зуме
    },

    _onMouseMove: function (e) { // (Object)
        if (this._map._panTransition && this._map._panTransition._inProgress) { return; }

        var xyz = this._getTileID(e),
            pois = [];

        if (this._isTileChanged(xyz)) {
            this.currTile = xyz;
            pois = this._poistorage.getTilePois(xyz);

            //DELETE THIS CODE
            var wkt = new L.DG.Wkt(), self=this;
            pois.forEach(function (poi){
                var poiWkt = self._poistorage.getPoi(poi).hover,
                    polygonComponents = wkt.read(poiWkt);
                    self.currPois[poi] = wkt.toObject(polygonComponents)._latlngs;
                wkt.toObject(polygonComponents).addTo(self._map);
            })
            //DELETE THIS CODE
        }

        var check = this._isPoiHovered(e.latlng);
        if (check) {
            console.log('hovered ' + check + ' poi');
        }
        //console.log(L.Projection.SphericalMercator.project(e.latlng));
    },

    _getTileID: function (e) {
        var p = this._map.project( e.latlng.wrap() ),
            x = Math.floor(p.x / 256) % this._tilesAtZoom,
            y = Math.floor(p.y / 256);

        return x + ',' +  y + ',' + this._map._zoom;
    },

    _isTileChanged: function (xyz) {
        return !(this.currTile === xyz);
    },

    _isPoiHovered: function (point) {
        var poi = null, pois = this.currPois;
        for (var i in pois) {
            if (pois.hasOwnProperty(i)) {

                if (L.PolyUtil.contains(point, pois[i])) {
                    poi = i;
                    break;
                }
            }
        }

        return poi;
    }

});

L.Map.addInitHook('addHandler', 'dgPoi', L.DG.Poi);
