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

var mapInit = L.Map.prototype.initialize;
// Restrict zoom level according to 2gis projects, in case if dgTileLayer is only one
L.Map.include({

    _tln: 0,
    _mapMaxZoomCache: undefined,

    initialize: function (id, options) {
        this.on('layeradd layerremove', this._updateTln);
        mapInit.call(this, id, options);
    },

    _updateTln: function (e) {
        var layerTest = function (l) {
            return (l instanceof L.DG.TileLayer) ||
                    (l instanceof L.TileLayer);
        };

        if (!layerTest(e.layer)) {
            return;
        }

        this._tln = Object.keys(this._layers)
            .map(function (l) {
                return this._layers[l];
            }, this)
            .filter(layerTest, this)
            .length;
    },

    _resctrictZoom: function (coords) {
        if (this._layers &&
            this.projectDetector.enabled() &&
            this._tln === 1 &&
            this.getLayer('dgTileLayer')) {

            var isMapMaxZoom = !!this.options.maxZoom,
                /*mapOptions = this.options,
                optToRestrict = isMapMaxZoom ? mapOptions : this.getLayer('dgTileLayer').options,*/
                project = this.projectDetector.isProjectHere(coords);
            //console.log('limit, mthfc!');
            if (project) {
                if (isMapMaxZoom) {
                    this.options.maxZoom = this._mapMaxZoomCache;
                } else {
                    this.getLayer('dgTileLayer').options.maxZoom = project.max_zoom_level;
                    this._updateZoomLevels();
                }
            } else {
                if (isMapMaxZoom) {
                    this._mapMaxZoomCache = this.options.maxZoom;
                    this.options.maxZoom = 13;
                } else {
                    this.getLayer('dgTileLayer').options.maxZoom = 13;
                    this._updateZoomLevels();
                }

            }
        }
    },

    setView: function (center, zoom, options) {
        //debugger;
        this._resctrictZoom(center);

        zoom =  this._limitZoom(zoom === undefined ? this._zoom : zoom);
        console.log('limit zoom: ', zoom);
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
