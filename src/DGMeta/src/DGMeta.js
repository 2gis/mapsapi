L.DG.Meta = L.Handler.extend({

    _currPoi: null,
    _currTile: null,
    _pois: null,

    initialize: function (map) { // (Object)
        this._map = map;
        this._mapPanes = map.getPanes();
        this._tileSize = L.DG.TileLayer.prototype.options.tileSize;	// TODO: tileSize getter

        this._buildingStorage = new L.DG.BuildingStorage();
        this._poiStorage = new L.DG.PoiStorage();

        this._poistorageCallback = L.bind(this._poistorageCallback, this);
    },

    addHooks: function () {
        this._calcTilesAtZoom();
        this._map.on(this._mapEventsListeners, this);
    },

    removeHooks: function () {
        this._map.off(this._mapEventsListeners, this);
    },

    getPoiStorage: function () { // () -> Object
        return this._poiStorage;
    },

    getBuildingStorage: function () { // () -> Object
        return this._buildingStorage;
    },

    _mapEventsListeners : {
        mousemove : function (e) { // (L.Event)
            if (this._map._panTransition && this._map._panTransition._inProgress) { return; }

            if (!this._isEventTargetAllowed(e.originalEvent.target || e.originalEvent.srcElement)) {
                if (this._currPoi) {
                    this._leaveCurrentPoi();
                }
                return;
            }

            var xyz = this._getTileID(e);

            if (this._isTileChanged(xyz)) {
                this._currTile = xyz;
                this._pois = null;
                this._poiStorage.getTilePoiIds(xyz, this._poistorageCallback);
            } else if (this._pois) {
                var poiId = this._isPoiHovered(e.latlng, this._pois);

                if (this._currPoi && this._currPoi.id !== poiId) {
                    this._leaveCurrentPoi();
                }

                if (poiId && (!this._currPoi || this._currPoi.id !== poiId)) {
                    this._currPoi = this._poiStorage.getPoi(poiId);
                    this._map.fire('dgPoiHover', {'poi': this._currPoi, latlng: e.latlng});
                    L.DomEvent.addListener(this._mapPanes.mapPane, 'click', this._onDomMouseClick, this);
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
        if (this._currPoi) {
            this._map.fire('dgPoiClick', {
                'poi': this._currPoi,
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
        if (this._currPoi) {
            this._map
                    .fire('dgPoiLeave', { 'poi': this._currPoi })
                    .off('click', this._onDomMouseClick, this);
            L.DomEvent.removeListener(this._mapPanes.mapPane, 'click', this._onDomMouseClick);
            this._currPoi = null;
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
        return this._currTile !== xyz;
    },

    _isPoiHovered: function (point, pois) { // (L.Point, Array) -> Object|Null
        var poi = null;

        for (var i = 0, len = pois.length; i < len; i++) {
            var verts = this._poiStorage.getPoi(pois[i]).vertices;
            if (L.PolyUtil.contains(point, verts)) {
                poi = pois[i];
                break;
            }
        }

        return poi;
    }

});

L.Map.addInitHook('addHandler', 'dgMeta', L.DG.Meta);
