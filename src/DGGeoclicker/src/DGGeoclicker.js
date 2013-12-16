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
        this._fillEventsListeners();
    },

    addHooks: function () {
        this._map.on(this._mapEventsListeners, this);
        if (!L.Browser.touch) {
            this._map.dgPoi.enable();
        }
    },

    removeHooks: function () {
        this._map.off(this._mapEventsListeners, this);
        this._map.dgPoi.disable();
    },

    getController: function () {
        return this._controller;
    },

    _mapEventsListeners : {
        langchange: function () {
            this._controller.reinvokeHandler();
        },

        dblclick: function () {
            clearTimeout(this.pendingClick);
            this.clickCount = 0;
        },

        popupclose: function (e) { // (Object)
            this._controller.handlePopupClose(e.popup);
        }
    },

    _fillEventsListeners: function () {
        this._mapEventsListeners.click = this._mapEventsListeners.poiclick = this._onClick;
    },

    _onClick: function (e) { // (Object)
        if (this.clickCount === 0) {
            this.clickCount = 1;
            this._singleClick(e);
        }
    },

    _setCursor: function (cursor) { // (String)
        this._map.getContainer().style.cursor = cursor;
    },

    _singleClick: function (e) { // (Object)
        var self = this;

        clearTimeout(this.pendingClick);

        this.pendingClick = setTimeout(function () {
            var zoom = e.target._zoom,
                latlng = e.latlng;

            self._controller.handleClick(latlng, zoom, { poiId : e.poi ? e.poi.linked.id : null });
            self.clickCount = 0;
        }, this.timeout);
    }
});

L.Map.addInitHook('addHandler', 'dgGeoclicker', L.DG.Geoclicker);
