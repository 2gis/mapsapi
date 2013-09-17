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
        this._labelHelper = new L.DG.Label();
        this._fillEventsListeners();
    },

    addHooks: function () {
        this._map.on(this._mapEventsListeners, this);
        this._map.dgPoi.enable();
    },

    removeHooks: function () {
        this._map.off(this._mapEventsListeners, this);
        this._map.off('mousemove', this._onMouseMove, this);
        this._map.dgPoi.disable();
    },

    getController: function () {
        return this._controller;
    },

    _mapEventsListeners : {
        dgLangChange: function () {
            this._controller.reinvokeHandler();
        },

        dblclick: function () {
            clearTimeout(this.pendingClick);
            this.clickCount = 0;
        },

        popupclose: function (e) { // (Object)
            this._controller.handlePopupClose(e.popup);
        },

        dgPoiHover: function (e) {
            this._labelHelper
                    .setPosition(e.latlng)
                    .setContent(e.poi.linked.name);
            this._map
                    .on('mousemove', this._onMouseMove, this)
                    .addLayer(this._labelHelper);
            this._setCursor('pointer');
        },

        dgPoiLeave: function () {
            this._map
                .off('mousemove', this._onMouseMove, this)
                .removeLayer(this._labelHelper);
            this._setCursor('auto');
        }
    },

    _fillEventsListeners: function () {
        this._mapEventsListeners.click = this._mapEventsListeners.dgPoiClick = this._onClick;
    },

    _onClick: function (e) { // (Object)
        if (this.clickCount === 0) {
            this.clickCount = 1;
            this._singleClick(e);
        }
    },

    _setCursor: function (cursor) {
        this._map.getContainer().style.cursor = cursor;
    },

    _onMouseMove: function (e) {
        this._labelHelper.setPosition(e.latlng);
    },

    _singleClick: function (e) {
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
