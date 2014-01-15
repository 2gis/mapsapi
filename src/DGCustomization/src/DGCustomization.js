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
    _resctrictZoom: function (coords) {
        if (this._layers &&
            this.projectDetector.enabled() &&
            this._tileLayersNum === 1 &&
            this.getLayer('dgTileLayer')) {

            var project = this.projectDetector.isProjectHere(coords);

            if (project) {
                this.getLayer('dgTileLayer').options.maxZoom = project.max_zoom_level;
                this._updateZoomLevels();
            } else {
                this.getLayer('dgTileLayer').options.maxZoom = 13;
                this._updateZoomLevels();
            }
        }

        //(this.getZoom() > this.getMaxZoom()) && this.setZoom(this.getMaxZoom());
    },

    setView: function (center, zoom, options) {
        //debugger;
        this._resctrictZoom(center);

        zoom = this._limitZoom(zoom === undefined ? this._zoom : zoom);
        console.log('limited', zoom);
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
    }
});
