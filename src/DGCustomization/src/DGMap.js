var panBy = DG.Map.prototype.panBy,
    getBoundsZoom = DG.Map.prototype.getBoundsZoom,
    setMaxZoom = DG.Map.prototype.setMaxZoom;

// Restrict zoom level according to 2gis projects, in case if dgTileLayer is only one
DG.Map.include({

    // number of tileLayers without 2gis layers
    _tileLayersNumber: 0,

    _mapMaxZoomCache: null,

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

        if (options.zoom !== undefined) {
            this._zoom = this._limitZoom(options.zoom);
        }

        this._handlers = [];

        this._layers = {};
        this._zoomBoundLayers = {};

        // initialize _sizeChanged, before init BaseLayer
        // see https://github.com/2gis/mapsapi/pull/264
        this._sizeChanged = true;

        this.callInitHooks();

        this._addLayers(options.layers);

        if (options.center && options.zoom !== undefined) {
            this.setView(L.latLng(options.center), options.zoom, {reset: true});
        }
    },

    setView: function (center, zoom, options) {
        this._restrictZoom(center, zoom);

        zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
        center = this._limitCenter(DG.latLng(center), zoom, this.options.maxBounds);
        options = options || {};

        if (options.animate) {
            options.animate = this._testAnimation(center);
        }

        this.stop();

        if (this._loaded && !options.reset && options !== true) {

            if (options.animate !== undefined) {
                options.zoom = DG.extend({
                    animate: options.animate,
                    duration: options.duration
                }, options.zoom);
                options.pan = DG.extend({
                    animate: options.animate,
                    duration: options.duration
                }, options.pan);
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

        var zoom = this._restrictZoom(this.getCenter());
        if (this.getZoom() > zoom) {
            this.setZoom(zoom);
        }

        return map;
    },

    getBoundsZoom: function (bounds, inside, padding) {
        bounds = DG.latLngBounds(bounds);
        this._restrictZoom(bounds);
        return getBoundsZoom.call(this, bounds, inside, padding);
    },

    getTileLayersNumber: function () {
        return this._tileLayersNumber;
    },

    setMaxZoom: function (zoom) {
        this._mapMaxZoomCache = null;
        return setMaxZoom.call(this, zoom);
    },

    _testAnimation: function (coords) {//if we jump to other project - disable animation
        if (this.projectDetector.enabled()) {
            var projectFrom = this.projectDetector.getProject(),
                projectTo = this.projectDetector.isProjectHere(coords);

            if (projectFrom && projectTo) {
                return projectFrom.code === projectTo.code;
            }
        }

        return true;
    },

    _updateTileLayers: function (e) {
        if (!(e.layer instanceof DG.TileLayer) || e.layer._isDg) { return; }

        if (e.type === 'layeradd') {
            this._tileLayersNumber++;
        } else {
            this._tileLayersNumber--;
        }
    },

    _getNewBounds: function(coords, zoom) {
        if (coords instanceof DG.LatLngBounds) {
            return coords;
        }

        var point = this.project(coords, zoom);
        var screenSize = this.getSize().divideBy(2);

        var sw = this.unproject(point.subtract(screenSize), zoom);
        var ne = this.unproject(point.add(screenSize), zoom);

        return DG.latLngBounds(sw, ne);
    },

    _restrictZoom: function (coords, zoom) {
        if (this._layers &&
            this.projectDetector.enabled() &&
            (this._tileLayersNumber === 0)) {

            var mapOptions = this.options,
                isMapMaxZoom = !!mapOptions.maxZoom,
                dgTileLayer = this.baseLayer,
                bounds = this._getNewBounds(coords, zoom),
                project = this.projectDetector.isProjectHere(bounds);

            if (isMapMaxZoom) {
                if (!this._mapMaxZoomCache) {
                    if (this.baseLayer.options.detectRetina && DG.Browser.retina && mapOptions.maxZoom > 0) {
                        mapOptions.maxZoom--;
                    }

                    this._mapMaxZoomCache = mapOptions.maxZoom;
                }
                mapOptions.maxZoom = (this._mapMaxZoomCache && project) ? this._mapMaxZoomCache :  DG.config.projectLeaveMaxZoom;
                if (project) {
                    this._mapMaxZoomCache = mapOptions.maxZoom;
                }

                return mapOptions.maxZoom;
            } else {
                if (project) {
                    if (dgTileLayer.options.detectRetina && DG.Browser.retina && project.maxZoom > 0) {
                        dgTileLayer.options.maxZoom = project.maxZoom - 1;
                    } else {
                        dgTileLayer.options.maxZoom = project.maxZoom;
                    }
                } else {
                    dgTileLayer.options.maxZoom = DG.config.projectLeaveMaxZoom;
                }

                dgTileLayer.options.maxNativeZoom = dgTileLayer.options.maxZoom;
                this._updateZoomLevels();

                return dgTileLayer.options.maxZoom;
            }
        }
    },

    // Add prepreclick event before preclick than geoclicker can track popup state
    // https://github.com/2gis/mapsapi/pull/96
    _handleDOMEvent: function (e) {
        if (!this._loaded || L.DomEvent._skipped(e)) { return; }

        // find the layer the event is propagating from and its parents
        var type = e.type === 'keypress' && e.keyCode === 13 ? 'click' : e.type;

        if (e.type === 'click') {
            // Fire a synthetic 'preclick' event which propagates up (mainly for closing popups).
            var synthPrePre = L.Util.extend({}, e);
            synthPrePre.type = 'prepreclick';
            this._handleDOMEvent(synthPrePre);

            var synth = L.Util.extend({}, e);
            synth.type = 'preclick';
            this._handleDOMEvent(synth);
        }

        if (type === 'mousedown') {
            // prevents outline when clicking on keyboard-focusable element
            L.DomUtil.preventOutline(e.target || e.srcElement);
        }

        this._fireDOMEvent(e, type);
    },

    _fireDOMEvent: function (e, type, targets) {

        if (e._stopped) { return; }

        targets = (targets || []).concat(this._findEventTargets(e, type));

        if (!targets.length) { return; }

        var target = targets[0];
        if (type === 'contextmenu' && target.listens(type, true)) {
            L.DomEvent.preventDefault(e);
        }

        // prevents firing click after you just dragged an object
        if ((e.type === 'click' || e.type === 'preclick' || e.type === 'prepreclick') && !e._simulated && this._draggableMoved(target)) { return; }

        var data = {
            originalEvent: e
        };

        if (e.type !== 'keypress') {
            var isMarker = target instanceof L.Marker;
            data.containerPoint = isMarker ?
                    this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
            data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
            data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
        }

        for (var i = 0; i < targets.length; i++) {
            targets[i].fire(type, data, true);
            if (data.originalEvent._stopped
                || (targets[i].options.nonBubblingEvents && L.Util.indexOf(targets[i].options.nonBubblingEvents, type) !== -1)) { return; }
        }
    }
});

DG.Map.addInitHook(function () {
    this.on('layeradd layerremove', this._updateTileLayers);
});
