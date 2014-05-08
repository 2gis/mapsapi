DG.Meta.Layer = L.Layer.extend({

    options : {
        subdomains: 'abc',

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
        this._origin = DG.Meta.origin(source, {
            subdomains : this.options.subdomains,
            dataFilter : this.options.dataFilter
        }); // TODO naming "Origin"
    },

    getOrigin : function () {
        return this._origin;
    },

    onAdd : function () {
        this._reset();
        // console.log(this);
    },

    onRemove : function () {
        console.log('onRemove');
    },

    getEvents : function () {
        var events = {
            mousemove: this._onMouseMove,
            mouseout: this._onMouseOut,
            viewreset: this._reset
        };

        return events;
    },

    _getTileNumBounds: DG.GridLayer.prototype._getTileNumBounds,
    _isValidTile: DG.GridLayer.prototype._isValidTile,
    _wrapCoords: DG.GridLayer.prototype._wrapCoords,
    _resetWrap: DG.GridLayer.prototype._resetWrap,
    
    _onMouseMove : function (event) {
        var tileSize = this._getTileSize(),
            tileCoord = this._map.getPixelOrigin()
                .add(event.layerPoint)
                .divideBy(tileSize)
                .floor();

        // this._wrapCoords(tileCoords); TODO ???
        if (!this._isValidTile(tileCoord)) {
            return;
        }

        tileCoord.z = this._map.getZoom();
        this._checkTileHover(tileCoord);
    },

    _onMouseOut : function () {

    },

    _checkTileHover: function (coords, latLng) {
        var tileData = this._origin.get(coords);

        if (tileData) {
            // console.log(tileData, latLng);
        }
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