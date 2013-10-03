L.Control.Attribution.include(L.DG.Locale);
L.Control.Attribution.Dictionary = {};
L.Control.Attribution.include({
    options: {
        position: 'bottomright'
    },
    onAdd: function (map) {
        if (!this.options.prefix) {
            this.options.prefix = L.DG.template(this._tmpl.copyright, this._getData());
        }
        return this._onAdd.call(this, map);
    },
    _tmpl: __DGCustomization_TMPL__,
    _onAdd: L.Control.Attribution.prototype.onAdd,
    _getData: function (lang) {
        return {
            'lang': lang || this._map.getLang(),
            'copyright_apilink': this.t('copyright apilink'),
            'copyright_license': this.t('copyright license'),
            'license_agreement': this.t('License agreement'),
            'copyright_logo': this.t('copyright logo'),
            'API_2GIS': this.t('API 2GIS'),
            'TWOGIS': this.t('2GIS'),
            'PTC': this.t('PTC')
        };
    },
    _renderTranslation: function (data) {
        this.options.prefix = L.DG.template(this._tmpl.copyright, this._getData(data.lang));
        this._update();
    }
});