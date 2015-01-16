//Inject observing localization change
var controlAddTo = DG.Control.prototype.addTo,
    panBy = DG.Map.prototype.panBy,
    getBoundsZoom = DG.Map.prototype.getBoundsZoom;

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

    _updateTln: function (e) {
        if (typeof this._tln === 'string') { this._tln = 0; }
        if (!(e.layer instanceof DG.TileLayer) || e.layer._isDg) { return; }

        e.type === 'layeradd' ? this._tln++ : this._tln--;
    },

    _restrictZoom: function (coords) {
        if (this._layers &&
            this.projectDetector.enabled() &&
            (this._tln === 0 || this._tln === 'dgTiles')) {

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
                dgTileLayer.options.maxZoom = project ? project.maxZoom : '__PROJECT_LEAVE_MAX_ZOOM__';
                dgTileLayer.options.maxNativeZoom = dgTileLayer.options.maxZoom;
                this._updateZoomLevels();

                return dgTileLayer.options.maxZoom;
            }
        }
    },

    // Fix for https://github.com/2gis/mapsapi/issues/34
    // Remove on the next leaflet version
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
    },
});

DG.Map.addInitHook(function () {
    this.on('layeradd layerremove', this._updateTln);
});

// Add some browser detection
DG.Browser.safari51 = DG.Browser.safari && navigator.userAgent.indexOf('Version/5.1') !== -1;

// Fix bug with tileLayer minZoom
DG.GridLayer.include({
    _update: function () {

        if (!this._map) { return; }

        var bounds = this._map.getPixelBounds(),
            zoom = this._map.getZoom(),
            tileSize = this._getTileSize();

        if (zoom > this.options.maxZoom ||
            zoom < this.options.minZoom) {
            this._clearBgBuffer();
            return;
        }

        // tile coordinates range for the current view
        var tileBounds = L.bounds(
            bounds.min.divideBy(tileSize).floor(),
            bounds.max.divideBy(tileSize).floor());

        this._addTiles(tileBounds);

        if (this.options.unloadInvisibleTiles) {
            this._removeOtherTiles(tileBounds);
        }
    }
});

// Fix for https://github.com/2gis/mapsapi/issues/111 , remove on the next leaflet version
L.Draggable.include({
    _onMove: function (e) {
        if (e.touches && e.touches.length > 1) {
            this._moved = true;
            return;
        }

        var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
            newPoint = new L.Point(first.clientX, first.clientY),
            offset = newPoint.subtract(this._startPoint);

        if (!offset.x && !offset.y) { return; }
        if (L.Browser.touch && Math.abs(offset.x) + Math.abs(offset.y) < 3) { return; }

        L.DomEvent.preventDefault(e);

        if (!this._moved) {
            this.fire('dragstart');

            this._moved = true;
            this._startPos = L.DomUtil.getPosition(this._element).subtract(offset);

            L.DomUtil.addClass(document.body, 'leaflet-dragging');

            this._lastTarget = e.target || e.srcElement;
            L.DomUtil.addClass(this._lastTarget, 'leaflet-drag-target');
        }

        this._newPos = this._startPos.add(offset);
        this._moving = true;

        L.Util.cancelAnimFrame(this._animRequest);
        this._animRequest = L.Util.requestAnimFrame(this._updatePosition, this, true, this._dragStartTarget);
    },
    _onUp: function () {
        L.DomUtil.removeClass(document.body, 'leaflet-dragging');

        if (this._lastTarget) {
            L.DomUtil.removeClass(this._lastTarget, 'leaflet-drag-target');
            this._lastTarget = null;
        }

        for (var i in L.Draggable.MOVE) {
            L.DomEvent
                .off(document, L.Draggable.MOVE[i], this._onMove, this)
                .off(document, L.Draggable.END[i], this._onUp, this);
        }

        L.DomUtil.enableImageDrag();
        L.DomUtil.enableTextSelection();

        if (this._moved && this._moving) {
            // ensure drag is not fired after dragend
            L.Util.cancelAnimFrame(this._animRequest);

            this.fire('dragend', {
                distance: this._newPos.distanceTo(this._startPos)
            });
        }

        this._moving = false;
    }
});
