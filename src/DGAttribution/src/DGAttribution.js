DG.Control.Attribution.include(DG.Locale);
DG.Control.Attribution.Dictionary = {};
DG.Control.Attribution.include({
    options: {
        position: 'bottomright'
    },

    _getLink: function(linkType) {
        /* eslint-disable camelcase */
        var dictionary = {
            ru: {
                copyright_logo: 'http://info.2gis.ru/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_apilink: 'http://api.2gis.ru/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_license: 'http://law.2gis.ru/api-rules/'
            },

            it: {
                copyright_logo: 'http://2gis.it/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_apilink: 'http://2gis.it/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_license: 'http://law.2gis.it/licensing-agreement/'
            },

            cz: {
                copyright_logo: 'http://praha.2gis.cz/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_apilink: 'http://praha.2gis.cz/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_license: 'http://law.2gis.cz/api-rules/'
            },

            cl: {
                copyright_logo: 'http://santiago.2gis.cl/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_apilink: 'http://santiago.2gis.cl/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_license: 'http://law.2gis.cl/api-rules/'
            },

            cy: {
                copyright_logo: 'http://info.2gis.com.cy/lemesos?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_apilink: 'http://info.2gis.com.cy/lemesos?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_license: 'http://law.2gis.com.cy/api-rules/'
            },

            ae: {
                copyright_logo: 'http://info.2gis.ae/dubai?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_apilink: 'http://info.2gis.ae/dubai?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_license: 'http://law.2gis.ae/api-rules/'
            }
        };
        /* eslint-enable camelcase */

        var countryCode = (this._countryCode in dictionary) ? this._countryCode : 'ru';

        return dictionary[countryCode][linkType];
    },

    onAdd: function(map) {
        if (!map._copyright) {
            map._copyright = true;
            this._first = true;
        }

        map.attributionControl = this;
        this._container = DG.DomUtil.create('div', 'dg-attribution');
        DG.DomEvent.disableClickPropagation(this._container);

        for (var i in map._layers) {
            if (map._layers[i].getAttribution) {
                this.addAttribution(map._layers[i].getAttribution());
            }
        }

        this._update();

        return this._container;
    },

    _update: function(lang, osm, countryCode) {
        if (!this._map) { return; }

        if (typeof osm !== 'undefined') {
            this._osm = osm;
        }

        if (typeof countryCode !== 'undefined') {
            this._countryCode = countryCode;
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
    _getData: function(lang) {
        lang = lang || this._map.getLang();

        return {
            'osm': this._osm,
            'work_on': this.t('work_on'),
            'work_on_with_osm': this.t('work_on_with_osm'),
            'lang': lang,
            'copyright_apilink': this._getLink('copyright_apilink'),
            'copyright_license': this._getLink('copyright_license'),
            'copyright_logo': this._getLink('copyright_logo'),
            'license_agreement': this.t('license_agreement'),
            'dir': lang !== 'ar' ? 'ltr' : 'rtl',
        };
    },
    _getAttributionHTML: function(lang) {
        return DG.dust('DGAttribution/copyright', this._getData(lang));
    },
    _renderTranslation: function(e) {
        this._update(e.lang);
    }
});

DG.Map.addInitHook(function() {
    if (!this._copyright) {
        DG.control.attribution().addTo(this);
    }
});
