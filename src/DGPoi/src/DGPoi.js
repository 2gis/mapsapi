/*global __POI_LAYER_MIN_ZOOM__:false */

DG.Map.mergeOptions({
    poi: !DG.Browser.touch
});

DG.Poi = DG.Handler.extend({

    options: {
        disableLabel: false
    },

    statics: {
        metaURL: '__POI_META_SERVER__'
    },

    initialize: function (map, options) { // (Object)
        this._map = map;
        DG.Util.setOptions(this, options);
        this._metaLayer = DG.Meta.layer(DG.Poi.metaURL, {
            minZoom: __POI_LAYER_MIN_ZOOM__,
            maxNativeZoom: 18,
            detectRetina: __DETECT_RETINA__,
            eventBubbling: 'layer',
            dataFilter: DG.bind(this._processData, this)
        });
    },

    addHooks: function () {
        this._map.addLayer(this._metaLayer);
        if (!this.options.disableLabel) {
            this._labelHelper = DG.label();
            this._metaLayer.on(this._layerEventsListeners, this);
        }
    },

    removeHooks: function () {
        this._map.removeLayer(this._metaLayer);
        if (!this.options.disableLabel) {
            this._metaLayer.off(this._layerEventsListeners, this);
            this._map.removeLayer(this._labelHelper);
            this._labelHelper = null;
        }
    },

    getMetaLayer : function () {
        return this._metaLayer;
    },

    _processData : function (data, coord) {
        var map = this._map,
            tileOriginPoint = coord.multiplyBy(this._metaLayer._getTileSize());

        if (data.responseText === '') {
            return [];
        }

        return data.result.poi.map(function (item) {
            var geoJson = DG.Wkt.toGeoJSON(item.hover);

            geoJson.coordinates[0] = geoJson.coordinates[0].map(function (revertedLatlng) {
                return map
                        .project([revertedLatlng[1], revertedLatlng[0]]).round()
                        .subtract(tileOriginPoint);
            });
            return {
                id: item.id,
                hint: item.links[0].name,
                linked: item.links[0],
                geometry: geoJson
            };
        });
    },

    _layerEventsListeners : {
        mouseover: function (e) { // (Object)
            this._setCursor('pointer');
            this._labelHelper
                .setPosition(e.latlng)
                .setContent(e.meta.hint);
            this._map.addLayer(this._labelHelper);
        },

        mouseout: function () {
            this._setCursor('auto');
            this._map.removeLayer(this._labelHelper);
        },

        mousemove: function (e) { // (Object)
            this._labelHelper.setPosition(e.latlng);
        }
    },

    _setCursor: function (cursor) { // (String)
        this._map.getContainer().style.cursor = cursor;
    }

});

DG.Map.addInitHook('addHandler', 'poi', DG.Poi);