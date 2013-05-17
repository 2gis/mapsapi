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
    },
    onMapClick: function(e) {
        console.log(this.options);
        var data = this.options.data;
        data.zoomlevel = e.target._zoom;
        data.q = e.latlng.lng + "," + e.latlng.lat;
        var types = this.getTypesByZoom(data.zoomlevel);
        if (!types) {
            return;
        }
        data.types = types.join(",");
        var successHandler = L.bind(this.handlersManager.handle, this);
        L.DG.Jsonp({
            url: this.options.url,
            data: data,
            success: function (response) {
                console.log(response);
                successHandler({
                    response: response,
                    zoom: data.zoomlevel,
                    allowedTypes: types
                });
                // self.handlersManager.handle({
                //     response: response,
                //     zoom: data.zoomlevel,
                //     allowedTypes: types
                // });
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

