L.Map.mergeOptions({
    dgGeoclicker: false
});

L.DG.Geoclicker = L.Handler.extend({
    clickCount: 0,
    pendingClick: 0,
    timeout: 250, // should be equal to 'delay' value in DoubleTap event

    initialize: function (map) { // (Object)
        this._map = map;
        this._controller = new L.DG.Geoclicker.Controller(map);
    },

    addHooks: function () {
        this._map.on("click", this._onMapClick, this);
        this._map.on("dblclick", this._cancelHandler, this);
        this._map.on('popupclose', this._onPopupClose, this);
    },

    removeHooks: function () {
        this._map.off("click", this._onMapClick, this);
        this._map.off("dblclick", this._cancelHandler, this);
        this._map.off('popupclose', this._onPopupClose, this);
    },

    getController: function() {
        return this._controller;
    },

    _onMapClick: function (e) { // (Object)

        if  (this.clickCount === 0) {
            this.clickCount = 1;
            this._singleClick(e);
        }
    },

    _singleClick: function (e) {
        var self = this;

        clearTimeout(this.pendingClick);

        this.pendingClick = setTimeout(function () {
            var zoom = e.target._zoom,
                latlng = e.latlng;
                self._controller.handleClick(latlng, zoom);
                self.clickCount = 0;
        }, this.timeout);
    },

    _cancelHandler: function () {
        clearTimeout(this.pendingClick);
        this.clickCount = 0;
    },

    _onPopupClose: function (e) { // (Object)
        this._controller.handlePopupClose(e.popup);
    }
});

L.Map.addInitHook('addHandler', 'dgGeoclicker', L.DG.Geoclicker);
