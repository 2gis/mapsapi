/* global __TRAFFIC_LAYER_UPDATE_INTERVAL__, __TRAFFIC_LAYER_MIN_ZOOM__ */

DG.Traffic = DG.TileLayer.extend({

    options: {
        period: 0,
        disableLabel: false
    },

    statics: {
        tileUrl: '__TRAFFIC_TILE_SERVER__',
        metaUrl: '__TRAFFIC_META_SERVER__',
        timeUrl: '__TRAFFIC_TIMESTAMP_SERVER__',
        updateInterval: __TRAFFIC_LAYER_UPDATE_INTERVAL__,
        layersOptions: {
            errorTileUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            subdomains: '012345679',
            detectRetina: true,
            maxNativeZoom: 18,
            minZoom: __TRAFFIC_LAYER_MIN_ZOOM__
        }
    },

    initialize: function (options) {
        options = DG.setOptions(this, DG.extend(options || {}, DG.Traffic.layersOptions));
        options.timestampString = options.period ? '' : ('?' +  (new Date()).getTime());
        this._metaLayer = DG.Meta.layer(null, {
            detectRetina: options.detectRetina,
            maxNativeZoom: options.maxNativeZoom,
            dataFilter: DG.bind(this._processData, this),
            minZoom: options.minZoom
        });

        this._onTimer = DG.bind(this._onTimer, this);
        DG.TileLayer.prototype.initialize.call(this, DG.Traffic.tileUrl, options);
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

        if (DG.Traffic.updateInterval) {
            this._updateTimer = setInterval(this._onTimer, DG.Traffic.updateInterval);
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
        
        this._getTimestampString().then(
            function (response) {
                this.options.timestampString = '?' + response;
            },
            function () {
                this.options.timestampString = '?' + (new Date()).getTime();
            }).then(
            function () {
                this.fire('update', { timestamp: this.options.timestampString });
                this._layerEventsListeners.mouseout.call(this);
                this._metaLayer.getOrigin().setURL(this._prepareMetaURL(), true);
                this.redraw();
            }
        );
    },

    _getTimestampString: function () {
        return DG.ajax(DG.Util.template(DG.Traffic.timeUrl, DG.extend({ s : this._getSubdomain(), projectCode: this._map.projectDetector.getProject().code}, this.options || {})),
            { type: 'get' });
    },

    _getSubdomain: function () {
        return DG.Traffic.layersOptions.subdomains[Math.floor(Math.random() * DG.Traffic.layersOptions.subdomains.length)];
    },

    _onTimer: function () {
        if (this.options.period === 0) {
            this.update();
        }
    },

    _processData: function (trafficData, coord) {
        var map = this._map,
            tileOriginPoint = coord.multiplyBy(this._getTileSize()),
            hints = {};

        if (!DG.Util.isArray(trafficData)) {    // TODO remove
            return [];
        }

        trafficData[1].forEach(function (item) {
            this[item.graph_id] = item.speed_text;
        }, hints);

        return trafficData[0].map(function (item) {
            var geoJson = DG.Wkt.toGeoJSON(item.geometry[0].object[0]);

            geoJson.coordinates[0] = geoJson.coordinates[0].map(function (revertedLatlng) {
                return map
                        .project([revertedLatlng[1], revertedLatlng[0]]).round()
                        .subtract(tileOriginPoint);
            }); // TODO check with MultiPoigon and etc.
            return {
                id: item.graph_id,
                speed: hints[item.graph_id],
                geometry: geoJson
            };
        });
    },

    _prepareMetaURL: function () {
        return DG.Util.template(DG.Traffic.metaUrl, DG.extend({
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
                minZoom: Math.max(project.minZoom, DG.Traffic.layersOptions.minZoom),
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
                    .setContent(e.meta.speed + ' км/ч')
                    .addTo(this._map);
            }
        },
        mouseout: function () {
            this._setCursor('auto');
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
