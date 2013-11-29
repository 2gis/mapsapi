L.DG.Ruler.LayeredMarker = L.Marker.extend({

    options: {
        draggable: true,
        keyboard: false
    },

    addTo : function (map, layers) {
        L.Util.invokeEach(this._layers, function (name, layer) {
            if (layers.hasOwnProperty(name)) {
                layers[name].addLayer(this._layers[name]);
            }
        }, this);
        this._viewport = layers;
        return this.on('move', this._onMove).super.addTo.call(this, map);
    },

    onRemove : function (map) {
        L.Util.invokeEach(this._layers, function (name, layer) {
            if (this._viewport.hasOwnProperty(name)) {
                this._viewport[name].removeLayer(this._layers[name]);
            }
        }, this);
        this.off('move', this._onMove);
        this._viewport = null;
        return this.super.onRemove.call(this, map);
    },

    _onMove : function (event) {
        var latlng = event.latlng;
        L.Util.invokeEach(this._layers, function (name, layer) {
            layer.setLatLng(latlng);
        });
    },

    _afterInit : function () {
        this.super = this.constructor.__super__;
        this._layers = this.options.layers || null;
    },

    _setPointStyle : function (styles) {
        L.Util.invokeEach(styles, function (name, style) {
            if (this._layers.hasOwnProperty(name)) {
                this._layers[name].setStyle(style);
            }
        }, this);
        if (styles.hasOwnProperty('icon')) {
            this.setIcon(styles.icon);
        }
        return this;
    }

});

L.DG.Ruler.LayeredMarker.addInitHook('_afterInit');

L.DG.Ruler.layeredMarker = function (latlng, options) {
    return new L.DG.Ruler.LayeredMarker(latlng, options);
};
