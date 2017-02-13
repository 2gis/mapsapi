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

    initialize: function (source, options) { // (String, Object)
        DG.TileLayer.prototype.initialize.call(this, null, options);
        delete this._url;

        this._currentTile = false;
        this._currentTileData = false;

        this._origin = DG.Meta.origin(source, {
            dataFilter: this.options.dataFilter
        });
    },

    getOrigin: function () { // () -> Object
        return this._origin;
    },

    onAdd: function (map) {
        this._resetView();
        this._addDomEvents();

        map.on('rulerstart', this._removeDomEvents, this);
        map.on('rulerend', this._addDomEvents, this);
    },

    onRemove: function (map) {
        this._removeDomEvents();
        this._tileZoom = null;

        map.off('rulerstart', this._removeDomEvents, this);
        map.off('rulerend', this._addDomEvents, this);
    },

    getEvents: function () {
        return {
            viewprereset: this._invalidateAll,
            viewreset: this._resetView,
            zoom: this._resetView,
            moveend: this._onMoveEnd
        };
    },

    _addDomEvents: function () {
        DG.DomEvent.on(this._map.getPane('tilePane'), this._domEvents, this);
    },

    _removeDomEvents: function () {
        DG.DomEvent.off(this._map.getPane('tilePane'), this._domEvents, this);
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
    _onMoveEnd: function () {
        if (!this._map || this._map._animatingZoom) { return; }

        this._resetView();
    },

    _domEvents: {
        mousemove: function (event) { // (MouseEvent)
            var tileSize = this.getTileSize(),
                layerPoint = this._map.mouseEventToLayerPoint(event),
                tileOriginPoint = this._map.getPixelOrigin().add(layerPoint),
                tileCoord = tileOriginPoint.unscaleBy(tileSize).floor(),
                mouseTileOffset,
                tileKey,
                hoveredObject,
                zoom = this._map.getZoom();

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
                this._currentTileData = this._origin.getTileData(tileCoord);
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
        mouseout: function (event) {
            this._fireMouseEvent('mouseout', event);
            this._hoveredEntity = null;
            this._currentTile = false;
        },

        click: function (event) {
            this._fireMouseEvent('click', event);
        },

        dblclick: function (event) {
            this._fireMouseEvent('dblclick', event);
        },

        mousedown: function (event) {
            this._fireMouseEvent('mousedown', event);
        },

        contextmenu: function (event) {
            this._fireMouseEvent('contextmenu', event);
        }
    },

    _fireMouseEvent: function (type, mouseEvent) {
        if (this._hoveredEntity) {
            this.fire(type, {
                meta: this._hoveredEntity,
                latlng: this._map.mouseEventToLatLng(mouseEvent)
            });
            if (this.options.eventBubbling === 'layer') {
                DG.DomEvent.stop(mouseEvent);
            }
        }
    },

    _getHoveredObject: function (coords, mouseTileOffset) {
        for (var i = 0; i < this._currentTileData.length; i++) {
            if (DG.PolyUtil.inside(mouseTileOffset, this._currentTileData[i].geometry, this._pointReduceHelper)) {
                return this._currentTileData[i];
            }
        }

        return null;
    },

    _pointReduceHelper: function (point) {
        return [point.x, point.y];
    },

    _setView: function (center, zoom, noPrune, noUpdate) {
        var tileZoom = Math.round(zoom),
            tileZoomChanged = this._tileZoom !== tileZoom;

        if (!noUpdate && tileZoomChanged) {
            this._tileZoom = tileZoom;
            this._resetGrid();
        }
    }
});

DG.Meta.layer = function (source, options) {
    return new DG.Meta.Layer(source, options);
};
