//Inject observing localization change
var controlAddTo = L.Control.prototype.addTo;

L.Control.include({
    addTo: function (map) {
        map.on('langchange', this._renderTranslation, this);

        return controlAddTo.call(this, map);
    },
    _renderTranslation: function () {}
});

// Applies 2GIS divIcon to marker
L.Marker.prototype.options.icon = L.divIcon(L.DG.configTheme.markersData);

// Restrict zoom level according to 2gis projects, in case if dgTileLayer is only one
L.Map.include({
    _tln: 0,
    _mapMaxZoomCache: undefined,

    setView: function (center, zoom, options) {
        this._resctrictZoom(center);

        zoom =  this._limitZoom(zoom === undefined ? this._zoom : zoom);
        center = this._limitCenter(L.latLng(center), zoom, this.options.maxBounds);
        options = options || {};

        if (this._panAnim) {
            this._panAnim.stop();
        }

        if (this._loaded && !options.reset && options !== true) {

            if (options.animate !== undefined) {
                options.zoom = L.extend({animate: options.animate}, options.zoom);
                options.pan = L.extend({animate: options.animate}, options.pan);
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

        var ll = this.layerPointToLatLng(this._getMapPanePos().add(offset));
        var zoom = this._resctrictZoom(ll);

        if (this.getZoom() > zoom) {
            this.setZoom(zoom);
        }

        offset = L.point(offset).round();
        options = options || {};

        if (!offset.x && !offset.y) {
            return this;
        }

        if (!this._panAnim) {
            this._panAnim = new L.PosAnimation();

            this._panAnim.on({
                'step': this._onPanTransitionStep,
                'end': this._onPanTransitionEnd
            }, this);
        }

        // don't fire movestart if animating inertia
        if (!options.noMoveStart) {
            this.fire('movestart');
        }

        // animate pan unless animate: false specified
        if (options.animate !== false) {
            L.DomUtil.addClass(this._mapPane, 'leaflet-pan-anim');

            var newPos = this._getMapPanePos().subtract(offset);
            this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
        } else {
            this._rawPanBy(offset);
            this.fire('move').fire('moveend');
        }

        return this;
    },

    _updateTln: function (e) {
        if (!((e.layer instanceof L.DG.TileLayer) ||
              (e.layer instanceof L.TileLayer))) { return; }

        e.type === 'layeradd' ? this._tln++ : this._tln--;
    },

    _resctrictZoom: function (coords) {
        if (this._layers &&
            this.projectDetector.enabled() &&
            this._tln === 1) {

            var mapOptions = this.options,
                isMapMaxZoom = !!mapOptions.maxZoom,
                dgTileLayer = this.getLayer('dgTileLayer'),
                project = this.projectDetector.isProjectHere(coords);

            if (isMapMaxZoom) {
                this._mapMaxZoomCache = mapOptions.maxZoom;
                mapOptions.maxZoom = (this._mapMaxZoomCache && project) ? this._mapMaxZoomCache :  '__PROJECT_LEAVE_MAX_ZOOM__';
            } else {
                dgTileLayer.options.maxZoom = project ? project.max_zoom_level : '__PROJECT_LEAVE_MAX_ZOOM__';
                this._updateZoomLevels();
            }
        }
    }
});

L.Map.addInitHook(function () {
    this.on('layeradd layerremove', this._updateTln);
});
