DG.ComplexPath = DG.Path.extend({
    options: {
        fill: true,
        fillOpacity: 1,
        interactive: false
    },

    initialize: function (options) {
        DG.setOptions(this, options);

        this._empty = [];

        this._vertices = [this._empty];
        this._drawings = [this._empty];
    },

    getEvents: function () {
        return {};
    },

    _project: function () {
        var zoom = this._map.getZoom(),
            opts = this.options,
            weight;

        if (opts.visibility.isShown && opts.transform[zoom]) {
            weight = 2.2 - ((19 - zoom) * 0.2);
            if (opts.weight !== weight) {
                this.setStyle({weight: +weight.toFixed(2)});
            }

            this._vertices[0] = opts.transform[zoom].vertices;
            this._drawings[0] = opts.transform[zoom].drawings;
        } else {
            this._vertices[0] = this._empty;
            this._drawings[0] = this._empty;
        }
/*
        // project bounds as well to use later for Canvas hit detection/etc.
        var w = this._clickTolerance(),
            p = new L.Point(w, -w);

        if (this._bounds.isValid()) {
            this._pxBounds = new L.Bounds(
                this._map.latLngToLayerPoint(this._bounds.getSouthWest())._subtract(p),
                this._map.latLngToLayerPoint(this._bounds.getNorthEast())._add(p));
        }
*/
    },

    _update: function () {
        if (this._map) {
            this._updatePath();
        }
    },

    _updatePath: function () {  //  used in Canvas renderer
        this._renderer._updateComplexPath(this);
    }
});
