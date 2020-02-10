DG.Geoclicker.Handler.CityArea = DG.Geoclicker.Handler.Default.extend({

    _polylineStyleDefault : {
        fillColor: '#ff9387',
        color: '#ff9387',
        noClip: true,
        opacity: 1
    },

    _polylineStyles : {
        11 : {
            fillOpacity: 0.18,
            weight: 1
        },
        12 : {
            fillOpacity: 0.12,
            weight: 1
        },
        13 : {
            fillOpacity: 0.08,
            weight: 2
        },
        18 : {
            fillOpacity: 0,
            weight: 3
        }
    },

    handle: function(results, type) { // (Object, String) -> Promise
        if (!results[type]) {
            return false;
        }

        if (!this._stylesInited) {
            this._initStyles();
        }

        // remove previous geometry see https://github.com/2gis/mapsapi/issues/213
        if (this._geometry) {
            this._map.removeLayer(this._geometry);
        }

        this._popup = this._view.getPopup();

        this._geometryZoomStyle = this._getPolyStyleNum();
        this._geometry = DG.Wkt.geoJsonLayer(results[type].geometry.selection, {
            style: this._polylineStyles[this._geometryZoomStyle],
            interactive: false
        }).addTo(this._map);

        this._map
            .on('zoomend', this._updateGeometry, this)
            .once('popupclose', this._clearPopup, this);

        return Promise.resolve(this._fillCityAreaObject(results, type));
    },

    _fillCityAreaObject: function(results, type) {
        var data = {
            name: this.t('noname'),
            drilldown: '',
            purpose: this.t(type),
            type: type.split('.').join('_')
        };

        data.drilldown = this._getDrilldown(results[type]);

        if (results[type].name) {
            data.name = results[type].name;
        }

        return {
            tmpl: 'cityarea',
            data: data,
            header: this._view.render({
                tmpl: 'popupHeader',
                data: {'title': data.name}
            })
        };
    },

    _initStyles : function() {
        this._stylesInited = true;

        Object.keys(this._polylineStyles).forEach(function(zoom) {
            DG.extend(this._polylineStyles[zoom], this._polylineStyleDefault);
        }, this);
    },

    _getPolyStyleNum: function() {
        var mapZoom = this._map.getZoom();

        return Object.keys(this._polylineStyles).filter(function(zoom) {
            return mapZoom <= zoom;
        })[0] || false;
    },

    _updateGeometry: function() {
        var newStyle = this._getPolyStyleNum();

        if (newStyle && newStyle !== this._geometryZoomStyle) {
            this._geometryZoomStyle = newStyle;
            this._geometry.setStyle(this._polylineStyles[newStyle]);
        }
    },

    _clearPopup: function() {
        this._map
            .removeLayer(this._geometry)
            .off('zoomend', this._updateGeometry, this);
    }

});
