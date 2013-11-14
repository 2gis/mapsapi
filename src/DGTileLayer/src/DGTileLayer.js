L.DG.TileLayer = L.TileLayer.extend({
    dgTileLayerUrl: '__TILE_SERVER__',
    options: {
        subdomains: '0123',
        errorTileUrl: '__ERROR_TILE_URL__',
        detectRetina: true
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

L.Map.mergeOptions({
    attributionControl: false,
    maxZoom: (L.Browser.retina && L.Browser.touch) ? '__RETINA_MAX_ZOOM__' : 18
});

L.Map.addInitHook(function () {
    L.control.attribution().addTo(this);
    L.DG.tileLayer().addTo(this);
});
