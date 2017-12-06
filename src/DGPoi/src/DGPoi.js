DG.Map.mergeOptions({
    poi: true
});

DG.Poi = DG.Handler.extend({

    options: {
        disableLabel: false
    },

    initialize: function(map, options) { // (Object)
        this._map = map;
        DG.Util.setOptions(this, options);

        var url = DG.config.protocol + (DG.Browser.retina ? DG.config.retinaPoiMetaServer : DG.config.poiMetaServer);

        this._metaLayer = DG.Meta.layer(url, {
            minZoom: DG.config.poiLayerMinZoom,
            maxNativeZoom: 19,
            detectRetina: DG.config.detectRetina,
            eventBubbling: 'layer',
            dataFilter: DG.bind(this._processData, this)
        });
    },

    addHooks: function() {
        this._map.addLayer(this._metaLayer);
        if (!this.options.disableLabel) {
            this._labelHelper = DG.label();
        }
        this._metaLayer.on(this._layerEventsListeners, this);
    },

    removeHooks: function() {
        this._map.removeLayer(this._metaLayer);
        if (!this.options.disableLabel) {
            this._map.removeLayer(this._labelHelper);
            this._labelHelper = null;
        }
        this._metaLayer.off(this._layerEventsListeners, this);
    },

    getMetaLayer : function() {
        return this._metaLayer;
    },

    _processData : function(data, coord) {
        var tileOriginPoint = coord.scaleBy(this._metaLayer.getTileSize());
        var polygonLngLatToPoints = DG.bind(this._polygonLngLatToPoints, this, tileOriginPoint);

        if (data.responseText === '') {
            return [];
        }

        return data.result.poi
            .map(function(item) {
                return {
                    id: item.id,
                    hint: item.links[0].name,
                    linked: item.links[0],
                    geometry: DG.Wkt.toGeoJSON(item.hover)
                };
            })
            .filter(function(item) {
                return item.geometry.type == 'Polygon' ||
                    item.geometry.type == 'MultiPolygon';
            })
            .map(function(item) {
                var geoJson = item.geometry;

                if (geoJson.type == 'Polygon') {
                    geoJson.coordinates = polygonLngLatToPoints(geoJson.coordinates);
                } else if (geoJson.type == 'MultiPolygon') {
                    geoJson.coordinates = geoJson.coordinates.map(polygonLngLatToPoints);
                }

                return item;
            });
    },

    _polygonLngLatToPoints: function(originPoint, polygon) {
        var map = this._map;

        return polygon.map(function(contour) {
            return contour.map(function(lngLat) {
                return map
                    .project([lngLat[1], lngLat[0]]).round()
                    .subtract(originPoint);
            });
        });
    },

    _layerEventsListeners : {
        mouseover: function(e) { // (Object)
            this._setCursor('pointer');
            if (e.meta.hint && e.meta.hint.length && !this.options.disableLabel) {
                this._labelHelper
                    .setPosition(e.latlng)
                    .setContent(e.meta.hint)
                    .setZIndexOffset(300);
                this._map.addLayer(this._labelHelper);
            }
            this._map.fire('poihover', {
                latlng: e.latlng,
                meta: e.meta
            });
        },

        mouseout: function(e) {
            this._setCursor('');
            if (!this.options.disableLabel) {
                this._map.removeLayer(this._labelHelper);
            }
            this._map.fire('poileave', {
                latlng: e.latlng,
                meta: e.meta
            });
        },

        mousemove: function(e) { // (Object)
            if (!this.options.disableLabel) {
                this._labelHelper.setPosition(e.latlng);
            }
        }
    },

    _setCursor: function(cursor) { // (String)
        this._map.getContainer().style.cursor = cursor;
    }

});

DG.Map.addInitHook('addHandler', 'poi', DG.Poi);
