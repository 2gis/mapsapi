L.DG.Geoclicker.Provider.CatalogApi = L.Class.extend({
    options: {
        urlGeo: '__WEB_API_SERVER__/__WEB_API_VERSION__/search',
        urlDetails: '__WEB_API_SERVER__/__WEB_API_VERSION__/details',
        data: {
            key: '__GEOCLICKER_CATALOG_API_KEY__'
        },
        geoFields: '__GEO_ADDITIONAL_FIELDS__',
        firmInfoFields: '__FIRM_INFO_FIELDS__',

        timeoutMs: 5000
    },

    initialize: function (map) { // (Object)
        this._map = map;
    },

    getLocations: function (options) { // (Object)
        // Callback will receive array of found results or void if errors occurred or nothing was found.
        var zoom = options.zoom,
            latlng = options.latlng,
            callback = options.callback,
            beforeRequest = options.beforeRequest || function () {},
            types = this.getTypesByZoom(zoom),
            q = latlng.lng + ',' + latlng.lat;

        if (!types) {
            callback({'error': 'no type'});
            return;
        }

        beforeRequest();
        this.geoSearch(q, types, zoom).then(L.bind(function (result) {
            callback(this._filterResponse(result, types));
        }, this));
    },

    firmsInHouse: function (houseId, parameters) { // (String, Function, Number)
        parameters = parameters || {};

        var params = L.extend(this.options.data, {
            type: 'filial',
            house: houseId,
            page: parameters.page || 1
        });

        return this._performRequest(params, this.options.urlGeo);
    },

    getFirmInfo: function (firmId) {
        return this._performRequest({
            type: 'filial',
            id: firmId,
            fields: this.options.firmInfoFields
        }, this.options.urlDetails);
    },

    geoSearch: function (q, types, zoomlevel) { // (String, String, Number)
        var params = {
            point: q,
            geo_type: types,
            zoom_level: zoomlevel,
            type: 'geo',
            fields: this.options.geoFields
        };

        return this._performRequest(params, this.options.urlGeo);
    },

    cancelLastRequest: function () {
        if (this._lastRequest) {
            this._lastRequest.abort();
        }
    },

    getTypesByZoom: function (zoom) { // (Number) -> String|Null
        if (zoom >= 17) {
            return 'sight,poi,house,place,street,station_platform,station,metro,district,division,settlement,city';
        } else if (zoom >= 15) {
            return 'poi,house,place,street,station_platform,station,metro,district,division,settlement,city';
        } else if (zoom >= 14) {
            return 'house,street,station_platform,station,metro,district,division,settlement,city';
        } else if (zoom >= 12) {
            return 'station_platform,station,metro,district,division,settlement,city';
        } else if (zoom >= 11) {
            return 'division,settlement,city';
        } else if (zoom >= 8) {
            return 'settlement,city';
        } else {
            return null;
        }
    },

    _performRequest: function (params, url) { // (Object, String, Function, Function)
        var source = this.options.data,
            data = L.extend({ // TODO clone function should be used instead of manually copying
                key: source.key
            }, params),
            promise;

        this.cancelLastRequest();

        this._lastRequest = L.DG.ajax(url, {
            type: 'get',
            data: data,
            timeout: this.options.timeoutMs
        });

        promise = this._lastRequest.then(
            null,
            function () { return false; }
        );

        return promise;
    },

    _filterResponse: function (response, allowedTypes) { // (Object, Array) -> Boolean|Object
        var result = {}, i, item, found, data;

        if (this._isNotFound(response)) {
            return false;
        }

        data = response.result.data;

        for (i = data.length - 1; i >= 0; i--) {
            item = data[i];
            if (allowedTypes && allowedTypes.indexOf(item.geo_type) === -1) {
                continue;
            }

            result[item.geo_type] = item;
            found = true;
        }

        if (found) {
            return result;
        } else {
            return false;
        }
    },

    _isNotFound: function (response) { // (Object) -> Boolean
        return !response || !!response.error_code || !response.result || !response.result.data.length;
    }

});
