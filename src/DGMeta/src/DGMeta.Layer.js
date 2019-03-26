DG.Meta = {};

DG.Meta.Layer = DG.Layer.extend({

    options: {
        tileSize: 256,

        minZoom: 0,
        maxZoom: 19,
        zoomOffset: 0,
        eventBubbling: 'transparent'
        // maxNativeZoom: <Number>,
        // detectRetina: <Number>,
        // zoomReverse: <Number>
        // attribution: <String>,
        // zIndex: <Number>,
        // bounds: <LatLngBounds>
    },

    initialize: function(source, options) { // (String, Object)
        DG.TileLayer.prototype.initialize.call(this, null, options);
        delete this._url;

        this._currentTileKey = '';
        this._currentTileData = [];
        this._lastEntity = undefined;
        this._dispatchMouseEvents = true;

        this._origin = DG.Meta.origin(source, {
            dataFilter: this.options.dataFilter
        });
    },

    getOrigin: function() { // () -> Object
        return this._origin;
    },

    onAdd: function(map) {
        this._resetView();

        map.metaLayers.push(this);

        map.on('rulerstart', this._disableDispatchMouseEvents, this);
        map.on('rulerend', this._enableDispatchMouseEvents, this);

        var self = this;

        if (DG.Browser.touchEnabled && this.options.isPoi) {
            map.eachLayer(function(layer) {
                if (layer instanceof L.TileLayer) {
                    // On every tile will be load meta tile.
                    layer.on('tileloadstart', self._onTileLoadStart, self);
                    // Load metatiles for already loaded tiles.
                    for (var tile in layer._tiles) {
                        self._onTileLoadStart({
                            coords: layer._tiles[tile].coords
                        });
                    }
                }
            });
        }
    },

    onRemove: function(map) {
        var self = this;

        if (DG.Browser.touchEnabled && this.options.isPoi) {
            map.eachLayer(function(layer) {
                if (layer instanceof L.TileLayer) {
                    // On every tile will be load meta tile.
                    layer.off('tileloadstart', self._onTileLoadStart);
                }
            });
        }

        this._tileZoom = null;

        var index = map.metaLayers.indexOf(this);
        if (index !== -1) {
            map.metaLayers.splice(index, 1);
        }

        map.off('rulerstart', this._disableDispatchMouseEvents, this);
        map.off('rulerend', this._enableDispatchMouseEvents, this);
    },

    getEvents: function() {
        return {
            viewprereset: this._invalidateAll,
            viewreset: this._resetView,
            zoom: this._resetView,
            moveend: this._onMoveEnd
        };
    },

    setUrl: function(url) {
        this._currentTileKey = '';
        this._currentTileData = [];
        this._lastEntity = undefined;
        this._dispatchMouseEvents = true;
        this._origin.setURL(url, true);
    },

    getHoveredObject: function(event) {
        var tileSize = this.getTileSize(),
            layerPoint = this._map.mouseEventToLayerPoint(event.originalEvent),
            tileOriginPoint = this._map.getPixelOrigin().add(layerPoint),
            tileCoord = tileOriginPoint.unscaleBy(tileSize).floor(),
            mouseTileOffset = DG.point(tileOriginPoint.x % tileSize.x, tileOriginPoint.y % tileSize.y),
            tileKey,
            zoom = this._map.getZoom(),
            self = this;

        if (zoom > (this.options.maxZoom + this.options.zoomOffset) ||
            zoom < (this.options.minZoom - this.options.zoomOffset) ||
            !this._isValidTile(tileCoord)) {
            return;
        }

        this._wrapCoords(tileCoord);

        tileCoord.z = this._getZoomForUrl();
        tileCoord.key = tileSize.x + 'x' + tileSize.y;
        tileKey = this._origin.getTileKey(tileCoord);

        if (tileKey === this._currentTileKey) {
            self._lastEntity = self._getHoveredObject(mouseTileOffset);
        } else {
            this._origin.getTileData(tileCoord, function(tileData) {
                self._currentTileKey = tileKey;
                self._currentTileData = tileData;
                self._lastEntity = self._getHoveredObject(mouseTileOffset);
            });
        }

        return this._lastEntity;
    },

    _removeAllTiles: DG.GridLayer.prototype._removeAllTiles,
    _getZoomForUrl: DG.TileLayer.prototype._getZoomForUrl,
    getTileSize: DG.TileLayer.prototype.getTileSize,
    _isValidTile: DG.GridLayer.prototype._isValidTile,
    _wrapCoords: DG.GridLayer.prototype._wrapCoords,
    _resetView: DG.GridLayer.prototype._resetView,
    _resetGrid: DG.GridLayer.prototype._resetGrid,
    _invalidateAll: DG.GridLayer.prototype._invalidateAll,
    _pxBoundsToTileRange: DG.GridLayer.prototype._pxBoundsToTileRange,

    // Fix for https://github.com/Leaflet/Leaflet/compare/0726f12bbf33fcb18fe8bb541d5e3212bb1f5ab2...c263f2d8b1bd962b60474376cc4816a688052513#diff-f1e6be67599c594731fff6191c710420L579
    _onMoveEnd: function() {
        if (!this._map || this._map._animatingZoom) { return; }

        this._resetView();
    },

    _onTileLoadStart: function(e) {
        var tileSize = this.getTileSize();
        e.coords.key = tileSize.x + 'x' + tileSize.y;
        this._origin.getTileData(e.coords);
    },

    _enableDispatchMouseEvents: function() {
        this._dispatchMouseEvents = true;
    },

    _disableDispatchMouseEvents: function() {
        this._dispatchMouseEvents = false;
    },

    mapEvents: {
        mousemove: function(event) {
            this._fireMetalayerEvent('mousemove', event);
        },

        mouseover: function(event) {
            this._fireMetalayerEvent('mouseover', event);
        },

        mouseout: function(event) {
            this._fireMetalayerEvent('mouseout', event);
            this._currentTileKey = '';
        },

        click: function(event) {
            var tileSize = this.getTileSize(),
                layerPoint = this._map.mouseEventToLayerPoint(event.originalEvent),
                tileOriginPoint = this._map.getPixelOrigin().add(layerPoint),
                tileCoord = tileOriginPoint.unscaleBy(tileSize).floor(),
                mouseTileOffset = DG.point(tileOriginPoint.x % tileSize.x, tileOriginPoint.y % tileSize.y);
            tileCoord.z = this._getZoomForUrl();
            tileCoord.key = tileSize.x + 'x' + tileSize.y;
            var tileKey = this._origin.getTileKey(tileCoord);
            var self = this;

            // In this function the tile meta data are processed by metalayer.
            var onTileData = function(currentTileData) {
                self._currentTileData = currentTileData;
                self._currentTileKey = tileKey;
                self._lastEntity = self._getHoveredObject(mouseTileOffset);
                self._mouseDown = false;

                if (self._lastEntity) {
                    event.entity = self._lastEntity;
                    self._fireMetalayerEvent('click', event);
                }
            }

            // For more information about the code below see:
            // https://github.com/2gis/mapsapi/pull/501
            this._origin.getTileData(tileCoord, function(tileData) {
                if (tileData) {
                    onTileData(tileData);
                } else if (self._origin._requests[tileKey]) {
                    DG.DomEvent.stop(event);
                    self._origin._requests[tileKey].then(function() {
                        delete event.originalEvent._stopped;
                        onTileData(self._origin._tileStorage[tileKey]);
                        if (!event.originalEvent._stopped) {
                            var targets = event.eventTargets;
                            for (var i = event.eventTargetsMapIndex; i < targets.length; i++) {
                                targets[i].fire('click', event, true);
                                if (
                                    event.originalEvent._stopped ||
                                    (targets[i].options.nonBubblingEvents &&
                                    L.Util.indexOf(targets[i].options.nonBubblingEvents, 'click') !== -1)
                                ) {
                                    return;
                                }
                            }
                        }
                    });
                }
            });
        },

        dblclick: function(event) {
            this._fireMetalayerEvent('dblclick', event);
        },

        mousedown: function(event) {
            this._mouseDown = true;
            this._fireMetalayerEvent('mousedown', event);
        },

        contextmenu: function(event) {
            this._fireMetalayerEvent('contextmenu', event);
        }
    },

    _fireMetalayerEvent: function(type, mouseEvent) {
        if (!mouseEvent.entity || !this._dispatchMouseEvents) {
            return;
        }
        this.fire(type, {
            meta: mouseEvent.entity,
            latlng: this._map.mouseEventToLatLng(mouseEvent.originalEvent)
        });
        var isDragging = type === 'mousedown' || (this._mouseDown && type === 'mousemove');
        if (this.options.eventBubbling === 'layer' && !isDragging) {
            DG.DomEvent.stop(mouseEvent);
        }
    },

    _getHoveredObject: function(mouseTileOffset) {
        if (!this._currentTileData) {
            return;
        }

        for (var i = 0; i < this._currentTileData.length; i++) {
            if (DG.PolyUtil.inside(mouseTileOffset, this._currentTileData[i].geometry, this._pointReduceHelper)) {
                return this._currentTileData[i];
            }
        }
    },

    _pointReduceHelper: function(point) {
        return [point.x, point.y];
    },

    _setView: function(center, zoom, noPrune, noUpdate) {
        var tileZoom = Math.round(zoom),
            tileZoomChanged = this._tileZoom !== tileZoom;

        if (!noUpdate && tileZoomChanged) {
            this._tileZoom = tileZoom;
            this._resetGrid();
        }
    }
});

DG.Meta.layer = function(source, options) {
    return new DG.Meta.Layer(source, options);
};
