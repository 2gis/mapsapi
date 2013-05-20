/**
 * Leaflet DG Geoclicker
 * Version 1.0.0
 *
 * Copyright (c) 2013, 2GIS, Alexey Lubchuk
 */

L.DG = L.DG || {};

L.DG.Geoclicker = L.Class.extend({
    statics: {
        MIN_WORK_ZOOM_LEVEL: 8
    },
    options: {
        url: '__WEB_API_SERVER__/geo/search',
        data: {
            key: '__WEB_API_KEY__',
            version: '__WEB_API_VERSION__',
            lang: '__DEFAULT_LANG__',
            output: 'jsonp'
        }
    },
    initialize: function(handlersManager) {
        this.handlersManager = handlersManager;
        var loader = window.loader;
        if (loader && loader.params && loader.params.lang) {
            this.options.data.lang = loader.params.lang;
        }
    },
    onMapClick: function(e) {
        var zoom = e.target._zoom,
            data,
            types,
            successHandler;

        if (zoom < L.DG.Geoclicker.MIN_WORK_ZOOM_LEVEL) {
            return;
        }
        data = this.options.data;
        data.zoomlevel = zoom;
        data.q = e.latlng.lng + "," + e.latlng.lat;
        types = this.getTypesByZoom(zoom);
        if (!types) {
            return;
        }
        data.types = types.join(",");
        successHandler = L.bind(this.handlersManager.handle, this);
        L.DG.Jsonp({
            url: this.options.url,
            data: data,
            success: function (response) {
                console.log(response);
                successHandler({
                    response: response,
                    zoom: zoom,
                    allowedTypes: types
                });
            }
        });
    },
    getTypesByZoom: function(zoom) {
        var types = null;

        if (zoom >= 14 && zoom <= 18) {
            types = ['house', 'street'];
            if (zoom >= 15) {
                types = types.concat('sight', 'station_platform');
            }
        }
        else if (zoom >= 12 && zoom < 14) {
            types = ['district'];
        }
        else if (zoom >= 8 && zoom < 12) {
            types = ['settlement', 'city'];
        }

        return types;
    }
});

L.Map.addInitHook(function () {
    this.dgGeoclicker = new L.DG.Geoclicker(new L.DG.GeoclickerHandlersManager());
    this.on("click", function(e) {
        this.dgGeoclicker.onMapClick(e);
    });
});

