DG.Entrance2 = DG.FeatureGroup.extend({

    options: {
        vectors: [],

        fillColor: '#0085a0',
        strokeColor: '#fff',

        enableAnimation: true,
        interactive: false,

        autoClose: true
    },

    initialize: function (options) { // (Object)
        DG.setOptions(this, options);

        DG.FeatureGroup.prototype.initialize.call(this);

        this._initArrows();
    },

    onAdd: function (map) { // (DG.Map)
        //  TODO: В стрелках изменить поведение подготовки path аттрибутов на их пропуск по умолчанию
        //  и здесь убрать логику 'hidden'
        DG.FeatureGroup.prototype.onAdd.call(this, map);

        this._map = map;
        this._eventHandler = new DG.Entrance.EventHandler(map, this, this.options);
        this._eventHandler.enable();

        // hide without event by default
        this.eachLayer(function (arrow) {
            arrow.setStyle({visibility: 'hidden'});
        });

        this._isShown = false;

        this.show(false);
    },

    onRemove: function (map) { // (DG.Map)
        DG.FeatureGroup.prototype.onRemove.call(this, map);

        this._isShown = false;
        this._map.fire('entrancehide');
        this._map = null;
        this._eventHandler.disable();
        this._eventHandler = null;
    },

    show: function (fitBounds) { // () -> DG.Entrance
        var self = this;

        if (!this._layers) {
            return this;
        }
        if (fitBounds !== false) {
            this.fitBounds();
        }
        //  TODO: Открывать в любом случае, zoom проверяется непосредственно в стрелках
        //
        if (this._isAllowedZoom()) {
            this.eachLayer(function (arrow) {
                arrow.setStyle({visibility: 'visible'});
                if (self.options.enableAnimation && DG.Path.ANIMATION_AVAILABLE) {
                    arrow.runAnimation('animateArrowPathGeom');
                }
            });
            if (!this._isShown) {
                this._map.fire('entranceshow');
                this._isShown = true;
            }
        }

        return this;
    },

    hide: function () { // () -> DG.Entrance

        if (this.isShown() && this._layers) {
            this.eachLayer(function (arrow) {
                arrow.setStyle({visibility: 'hidden'});
            });
            this._isShown = false;
            this._map.fire('entrancehide');
        }

        return this;
    },

    isShown: function () { // () -> Boolean
        return this._isShown;
    },

    setFillColor: function (color) {
        this.eachLayer(function (arrow) {
            if (arrow.options.type == 'fill') {
                arrow.setStyle({color: color});
            }
        });
    },

    setStrokeColor: function (color) {
        this.eachLayer(function (arrow) {
            if (arrow.options.type == 'stroke') {
                arrow.setStyle({color: color});
            }
        });
    },

    _initArrows: function () { // () -> DG.FeatureGroup
        var options = {
            color: this.options.strokeColor,
            fillColor: this.options.fillColor
        };
        this.options.vectors
            .map(function (vector) {
                return DG.Wkt.toLatLngs(vector);
            })
            .forEach(function (latlngs) {
                this.addLayer(DG.Entrance.arrow(latlngs, options));
            }, this);
    },

    _getFitZoom: function () {
        return this._map.projectDetector.getProject().maxZoom || DG.Entrance.SHOW_FROM_ZOOM;
    },

    fitBounds: function () {
        var map = this._map,
            fitZoom,
            bounds = this.getBounds();

        if (!map.getBounds().contains(bounds) || !this._isAllowedZoom()) {
            fitZoom = this._getFitZoom();
            if (!map.projectDetector.getProject()) {
                map.once('moveend', function () {
                    map.setZoom(this._getFitZoom());
                }, this);
            }
            map.setView(bounds.getCenter(), fitZoom, {
                animate: true
            });
        }

        return this;
    },

    _isAllowedZoom: function () {
        return this._map.getZoom() >= DG.Entrance.SHOW_FROM_ZOOM;
    }
});






