var initMap = DG.Map.prototype.initialize,
    panBy = DG.Map.prototype.panBy,
    getBoundsZoom = DG.Map.prototype.getBoundsZoom,
    setMaxZoom = DG.Map.prototype.setMaxZoom;

// Restrict zoom level according to 2gis projects, in case if dgTileLayer is only one
DG.Map.include({

    // number of tileLayers without 2gis layers
    _tileLayersNumber: 0,

    _mapMaxZoomCache: null,

    //TODO try refactor it after up on new leaflet (> 0.7)
    initialize: function(id, options) { // (HTMLElement or String, Object)
        // Override default wheelPxPerZoomLevel value to avoid zooming too fast
        // on mouse wheel rotation
        // See https://github.com/2gis/mapsapi/issues/343
        options = DG.extend({wheelPxPerZoomLevel: 10000}, options);

        this.metaLayers = {
            poi: undefined,
            traffic: undefined
        };
        this.markerWasHovered = false;

        initMap.call(this, id, options);

        //  Project must be checked after BaseLayer init which occurs in InitHook (see orig method definition)
        if (this.options.center && this.options.zoom !== undefined) {
            this.setView(DG.latLng(this.options.center), this.options.zoom, {reset: true});
        }
    },

    setView: function(center, zoom, options) {
        this._restrictZoom(center, zoom);

        zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
        center = this._limitCenter(DG.latLng(center), zoom, this.options.maxBounds);
        options = options || {};

        if (options.animate) {
            options.animate = this._testAnimation(center);
        }

        this._stop();

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

    panBy: function(offset, options) {
        var map = panBy.call(this, offset, options);

        var zoom = this._restrictZoom(this.getCenter());
        if (this.getZoom() > zoom) {
            this.setZoom(zoom);
        }

        return map;
    },

    getBoundsZoom: function(bounds, inside, padding) {
        bounds = DG.latLngBounds(bounds);
        this._restrictZoom(bounds);
        return getBoundsZoom.call(this, bounds, inside, padding);
    },

    getTileLayersNumber: function() {
        return this._tileLayersNumber;
    },

    setMaxZoom: function(zoom) {
        this._mapMaxZoomCache = null;
        return setMaxZoom.call(this, zoom);
    },

    _testAnimation: function(coords) {//if we jump to other project - disable animation
        if (this.projectDetector.enabled()) {
            var projectFrom = this.projectDetector.getProject(),
                projectTo = this.projectDetector.isProjectHere(coords);

            if (projectFrom && projectTo) {
                return projectFrom.code === projectTo.code;
            }
        }

        return true;
    },

    _updateTileLayers: function(e) {
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

    _restrictZoom: function(coords, zoom) {
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

    _handleMetaLayers: function(eventType, data) {
        var trafficLayer = this.metaLayers.traffic;
        var poiLayer = this.metaLayers.poi;
        var listener;

        // no layers
        if (!trafficLayer && !poiLayer) {
            return;
        }

        // one layer
        if ((!trafficLayer && poiLayer) || (trafficLayer && !poiLayer)) {
            var layer = trafficLayer || poiLayer;
            listener = layer.mapEvents[eventType];
            if (listener) {
                if (eventType === 'mousemove') {
                    var obj = layer.getHoveredObject.call(layer, data);
                    if (!obj.was && obj.now) {
                        layer.mapEvents.mouseover.call(layer, data);
                    }
                    if (obj.was && !obj.now) {
                        layer.mapEvents.mouseout.call(layer, data, obj.was);
                    }
                    if (obj.was && obj.now && obj.was.id !== obj.now.id) {
                        layer.mapEvents.mouseout.call(layer, data, obj.was);
                        layer.mapEvents.mouseover.call(layer, data);
                    }
                    if (obj.now) {
                        layer.mapEvents.mousemove.call(layer, data);
                    }
                } else {
                    listener.call(layer, data);
                }
            }
            return;
        }

        // two layers, not mousemove
        if (eventType !== 'mousemove') {
            listener = trafficLayer.mapEvents[eventType];
            if (listener) {
                listener.call(trafficLayer, data);
            }
            listener = poiLayer.mapEvents[eventType];
            if (listener) {
                listener.call(poiLayer, data);
            }
            return;
        }

        // two layers, shitty mousemove
        // possible transitions:
        // 1. out -> poi
        // 2. out -> traffic
        // 3. poi -> out
        // 4. poi -> poi
        // 5. poi -> traffic
        // 6. traffic -> out
        // 7. traffic -> traffic
        // 8. traffic -> poi
        var traffic = trafficLayer.getHoveredObject.call(trafficLayer, data);
        var poi = poiLayer.getHoveredObject.call(poiLayer, data);

        var trafficOver = !traffic.was && traffic.now;
        var trafficOut = traffic.was && !traffic.now;
        var trafficChange = traffic.was && traffic.now && traffic.was.id !== traffic.now.id;
        var trafficMove = traffic.now;
        var poiOver = (!traffic.now && !poi.was && poi.now) || (trafficOut && poi.now);
        var poiOut = (!traffic.was && poi.was && !poi.now) || (trafficOver && poi.was);
        var poiChange = !traffic.now && poi.was && poi.now && poi.was.id !== poi.now.id;
        var poiMove = !traffic.now && poi.now;

        if (trafficChange) { // 7
            trafficLayer.mapEvents.mouseout.call(trafficLayer, data, traffic.was);
            trafficLayer.mapEvents.mouseover.call(trafficLayer, data);
        }
        if (poiChange) { // 4
            poiLayer.mapEvents.mouseout.call(poiLayer, data, poi.was);
            poiLayer.mapEvents.mouseover.call(poiLayer, data);
        }

        if (trafficOut) { // 6
            trafficLayer.mapEvents.mouseout.call(trafficLayer, data, traffic.was);
        }
        if (poiOut) { // 3, 5
            poiLayer.mapEvents.mouseout.call(poiLayer, data, poi.was);
        }

        if (trafficOver) { // 2, 5
            trafficLayer.mapEvents.mouseover.call(trafficLayer, data);
        }
        if (poiOver) { // 1
            poiLayer.mapEvents.mouseover.call(poiLayer, data);
        }

        if (trafficMove) {
            trafficLayer.mapEvents.mousemove.call(trafficLayer, data);
        }
        if (poiMove) {
            poiLayer.mapEvents.mousemove.call(poiLayer, data);
        }
    },

    // Added meta layers events processing before map events
    _fireDOMEvent: function(e, type, targets) {
        if (e.keyCode === 13) {
            // https://github.com/Leaflet/Leaflet/issues/5499
            return;
        }
        if (e.type === 'click') {
            // Fire a synthetic 'preclick' event which propagates up (mainly for closing popups).
            // @event preclick: MouseEvent
            // Fired before mouse click on the map (sometimes useful when you
            // want something to happen on click before any existing click
            // handlers start running).
            var synth = L.Util.extend({}, e);
            synth.type = 'preclick';
            this._fireDOMEvent(synth, synth.type, targets);
        }

        if (e._stopped) { return; }

        // Find the layer the event is propagating from and its parents.
        targets = (targets || []).concat(this._findEventTargets(e, type));

        if (!targets.length) { return; }

        var target = targets[0];
        if (type === 'contextmenu' && target.listens(type, true)) {
            L.DomEvent.preventDefault(e);
        }

        var data = {
            originalEvent: e
        };

        var isMarker = target instanceof L.Marker;
        if (isMarker) {
            if (type === 'mouseover') {
                this.markerWasHovered = true;

                var trafficLayer = this.metaLayers.traffic;
                if (trafficLayer) {
                    trafficLayer.mapEvents.mouseout.call(trafficLayer, data);
                }
                var poiLayer = this.metaLayers.poi;
                if (poiLayer) {
                    poiLayer.mapEvents.mouseout.call(poiLayer, data);
                }
            } else if (type === 'mouseout') {
                this.markerWasHovered = false;
            }
        }
        if (e.type !== 'keypress') {
            data.containerPoint = isMarker ?
                    this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
            data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
            data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
        }

        for (var i = 0; i < targets.length; i++) {
            // Check metalayers before dispatch the event to the map
            if (targets[i] === this) {
                if (type === 'mousemove') {
                    if (!this.markerWasHovered) {
                        this._handleMetaLayers(type, data);
                    }
                } else {
                    this._handleMetaLayers(type, data);
                }

                // If the event wasn't stopped in metalayers, dispatch it to the map
                if (!data.originalEvent._stopped) {
                    targets[i].fire(type, data, true);
                }
            } else {
                targets[i].fire(type, data, true);
            }

            if (data.originalEvent._stopped ||
                (targets[i].options.nonBubblingEvents && L.Util.indexOf(targets[i].options.nonBubblingEvents, type) !== -1)) { return; }
        }
    }
});

DG.Map.addInitHook(function() {
    this.on('layeradd layerremove', this._updateTileLayers);
});

// Set css property touch-action to auto if dragging is false.
// Need for scrolling page in mobile using our map dom element.
// todo: I made issue in leaflet https://github.com/Leaflet/Leaflet/issues/4415
DG.Map.addInitHook(function() {
    if (this.options.dragging == false && this.options.tap == false) {
        DG.DomUtil.addClass(this._container, 'dg-dragging-false');
    }
});
