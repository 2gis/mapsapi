//Inject observing localization change
var controlAddTo = DG.Control.prototype.addTo;
var panBy = DG.Map.prototype.panBy;

DG.Control.include({
    addTo: function (map) {
        map.on('langchange', this._renderTranslation, this);

        return controlAddTo.call(this, map);
    },
    _renderTranslation: function () {}
});

// Applies 2GIS divIcon to marker
DG.Marker.prototype.options.icon = DG.divIcon(DG.configTheme.markersData);

// Restrict zoom level according to 2gis projects, in case if dgTileLayer is only one
DG.Map.include({

    _mapMaxZoomCache: undefined,

    //TODO try refactor it after up on new leaflet (> 0.7)
    initialize: function (id, options) { // (HTMLElement or String, Object)
        options = L.setOptions(this, options);

        this._initContainer(id);
        this._initLayout();

        // hack for https://github.com/Leaflet/Leaflet/issues/1980
        this._onResize = L.bind(this._onResize, this);

        this._initEvents();

        if (options.maxBounds) {
            this.setMaxBounds(options.maxBounds);
        }

        this._handlers = [];

        this._layers = {};
        this._zoomBoundLayers = {};
        this._tileLayersNum = 0;

        this.callInitHooks();

        this._addLayers(options.layers);

        if (options.center && options.zoom !== undefined) {
            this.setView(L.latLng(options.center), options.zoom, {reset: true});
        }
    },

    setView: function (center, zoom, options) {
        this._resctrictZoom(center);

        zoom =  this._limitZoom(zoom === undefined ? this._zoom : zoom);
        center = this._limitCenter(DG.latLng(center), zoom, this.options.maxBounds);
        options = options || {};

        if (this._panAnim) {
            this._panAnim.stop();
        }

        if (this._loaded && !options.reset && options !== true) {

            if (options.animate !== undefined) {
                options.zoom = DG.extend({animate: options.animate}, options.zoom);
                options.pan = DG.extend({animate: options.animate}, options.pan);
            }

            // try animating pan or zoom
            var animated = (this._zoom !== zoom) ?
                this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom, options.zoom) :
                this._tryAnimatedPan(center, options.pan);

            if (animated) {
                // prevent resize handler call, the view will refresh after animation anyway
                clearTimeout(this._sizeTimer);
                return this;
            }
        }

        // animation didn't start, just reset the map view
        this._resetView(center, zoom);

        return this;
    },

    panBy: function (offset, options) {
        var map = panBy.call(this, offset, options);

        var zoom = this._resctrictZoom(this.getCenter());
        if (this.getZoom() > zoom) {
            this.setZoom(zoom);
        }

        return map;
    },

    _updateTln: function (e) {
        if (typeof this._tln === 'string') { this._tln = 0; }

        if (!(e.layer instanceof DG.TileLayer)) { return; }

        e.type === 'layeradd' ? this._tln++ : this._tln--;
    },

    _updateZoomOnLoad: function (e) {
        this._resctrictZoom(e.getProject().LatLngBounds);
    },

    _resctrictZoom: function (coords) {
        if (this._layers &&
            this.projectDetector.enabled() &&
            (this._tln === 1 || this._tln === 'dgTiles')) {

            var mapOptions = this.options,
                isMapMaxZoom = !!mapOptions.maxZoom,
                dgTileLayer = this.baseLayer,
                project = this.projectDetector.isProjectHere(coords);

            if (isMapMaxZoom) {
                if (!this._mapMaxZoomCache) { this._mapMaxZoomCache = mapOptions.maxZoom; }
                mapOptions.maxZoom = (this._mapMaxZoomCache && project) ? this._mapMaxZoomCache :  '__PROJECT_LEAVE_MAX_ZOOM__';
                project && (this._mapMaxZoomCache = mapOptions.maxZoom);

                return mapOptions.maxZoom;
            } else {
                dgTileLayer.options.maxZoom = project ? project.max_zoom_level : '__PROJECT_LEAVE_MAX_ZOOM__';
                this._updateZoomLevels();

                return dgTileLayer.options.maxZoom;
            }
        }
    }
});

DG.Map.addInitHook(function () {
    this.on('layeradd layerremove', this._updateTln);
});
