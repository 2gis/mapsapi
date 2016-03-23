DG.Entrance.Arrow2 = DG.LayerGroup.extend({
    initialize: function (options) {
        DG.LayerGroup.prototype.initialize.call(this);

        DG.setOptions(this, options);

        this._progress = 1;
        this._visibility = {
            isShown: false
        };
        this._position =
            options.latlngs[options.latlngs.length - 1];
        this._shape =
            this.options.shape ||
            DG.Entrance.Arrow.SHAPE;
        if (options.animation) {
            options.animation.on('step', this._animation, this);
        }

        this._apt = {};
        this._att = {};
    },

    getEvents: function () {
        return {
            zoomend: this._project,
            moveend: this._update,
            viewreset: this._reset
        };
    },

    setVisibility: function (isShown) {
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

    beforeAdd: function (map) { //  eslint-disable-line no-unused-vars
        //  this._map is not initialized yet, so we can freely addLayer(s)
        var options1 = {
                lineCap: 'butt',
                color: this.options.color,
                fillColor: this.options.fillColor,
                interactive: this.options.interactive,
                visibility: this._visibility,
                transform: this._apt},
            options2 = {
                lineJoin: 'miter',
                color: this.options.color,
                fillColor: this.options.fillColor,
                interactive: this.options.interactive,
                visibility: this._visibility,
                transform: this._att};

        this._project();

        this.addLayer(new DG.ComplexPath(options1));
        this.addLayer(new DG.ComplexPath(options2));
    },

    _animation: function (e) {
        if (e.distance != undefined) {
            this._distance = e.distance;    //  bounce animation effect
        } else {
            this._progress = e.progress;    //  path animation effect
        }
        if (this._visibility.isShown) {
            this._reset();
        }
    },

    _project: function () {
        var map = this._map || this._mapToAdd,
            zoom = map.getZoom(), shape, path, pl,
            vertices = this._shape.vertices[zoom],
            drawings = this._shape.drawings[zoom],
            latlngs = this.options.latlngs;

        if (vertices && drawings) {
            if (!this._att[zoom]) {
                path = DG.ArrowPathTransform.getTranslatedPath(map, latlngs);
                shape = {vertices: vertices, drawings: drawings};
                this._att[zoom] = new DG.ArrowTipTransform(path, shape);
                this._apt[zoom] = new DG.ArrowPathTransform(path);
            }

            pl = map.latLngToLayerPoint(this._position);
            if (this._distance != undefined) {
                pl = DG.VertexTransform.getScaled(pl,
                    map.latLngToLayerPoint(latlngs[latlngs.length - 2]),
                    this._distance);
            }
            this._apt[zoom].subPath(this._progress).translate(pl);
            this._att[zoom].subShape(this._apt[zoom]).translate(pl);
        }

        this.invoke('_project');
    },

    _update: function () {
        this.invoke('_update');
    },

    _reset: function () {
        this._project();
        this._update();
    }
});

DG.Entrance.arrow2 = function (options) {
    return new DG.Entrance.Arrow2(options);
};
