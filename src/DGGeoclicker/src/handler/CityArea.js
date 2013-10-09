L.DG.Geoclicker.Handler.CityArea = L.DG.Geoclicker.Handler.Default.extend({

    _polylineStyleDefault : {
        fillColor: '#ff9387',
        color: '#ff9387',
        clickable: false,
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
    _wktParser : L.DG.wkt(),

    handle: function (results, type) { // (Object, String) -> Promise
        if (!results[type]) {
            return false;
        }

        if (!this._stylesInited) {
            this._initStyles();
        }

        this._popup = this._view.getPopup();
        this._geometry = this._readWKT(results[type].geometry.selection);
        this._geometryStyle = this._getPolyStyleNum(this._map.getZoom());

        this._geometry
                .setStyle(this._polylineStyles[this._geometryStyle])
                .addTo(this._map);

        this._map
                .on('zoomend', this._updateGeometry, this)
                .once('popupclose', this._clearPopup, this);

        return L.DG.when(this._fillCityAreaObject(results, type));
    },

    _fillCityAreaObject: function (results, type) {
        var data = {
            name: this.t('noname'),
            address: '',
            purpose: this.t(type),
            type: type
        };

        for (var obj in results) {
            if (obj !== type && obj !== 'extra') {
                if (results[obj].attributes.abbreviation) {
                    data.address = results[obj].attributes.abbreviation + ' ';
                }
                data.address += results[obj].name;
                break;
            }
        }

        if (results[type].short_name) {
            data.name = results[type].short_name;
        }

        return {
            tmpl: this._view.getTemplate('cityarea'),
            data: data,
            header: this._view.render({
                tmpl: this._view.getTemplate('popupHeader'),
                data: {'title': data.name}
            })
        };
    },

    _initStyles : function () {
        var i;

        L.DG.Geoclicker.Handler.CityArea.prototype._stylesInited = true;
        for (i in this._polylineStyles) {
            if (this._polylineStyles.hasOwnProperty(i)) {
                L.DG.Geoclicker.Handler.CityArea.prototype._polylineStyles[i] = L.extend(this._polylineStyles[i], this._polylineStyleDefault);
            }
        }
    },

    _readWKT : function (selection) {
        this._wktParser.read(selection);
        return this._wktParser.toObject();
    },

    _getPolyStyleNum: function (zoom) {
        var i;

        for (i in this._polylineStyles) {
            if (this._polylineStyles.hasOwnProperty(i)) {
                if (zoom <= i) {
                    return i;
                }
            }
        }
        return false;
    },

    _updateGeometry: function () {
        var newStyle = this._getPolyStyleNum(this._map.getZoom());

        if (newStyle && newStyle !== this._geometryStyle) {
            this._geometryStyle = newStyle;
            this._geometry.setStyle(this._polylineStyles[newStyle]);
        }
    },

    _clearPopup: function () {
        this._popup.clear('header');
        this._map
                .removeLayer(this._geometry)
                .off('zoomend', this._updateGeometry, this);
    }

});
