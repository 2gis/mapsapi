/**
 * Leaflet DG GeoclickerHandlersManager
 * Version 1.0.0
 *
 * Copyright (c) 2013, 2GIS, Alexey Lubchuk
 */

L.DG = L.DG || {};

L.DG.GeoclickerHandlersManager = L.Class.extend({
    handle: function (response, zoom, allowedTypes) {
        if (this._isNotValidResult(response)) {
            console.log('result invalid')
            L.DG.GeoclickerHandlers._default();
            return;
        }
        var handled = false;
        var result = response.result;
        console.log('search start', result);
        for (var i in L.DG.GeoclickerHandlers) {
            console.log('search', i)
            var typeInResponse = result[i] && result[i].type
            if (allowedTypes.indexOf(i) === -1) {
                console.log(1, allowedTypes)
                continue;
            }
            console.log('allowed', i, typeInResponse)
            if (L.DG.GeoclickerHandlers[typeInResponse]) {
                console.log(2)
                L.DG.GeoclickerHandlers[typeInResponse]();
                console.log(3)
                return;
            }
        }
        console.log('search not found')
        //if no handler was found, then launch the default one
        if (!handled) {
            L.DG.GeoclickerHandlers._default();
        }
    },

    _isNotValidResult: function (response) {
        return !response || !!response.error_code || !response.result || !response.result.length;
    }

});


