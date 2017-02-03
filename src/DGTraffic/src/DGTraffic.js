DG.Traffic = DG.TileLayer.extend({
    options: {
        period: 0,
        disableLabel: false
    },

    statics: {
        Dictionary: {}
    },

    initialize: function (options) {
        this._tileUrl = DG.config.protocol + (DG.Browser.retina ? DG.config.retinaTrafficTileServer : DG.config.trafficTileServer);
        this._metaUrl = DG.config.protocol + (DG.Browser.retina ? DG.config.retinaTrafficMetaServer : DG.config.trafficMetaServer);
        this._timeUrl = DG.config.protocol + DG.config.trafficTimestampServer;
        this._updateInterval = DG.config.trafficLayerUpdateInterval;

        this._layersOptions = {
            errorTileUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            subdomains: '012345679',
            maxNativeZoom: 18,
            detectRetina: true,
            minZoom: DG.config.trafficLayerMinZoom
        };

        options = DG.setOptions(this, DG.extend(options || {}, this._layersOptions));
        options.timestampString = options.period ? '' : ('?' +  (new Date()).getTime());
        this._metaLayer = DG.Meta.layer(null, {
            detectRetina: options.detectRetina,
            maxNativeZoom: options.maxNativeZoom,
            dataFilter: DG.bind(this._processData, this),
            minZoom: options.minZoom
        });
        this._isDg = true;
        this._onTimer = DG.bind(this._onTimer, this);
        DG.TileLayer.prototype.initialize.call(this, this._tileUrl, options);
    },

    // #setTime(day [0-6], time[0-23]) ????

    onAdd: function (map) {
        this._updateLayerProject();

        map
            .addLayer(this._metaLayer)
            .on('projectchange projectleave', this._onMapProjectChange, this);

        if (!this.options.disableLabel) {
            this._metaLayer.on(this._layerEventsListeners, this);
            this._labelHelper = DG.label();
        }

        if (this._updateInterval) {
            this._updateTimer = setInterval(this._onTimer, this._updateInterval);
        }

        DG.TileLayer.prototype.onAdd.call(this, map);
    },

    onRemove: function (map) {
        clearInterval(this._updateTimer);

        map
            .removeLayer(this._metaLayer)
            .off('projectchange projectleave', this._onMapProjectChange, this);

        if (!this.options.disableLabel) {
            this._metaLayer.off(this._layerEventsListeners, this);
            this._map.removeLayer(this._labelHelper);
            this._labelHelper = null;
        }

        DG.TileLayer.prototype.onRemove.call(this, map);
    },

    update: function () {
        var self = this;
        this._getTimestampString().then(
            function (response) {
                self.options.timestampString = '?' + response;
            },
            function () {
                self.options.timestampString = '?' + (new Date()).getTime();
            }).then(
            function () {
                self.fire('update', {timestamp: self.options.timestampString});
                self._layerEventsListeners.mouseout.call(self);
                self._metaLayer.getOrigin().setURL(self._prepareMetaURL(), self);
                self.redraw();
            }
        );
    },

    getSubdomain: function () {
        return this._layersOptions.subdomains[
            Math.floor(Math.random() * this._layersOptions.subdomains.length)
        ];
    },

    _getTimestampString: function () {
        return DG.ajax(
            DG.Util.template(
                this._timeUrl,
                DG.extend({
                    s : this.getSubdomain(),
                    projectCode: this._map.projectDetector.getProject().code
                }, this.options || {})),
            {type: 'get'}
        );
    },

    _onTimer: function () {
        if (this.options.period === 0) {
            this.update();
        }
    },

    _processData: function (trafficData, coord) {
        var tileOriginPoint = coord.scaleBy(this.getTileSize());
        var polygonLngLatToPoints = DG.bind(this._polygonLngLatToPoints, this, tileOriginPoint);
        var hints = {};

        if (!DG.Util.isArray(trafficData)) {    // TODO remove
            return [];
        }

        trafficData[1].forEach(function (item) {
            this[item.graph_id] = item.speed_text;
        }, hints);

        return trafficData[0]
            .map(function (item) {
                return {
                    id: item.graph_id,
                    speed: hints[item.graph_id],
                    geometry: DG.Wkt.toGeoJSON(item.geometry[0].object[0])
                };
            })
            .filter(function (item) {
                return item.geometry.type == 'Polygon' ||
                    item.geometry.type == 'MultiPolygon';
            })
            .map(function (item) {
                var geoJson = item.geometry;

                if (geoJson.type == 'Polygon') {
                    geoJson.coordinates = polygonLngLatToPoints(geoJson.coordinates);
                } else if (geoJson.type == 'MultiPolygon') {
                    geoJson.coordinates = geoJson.coordinates.map(polygonLngLatToPoints);
                }

                return item;
            });
    },

    _polygonLngLatToPoints: function (originPoint, polygon) {
        var map = this._map;

        return polygon.map(function (contour) {
            return contour.map(function (lngLat) {
                return map
                    .project([lngLat[1], lngLat[0]]).round()
                    .subtract(originPoint);
            });
        });
    },

    _prepareMetaURL: function () {
        return DG.Util.template(this._metaUrl, DG.extend({
            x: '{x}',
            y: '{y}',
            z: '{z}',
            s: '{s}'
        }, this.options));
    },

    _updateLayerProject: function () {
        var project = this._map.projectDetector.getProject();
        DG.setOptions(this, project && project.traffic ? {
            projectCode: project.code,
            bounds: project.latLngBounds,
            minZoom: Math.max(project.minZoom, this._layersOptions.minZoom),
            maxZoom: project.maxZoom
        } : {
            maxZoom: 0,
            minZoom: 0
        });
        this._metaLayer.getOrigin().setURL(this._prepareMetaURL());
    },

    _onMapProjectChange: function () {
        this._updateLayerProject();
        this.redraw();
    },

    _layerEventsListeners: {
        mouseover: function (e) { // (Object)
            this._setCursor('pointer');
            if (this._labelHelper && e.meta.speed) {
                this._labelHelper
                    .setPosition(e.latlng)
                    .setContent(e.meta.speed + ' ' + this.t('speed_unit_km_h'))
                    .addTo(this._map);
            }
        },
        mouseout: function () {
            this._setCursor('');
            if (this._labelHelper) {
                this._map.removeLayer(this._labelHelper);
            }
        },
        mousemove: function (e) {
            if (this._labelHelper) {
                this._labelHelper.setPosition(e.latlng);
            }
        }
    },

    _setCursor: function (cursor) { // (String)
        this._map.getContainer().style.cursor = cursor;
    }

});

DG.Traffic.include(DG.Locale);

DG.traffic = function (options) { // (Object)
    return new DG.Traffic(options);
};
