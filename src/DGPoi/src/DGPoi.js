L.Map.mergeOptions({
    dgPoi: false
});

L.DG.Poi = L.Handler.extend({

    initialize: function (map) { // (Object)
        this._map = map;
        this._labelHelper = new L.DG.Label();
    },

    addHooks: function () {
        this._map.on(this._mapEventsListeners, this);
        this._map.dgMeta.enablePoiListening();
    },

    removeHooks: function () {
        this._map.off(this._mapEventsListeners, this);
        this._map.off('mousemove', this._onMouseMove, this);
        this._map.dgMeta.disablePoiListening();
    },

    disableLabel: function () {
        this._map.removeLayer(this._labelHelper);
        this._labelHelper = null;
    },

    _mapEventsListeners : {
        dgPoiHover: function (e) { // (Object)
            this._setCursor('pointer');
            if (this._labelHelper) {
                this._labelHelper
                    .setPosition(e.latlng)
                    .setContent(e.poi.linked.name);
                this._map
                    .on('mousemove', this._onMouseMove, this)
                    .addLayer(this._labelHelper);
            }
        },

        dgPoiLeave: function () {
            this._setCursor('auto');
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

L.Map.addInitHook('addHandler', 'dgPoi', L.DG.Poi);