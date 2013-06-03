/**
 *
 *
 */
L.Map.mergeOptions({
    dgGeoclicker: true
});

L.DG.Geoclicker.MapHandler = L.Handler.extend({

    initialize: function (map) {
        this._map = map;

        this._controller = new L.DG.Geoclicker.Controller(map);
    },

    addHooks: function () {
        console.log('addHooks')
        this._map.on("click", this._onMapClick, this);
    },

    removeHooks: function () {

        console.log('removeHooks')
        this._map.off("click", this._onMapClick, this);
    },

    _onMapClick: function (e) {
        console.log('_onMapClick')
        var zoom = e.target._zoom,
            latlng = e.latlng;

        this._controller.handleClick(latlng, zoom);
    }
});


L.Map.addInitHook('addHandler', 'dgGeoclicker', L.DG.Geoclicker.MapHandler);
