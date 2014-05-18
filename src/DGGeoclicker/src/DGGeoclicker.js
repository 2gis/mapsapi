DG.Map.mergeOptions({
    geoclicker: false
});

DG.Geoclicker = DG.Handler.extend({
    clickCount: 0,
    pendingClick: 0,
    timeout: 250, // should be equal to 'delay' value in DoubleTap event

    initialize: function (map, options) { // (Object)
        this._map = map;
        this._controller = new DG.Geoclicker.Controller(map, options);
        this._fillEventsListeners();
    },

    addHooks: function () {
        this._map.on(this._mapEventsListeners, this);
    },

    removeHooks: function () {
        this._map.off(this._mapEventsListeners, this);
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

DG.Map.addInitHook('addHandler', 'geoclicker', DG.Geoclicker);
