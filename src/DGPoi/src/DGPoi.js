L.DG = L.DG || {};

L.Map.mergeOptions({
    dgPoi: false
});

L.DG.Poi = L.Handler.extend({

    initialize: function (map) { // (Object)
        this._map = map;
        this._tileSize = L.DG.TileLayer.prototype.options.tileSize;	// TODO
        this._poistorage = new L.DG.PoiStorage();
    },

    addHooks: function () {
    	this._limitedMouseMove = L.Util.limitExecByInterval(this._onMouseMove, 150, this);
        this._map.on('mousemove', this._limitedMouseMove, this);
    },

	removeHooks: function () {
		this._map.off('mousemove', this._limitedMouseMove, this);
    },

    getStorage: function() {
        return this._poistorage;
    },

    _onMouseMove: function (e) { // (Object)
    	if (this._map._panTransition && this._map._panTransition._inProgress) { return; }
    	
    	var p = this._map.project( e.latlng ),
    		x = Math.ceil(p.x / 256), 
    		y = Math.ceil(p.y / 256);

        // console.log(, this._map._zoom);
        // console.log( this._map.getPixelBounds() );
        // console.log( this._map.latLngToLayerPoint( e.latlng ) );
        console.log( x, y );
    }

});

L.Map.addInitHook('addHandler', 'dgPoi', L.DG.Poi);