//  --------------------------------------------------------------------------------------------------------------------
//  --------------------------------------------------------------------------------------------------------------------
DG.Entrance.Arrow2 = DG.Polyline.extend({

    options: {
        fill: true,
        fillColor: '#0085a0',
        fillOpacity: 1,
        color: '#fff',
        weight: 2,

        shape: null,

        noClip: true
    },

    initialize: function (latlngs, options) {
        DG.setOptions(this, options);

        //  TODO: Remove default?! (explicit shape option)
        this.options.shape = this.options.shape
            || DG.Entrance.Arrow.SHAPE;
        this._shape = {
            points: {},
            drawings: {},
            bounds: null
        };
        this._drawings = [];

        this._transform = new DG.ShapeTransform(latlngs);

        //  Initialize auxiliary objects
        this._latlngs = [];
        this._bounds = new DG.LatLngBounds();
        //  Canvas renderer starts drawing (_requestRedraw) before projection events ('reset', 'zoomend', etc...)
        //  Need to feed something
        this._pxBounds = new DG.Bounds([[0, 0], [0, 0]]);
    },

    onAdd: function (map) {
        this._transform.prepare(map, this._shape);
        DG.Polyline.prototype.onAdd.call(this, map);
    },

    //  Caps
    setLatLngs: function (latlngs) { return this },             // eslint-disable-line
    addLatLng: function (latlng, latlngs) { return this },      // eslint-disable-line

    _projectLatlngs: function (latlngs, result) {
        var weight, zoom, points,
            map = this._map;

        if (map) {
             //  TODO: try to reproduce 'scale' and 'weight' params by math
            zoom = map.getZoom();
            weight = 2.50 - ((DG.Entrance.Arrow.SHAPE_ZOOM - zoom) * 0.25);

            if (zoom >= DG.Entrance.SHOW_FROM_ZOOM) {
                this.setStyle({weight: weight});

                if (!this._shape.points[zoom]) {
                    this._produceShape(zoom);
                }
                this._drawings = this._shape.drawings[zoom];

                points = this._transform.transform(this._shape.points[zoom]);
                result.push(points);

                this._bounds = this._getBounds(points);
                this._latlngs = [this._bounds.getSouthWest(), this._bounds.getNorthEast()];
            } else {
                this._latlngs = [this._transform._vertices[this._transform._vTo].clone()];
                this._bounds = new DG.LatLngBounds(this._latlngs);
            }
        }
    },

    _update: function () {
        if (this._map) {
            this._updatePath();
        }
    },

    _updatePath: function () {
        this._renderer._updateComplexShape(this, true);
    },

    _getBounds: function (points) {
        var i = points.length,
            po, map, bounds;

        if (!this._shape.bounds) {
            map = this._map;
            po = map.getPixelOrigin();
            bounds = new DG.LatLngBounds();
            while (i--) {
                bounds.extend(map.unproject(points[i].add(po)));
            }
            this._shape.bounds = bounds;
        }
        return this._shape.bounds;
    },

    _produceShape: function (zoom) {
        var _points = this.options.shape.points[zoom],
            _endings = this.options.shape.endings[zoom],
            _drawings = this.options.shape.drawings[zoom],
            _transform = this._transform,
            transform = DG.ShapeTransform.transform,
            drawingsL = [], drawingsR = [],
            path, points, angles, width,
            i, len, x, ax, bx, ls, lp;

        path = _transform.getTranslatedPath(zoom);

        angles = _transform.getAngles();

        lp = _points[_points.length - 1];
        width = Math.abs(lp[1]);

        ls = Math.abs(lp[0]) + width + 5 - Math.abs(path[1][0]);
        ls = ls > 0 ? ls : 0;

        points = [path, [], []];
        for (i = 0, len = angles.length; i < len; i++) {
            x = path[i + 1][0];
            ax = width * angles[i].cot;

            //  http://pomax.github.io/bezierinfo/#circles_cubic
            //  actual equation is (4/3 * tan(α/4) * radius)
            bx = angles[i].tan * width * 8 / 3;

            //  Next code can be combined by -/+ inversion but for simplicity it is left as is
            if (ax < 0) {
                points[1].push([x - ax, -width]);
                drawingsR.push('L');

                points[2].push([x - ax, +width]);
                points[2].push([x - ax + bx, +width]);
                transform(points, angles[i], [x, 0]);
                points[2].push([0 + ax - bx, +width]);
                points[2].push([0 + ax, +width]);
                drawingsL.push('L', 'C');
            } else {
                points[2].push([x + ax, +width]);
                drawingsL.push('L');

                points[1].push([x + ax, -width]);
                points[1].push([x + ax - bx, -width]);
                transform(points, angles[i], [x, 0]);
                points[1].push([0 - ax + bx, -width]);
                points[1].push([0 - ax, -width]);
                drawingsR.push('L', 'C');
            }
        }

        ax = path[i + 1][0];
        points[1].push([ax, -width]);
        points[2].push([ax, +width]);
        points[1].push([_endings[0][0] + ax, _endings[0][1]]);
        points[2].push([_endings[1][0] + ax, _endings[1][1]]);

        points = points[1].concat(points[2].reverse());
        transform([points], angles.fullAngle, path[0]);

        points = _transform.translate(_points, [ls, 0]).concat(points);
        this._shape.points[zoom] = _transform.rotate(points);

        this._shape.drawings[zoom] = [_drawings.concat(drawingsR).concat('L', 'C', 'L').concat(drawingsL.reverse())];
    }
});

