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
        this._hoveredPoi = null;
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

    getController: function() {
        return this._controller;
    },

    _mapEventsListeners : {
        dgLangChange: function () {
            this._controller.reinvokeHandler();
        },

        click: this._onClick,

        dblclick: function () {
            clearTimeout(this.pendingClick);
            this.clickCount = 0;
        },

        popupclose: function (e) { // (Object)
            this._controller.handlePopupClose(e.popup);
        },

        dgPoiHover: function (e) {
            this._hoveredPoi = e.poi;
            this._labelHelper
                    .setPosition(e.latlng)
                    .setContent(this._hoveredPoi.linked.name);
            this._map
                    .addLayer(this._labelHelper)
                    .on('mousemove', this._onMouseMove, this);
        },

        dgPoiLeave: function () {
            this._hoveredPoi = null;
            this._map
                .removeLayer(this._labelHelper)
                .off('mousemove', this._onMouseMove, this);
        }
    },

    _onClick: function (e) { // (Object)
        if (this.clickCount === 0) {
            this.clickCount = 1;
            this._singleClick(e);
        }
    },

    _onMouseMove: function(e){
        this._labelHelper.setPosition( e.latlng );
    },

    _singleClick: function (e) {
        var self = this;

        clearTimeout(this.pendingClick);

        this.pendingClick = setTimeout(function () {
            var zoom = e.target._zoom,
                latlng = e.latlng;
                self._controller.handleClick(latlng, zoom, { poiId : self._hoveredPoi.linked.id });
                self.clickCount = 0;
        }, this.timeout);
    }
});

L.Map.addInitHook('addHandler', 'dgGeoclicker', L.DG.Geoclicker);