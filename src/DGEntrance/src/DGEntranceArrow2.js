DG.Entrance.Arrow2 = DG.LayerGroup.extend({
    initialize: function (options) {
        DG.LayerGroup.prototype.initialize.call(this);

        DG.setOptions(this, options);

        this._progress = 1;
        this._visibility = {
            isShown: true       //  TODO
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
        //  TODO
        this._visibility._isShown = isShown;
        if (!this.options.animation) {
            this._reset();
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
        this._progress = e.progress;
        if (this._visibility.isShown) {
            this._reset();
        }
    },

    _project: function () {
        var map = this._map || this._mapToAdd,
            zoom = map.getZoom(), shape, path, pl,
            vertices = this._shape.vertices[zoom],
            drawings = this._shape.drawings[zoom];

        if (vertices && drawings) {
            if (!this._att[zoom]) {
                path = DG.ArrowPathTransform.getTranslatedPath(map, this.options.latlngs);
                shape = {vertices: vertices, drawings: drawings};
                this._att[zoom] = new DG.ArrowTipTransform(path, shape);
                this._apt[zoom] = new DG.ArrowPathTransform(path);
            }

            pl = map.latLngToLayerPoint(this._position);
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


/*
 style="transform: translateY(-40px) translateX(8px);"

 var c = []; for (var i = 0; i < this.options.ring.length; i++) { var t = map.unproject([this.options.ring[i][0]+67108864, this.options.ring[i][1]+67108864], 19); c.push([t.lat, t.lng]) };
 var str = ''; for (var a = 0; a < c.length; a++) {str += '['+c[a][0]+', '+c[a][1]+'], '}

 var a = new DG.Entrance.Arrow2([DG.latLng(54.979515,82.897354), DG.latLng(54.979599,82.89741)]);;
 [[54.979515,82.897354], [54.979599,82.89741]]

 var a = new DG.Entrance.Arrow2([DG.latLng(55.733819, 37.588498), DG.latLng(55.733906, 37.588372), DG.latLng(55.733934, 37.588434)]);;;
 [55.733819, 37.588498], [55.733906, 37.588372], [55.733934, 37.588434]
 [55.733787, 37.588427], [55.733857, 37.588326]
 [55.734122, 37.588066], [55.734179, 37.588189]

 var a = new DG.Entrance.Arrow2([DG.latLng(55.733890, 37.588248), DG.latLng(55.73395, 37.588178), DG.latLng(55.733906, 37.588372), DG.latLng(55.733934, 37.588434)]);;;

 LngLat!
 vectors:Array[1]
 0:"LINESTRING(82.897354 54.979515,82.89741 54.979599)"

 vectors:Array[3]
 0:"LINESTRING(37.588498 55.733819,37.588372 55.733906,37.588434 55.733934)"
 1:"LINESTRING(37.588427 55.733787,37.588326 55.733857)"
 2:"LINESTRING(37.588066 55.734122,37.588189 55.734179)"
 */
