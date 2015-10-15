DG.Traffic = DG.TileLayer.extend({
    options: {
        period: 0,
        disableLabel: false
    },

    statics: {
        Dictionary: {}
    },

    initialize: function (options) {
        this._tileUrl = DG.config.protocol + DG.config.trafficTileServer;
        this._metaUrl = DG.config.protocol + DG.config.trafficMetaServer;
        this._timeUrl = DG.config.protocol + DG.config.trafficTimestampServer;

        this._layersOptions = {
            errorTileUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            subdomains: '012345679',
            maxNativeZoom: 18,
            detectRetina: DG.config.detectRetina,
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
    // Что это за штука? Оо

    onAdd: function (map) {
        this._updateLayerProject();

        map
            .addLayer(this._metaLayer)
            .on('projectchange projectleave', this._onMapProjectChange, this);

        if (!this.options.disableLabel) {
            this._metaLayer.on(this._layerEventsListeners, this);
            this._labelHelper = DG.label();
        }

        this._setNextInterval();
        this.update();

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
        var ajaxPromise = this._getTimestampString();

        ajaxPromise.then(
            function (response) {
                self.options.timestampString = '?' + response;
            },
            function () {
                self.options.timestampString = '?' + (new Date()).getTime();
            }).then(
            function () {
                var interval;

                try {
                    var expiresData = ajaxPromise.getResponseHeader('Expires');
                    var currentServerData = ajaxPromise.getResponseHeader('Date');
                    interval = new Date(expiresData).getTime() - new Date(currentServerData).getTime();
                } catch(e) {}

                self._setNextInterval(interval);
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

    _setNextInterval: function(time) {
        if (!time) {
            time = DG.config.trafficLayerUpdateInterval;
        }

        clearInterval(this._updateTimer);
        this._updateTimer = setInterval(this._onTimer, time);
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
        var map = this._map,
            tileOriginPoint = coord.scaleBy(this.getTileSize()),
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
