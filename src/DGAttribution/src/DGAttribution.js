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
                copyright_logo: 'https://2gis.ru/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_apilink: 'https://dev.2gis.ru/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_license: 'https://law.2gis.ru/api-rules/',
                open_link: 'https://2gis.ru',
            },

            it: {
                copyright_logo: 'https://2gis.it/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_apilink: 'https://dev.2gis.com/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_license: 'https://law.2gis.it/licensing-agreement/',
                open_link: 'https://2gis.ru',
            },

            cz: {
                copyright_logo: 'https://praha.2gis.cz/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_apilink: 'https://dev.2gis.com/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_license: 'https://law.2gis.cz/api-rules/',
                open_link: 'https://2gis.ru',
            },

            cl: {
                copyright_logo: 'https://santiago.2gis.cl/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_apilink: 'https://dev.2gis.com/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_license: 'https://law.2gis.cl/api-rules/',
                open_link: 'https://2gis.ru',
            },

            cy: {
                copyright_logo: 'https://info.2gis.com.cy/lemesos?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_apilink: 'https://dev.2gis.com/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_license: 'https://law.2gis.com.cy/api-rules/',
                open_link: 'https://2gis.ru',
            },

            ae: {
                copyright_logo: 'https://2gis.ae/dubai?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_apilink: 'http://dev.2gis.com/?utm_source=copyright&utm_medium=map&utm_campaign=partners',
                copyright_license: 'https://law.2gis.ae/api-rules/',
                open_link: 'https://2gis.ae',
            }
        };
        /* eslint-enable camelcase */

        var countryCode = (this._countryCode in dictionary) ? this._countryCode : 'ru';

        return dictionary[countryCode][linkType];
    },

    _markerToRoute: undefined,
    _markers: [],

    _checkMarkerLayers: function() {
        this._markerToRoute = this._markers.length != 1 ? undefined : this._markers[0];
        this._update();
    },

    _mapEvents: {

        layeradd: function(e) {
            if (e.layer instanceof DG.Marker) {
                this._markers.push(e.layer)
                if (this._markers.length <= 2) {
                    this._checkMarkerLayers();
                }
            }
        },

        layerremove: function(e) {
            if (e.layer instanceof DG.Marker) {
                var currentMarkers = [];
                for (var i = 0; i < this._markers.length; i++) {
                    if (this._markers[i] !== e.layer) {
                        currentMarkers.push(this._markers[i])
                    }
                }
                this._markers = currentMarkers;
                if (this._markers.length <= 1) {
                    this._checkMarkerLayers();
                }
            }
        },

    },

    onAdd: function(map) {
        if (!map._copyright) {
            map._copyright = true;
            this._first = true;
        }
        this._logotype = map.options.logotype;
        this._open2gis = this._getLink('open_link')

        this._map.on(this._mapEvents, this);

        map.attributionControl = this;
        this._container = DG.DomUtil.create('div', 'dg-attribution');
        DG.DomEvent.disableClickPropagation(this._container);

        for (var i in map._layers) {
            if (map._layers[i].getAttribution) {
                this.addAttribution(map._layers[i].getAttribution());
            }
        }

        this._update();

        DG.DomEvent
            .on(this._container, 'touchstart', this._updateLink, this)
        return this._container;
    },

    _updateLink: function(e) {
        if (e.target.name === 'linkButton') {
            this._open2gis = this._getOpenUrl();
            e.target.href = this._open2gis;
        }
    },

    _update: function(lang, countryCode) {
        if (!this._map) { return; }

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


    _getOpenUrl: function() {
        if (this._markerToRoute) {
            return DG.Util.template(DG.config.ppLink2gis, {
                'gislink': this._getLink('open_link'),
                'center': this._map.getCenter().lng + ',' + this._map.getCenter().lat,
                'zoom': this._map.getZoom(),
                'rsType': this._map.getZoom() > 11 ? 'bus' : 'car',
                'point': this._markerToRoute._latlng.lng + ',' + this._markerToRoute._latlng.lat
            });
        }

        return DG.Util.template(DG.config.openLink2gis, {
            'gislink': this._getLink('open_link'),
            'center': this._map.getCenter().lng + ',' + this._map.getCenter().lat,
            'zoom': this._map.getZoom(),
        });
    },
    _getData: function(lang) {
        lang = lang || this._map.getLang();
        var btn =
        {
            name: 'open',
            label: this._markerToRoute ? this.t('route_on') : this.t('open_on'),
        }

        // Do not show link button if button don't have translate to current language or map options logotype set true
        var isHideButton = btn.label == 'open_on' || btn.label == 'route_on' || this._logotype;

        return {
            'logotype': isHideButton,
            'work_on': this.t('work_on'),
            'lang': lang,
            'copyright_apilink': this._getLink('copyright_apilink'),
            'copyright_license': this._getLink('copyright_license'),
            'copyright_logo': this._getLink('copyright_logo'),
            'open2gis_link': this._open2gis,
            'open2gis_name': 'linkButton',
            'license_agreement': this.t('license_agreement'),
            'dir': lang !== 'ar' ? 'ltr' : 'rtl',
            'btn': btn
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