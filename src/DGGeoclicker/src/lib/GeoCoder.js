/**
 * Performs Geocoding by given longitude, latitude and zoom level. Returns filtered set of results or nothing.
 *
 */
L.DG.Geoclicker.GeoCoder = L.Class.extend({
    options: {
        url: '__WEB_API_SERVER__/geo/search',
        data: {
            key: '__WEB_API_KEY__',
            version: '__WEB_API_VERSION__',
            lang: '__DEFAULT_LANG__', //@todo add i18n support
            output: 'jsonp'
        },

        timeoutMs: 5000
    },

    getLocations: function (lat, lng, zoom, callback) { // (Number, Number, Number, Function)
        // Callback will receive array of found results or void if errors occurred or nothing was found.

        var types = this._getTypesByZoom(zoom),

            query = this._createQuery(lat, lng, types, zoom);

        this.cancelLastRequest();

        this._performRequest(query, types, callback);

    },

    cancelLastRequest: function () {
        if (this._lastRequest) {
            this._lastRequest.cancel();
        }
    },

    _performRequest: function (query, types, callback) {
        this._lastRequest = L.DG.Jsonp({
            url: this.options.url,
            data: query,
            timeout: this.options.timeoutMs,
            success: L.bind(function (response) {

                var result = this._validateResponse(response, types);
                setTimeout(function () {
                    callback(result);
                }, Math.random() * 2000) //@todo for debug, remove before merge
            }, this),

            error: L.bind(function () {
                callback();
            }, this)
        })
    },


    _createQuery: function (lat, lng, types, zoom) {

        return L.extend(this.options.data, {
            zoomlevel: zoom,
            q: lng + "," + lat,
            types: types
        });

    },

    _validateResponse: function (response, allowedTypes) {
        var result = {}, i, item, found;

        if (this._isNotFound(response)) {
            return;
        }

        for (i in response.result) {
            item = response.result[i];

            if (allowedTypes && allowedTypes.indexOf(item.type) === -1) {
                continue;
            }

            result[item.type] = item;
            found = true;
        }

        if (found) {
            return result;
        } else {
            return;
        }
    },

    _isNotFound: function (response) {
        return !response || !!response.error_code || !response.result || !response.result.length;
    },

    _getTypesByZoom: function (zoom) {

        if (zoom > 15) {
            return 'house,street,sight,station_platform';
        } else if (zoom > 14) {
            return 'house,street';
        } else if (zoom > 12) {
            return 'district';
        } else if (zoom > 8) {
            return 'settlement,city';
        } else {
            return;
        }
    }

})
;