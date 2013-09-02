L.DG.Poi = L.Handler.extend({
    _currPoi: null,
    _currTile: null,
    _pois: null,

    initialize: function (map) { // (Object)
        this._map = map;
        this._mapPanes = map.getPanes();
        this._tileSize = L.DG.TileLayer.prototype.options.tileSize;	// TODO: tileSize getter
        this._poistorage = new L.DG.PoiStorage();

        this._poistorageCallback = L.bind(this._poistorageCallback, this);
    },

    addHooks: function () {
        this._calcTilesAtZoom();
        this._map
                .on('mousemove', this._onMouseMove, this)
                .on('viewreset', this._onViewReset, this)
                .on('mouseout', this._onMouseOut, this);
    },

    removeHooks: function () {
        this._map
                .off('mousemove', this._onMouseMove, this)
                .off('viewreset', this._onViewReset, this)
                .off('mouseout', this._onMouseOut, this);
    },

    getStorage: function () {
        return this._poistorage;
    },

    _calcTilesAtZoom : function () {
        this._tilesAtZoom = Math.pow(2, this._map.getZoom()); // counts tiles number on current zoom
    },

    _belongsToPane : function(element, pane){
        while (element && element !== this._mapPanes.mapPane) {
            if (element == this._mapPanes[pane]) {
                return true;
            }
            element = element.parentNode;
        }
        return false;
    },

    _isEventTargetAllowed : function(target){
        return this._belongsToPane(target, 'tilePane') || this._belongsToPane(target, 'overlayPane');
    },

    _onMouseMove: function (e) { // (Object)
        if (this._map._panTransition && this._map._panTransition._inProgress) { return; }

        var xyz = this._getTileID(e);

        if (!this._isEventTargetAllowed(e.originalEvent.target || e.originalEvent.srcElement)) {
            if (this._currPoi) {
                this._leaveCurrentPoi();
            }
            return;
        }

        if (this._isTileChanged(xyz)) {
            this._currTile = xyz;
            this._pois = null;
            this._poistorage.getTilePoiIds(xyz, this._poistorageCallback);
        } else if (this._pois) {
            var poiId = this._isPoiHovered(e.latlng, this._pois);

            if (this._currPoi && this._currPoi.id != poiId) {
                this._leaveCurrentPoi();
            }

            if (poiId && (!this._currPoi || this._currPoi.id != poiId)) {
                this._currPoi = this._poistorage.getPoi(poiId);
                this._map.fire('dgPoiHover', {'poi': this._currPoi, latlng: e.latlng});
            }
        }
    },

    _onMouseOut: function(){
        this._leaveCurrentPoi();
    },

    _onViewReset: function(){
        this._calcTilesAtZoom();
        this._leaveCurrentPoi();
    },

    _leaveCurrentPoi : function(){
        if (this._currPoi) {
            this._map.fire('dgPoiLeave', { 'poi': this._currPoi });
            this._currPoi = null;
        }
    },

    _poistorageCallback: function(tilePois){
        this._pois = tilePois;
    },

    _getTileID: function (e) { // (L.Event)
        var p = this._map.project( e.latlng.wrap() ),
            x = Math.floor(p.x / this._tileSize) % this._tilesAtZoom, // prevent leaflet bug with tile number detection on worldwrap
            y = Math.floor(p.y / this._tileSize);

        return x + ',' +  y + ',' + this._map._zoom;
    },

    _isTileChanged: function (xyz) { // (String)
        return !(this._currTile === xyz);
    },

    _isPoiHovered: function (point, pois) { // (L.Point)
        var poi = null;

        for (var i = 0, len = pois.length; i < len; i++) {
            var verts = this._poistorage.getPoi(pois[i]).vertices;
            if (L.PolyUtil.contains(point, verts)) {
                poi = pois[i];
                break;
            }
        }

        return poi;
    }

});

L.Map.addInitHook('addHandler', 'dgPoi', L.DG.Poi);
