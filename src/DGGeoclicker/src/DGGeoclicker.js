/**
 * 2GIS Geoclicker Plugin
 * @todo add Description here
 */

L.DG = L.DG || {}; //@todo realize this in kind of intro file

L.Map.mergeOptions({
    dgGeoclicker: true
});

L.DG.Geoclicker = L.Handler.extend({
    clickCount: 0,

    initialize: function (map) { // (Object)
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
        var self = this;
        this.clickCount++;
        if (this.clickCount <= 1) {
            this._delay(function() {
                if (self.clickCount <= 1) {
                     var zoom = e.target._zoom,
                        latlng = e.latlng;
                    self._controller.handleClick(latlng, zoom);
                }
                self.clickCount = 0;
            }, 200);
        }
    },

    _onPopupClose: function (e) { // (Object)
        this._controller.handlePopupClose(e.popup);
    },

    _delay: function(func, wait) { // (Function, Number) -> Number
        var args = Array.prototype.slice.call(arguments, 2);
        return setTimeout(function() {
            return func.apply(null, args);
        }, wait);
    }
});

L.Map.addInitHook('addHandler', 'dgGeoclicker', L.DG.Geoclicker);

