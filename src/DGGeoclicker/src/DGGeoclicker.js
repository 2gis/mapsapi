/**
 * 2GIS Geoclicker Plugin
 * @todo add Description here
 */
L.Map.mergeOptions({
    dgGeoClicker: true
});

L.DG.Geoclicker = L.Handler.extend({
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
        },

        handlers: new L.DG.GeoclickerHandlersManager()
    },

    addHooks: function () {
        this._map.on("click", this._onMapClick, this);
    },

    removeHooks: function () {
        this._map.off("click", this._onMapClick);
    },

    _onMapClick: function (e) {
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
        types = this._getTypesByZoom(zoom);
        if (!types) {
            return;
        }
        data.types = types.join(",");
        successHandler = L.bind(this.options.handlers.handle, this);
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

    _getTypesByZoom: function (zoom) {
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

L.Map.addInitHook('addHandler', 'dgGeoClicker', L.DG.Geoclicker);