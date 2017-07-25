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
        this._poi = {
            timeoutId: null
        };

        this._origin = DG.Meta.origin(source, {
            dataFilter: this.options.dataFilter
        });
    },

    getOrigin: function() { // () -> Object
        return this._origin;
    },

    onAdd: function(map) {
        this._resetView();
        this._setNewViewport();

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
            zoomend: this._setNewViewport,
            moveend: this._onMoveEnd,
            resize: this._setNewViewport
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
        this._setNewViewport();
    },

    _enableDispatchMouseEvents: function() {
        this._dispatchMouseEvents = true;
    },

    _disableDispatchMouseEvents: function() {
        this._dispatchMouseEvents = false;
    },

    _setNewViewport: function() {
        var poiCollectStatisticsDelay = 1000;
        clearTimeout(this._poi.timeoutId);
        this._poi.timeoutId = setTimeout(this._collectPoiStatistics.bind(this), poiCollectStatisticsDelay);
    },

    _collectPoiStatistics: function() {
        console.clear();
        var tileSize = this.getTileSize();
        var bounds = this._map.getPixelBounds();
        var min = bounds.min.unscaleBy(tileSize).floor();
        var max = bounds.max.unscaleBy(tileSize).floor();
        var z = this._getZoomForUrl();
        var self = this;
        var promises = [];

        for (var x = min.x; x <= max.x; x++) {
            for (var y = min.y; y <= max.y; y++) {
                var coord = DG.point(x, y);
                coord.z = z;
                coord.key = tileSize.x + 'x' + tileSize.y;
                promises.push(
                    this._origin.getTileData(coord)
                        .then(function(data) {
                            return self._filterPoiInViewport(data);
                        })
                );
            }
        }

        Promise.all(promises)
            .then(function(tiles) {
                var uniqIds = [];
                tiles.forEach(function(tilePoiArray) {
                    tilePoiArray.forEach(function(poi) {
                        if (uniqIds.indexOf(poi.id) === -1) {
                            uniqIds.push(poi.id);
                            console.log(poi.hint, poi.id);
                        }
                    });
                });
            });
    },

    _filterPoiInViewport: function(data) {
        var bounds = this._map.getBounds();
        return new Promise(function(resolve) {
            var result = [];
            if (!data) {
                resolve(result); // no poi in the metatile
            }
            for (var poiIndex = 0; poiIndex < data.length; poiIndex++) {
                var poi = data[poiIndex];
                if (!poi.hint) {
                    continue; // skip parking, gate, etc.
                }
                var isPoiVisible = true;
                var geometry = poi.geometry;
                var polygonIndex, polygon, pointIndex, point;

                if (geometry.type === 'Polygon') {
                    for (polygonIndex = 0; polygonIndex < geometry.geoCoordinates.length; polygonIndex++) {
                        if (!isPoiVisible) {
                            break;
                        }
                        polygon = geometry.geoCoordinates[polygonIndex];
                        for (pointIndex = 0; pointIndex < polygon.length; pointIndex++) {
                            point = DG.latLng({
                                lat: polygon[pointIndex][1],
                                lng: polygon[pointIndex][0]
                            });
                            if (!bounds.contains(point)) {
                                isPoiVisible = false;
                                break;
                            }
                        }
                    }
                } else if (geometry.type === 'MultiPolygon') {

                    for (var objIndex = 0; objIndex < geometry.geoCoordinates.length; objIndex++) {
                        if (!isPoiVisible) {
                            break;
                        }
                        var obj = geometry.geoCoordinates[objIndex];
                        for (polygonIndex = 0; polygonIndex < obj.length; polygonIndex++) {
                            if (!isPoiVisible) {
                                break;
                            }
                            polygon = obj[polygonIndex];
                            for (pointIndex = 0; pointIndex < polygon.length; pointIndex++) {
                                point = DG.latLng({
                                    lat: polygon[pointIndex][1],
                                    lng: polygon[pointIndex][0]
                                });
                                if (!bounds.contains(point)) {
                                    isPoiVisible = false;
                                    break;
                                }
                            }
                        }
                    }
                }

                if (isPoiVisible) {
                    result.push(poi);
                }
            }
            resolve(result);
        });
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
                this._origin.getTileData(tileCoord)
                    .then(function(data) {
                        self._currentTileData = data
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
            this._mouseDown = false;
            this._fireMouseEvent('click', event);
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
