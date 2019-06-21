DG.Traffic = DG.TileLayer.extend({
    options: {
        period: 0,
        disableLabel: false,
        updateWhenIdle: false // display new traffic tiles on move for mobile
    },

    statics: {
        Dictionary: {}
    },

    initialize: function(options) {
        this._tileUrl = DG.config.protocol + (DG.Browser.retina ? DG.config.retinaTrafficTileServer : DG.config.trafficTileServer);
        this._metaUrl = DG.config.protocol + (DG.Browser.retina ? DG.config.retinaTrafficMetaServer : DG.config.trafficMetaServer);
        this._timeUrl = DG.config.protocol + DG.config.trafficTimestampServer;
        this._updateInterval = DG.config.trafficLayerUpdateInterval;

        this._layersOptions = {
            errorTileUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            subdomains: '012345679',
            maxNativeZoom: 18,
            detectRetina: DG.config.detectRetina,
            minZoom: DG.config.trafficLayerMinZoom
        };

        options = DG.setOptions(this, DG.extend(options || {}, this._layersOptions));
        this._metaLayer = DG.Meta.layer(null, {
            detectRetina: options.detectRetina,
            maxNativeZoom: options.maxNativeZoom,
            dataFilter: DG.bind(this._processData, this),
            minZoom: options.minZoom
        });
        this._isDg = true;
        this._isOnRequest = false; // timestampString request flag
        this._onTimer = DG.bind(this._onTimer, this);
        DG.TileLayer.prototype.initialize.call(this, this._tileUrl, options);
    },

    // #setTime(day [0-6], time[0-23]) ????

    onAdd: function(map) {
        this._initContainer();
        this._levels = {};
        this._tiles = {};

        if (this.options.period) {
            this.options.timestampString = '';
            this._onAddSetParams(map);
        } else {
            var self = this;
            this._isOnRequest = true;
            this._getTimestampString()
                .then(
                    function(response) {
                        self.options.timestampString = '?' + response;
                    },
                    function() {
                        self.options.timestampString = '?' + (new Date()).getTime();
                    })
                .then(
                    function() {
                        self._isOnRequest = false;
                        if (self._map) { // if traffic layer has not been removed from map before server response and timestampString variable is assigned
                            self._onAddSetParams(map);
                        }
                    }
                );
        }
    },

    onRemove: function(map) {
        if (!this._isOnRequest) {
            clearInterval(this._updateTimer);

            map
                .removeLayer(this._metaLayer)
                .off('projectchange projectleave', this._onMapProjectChange, this);

            if (!this.options.disableLabel) {
                this._metaLayer.off(this._layerEventsListeners, this);
                this._map.removeLayer(this._labelHelper);
                this._labelHelper = null;
                this._map.off('langchange', this._updateLang, this);
            }

            DG.TileLayer.prototype.onRemove.call(this, map);
        } else {
            L.DomUtil.remove(this._container);
            map._removeZoomLimit(this);
            this._container = null;
        }
    },

    update: function() {
        var self = this;
        this._getTimestampString().then(
            function(response) {
                self.options.timestampString = '?' + response;
            },
            function() {
                self.options.timestampString = '?' + (new Date()).getTime();
            }).then(
            function() {
                self.fire('update', {timestamp: self.options.timestampString});
                self._layerEventsListeners.mouseout.call(self);
                self._metaLayer.getOrigin().setURL(self._prepareMetaURL(), self);
                self.redraw();
            }
        );
    },

    getSubdomain: function() {
        return this._layersOptions.subdomains[
            Math.floor(Math.random() * this._layersOptions.subdomains.length)
        ];
    },

    _updateLang: function() {
        var lang = this._map.getLang();
        if (lang === 'ar') {
            this._labelHelper.options.textDirection = 'rtl';
        } else {
            this._labelHelper.options.textDirection = 'auto';
        }
    },

    _getTimestampString: function() {
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

    _onTimer: function() {
        if (this.options.period === 0) {
            this.update();
        }
    },

    _processData: function(trafficData, coord) {
        var tileOriginPoint = coord.scaleBy(this.getTileSize());
        var polygonLngLatToPoints = DG.bind(this._polygonLngLatToPoints, this, tileOriginPoint);
        var hints = {};

        if (!DG.Util.isArray(trafficData)) {    // TODO remove
            return [];
        }

        trafficData[1].forEach(function(item) {
            this[item.graph_id] = item.speed_text;
        }, hints);

        return trafficData[0]
            .map(function(item) {
                return {
                    id: item.graph_id,
                    speed: hints[item.graph_id],
                    geometry: DG.Wkt.toGeoJSON(item.geometry[0].object[0])
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

    _prepareMetaURL: function() {
        return DG.Util.template(this._metaUrl, DG.extend({
            x: '{x}',
            y: '{y}',
            z: '{z}',
            s: '{s}'
        }, this.options));
    },

    _updateLayerProject: function() {
        var project = this._map.projectDetector.getProject();
        DG.setOptions(this, project && project.traffic ? {
            projectCode: project.code,
            bounds: project.latLngBounds,
            minZoom: Math.max(project.minZoom, this._layersOptions.minZoom),
            maxZoom: project.maxZoom
        } : {
            maxZoom: project ? project.maxZoom : DG.config.projectLeaveMaxZoom,
            minZoom: 0
        });
        this._metaLayer.getOrigin().setURL(this._prepareMetaURL());
    },

    _onMapProjectChange: function() {
        this._updateLayerProject();
        this.redraw();
    },

    _layerEventsListeners: {
        mouseover: function(e) { // (Object)
            this._setCursor('pointer');
            if (this._labelHelper && e.meta.speed) {
                this._labelHelper
                    .setPosition(e.latlng)
                    .setContent(e.meta.speed + ' ' + this.t('speed_unit_km_h'))
                    .addTo(this._map);
            }
        },
        mouseout: function() {
            this._setCursor('');
            if (this._labelHelper) {
                this._map.removeLayer(this._labelHelper);
            }
        },
        mousemove: function(e) {
            if (this._labelHelper) {
                this._labelHelper.setPosition(e.latlng);
            }
        }
    },

    _setCursor: function(cursor) { // (String)
        this._map.getContainer().style.cursor = cursor;
    },

    _onAddSetParams: function(map) {
        this._updateLayerProject();

        map
            .addLayer(this._metaLayer)
            .on('projectchange projectleave', this._onMapProjectChange, this);

        if (!this.options.disableLabel) {
            this._metaLayer.on(this._layerEventsListeners, this);
            this._labelHelper = DG.label();
            this._map.on('langchange', this._updateLang, this);
        }

        if (this._updateInterval) {
            this._updateTimer = setInterval(this._onTimer, this._updateInterval);
        }

        this._resetView();
        this._update();
    },

    _update: function(center) {
        if (!this._isOnRequest) {
            DG.TileLayer.prototype._update.call(this, center);
        }
    }

});

DG.Traffic.include(DG.Locale);

DG.traffic = function(options) { // (Object)
    return new DG.Traffic(options);
};
