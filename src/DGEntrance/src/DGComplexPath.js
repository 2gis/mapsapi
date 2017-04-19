/*
 * DG.ComplexPath is a simple vector layer class with empty .getEvents() object(!)
 * It's drawing logic is maintained in DG.Entrance.Arrow class
 *
 * _pxBounds is a pixel bounds of this drawings and they are used in L.Canvas
 */

DG.ComplexPath = DG.Path.extend({
    options: {
        fill: true,
        fillOpacity: 1,
        interactive: false
    },

    initialize: function(options) {
        DG.setOptions(this, options);

        this._empty = [];

        this._pxEmpty = DG.bounds(
            DG.point(0, 0), DG.point(0, 0)
        );
        this._pxBounds = this._pxEmpty;

        this._vertices = [this._empty];
        this._drawings = [this._empty];
    },

    getEvents: function() {
        return {};
    },

    _project: function() {
        var opts = this.options,
            zoom, weight;

        if (this._map) {
            zoom = this._map.getZoom();
        } else {
            return;
        }

        if (opts.visibility.isShown && opts.transform[zoom]) {
            //  Next numbers was empirically selected in order to provide visual compliance
            //  to the original arrow's implementation
            weight = 2.2 - ((19 - zoom) * 0.2);
            if (opts.weight !== weight) {
                this.setStyle({weight: +weight.toFixed(2)});
            }

            this._vertices[0] = opts.transform[zoom].vertices;
            this._drawings[0] = opts.transform[zoom].drawings;

            this._pxBounds = opts.transform[zoom]._pxBounds;
        } else {
            this._vertices[0] = this._empty;
            this._drawings[0] = this._empty;

            this._pxBounds = this._pxEmpty;
        }
    },

    _update: function() {
        if (this._map) {
            this._updatePath();
        }
    },

    _updatePath: function() {  //  used in Canvas renderer
        this._renderer._updateComplexPath(this);
    }
});
