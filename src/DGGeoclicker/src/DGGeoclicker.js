/**
 * 2GIS Geoclicker Plugin
 * @todo add Description here
 */
L.Map.mergeOptions({
    dgGeoClicker: true
});

L.DG.Geoclicker = L.Handler.extend({
    options: {
        url: '__WEB_API_SERVER__/geo/search',
        data: {
            key: '__WEB_API_KEY__',
            version: '__WEB_API_VERSION__',
            lang: '__DEFAULT_LANG__',
            output: 'jsonp'
        },

        handlers: new L.DG.GeoclickerHandlersManager(),
        jsonp: L.DG.Jsonp

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
            types = this._getTypesByZoom(zoom),
            handler = L.bind(this.options.handlers.handle, this.options.handlers);

        if (!types) {
            return;
        }

        data = L.extend(this.options.data, {
            zoomlevel: zoom,
            q: e.latlng.lng + "," + e.latlng.lat,
            types: types.join(",")
        });

        this.options.jsonp({
            url: this.options.url,
            data: data,
            success: function (response) {
                console.log(response);
                handler(response, zoom, types);
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