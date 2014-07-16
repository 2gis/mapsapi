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
    },

    addHooks: function () {
        this._map.on(this._mapEventsListeners, this);
        if (this._map.poi) {
            // DG.bind(this._mapEventsListeners.click, this._map.poi._layerEventsListeners.click);
            this._map.poi.getMetaLayer().on('click', this._mapEventsListeners.click);
        }

    },

    removeHooks: function () {
        this._map.off(this._mapEventsListeners, this);
        if (this._map.poi) {
            this._map.poi.getMetaLayer().off('click', this._mapEventsListeners.click);
        }
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
        },

        click: function (e) { // (Object)
            if (this.clickCount === 0) {
                this.clickCount = 1;
                this._singleClick(e);
            }
        }
    },

    _singleClick: function (e) { // (Object)
        var self = this;

        clearTimeout(this.pendingClick);

        this.pendingClick = setTimeout(function () {
            var zoom = e.target._zoom,
                latlng = e.latlng;

            self._controller.handleClick(latlng, zoom);
            self.clickCount = 0;
        }, this.timeout);
    }
});

DG.Map.addInitHook('addHandler', 'geoclicker', DG.Geoclicker);
