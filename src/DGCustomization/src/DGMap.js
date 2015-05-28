var panBy = DG.Map.prototype.panBy,
    getBoundsZoom = DG.Map.prototype.getBoundsZoom;

// Restrict zoom level according to 2gis projects, in case if dgTileLayer is only one
DG.Map.include({

    // number of tileLayers without 2gis layers
    _tileLayersNumber: 0,

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

        this.callInitHooks();

        this._addLayers(options.layers);

        if (options.center && options.zoom !== undefined) {
            this.setView(L.latLng(options.center), options.zoom, {reset: true});
        }

        this._sizeChanged = true;
    },

    setView: function (center, zoom, options) {
        this._restrictZoom(center);

        zoom =  this._limitZoom(zoom === undefined ? this._zoom : zoom);
        center = this._limitCenter(DG.latLng(center), zoom, this.options.maxBounds);
        options = options || {};

        if (options.animate) {
            options.animate = this._testAnimation(center);
        }

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

    _restrictZoom: function (coords) {
        if (this._layers &&
            this.projectDetector.enabled() &&
            (this._tileLayersNumber === 0)) {

            var mapOptions = this.options,
                isMapMaxZoom = !!mapOptions.maxZoom,
                dgTileLayer = this.baseLayer,
                project = this.projectDetector.isProjectHere(coords);
            if (isMapMaxZoom) {
                if (!this._mapMaxZoomCache) { this._mapMaxZoomCache = mapOptions.maxZoom; }
                mapOptions.maxZoom = (this._mapMaxZoomCache && project) ? this._mapMaxZoomCache :  '__PROJECT_LEAVE_MAX_ZOOM__';
                if (project) {
                    this._mapMaxZoomCache = mapOptions.maxZoom;
                }

                return mapOptions.maxZoom;
            } else {
                dgTileLayer.options.maxZoom = project ? project.maxZoom : '__PROJECT_LEAVE_MAX_ZOOM__';
                dgTileLayer.options.maxNativeZoom = dgTileLayer.options.maxZoom;
                this._updateZoomLevels();

                return dgTileLayer.options.maxZoom;
            }
        }
    },

    // Fix for https://github.com/2gis/mapsapi/issues/34
    // Remove on the next leaflet version
    // Add prepreclick event before preclick than geoclicker can track popup state
    // https://github.com/2gis/mapsapi/pull/96
    _fireMouseEvent: function (obj, e, type, propagate, latlng) {
        type = type || e.type;

        if (L.DomEvent._skipped(e)) { return; }

        if (type === 'click') {
            var draggableObj = obj.options.draggable === true ? obj : this;
            if (!e._simulated && ((draggableObj.dragging && draggableObj.dragging.moved()) ||
                (this.boxZoom && this.boxZoom.moved()))) {
                L.DomEvent.stopPropagation(e);
                return;
            }
            obj.fire('prepreclick');
            obj.fire('preclick');
        }

        if (!obj.listens(type, propagate)) { return; }

        if (type === 'contextmenu') {
            L.DomEvent.preventDefault(e);
        }
        if (type === 'click' || type === 'dblclick' || type === 'contextmenu') {
            L.DomEvent.stopPropagation(e);
        }

        var data = {
            originalEvent: e,
            containerPoint: this.mouseEventToContainerPoint(e)
        };

        data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
        data.latlng = latlng || this.layerPointToLatLng(data.layerPoint);

        obj.fire(type, data, propagate);
    }
});

DG.Map.addInitHook(function () {
    this.on('layeradd layerremove', this._updateTileLayers);
});

// fix bug with dragging map into new parallel world
// remove on next leaflet version
DG.Map.Drag.include({
    _onDrag: function () {
        if (this._map.options.inertia) {
            var time = this._lastTime = +new Date(),
                pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;

            this._positions.push(pos);
            this._times.push(time);

            if (time - this._times[0] > 200) {
                this._positions.shift();
                this._times.shift();
            }
        }

        this._map
            .fire('move')
            .fire('drag');
    },
    _onPreDrag: function () {
        // TODO refactor to be able to adjust map pane position after zoom
        var worldWidth = this._worldWidth,
            halfWidth = Math.round(worldWidth / 2),
            dx = this._initialWorldOffset,
            x = this._draggable._newPos.x,
            newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx,
            newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx,
            newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;

        this._draggable._absPos = this._draggable._newPos.clone();
        this._draggable._newPos.x = newX;
    }
});
