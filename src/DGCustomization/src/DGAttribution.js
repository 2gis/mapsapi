L.Control.Attribution.include(L.DG.Locale);
L.Control.Attribution.Dictionary = {};
L.Control.Attribution.include({
    options: {
        position: 'bottomright'
    },
    onAdd: function (map) {
        if (!map._copyright) {
            map._copyright = true;
            this._first = true;
        }
        return this._onAdd.call(this, map);
    },
    _update: function () {
        if (!this._map) { return; }

        var attribs = [];

        for (var i in this._attributions) {
            if (this._attributions[i]) {
                attribs.push(i);
            }
        }

        var prefixAndAttribs = [];

        if (this._first) {
            prefixAndAttribs.push(this._getAttributionHTML());
        }

        if (this.options.prefix) {
            prefixAndAttribs.push(this.options.prefix);
        }
        if (attribs.length) {
            prefixAndAttribs.push(attribs.join(', '));
        }

        this._container.innerHTML = prefixAndAttribs.join(' | ');
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
    _getAttributionHTML: function () {
        return L.DG.template(this._tmpl.copyright, this._getData());
    },
    _renderTranslation: function () {
        this._update();
    }
});