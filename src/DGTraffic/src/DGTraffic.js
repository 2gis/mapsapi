DG.Traffic = DG.TileLayer.extend({

    options: {
        errorTileUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        subdomains: '012345679',
        period: 0,
        timestampString: '',
        detectRetina: true,
        maxNativeZoom: 18
    },

    statics: {
        tileUrl: '__TRAFFIC_TILE_SERVER__'
    },

    initialize: function (options) {
        DG.TileLayer.prototype.initialize.call(this, DG.Traffic.tileUrl, options);
    },

    onAdd: function (map) {
        var project = map.projectDetector.getProject();

        project && project.traffic ? this._setProjectOptions(project) : this._resetProjectOptions();

        this._handler = new DG.Traffic.Handler(map, this.options);
        this._handler.enable();

        DG.TileLayer.prototype.onAdd.call(this);
        map.on(this._projectEvents, this);
    },

    onRemove: function (map) {
        map.off(this._projectEvents, this);
        this._handler.disable();
        DG.TileLayer.prototype.onRemove.call(this, map);
    },

    setPeriod: function (period) {
        DG.setOptions(this, { period : period });
        this.update();
    },

    update: function () {
        DG.setOptions(this, {
            timestampString : this.options.period ? '' : ('?' + Date.now())
        });
        this.redraw();
    },

    _resetProjectOptions: function () {
        DG.setOptions(this, {
            timestampString : this.options.period ? '' : ('?' + Date.now()),
            minZoom: 0,
            maxZoom: 0
        });
    },

    _setProjectOptions: function (project) {
        DG.setOptions(this, {
            timestampString : this.options.period ? '' : ('?' + Date.now()),
            projectCode: project.code,
            bounds: project.LatLngBounds,
            minZoom: project.min_zoom_level,
            maxZoom: project.max_zoom_level
        });
    },

    _projectEvents: {
        projectchange : function (event) {
            var project = event.getProject();
            project.traffic ? this._setProjectOptions(project) : this._resetProjectOptions();
            this.redraw();
        },
        projectleave : function () {
            this._resetProjectOptions();
            this.redraw();
        }
    }

});
