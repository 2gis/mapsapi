L.DG.TileLayer = L.TileLayer.extend({
    dgTileLayerUrl: '__TILE_SERVER__',
    options: {
        subdomains: '0123',
        errorTileUrl: '__ERROR_TILE_URL__',
        detectRetina: true,
        maxNativeZoom: 18,
        uid: 'dgTileLayer'
    },

    initialize: function () {
        var url = this.dgTileLayerUrl,
            options = L.setOptions(this, this.options);
        L.TileLayer.prototype.initialize.call(this, url, options);
    }
});

L.DG.tileLayer = function () {
    return new L.DG.TileLayer();
};

L.Map.include({
    getLayer: function (id) {
        return this._layers[id];
    }
});

L.Map.addInitHook(function () {
    if (!this._copyright) {
        L.control.attribution().addTo(this);
    }
    L.DG.tileLayer().addTo(this);
});

