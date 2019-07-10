DG.Geoclicker.Provider.CatalogApi = DG.Class.extend({
    initialize: function(map) { // (Object)
        this._map = map;

        var apiUrl = DG.config.protocol +
            DG.config.webApiServer + '/' +
            DG.config.webApiVersion + '/';

        this._urlGeoSearch = apiUrl + 'geo/search';
        this._urlGeoGet = apiUrl + 'geo/get';
        this._urlDetails = apiUrl + 'catalog/branch/get';
        this._urlFirmsInHouse = apiUrl + 'catalog/branch/list';

        this._key = DG.config.geoclickerCatalogApiKey;
        this._geoFields = DG.config.geoAdditionalFields;
        this._firmInfoFields = DG.config.firmInfoFields;
    },

    getLocations: function(options) { // (Object)
        // Callback will receive array of found results or void if errors occurred or nothing was found.
        var zoom = options.zoom,
            latlng = options.latlng,
            beforeRequest = options.beforeRequest || function() {},
            types = this.getTypesByZoom(zoom),
            q = latlng.lng + ',' + latlng.lat;

        if (!types) {
            return Promise.reject('no type');
        }

        beforeRequest();

        return this.geoSearch(q, types, zoom).then(DG.bind(function(result) {
            return this._filterResponse(result, types);
        }, this));
    },

    firmsInHouse: function(houseId, parameters) { // (String, Function, Number)
        parameters = parameters || {};

        /* eslint-disable camelcase */
        var params = {
            building_id: houseId,
            page: parameters.page || 1
        };
        /* eslint-enable camelcase */

        return this._performRequest(params, this._urlFirmsInHouse);
    },

    getFirmInfo: function(firmId) {
        return this._performRequest({
            type: 'filial',
            id: firmId,
            fields: this._firmInfoFields
        }, this._urlDetails);
    },

    geoSearch: function(q, types, zoomlevel) { // (String, String, Number)
        /* eslint-disable camelcase */
        var params = {
            point: q,
            type: types,
            zoom_level: zoomlevel,
            fields: this._geoFields
        };
        /* eslint-enable camelcase */

        return this._performRequest(params, this._urlGeoSearch);
    },

    geoGet: function(id) {
        var params = {
            id: id,
            fields: this._geoFields
        };

        return this._performRequest(params, this._urlGeoGet);
    },

    cancelLastRequest: function() {
        if (this._lastRequest) {
            this._lastRequest.abort();
        }
    },

    getTypesByZoom: function(zoom) { // (Number) -> String|Null
        var types = {
                'adm_div.settlement':   8,
                'adm_div.city':         8,
                'adm_div.division':     11,
                'adm_div.district':     12,
                'street':               14,
                'building':             14,
                'adm_div.place':        15,
                'poi':                  15,
                'attraction':           17
            },
            selectedTypes = [];

        Object.keys(types).forEach(function(type) {
            if (zoom >= types[type]) {
                selectedTypes.push(type);
            }
        });

        if (selectedTypes.length) {
            return selectedTypes.join(',');
        } else {
            return null;
        }
    },

    _performRequest: function(params, url) { // (Object, String, Function, Function)
        var data = DG.extend({key: this._key}, params);
        var type = 'get';

        this.cancelLastRequest();

        if (!DG.ajax.corsSupport) {
            type = data.format = 'jsonp';
        }

        this._lastRequest = DG.ajax(url, {
            type: type,
            data: data,
            timeout: this._timeoutMs,
            withCredentials: true
        });

        return this._lastRequest;
    },

    _filterResponse: function(response, allowedTypes) { // (Object, Array) -> Boolean|Object
        var result = {}, i, item, found, data, type;

        if (this._isNotFound(response)) {
            return false;
        }

        data = response.result.items;

        for (i = data.length - 1; i >= 0; i--) {
            item = data[i];

            type = item.type;
            if (item.subtype) {
                type += '.' + item.subtype;
            }

            if (allowedTypes && allowedTypes.indexOf(type) === -1) {
                continue;
            }

            result[type] = item;
            found = true;
        }

        if (found) {
            return result;
        } else {
            return false;
        }
    },

    _isNotFound: function(response) { // (Object) -> Boolean
        return !response ||
               !!response.meta && !!response.meta.error ||
               !response.result ||
               !response.result.items ||
               !response.result.items.length;
    }

});
