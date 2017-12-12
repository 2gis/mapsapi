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

        this._currentTile = false;
        this._currentTileData = false;
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
    },

    onRemove: function(map) {
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

    _enableDispatchMouseEvents: function() {
        this._dispatchMouseEvents = true;
    },

    _disableDispatchMouseEvents: function() {
        this._dispatchMouseEvents = false;
    },

    mapEvents: {
        mousemove: function(event) {
            var tileSize = this.getTileSize(),
                layerPoint = this._map.mouseEventToLayerPoint(event.originalEvent),
                tileOriginPoint = this._map.getPixelOrigin().add(layerPoint),
                tileCoord = tileOriginPoint.unscaleBy(tileSize).floor(),
                mouseTileOffset,
                tileKey,
                hoveredObject,
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

            if (tileKey !== this._currentTile) {
                this._currentTile = tileKey;
                this._currentTileData = false;
            }

            if (this._currentTileData === false) {
                this._origin.getTileData(tileCoord, function(tileData) {
                    self._currentTileData = tileData;
                });
            } else {
                mouseTileOffset = DG.point(tileOriginPoint.x % tileSize.x, tileOriginPoint.y % tileSize.y);
                hoveredObject = this._getHoveredObject(tileCoord, mouseTileOffset);

                if (this._hoveredEntity !== hoveredObject) {
                    this._fireMouseEvent('mouseout', event);

                    this._hoveredEntity = hoveredObject;
                    this._fireMouseEvent('mouseover', event);
                }

                this._fireMouseEvent('mousemove', event);
            }
        },
        mouseout: function(event) {
            this._fireMouseEvent('mouseout', event);
            this._hoveredEntity = null;
            this._currentTile = false;
        },

        click: function(event) {
            if (!DG.Browser.mobile) {
                this._mouseDown = false;
                this._fireMouseEvent('click', event);
                return;
            }
            // If browser is mobile than load metatile for data of poi. Because mousemove doesn't work on mobile.
            // On desktop metatile with data for poi loading by mousemove.
            var tileSize = this.getTileSize(),
                layerPoint = this._map.mouseEventToLayerPoint(event.originalEvent),
                tileOriginPoint = this._map.getPixelOrigin().add(layerPoint),
                tileCoord = tileOriginPoint.unscaleBy(tileSize).floor(),
                tileKey = this._origin.getTileKey(tileCoord);
            tileCoord.z = this._getZoomForUrl();
            tileCoord.key = tileSize.x + 'x' + tileSize.y;
            var self = this;
            this._origin.getTileData(tileCoord, function(tileData) {
                self._currentTileData = tileData;
                self._currentTile = tileKey;
                var mouseTileOffset = DG.point(tileOriginPoint.x % tileSize.x, tileOriginPoint.y % tileSize.y);
                self._hoveredEntity = self._getHoveredObject(tileCoord, mouseTileOffset);

                self._mouseDown = false;
                self._fireMouseEvent('click', event);
            });
        },

        dblclick: function(event) {
            this._fireMouseEvent('dblclick', event);
        },

        mousedown: function(event) {
            this._mouseDown = true;
            this._fireMouseEvent('mousedown', event);
        },

        contextmenu: function(event) {
            this._fireMouseEvent('contextmenu', event);
        }
    },

    _fireMouseEvent: function(type, mouseEvent) {
        if (!this._hoveredEntity || !this._dispatchMouseEvents) {
            return;
        }
        this.fire(type, {
            meta: this._hoveredEntity,
            latlng: this._map.mouseEventToLatLng(mouseEvent.originalEvent)
        });
        var isDragging = type === 'mousedown' || (this._mouseDown && type === 'mousemove');
        if (this.options.eventBubbling === 'layer' && !isDragging) {
            DG.DomEvent.stop(mouseEvent);
        }
    },

    _getHoveredObject: function(coords, mouseTileOffset) {
        for (var i = 0; i < this._currentTileData.length; i++) {
            if (DG.PolyUtil.inside(mouseTileOffset, this._currentTileData[i].geometry, this._pointReduceHelper)) {
                return this._currentTileData[i];
            }
        }

        return null;
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
