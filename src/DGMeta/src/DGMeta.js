L.DG.Meta = L.Handler.extend({

    _currentPoi: null,
    _currentBuilding: null,
    _currentTile: null,
    _currentTileMetaData: null,

    initialize: function (map) { // (Object)
        this._map = map;
        this._mapPanes = map.getPanes();
        this._tileSize = L.DG.TileLayer.prototype.options.tileSize;	// TODO: tileSize getter
        this._metaHost = new L.DG.Meta.Host();
    },

    addHooks: function () {
        this._calcTilesAtZoom();
        this._map.on(this._mapEventsListeners, this);
    },

    removeHooks: function () {
        this._map.off(this._mapEventsListeners, this);
    },

    _mapEventsListeners : {
        mousemove : function (e) { // (L.Event)
            if (this._map._panTransition && this._map._panTransition._inProgress) { return; }

            if (!this._isEventTargetAllowed(e.originalEvent.target || e.originalEvent.srcElement)) {
                this._leaveCurrentPoi();
                this._blurCurrentBuilding();
                return;
            }

            var xyz = this._getTileID(e);

            if (this._isTileChanged(xyz)) {
                this._currentTileMetaData = this._metaHost.getTileData(this._currentTile = xyz);
            } else {
                var promiseState = this._currentTileMetaData.inspect();

                if (promiseState.state === 'fulfilled') {
                    var hoveredPoi = this._isPoiHovered(e.latlng, promiseState.value.poi);

                    if (this._currentPoi && this._currentPoi.id !== hoveredPoi.id) {
                        this._leaveCurrentPoi();
                    }
                    if (hoveredPoi && (!this._currentPoi || this._currentPoi.id !== hoveredPoi.id)) {
                        this._currentPoi = hoveredPoi;
                        this._map.fire('dgPoiHover', {'poi': this._currentPoi, latlng: e.latlng});
                        L.DomEvent.addListener(this._mapPanes.mapPane, 'click', this._onDomMouseClick, this);
                    }
                }
            }
        },

        mouseout: function () {
            this._leaveCurrentPoi();
        },

        viewreset: function () {
            this._calcTilesAtZoom();
            this._leaveCurrentPoi();
        },
    },

    _onDomMouseClick: function (event) { // (Object)
        if (this._currentPoi) {
            this._map.fire('dgPoiClick', {
                'poi': this._currentPoi,
                latlng: this._map.containerPointToLatLng(L.DomEvent.getMousePosition(event))
            });
            L.DomEvent.stopPropagation(event);
        }
    },

    _calcTilesAtZoom: function () {
        this._tilesAtZoom = Math.pow(2, this._map.getZoom()); // counts tiles number on current zoom
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

    _leaveCurrentPoi: function () {
        if (this._currentPoi) {
            this._map
                    .fire('dgPoiLeave', { 'poi': this._currentPoi })
                    .off('click', this._onDomMouseClick, this);
            L.DomEvent.removeListener(this._mapPanes.mapPane, 'click', this._onDomMouseClick);
            this._currentPoi = null;
        }
    },

    _blurCurrentBuilding: function () {
        if (this._currentBuilding) {
            console.log('building click');
            this._currentBuilding = null;
        }
    },

    _poistorageCallback: function (tilePois) { // (Array)
        this._pois = tilePois;
    },

    _getTileID: function (e) { // (L.Event) -> String
        var p = this._map.project(e.latlng.wrap()),
            x = Math.floor(p.x / this._tileSize) % this._tilesAtZoom, // prevent leaflet bug with tile number detection on worldwrap
            y = Math.floor(p.y / this._tileSize);

        return x + ',' +  y + ',' + this._map._zoom;
    },

    _isTileChanged: function (xyz) { // (String) -> Boolean
        return this._currentTile !== xyz;
    },

    _isPoiHovered: function (point, pois) { // (L.Point, Array) -> Object|false
        for (var i = 0, len = pois.length; i < len; i++) {
            if (L.PolyUtil.contains(point, pois[i].vertices)) {
                return pois[i];
            }
        }

        return false;
    }

});

L.Map.addInitHook('addHandler', 'dgMeta', L.DG.Meta);
