DG.Control.Attribution.include(DG.Locale);
DG.Control.Attribution.Dictionary = {};
DG.Control.Attribution.include({
    options: {
        position: 'bottomright'
    },

    _getLink: function (linkType) {
        /* eslint-disable camelcase */
        var dictionary = {
            ru: {
                copyright_logo: 'http://info.2gis.ru/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_apilink: 'http://api.2gis.ru/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_license: 'http://help.2gis.ru/licensing-agreement/'
            },

            it: {
                copyright_logo: 'http://2gis.it/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_apilink: 'http://2gis.it/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_license: 'http://2gis.it/'
            },

            cz: {
                copyright_logo: 'http://praha.2gis.cz/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_apilink: 'http://praha.2gis.cz/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_license: 'http://law.2gis.cz/licensing-agreement/'
            },

            cl: {
                copyright_logo: 'http://santiago.2gis.cl/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_apilink: 'http://santiago.2gis.cl/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_license: 'http://law.2gis.cl/licensing-agreement/'
            },

            cy: {
                copyright_logo: 'http://info.2gis.com.cy/lemesos?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_apilink: 'http://info.2gis.com.cy/lemesos?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_license: 'http://law.2gis.com.cy/licensing-agreement/'
            },

            ae: {
                copyright_logo: 'http://info.2gis.ae/dubai?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_apilink: 'http://info.2gis.ae/dubai?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_license: 'http://law.2gis.ae/licensing-agreement/'
            }
        };
        /* eslint-enable camelcase */

        var countryCode = (this._countryCode in dictionary) ? this._countryCode : 'ru';

        return dictionary[countryCode][linkType];
    },

    onAdd: function (map) {
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

    _update: function (lang, osm, countryCode) {
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
    _getData: function (lang) {
        return {
            'osm': this._osm,
            'work_on': this.t('work_on'),
            'lang': lang || this._map.getLang(),
            'copyright_apilink': this._getLink('copyright_apilink'),
            'copyright_license': this._getLink('copyright_license'),
            'copyright_logo': this._getLink('copyright_logo'),
            'license_agreement': this.t('license_agreement'),
            'API_2GIS': this.t('API_2GIS')
        };
    },
    _getAttributionHTML: function (lang) {
        return DG.dust('DGAttribution/copyright', this._getData(lang));
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
