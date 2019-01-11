DG.Map.mergeOptions({
    tilesCheck: true
});

DG.Map.TilesCheck = DG.Handler.extend({
    initialize: function(map) {
        this._map = map;
        this._layer = map.baseLayer;

        this._moveStartEventCounter = 0;
        this._moveEndEventCounter = 0;

        this._loadingEventCounter = 0;
        this._loadEventCounter = 0;
    },

    addHooks: function() {
        this._map.on(this._mapEvents, this);
        this._layer.on(this._layerEvents, this);
    },

    removeHooks: function() {
        this._map.off(this._mapEvents, this);
        this._layer.off(this._layerEvents, this);
    },

    _mapEvents: {
        layeradd: function(e) {
            if (e.layer == this._layer) {
                this.enable();
            }
        },

        layerremove: function(e) {
            if (e.layer == this._layer) {
                this.disable();
            }
        },

        movestart: function() {
            this._stopWaiting();

            this._moveStartEventCounter++;
            this._isWaiting = true;
        },

        moveend: function() {
            this._moveEndEventCounter++;

            if (!this._isWaiting && this._moveStartEventCounter !== this._moveEndEventCounter) { return; }

            this._isMoveEnd = true;

            this._checkWaiting();
        }
    },

    _layerEvents: {
        loading: function() {
            this._loadingEventCounter++;
        },

        load: function() {
            this._loadEventCounter++;

            if (!this._isWaiting && this._loadingEventCounter !== this._loadEventCounter) { return; }

            this._isLoad = true;

            this._checkWaiting();
        }
    },

    _stopWaiting: function() {
        this._isWaiting = false;
        this._isMoveEnd = false;
        this._isLoad = false;
    },

    _checkWaiting: function() {
        if (this._isWaiting && this._isLoad && this._isMoveEnd) {
            this._stopWaiting();
            this._resetCounters();
            this._checkTiles();
        }
    },

    _checkTiles: function() {
        if (this._map.getTileLayersNumber() !== 0 || !this._map._loaded) { return; }

        var tileZoom = this._layer._tileZoom;
        var errorUrl = this._layer.options.errorTileUrl;
        var tiles = this._layer.getTiles();

        for (var i in tiles) {
            if (tiles[i].coords.z === tileZoom && tiles[i].el.src !== errorUrl) {
                return;
            }
        }

        this._map.zoomOut();
    },

    _resetCounters: function() {
        this._moveStartEventCounter = 0;
        this._moveEndEventCounter = 0;

        this._loadingEventCounter = 0;
        this._loadEventCounter = 0;
    }
});

DG.Map.addInitHook('addHandler', 'tilesCheck', DG.Map.TilesCheck);
