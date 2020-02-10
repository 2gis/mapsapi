/*
 * DG.Entrance.Arrow class hosts two layers, one for arrow body (path) and one for arrow tip
 * It overrides projection events from hosted layers to minimize total overhead
 * Actual calculations produced in DG.ArrowPathTransform and DG.ArrowTipTransform classes
 */

DG.Entrance.Arrow = DG.FeatureGroup.extend({
    initialize: function(options) {
        DG.LayerGroup.prototype.initialize.call(this);

        DG.setOptions(this, options);

        this._progress = 1;
        this._distance = 0;
        this._visibility = {
            isShown: false
        };
        this._position =
            options.latlngs[options.latlngs.length - 1];
        this._shape =
            this.options.shape ||
            DG.Entrance.Arrow.SHAPE;

        this._apt = {}; // DG.ArrowPathTransform objects by zoom levels
        this._att = {}; // DG.ArrowTipTransform objects by zoom levels
    },

    beforeAdd: function(map) {
        //  this._map is not initialized yet, so we can freely addLayer(s)
        var opts = this.options;

        //  TODO: Check Canvas processing order
        //  Additional logic to DISABLE animation on Canvas for now!
        if (opts.animation && !map.options.preferCanvas && !DG.Browser.ielt9) {
            opts.animation.on('step', this._animation, this);
        } else {
            opts.animation = null;
        }

        this.projection();

        this.addLayer(new DG.ComplexPath({
            lineCap: 'butt',
            color: opts.color,
            fillColor: opts.fillColor,
            interactive: opts.interactive,
            visibility: this._visibility,
            transform: this._apt
        }));

        this.addLayer(new DG.ComplexPath({
            lineJoin: 'miter',
            color: opts.color,
            fillColor: opts.fillColor,
            interactive: opts.interactive,
            visibility: this._visibility,
            transform: this._att
        }));
    },

    getEvents: function() {
        return {
            zoomend: this._project,
            moveend: this._update,
            viewreset: this._reset
        };
    },

    setVisibility: function(isShown) {
        if (this._visibility.isShown !== isShown) {
            this._visibility.isShown = isShown;
            if (isShown) {
                if (!this.options.animation) {
                    this._reset();
                }
            } else {
                this._reset();
            }
        }
    },

    getBounds: function() {
        return this.options.bounds;
    },

    projection: function() {
        var map = this._map || this._mapToAdd;
        var zoom = map ? map.getZoom() : 0;
        var vertices = this._shape.vertices[zoom];
        var drawings = this._shape.drawings[zoom];
        var latlngs = this.options.latlngs;
        var shape, path, lastPoint, prevPoint;

        if (zoom && vertices && drawings) {
            if (!this._att[zoom]) {
                path = DG.ArrowPathTransform.getTranslatedPath(map, latlngs);
                shape = {vertices: vertices, drawings: drawings};
                this._att[zoom] = new DG.ArrowTipTransform(path, shape);
                this._apt[zoom] = new DG.ArrowPathTransform(path);
            }

            lastPoint = map.latLngToLayerPoint(this._position);
            prevPoint = map.latLngToLayerPoint(latlngs[latlngs.length - 2]);
            if (!this._apt[zoom]._pxBounds) {
                //  One-time action per 'viewreset' event
                //  Caching _pxBounds for using with Canvas renderer
                this._setBounds(lastPoint, prevPoint, this._apt[zoom], this._att[zoom]);
            }
            if (this.options.distance) {
                //  Arrow position recalculated for Bounce animation effect
                lastPoint = DG.VertexTransform.getScaled(lastPoint, prevPoint, this._distance);
            }

            //  Main calculations
            //  Get part of the arrow path and move (bound) arrow tip to it
            this._apt[zoom].subPath(this._progress).translate(lastPoint);
            this._att[zoom].subShape(this._apt[zoom]).translate(lastPoint);
        }

        return this;
    },

    _animation: function(e) {
        if (e.distance != undefined) {
            this._distance = e.distance;    //  bounce animation effect
        } else {
            this._progress = e.progress;    //  path animation effect
        }
        if (this._visibility.isShown) {
            //  TODO: Additional logic for animation on Canvas
            // this.projection().invoke('redraw');

            this._project();
            this._update();
        }
    },

    _project: function() {
        this.projection().invoke('_project');
    },

    _update: function() {
        this.invoke('_update');
    },

    _reset: function() {
        this._resetBounds();

        this._project();
        this._update();
    },

    _resetBounds: function() {
        //  Canvas renderer specific
        var z;

        for (z in this._apt) {
            this._apt[z]._pxBounds = null;
        }

        for (z in this._att) {
            this._att[z]._pxBounds = null;
        }
    },

    _setBounds: function(pl, pp, apt, att) {
        var _apt = apt.subPath(1).translate(pl).vertices,
            _att = att.subShape(apt).translate(pl).vertices;

        //  TODO: Additional logic for animation on Canvas
        // if (this.options.distance) {
        //     pl = DG.VertexTransform.getScaled(pl, pp, 1);
        //     _apt = _apt.concat(apt.subPath(1).translate(pl).vertices);
        //     _att = _att.concat(att.subShape(apt).translate(pl).vertices);
        // }

        apt._pxBounds = new DG.Bounds(_apt);
        att._pxBounds = new DG.Bounds(_att);
    }
});

DG.entrance.arrow = function(options) {
    return new DG.Entrance.Arrow(options);
};
