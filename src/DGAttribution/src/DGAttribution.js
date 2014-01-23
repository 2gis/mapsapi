DG.Control.Attribution.include(DG.Locale);
DG.Control.Attribution.Dictionary = {};
DG.Control.Attribution.include({
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
    _update: function (lang) {
        if (!this._map) { return; }

        var attribs = [];

        for (var i in this._attributions) {
            if (this._attributions[i]) {
                attribs.push(i);
            }
        }

        var prefixAndAttribs = [],
            copyright = '';

        if (this._first) {
            copyright = this._getAttributionHTML(lang);
        }

        if (this.options.prefix) {
            prefixAndAttribs.push(this.options.prefix);
        }
        if (attribs.length) {
            prefixAndAttribs.push(attribs.join(', '));
        }

        this._container.innerHTML = copyright + prefixAndAttribs.join(' | ');
    },
    /* global __DGAttribution_TMPL__, __DGAttribution_DUST__, dust */
    _tmpl: __DGAttribution_TMPL__,
    _dust: __DGAttribution_DUST__,
    _onAdd: DG.Control.Attribution.prototype.onAdd,
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
    _getAttributionHTML: function (lang) {
        dust.loadSource(this._dust.copyright);
        return DG.dust('copyright', this._getData(lang));
    },
    _renderTranslation: function (e) {
        this._update(e.lang);
    }
});