DG.Entrance.arrow2 = function (latlngs, options) {
    return new DG.Entrance.Arrow2(latlngs, options);
};







//  --------------------------------------------------------------------------------------------------------------------
//DG.Entrance.Arrow.memory = {};
DG.Entrance.SHOW_FROM_ZOOM = 16;
DG.Entrance.Arrow.SHAPE_ZOOM = 19;
/*eslint-disable space-in-brackets */
DG.Entrance.Arrow.SHAPE = {
    points: {19: [[-14.277800,   3.914987],
        [-16.955177,   9.920100],
        [-17.201977,  10.445900], [-15.678277,  11.733500], [-15.195377,  11.454500],
        [-11.418377,   9.265500], [-2.093776,    2.130000], [ -2.093776,   2.130000],
        [  0.007382,   0.123400], [  0.007382,  -0.123400], [ -2.093776,  -2.130000],
        [ -2.093776,  -2.130000], [-11.418377,  -9.265500], [-15.195377, -11.454500],
        [-15.678277, -11.733500], [-17.201977, -10.445900], [-16.955177,  -9.920100],
        [-14.277800,  -3.914987]]},
    endings: {19: [[-3.795562, -3.644000], [-3.795562, 3.644000]]},
    drawings: {19: ['M', 'L', 'C', 'C', 'C', 'C', 'C', 'L']}
};
/*eslint-enable space-in-brackets */

(function () {
    var scale, i,
        shapeZoom = DG.Entrance.Arrow.SHAPE_ZOOM,
        minZoom = DG.Entrance.SHOW_FROM_ZOOM - 1,
        points = DG.Entrance.Arrow.SHAPE.points[shapeZoom],
        endings = DG.Entrance.Arrow.SHAPE.endings[shapeZoom],
        drawings = DG.Entrance.Arrow.SHAPE.drawings[shapeZoom],
        transform = new DG.VertexTransform([[0, 0], [0, 0]]);

    for (scale = 0.75, i = shapeZoom - 1; i > minZoom; i--, scale -= 0.1) {
        DG.Entrance.Arrow.SHAPE.points[i] = transform.scale(points, scale);
        DG.Entrance.Arrow.SHAPE.endings[i] = transform.scale(endings, scale);
        DG.Entrance.Arrow.SHAPE.drawings[i] = drawings;
    }
})();

//DG.Entrance.Arrow.SHAPE = {
//    points: [
//        [-36.160941,   3.914987],
//        [-14.277800,   3.914987],
//        [-16.955177,   9.920100],
//        [-17.201977,  10.445900], [-15.678277,  11.733500], [-15.195377,  11.454500],
//        [-11.418377,   9.265500], [-2.093776,    2.130000], [ -2.093776,   2.130000],
//        [  0.007382,   0.123400], [  0.007382,  -0.123400], [ -2.093776,  -2.130000],
//        [ -2.093776,  -2.130000], [-11.418377,  -9.265500], [-15.195377, -11.454500],
//        [-15.678277, -11.733500], [-17.201977, -10.445900], [-16.955177,  -9.920100],
//        [-14.277800,  -3.914987],
//        [-36.160941,  -3.914987],
//        [-39.956503,  -3.644000], [-39.956503,   3.644000], [-36.160941,   3.914987]
//    ],
//    drawings: [['M', 'L', 'L', 'C', 'C', 'C', 'C', 'C', 'L', 'L', 'C']]
//};

//DG.Entrance.Arrow.SHAPE = {
//    points: [[ -2.093776,   2.130000],
//        [  0.007382,   0.123400], [  0.007382,  -0.123400], [ -2.093776,  -2.130000],
//        [ -2.093776,  -2.130000], [-11.418377,  -9.265500], [-15.195377, -11.454500],
//        [-15.678277, -11.733500], [-17.201977, -10.445900], [-16.955177,  -9.920100],
//        [-14.835555,  -5.165904],
//        [-14.365296,  -4.111138], [-14.398960,  -3.910886], [-15.934809,  -3.911130],
//        [-36.160941,  -3.914987],
//        [-39.956503,  -3.644000], [-39.956503,   3.644000], [-36.160941,   3.914987],
//        [-15.934809,   3.911130],
//        [-14.398960,   3.910886], [-14.365296,   4.111138], [-14.835555,   5.165904],
//        [-16.955177,   9.920100],
//        [-17.201977,  10.445900], [-15.678277,  11.733500], [-15.195377,  11.454500],
//        [-11.418377,   9.265500], [-2.093776,    2.130000], [ -2.093776,   2.130000]],
//    drawings: [['M', 'C', 'C', 'C', 'L', 'C', 'L', 'C', 'L', 'C', 'L', 'C', 'C']]
//};



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
