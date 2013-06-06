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
        this._map.on("click", this._onMapClick, this);
        this._map.on('popupclose', this._onPopupClose, this);
    },

    removeHooks: function () {
        this._map.off("click", this._onMapClick, this);
        this._map.off('popupclose', this._onPopupClose, this);
    },

    _onMapClick: function (e) {

        var zoom = e.target._zoom,
            latlng = e.latlng;

        this._controller.handleClick(latlng, zoom);
    },

    _onPopupClose: function (e) {
        this._controller.handlePopupClose(e.popup);
    }
});

L.Map.addInitHook('addHandler', 'dgGeoclicker', L.DG.Geoclicker.MapHandler);
