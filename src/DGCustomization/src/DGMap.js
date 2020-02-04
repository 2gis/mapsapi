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

        this.metaLayers = [];

        initMap.call(this, id, options);

        //  Project must be checked after BaseLayer init which occurs in InitHook (see orig method definition)
        if (this.options.center && this.options.zoom !== undefined) {
            this.setView(DG.latLng(this.options.center), this.options.zoom, {reset: true});
        }

        this._lastMetalayer = {
            layer: undefined,
            entity: undefined
        };
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

        // The eventTargets and eventTargetsMapIndex properties are used for fire events continuation to
        // remaining targets when the event was stopped due to the tile meta data request in progress.
        // In this case there is need to fire events to remaining targets asynchronously.
        var data = {
            originalEvent: e,
            eventTargets: targets,
            eventTargetsMapIndex: targets.indexOf(this)
        };

        if (e.type !== 'keypress') {
            var isMarker = target instanceof L.Marker;
            data.containerPoint = isMarker ?
                this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
            data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
            data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
        }

        for (var i = 0; i < targets.length; i++) {
            // Check metalayers before dispatch the event to the map
            if (targets[i] === this) {
                var metalayer = this._getCurrentMetaLayer(data);

                if (type === 'mousemove') {
                    if (this._lastMetalayer.entity && metalayer.entity &&
                        this._lastMetalayer.entity.id === metalayer.entity.id) {
                        this._fireMetalayerEvent('mousemove', metalayer, data);
                    } else {
                        this._fireMetalayerEvent('mouseout', this._lastMetalayer, data);
                        this._fireMetalayerEvent('mouseover', metalayer, data);
                        this._fireMetalayerEvent('mousemove', metalayer, data);
                        this._lastMetalayer = metalayer;
                    }
                } else {
                    this._fireMetalayerEvent(type, metalayer, data);
                }

                // If the event wasn't stopped in metalayers, dispatch it to the map
                if (!data.originalEvent._stopped) {
                    targets[i].fire(type, data, true);
                }
            } else {
                targets[i].fire(type, data, true);
                if (this._lastMetalayer.entity && data.originalEvent._stopped) {
                    // fixes L.circle([54.983136831455, 82.897440725094], 200).addTo(map);
                    this._fireMetalayerEvent('mouseout', this._lastMetalayer, data);
                    this._lastMetalayer = {
                        layer: undefined,
                        entity: undefined
                    };
                }
            }

            if (data.originalEvent._stopped ||
                (targets[i].options.nonBubblingEvents && L.Util.indexOf(targets[i].options.nonBubblingEvents, type) !== -1)) { return; }
        }
    },

    _getCurrentMetaLayer: function(data) {
        // Not forget for IE8 with srcElement
        var eventTarget = data.originalEvent.target || data.originalEvent.srcElement;
        var isClick = data.originalEvent.type === 'click';

        // Suppose that user can interact with the metalayer only if there are no layers between cursor and map
        if (
            // For all browsers which support pointer-events: none on tiles
            eventTarget === this._container ||
            // And for IE10 or less where targets are tiles
            DG.Browser.ie && eventTarget.className === 'leaflet-tile leaflet-tile-loaded' ||
            // The only exception is canvas, because a canvas layer occupies the whole screen
            eventTarget.tagName === 'CANVAS'
        ) {
            for (var j = this.metaLayers.length - 1; j >= 0; j--) {
                var metaEntity = this.metaLayers[j].getHoveredObject(data);
                if (metaEntity) {
                    return {
                        layer: this.metaLayers[j],
                        entity: metaEntity
                    };
                } else if (isClick) {
                    // Additional condition for click event, because there may not be the tile meta data.
                    // E.g. when the tile meta data request in progress. In this case the metalayer must be
                    // returned without an entity.
                    return {
                        layer: this.metaLayers[j],
                        entity: undefined
                    }
                }
            }
        }
        return {
            layer: undefined,
            entity: undefined
        };
    },

    _fireMetalayerEvent: function(type, metalayer, data) {
        // There is need to continue if the event type is click, because there may not be the tile meta data.
        // That's why it will be processed in the metalayer click handler.
        if (!metalayer.entity && type !== 'click') {
            return;
        }

        // There is no need to fire metalayer event if the metalayer is undefined.
        if (!metalayer.layer) {
            return;
        }

        var listener = metalayer.layer.mapEvents[type];
        if (!listener) {
            return;
        }
        data.entity = metalayer.entity;
        listener.call(metalayer.layer, data);
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
