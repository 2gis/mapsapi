DG.Meta = {};

DG.Meta.Layer = L.Layer.extend({

    options: {
        tileSize: 256,

        minZoom: 0,
        maxZoom: 18,
        zoomOffset: 0
        
        // zoomReverse: <Number>
        // attribution: <String>,
        // zIndex: <Number>,
        // bounds: <LatLngBounds>,
    },

    initialize: function (source, options) {
        DG.setOptions(this, options);
        
        this._currentTile = false;
        this._currentTileData = false;
        this._hoveredObject = null;

        this._origin = DG.Meta.origin(source, {
            dataFilter: this.options.dataFilter
        });
    },

    getOrigin: function () {
        return this._origin;
    },

    onAdd: function (map) {
        this._reset();
        DG.DomEvent.on(map.getPane('tilePane'), 'mousemove', this._onMouseMove, this);
    },

    onRemove: function (map) {
        DG.DomEvent.off(map.getPane('tilePane'), 'mousemove', this._onMouseMove, this);
    },

    getEvents: function () {
        return {
            mouseout: this._onMouseOut,
            viewreset: this._reset
        };
    },

    _getTileNumBounds: DG.GridLayer.prototype._getTileNumBounds,
    _isValidTile: DG.GridLayer.prototype._isValidTile,
    _wrapCoords: DG.GridLayer.prototype._wrapCoords,
    _resetWrap: DG.GridLayer.prototype._resetWrap,
    
    _onMouseMove: function (event) { // (MouseEvent)
        var tileSize = this._getTileSize(),
            layerPoint = this._map.mouseEventToLayerPoint(event),
            tileOriginPoint = this._map.getPixelOrigin().add(layerPoint),
            tileCoord = tileOriginPoint.divideBy(tileSize).floor(),
            mouseTileOffset,
            tileKey,
            hoveredObject;

        if (!this._isValidTile(tileCoord)) {
            return;
        }

        this._wrapCoords(tileCoord);
        tileCoord.z = this._map.getZoom();
        tileKey = this._origin.getTileKey(tileCoord);

        if (tileKey !== this._currentTile) {
            this._currentTile = tileKey;
            this._currentTileData = false;
        }

        if (this._currentTileData === false) {
            this._currentTileData = this._origin.getTileData(tileCoord);
        } else {
            mouseTileOffset = DG.point(tileOriginPoint.x % tileSize, tileOriginPoint.y % tileSize);
            hoveredObject = this._getHoveredObject(tileCoord, mouseTileOffset);
            if (this._hoveredEntity !== hoveredObject) {
                if (this._hoveredEntity) {
                    this._fireMouseEvent('mouseout', event);
                }
                this._hoveredEntity = hoveredObject;
                if (hoveredObject) {
                    this._fireMouseEvent('mouseover', event);
                }
            }
            if (this._hoveredEntity) {
                this._fireMouseEvent('mousemove', event);
            }
        }
    },

    _fireMouseEvent: function (type, mouseEvent) {
        this.fire(type, {
            meta: this._hoveredEntity,
            latlng: this._map.mouseEventToLatLng(mouseEvent)
        });
    },

    _onMouseOut: function (event) {
        if (this._hoveredEntity) {
            this._fireMouseEvent('mouseout', event.originalEvent);
            this._hoveredEntity = null;
        }
        this._currentTile = false;
    },

    _getHoveredObject: function (coords, mouseTileOffset) {
        for (var i = 0, len = this._currentTileData.length; i < len; i++) {
            if (DG.PolyUtil.contains(mouseTileOffset, this._currentTileData[i].geometry.coordinates[0])) {
                return this._currentTileData[i];
            }
        }
        return null;
    },

    _reset: function () {
        this._tileNumBounds = this._getTileNumBounds();
        this._resetWrap(this._tileNumBounds);
    },

    _getTileSize: function () {
        return this.options.tileSize;
    }

});

DG.Meta.layer = function (source, options) {
    return new DG.Meta.Layer(source, options);
};