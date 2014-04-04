DG.Map.mergeOptions({
    poi: false
});

DG.Poi = DG.Handler.extend({

    options: {
        disableLabel: false
    },

    initialize: function (map, options) { // (Object)
        this._map = map;
        DG.Util.setOptions(this, options);
    },

    addHooks: function () {
        this._map.on(this._mapEventsListeners, this);
        this._map.meta.enablePoiListening();
        if (!this.options.disableLabel) {
            this._labelHelper = new DG.Label();
        }
    },

    removeHooks: function () {
        this._map.off(this._mapEventsListeners, this);
        this._map.off('mousemove', this._onMouseMove, this);
        this._map.meta.disablePoiListening();
        if (this._labelHelper) {
            this._map.removeLayer(this._labelHelper);
            this._labelHelper = null;
        }
    },

    _mapEventsListeners : {
        poihover: function (e) { // (Object)
            this._setCursor('pointer');
            this._testL = e.poi.geometry.addTo(this._map);
            if (this._labelHelper) {
                this._labelHelper
                    .setPosition(e.latlng)
                    .setContent(e.poi.linked.name);
                this._map
                    .on('mousemove', this._onMouseMove, this)
                    .addLayer(this._labelHelper);
            }
        },

        poileave: function () {
            this._setCursor('auto');
            this._testL && this._map.removeLayer(this._testL);
            if (this._labelHelper) {
                this._map
                    .off('mousemove', this._onMouseMove, this)
                    .removeLayer(this._labelHelper);
            }
        }
    },

    _onMouseMove: function (e) { // (Object)
        this._labelHelper.setPosition(e.latlng);
    },

    _setCursor: function (cursor) { // (String)
        this._map.getContainer().style.cursor = cursor;
    }

});

DG.Map.addInitHook('addHandler', 'poi', DG.Poi);
