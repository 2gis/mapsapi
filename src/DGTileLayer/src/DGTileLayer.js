L.DG.TileLayer = L.TileLayer.extend({
    dgTileLayerUrl: '__TILE_SERVER__',
    options: {
        subdomains: '0123',
        errorTileUrl: '__ERROR_TILE_URL__'
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
    attributionControl: false
});

L.Map.addInitHook(function () {
    var html = L.DG.template(__DGTileLayer_TMPL__.copyright, {lang: this.getLang()}),
        options = {
            position: 'bottomright',
            prefix: html
        },
        self = this;

    L.Control.Attribution.include({
        _renderTitles: function () {
            this.options.prefix = L.DG.template(__DGTileLayer_TMPL__.copyright, {lang: self.getLang()});
            this._update();
        }
    });
    
    new L.Control.Attribution(options).addTo(this);
    L.DG.tileLayer().addTo(this);
});
