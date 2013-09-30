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
    attributionControl: false
});

L.Control.Attribution.include(L.DG.Locale);
L.Control.Attribution.Dictionary = {};
L.Control.Attribution.include({
    _tmpl: __DGTileLayer_TMPL__,
    _onAdd: L.Control.Attribution.prototype.onAdd,
    _getData: function () {
        return {
            'lang': this._map.getLang(),
            'copyright_apilink': this.t('copyright apilink'),
            'copyright_license': this.t('copyright license'),
            'license_agreement': this.t('License agreement'),
            'copyright_logo': this.t('copyright logo'),
            'API_2GIS': this.t('API 2GIS'),
            'TWOGIS': this.t('2GIS'),
            'PTC': this.t('PTC')
        };
    },
    options: {
        position: 'bottomright'
    },
    onAdd: function (map) {
        this.options.prefix = L.DG.template(this._tmpl.copyright, this._getData());
        return this._onAdd.call(this, map);
    },
    _renderTitles: function () {
        this.options.prefix = L.DG.template(this._tmpl.copyright, this._getData());
        this._update();
    }
});
L.Map.addInitHook(function () {
    L.control.attribution().addTo(this);
    L.DG.tileLayer().addTo(this);
});
