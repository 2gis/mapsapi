DG.Meta = DG.Handler.extend({

    _currentPoi: null,                          // TODO: refactor #reset in add/remove
    _currentBuilding: null,
    _currentTile: null,
    _currentTileMetaData: null,

    _listenPoi: false,
    _listenBuildings: false,

    options: {
        zoomOffset: 0
    },

    initialize: function (map, options) { // (Object)
        DG.setOptions(this, options);
        this._map = map;
        this._mapPanes = map.getPanes();

        this._tileSize = DG.TileLayer.prototype.options.tileSize;
        if (!this.options.zoomOffset) {
            map.eachLayer(function (layer) {
                if (layer instanceof DG.TileLayer && layer.options.zoomOffset) {
                    this.options.zoomOffset = layer.options.zoomOffset;
                    this.options.maxNativeZoom = layer.options.maxNativeZoom;
                    this._tileSize = layer.options.tileSize;
                }
            }, this);
        }

        this._metaHost = new DG.Meta.Host();
    },

    addHooks: function () {
        this._calcTilesAtZoom();
        this._map.on(this._mapEventsListeners, this);
    },

    removeHooks: function () {
        this._map.off(this._mapEventsListeners, this);
    },

    enablePoiListening: function () {
        this.enable();
        this._listenPoi = true;
        return this;
    },

    enableBuildingsListening: function () {
        this.enable();
        this._listenBuildings = true;
        return this;
    },

    disablePoiListening: function () {
        this._listenPoi = false;
        return this;
    },

    disableBuildingsListening: function () {
        this._listenBuildings = false;
        return this;
    },

    _mapEventsListeners : {
        mousemove : function (e) { // (DG.Event)
            /* global __POI_LAYER_MIN_ZOOM__ */
            if (this._map.getZoom() < __POI_LAYER_MIN_ZOOM__ ||
                !(this._listenPoi || this._listenBuildings) ||
                 (this._map._panTransition && this._map._panTransition._inProgress)) { return; }

            if (!this._isEventTargetAllowed(e.originalEvent.target || e.originalEvent.srcElement)) {
                this._leaveCurrentPoi();
                this._leaveCurrentBuilding();
                return;
            }

            var xyz = this._getTileID(e),
                zoom = this._getDataZoom(),
                self = this;
            if (this._isTileChanged(xyz)) {
                this._currentTileMetaData = null;
                this._currentTile = xyz;
                this._metaHost.getTileData(xyz).then(function (tileData) {
                    self._currentTileMetaData = tileData;
                });
            } else {
                if (this._currentTileMetaData) {
                    if (this._listenPoi) { this._checkPoiHover(e.latlng, zoom); }
                    if (this._listenBuildings) { this._checkBuildingHover(e.latlng); }
                }
            }
        },

        mouseout: function () {
            this._leaveCurrentPoi();
            this._leaveCurrentBuilding();
        },

        viewreset: function () {
            this._calcTilesAtZoom();
            this._leaveCurrentPoi();
            this._leaveCurrentBuilding();
        }
    },

    _getDataZoom: function () {
        var zoom = this._map._zoom + this.options.zoomOffset;
        return this.options.maxNativeZoom ? Math.min(zoom, this.options.maxNativeZoom) : zoom;
    },

    _checkPoiHover: function (latLng, zoom) { // (DG.LatLng, String)
        var hoveredPoi = this._isMetaHovered(latLng, this._currentTileMetaData.poi, zoom);

        if (this._currentPoi && (!hoveredPoi || this._currentPoi.id !== hoveredPoi.id)) {
            this._leaveCurrentPoi();
        }

        if (hoveredPoi && (!this._currentPoi || this._currentPoi.id !== hoveredPoi.id)) {
            this._currentPoi = hoveredPoi;
            this._map.fire('poihover', {'poi': this._currentPoi, latlng: latLng});
            DG.DomEvent.addListener(this._mapPanes.mapPane, 'click', this._onDomMouseClick, this);
        }
    },

    _checkBuildingHover: function (latLng) { // (DG.LatLng)
        var hoveredBuilding = this._isMetaHovered(latLng, this._currentTileMetaData.buildings);

        if (this._currentBuilding && (!hoveredBuilding || this._currentBuilding.id !== hoveredBuilding.id)) {
            this._leaveCurrentBuilding();
        }

        if (hoveredBuilding && (!this._currentBuilding || this._currentBuilding.id !== hoveredBuilding.id)) {
            this._currentBuilding = hoveredBuilding;
            this._map.fire('buildinghover', {'building': this._currentBuilding, latlng: latLng});
        }
    },

    _leaveCurrentPoi: function () {
        if (this._currentPoi) {
            this._map
                    .fire('poileave', { 'poi': this._currentPoi })
                    .off('click', this._onDomMouseClick, this);
            DG.DomEvent.removeListener(this._mapPanes.mapPane, 'click', this._onDomMouseClick);
            this._currentPoi = null;
        }
    },

    _leaveCurrentBuilding: function () {
        if (this._currentBuilding) {
            this._map.fire('buildingleave', { 'building': this._currentBuilding });
            this._currentBuilding = null;
        }
    },

    _onDomMouseClick: function (event) { // (Object)
        if (this._currentPoi) {
            this._map.fire('poiclick', {
                'poi': this._currentPoi,
                //latlng: this._map.containerPointToLatLng(DG.DomEvent.getMousePosition(event)) //TODO: make this thing work correctly
                latlng: DG.latLngBounds(this._currentPoi.vertices).getCenter()
            });
            DG.DomEvent.stopPropagation(event);
        }
    },

    _calcTilesAtZoom: function () {
        this._tilesAtZoom = Math.pow(2, this._getDataZoom()); // counts tiles number on current zoom
    },

    _belongsToPane: function (element, pane) { // (HTMLElement, String) -> Boolean
        while (element && element !== this._mapPanes.mapPane) {
            if (element === this._mapPanes[pane]) {
                return true;
            }
            element = element.parentNode;
        }
        return false;
    },

    _isEventTargetAllowed: function (target) { // (HTMLElement) -> Boolean
        return this._belongsToPane(target, 'tilePane') || this._belongsToPane(target, 'overlayPane');
    },

    _getTileID: function (e) { // (DG.Event) -> String
        var dataZoom = this._getDataZoom(),
            tileSize = this._tileSize * ((this.options.zoomOffset && this._map._zoom === dataZoom) + 1), // remove when 19 level tiles will be ready (maxNativeZoom == maxZoom)
            p = this._map.project(e.latlng.wrap()),
            x = Math.floor(p.x / tileSize) % this._tilesAtZoom, // prevent leaflet bug with tile number detection on worldwrap
            y = Math.floor(p.y / tileSize);

        return x + ',' +  y + ',' + dataZoom;
    },

    _isTileChanged: function (xyz) { // (String) -> Boolean
        return this._currentTile !== xyz;
    },

    _isMetaHovered: function (point, data, zoom) { // (DG.Point, Array, String) -> Object|false
        var vertKey = zoom ? zoom + 'vertices' : 'vertices';

        for (var i = 0, len = data.length; i < len; i++) {
            if (!data[i].verticesArray) {
                if (data[i][vertKey] && DG.PolyUtil.contains(point, data[i][vertKey])) {
                    data[i].vertices = data[i][vertKey];
                    return data[i];
                }
            } else {
                for (var j = 0, jlen = data[i].verticesArray.length; j < jlen; j++) {
                    if (DG.PolyUtil.contains(point, data[i].verticesArray[j])) {
                        return data[i];
                    }
                }
            }
        }
        return false;
    }

});

DG.Map.addInitHook('addHandler', 'meta', DG.Meta);
