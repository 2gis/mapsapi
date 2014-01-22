DG.TileLayer.dgis = DG.TileLayer.extend({
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
            options = DG.setOptions(this, this.options);
        DG.TileLayer.prototype.initialize.call(this, url, options);
    }
});

DG.tileLayerDgis = function () {
    return new DG.TileLayer.dgis();
};

DG.Map.include({
    getLayer: function (id) {
        return this._layers[id];
    }
});

DG.Map.addInitHook(function () {
    if (!this._copyright) {
        DG.control.attribution().addTo(this);
    }
    DG.tileLayerDgis().addTo(this);
});

