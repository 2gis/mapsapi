DG.TrafficLayer = DG.TileLayer.extend({

    options: {
        subdomains: '012345679',
        period: 0
    },
    
    statics: {
        tileUrl: '__TRAFFIC_TILE_SERVER__',
        metaUrl: '__TRAFFIC_META_SERVER__'
    },

    initialize: function () {
        DG.TileLayer.prototype.initialize.call(this, DG.TrafficLayer.tileUrl);
    },

    onAdd: function (map) {
        var project = map.projectDetector.getProject();

        project ? this._setProjectOptions(project) : this._setNullOptions();

        this._handler = new DG.TrafficHandler(map);
        this._handler.enable();

        DG.TileLayer.prototype.onAdd.call(this);
        map.on(this._projectEvents, this);
        // map.meta.enablePoiListening();
    },

    onRemove: function (map) {
        map.off(this._projectEvents, this);
        DG.TileLayer.prototype.onRemove.call(this, map);
    },

    setPeriod: function (period) {
        DG.setOptions(this, { period : period });
        this.redraw();
    },

    _setNullOptions: function () {
        DG.setOptions(this, {
            minZoom: 0,
            maxZoom: 0
        });
    },

    _setProjectOptions: function (project) {
        DG.setOptions(this, {
            projectCode: project.code,
            minZoom: project.min_zoom_level,
            maxZoom: project.max_zoom_level,
            bounds: project.LatLngBounds
        });
    },

    _projectEvents: {
        projectchange : function (event) {
            var project = event.getProject();
            this._setProjectOptions(project);
            this.redraw();
        },
        projectleave : function () {
            this._setNullOptions();
            this.redraw();
        }
    }

});