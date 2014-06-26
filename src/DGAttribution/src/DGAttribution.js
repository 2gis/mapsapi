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
    _update: function (lang, osm) {
        if (!this._map) { return; }

        if (typeof osm !== 'undefined') {
            this._osm = osm;
        }

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
    /* global __DGAttribution_TMPL__ */
    _tmpl: DG.dust(__DGAttribution_TMPL__),
    _onAdd: DG.Control.Attribution.prototype.onAdd,
    _getData: function (lang, osm) {
        return {
            'osm': this._osm,
            'work_on': this.t('work_on'),
            'lang': lang || this._map.getLang(),
            'copyright_apilink': this.t('copyright_apilink'),
            'copyright_license': this.t('copyright_license'),
            'license_agreement': this.t('license_agreement'),
            'copyright_logo': this.t('copyright_logo'),
            'API_2GIS': this.t('API_2GIS')
        };
    },
    _getAttributionHTML: function (lang) {
        return this._tmpl('copyright', this._getData(lang));
    },
    _renderTranslation: function (e) {
        this._update(e.lang);
    }
});

DG.Map.addInitHook(function () {
    if (!this._copyright) {
        DG.control.attribution().addTo(this);
    }
});
