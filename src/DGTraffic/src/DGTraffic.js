DG.Traffic = DG.TileLayer.extend({

    options: {
        errorTileUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        subdomains: '012345679',
        detectRetina: true,
        maxNativeZoom: 18,

        period: 0,
        
        // updateInterval: 300000,
        disableLabel: false
    },

    statics: {
        tileUrl: '__TRAFFIC_TILE_SERVER__',
        metaUrl: '__TRAFFIC_META_SERVER__'
    },

    initialize: function (options) {
        options = L.setOptions(this, options);
        options.timestampString = options.period ? '' : ('?' + Date.now());

        this._metaLayer = DG.Meta.layer(null, {
            subdomains : options.subdomains,
            detectRetina : options.detectRetina,
            maxNativeZoom : options.maxNativeZoom,
            dataFilter : DG.bind(this._processData, this)
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

        // if (this.options.updateInterval) {
        //     this._updateTimer = setInterval(this._onTimer, this.options.updateInterval);
        // }

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

    redraw: function () {
        this.options.timestampString = this.options.period ? '' : ('?' + Date.now());
        this._layerEventsListeners.mouseout.call(this);
        this._metaLayer.getOrigin().setURL(this._prepareMetaURL(), true);
        return DG.TileLayer.prototype.redraw.call(this);
    },

    _onTimer : function () {
        if (!this.options.period) {
            this.redraw();
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
                id : item.graph_id,
                speed : hints[item.graph_id],
                geometry : geoJson
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
        console.log(DG.setOptions(this, project && project.traffic ? {
                projectCode: project.code,
                bounds: project.LatLngBounds,
                minZoom: project.min_zoom_level,
                maxZoom: project.max_zoom_level
            } : {
                maxZoom: 0 
        }));
        DG.setOptions(this, project && project.traffic ? {
                projectCode: project.code,
                bounds: project.LatLngBounds,
                minZoom: project.min_zoom_level,
                maxZoom: project.max_zoom_level
            } : {
                maxZoom: 0 
        });
        this._metaLayer.getOrigin().setURL(this._prepareMetaURL());
    },

    _onMapProjectChange: function () {
        this._updateLayerProject();
        this.redraw();
    },

    _layerEventsListeners : {
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
