/**
 *
 *
 */
L.Map.mergeOptions({
    dgGeoClicker: true
});

L.DG.Geoclicker.MapHandler = L.Handler.extend({

    initialize: function (map) {
        this._map = map;

        this._controller = new L.DG.Geoclicker.Controller(map);
    },

    addHooks: function () {
        this._map.on("click", this._onMapClick, this);
    },

    removeHooks: function () {
        this._map.off("click", this._onMapClick);
    },

    _onMapClick: function (e) {

        var zoom = e.target._zoom,
            latlng = e.latlng;

        this._controller.handleClick(latlng, zoom);
    }
});


L.Map.addInitHook('addHandler', 'dgGeoClicker', L.DG.Geoclicker.MapHandler);
