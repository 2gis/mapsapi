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

// Adds posibility to change max zoom level
L.Map.include({
    setMaxZoom: function (maxZoom) {
    /*if (this.getZoom() > maxZoom) {
        this.setZoom(maxZoom);
    }*/
       /* if (maxZoom) {
            this.getLayer('dgTileLayer').options.maxZoom = maxZoom;
            this._updateZoomLevels();
        }
*/
        return this;
    },

    setView: function (center, zoom, options) {
        if (this._layers) {
            var project = this.projectDetector.isProjectHere(center);

            if (project) {
                this.getLayer('dgTileLayer').options.maxZoom = project.max_zoom_level;
                this._updateZoomLevels();
            } else {
                this.getLayer('dgTileLayer').options.maxZoom = 13;
                this._updateZoomLevels();
            }
        }

        zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
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
