DG.Traffic = DG.TileLayer.extend({

    options: {
        errorTileUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        subdomains: '012345679',
        detectRetina: true,
        maxNativeZoom: 18,

        period: 0,
        timestampString: '',
        updateInterval: 5000
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
            dataFilter : this._processData, 
        });

        DG.TileLayer.prototype.initialize.call(this, DG.Traffic.tileUrl, options);
    },

    // #setTime(day [0-6], time[0-23]) ????

    onAdd: function (map) {
        this._updateLayerProject(); 

        map
            .addLayer(this._metaLayer)
            .on('projectchange projectleave', this._onMapProjectChange, this);

        DG.TileLayer.prototype.onAdd.call(this);
    },

    onRemove: function (map) {
        map
            .removeLayer(this._metaLayer)
            .off(this._projectEvents, this);

        DG.TileLayer.prototype.onRemove.call(this, map);
    },

    redraw: function () {
        this.options.timestampString = this.options.period ? '' : ('?' + Date.now());
        DG.TileLayer.prototype.redraw.call(this);
    },

    _processData: function (tileData, coord) {
        console.log(tileData, coord);
        return tileData;
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
    }

});
