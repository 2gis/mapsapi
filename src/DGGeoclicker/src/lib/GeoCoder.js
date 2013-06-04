/**
 * Performs Geocoding by given lonlat and zoom level. Returns filtered set of results or nothing.
 *
 */
L.DG.Geoclicker.GeoCoder = L.Class.extend({

    initialize: function (webApi) {
        this._webApi = webApi;
    },

    getLocations: function (latlng, zoom, callback) { // (Number, Number, Number, Function)
        // Callback will receive array of found results or void if errors occurred or nothing was found.

        var types = this._getTypesByZoom(zoom),

            q = latlng.lng + ',' + latlng.lat;

        if (!types) {
            callback();
            return;
        }

        this._webApi.geoSearch(q, types, zoom, L.bind(function (result) {
            callback(this._validateResponse(result, types));
        }, this));
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
});
