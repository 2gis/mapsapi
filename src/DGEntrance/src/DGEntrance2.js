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
            lengths: {},
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
            zoom = map.getZoom();
            weight = 2.2 - ((19 - zoom) * 0.2); //  This values are OK but '19' (max possible zoom) is hardcoded for now

            if (this.options.shape.points[zoom]) {
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
            _drawings = this.options.shape.drawings[zoom],
            _transform = this._transform,
            transform = DG.ShapeTransform.transform,
            path, points, drawings, angles, width,
            i, len, x, ax, bx, ls, lp, arc, lengths,
            Point = DG.Point;

        path = _transform.getTranslatedPath(zoom);

        angles = _transform.getAngles();

        lp = _points[_points.length - 1];
        width = Math.abs(lp.y);

        ls = Math.abs(lp.x) + width - Math.abs(path[1].x);
        ls = ls > 0 ? ls : 0;

        lengths = [];
        drawings = [[], []];
        points = [[], [], path];
        for (i = 0, len = angles.length; i < len; i++) {
            x = path[i + 1].x;
            ax = width * angles[i].cot;

            //  http://pomax.github.io/bezierinfo/#circles_cubic
            //  actual equation is (4/3 * tan(α/4) * radius)
            bx = angles[i].tan * width * 8 / 3;

            //  Next code can be combined by -/+ inversion but for simplicity it is left as is
            if (ax > 0) {
                points[0].push(new Point(x + ax,      +width));
                drawings[0].push('L');

                points[1].push(new Point(x + ax,      -width));
                points[1].push(new Point(x + ax - bx, -width));

                transform(points, angles[i], new Point(x, 0));

                points[1].push(new Point(0 - ax + bx, -width));
                points[1].push(new Point(0 - ax,      -width));
                drawings[1].push('L', 'C');

                arc = new DG.ArcBezier(points[1].slice(points[1].length - 4));
                lengths.push(Math.abs(x + ax), +arc.length());
            } else {
                points[1].push(new Point(x - ax,      -width));
                drawings[1].push('L');

                points[0].push(new Point(x - ax,      +width));
                points[0].push(new Point(x - ax + bx, +width));

                transform(points, angles[i], new Point(x, 0));

                points[0].push(new Point(0 + ax - bx, +width));
                points[0].push(new Point(0 + ax,      +width));
                drawings[0].push('L', 'C');

                arc = new DG.ArcBezier(points[0].slice(points[0].length - 4));
                lengths.push(Math.abs(x - ax), -arc.length());
            }
        }

        ax = path[i + 1].x;
        bx = width * 4 / 3; // tan(PI/4) = 1
        points[0].push(new Point(ax, +width));
        points[1].push(new Point(ax, -width));
        points[0].push(new Point(ax - bx, +width));
        points[1].push(new Point(ax - bx, -width));
        lengths.push(Math.abs(ax));

        //  Combine path points and return them to the original position
        points = points[0].concat(points[1].reverse());
        transform([points], angles.fullAngle, path[0]);

        //  Last arrow-shape point is actually 'Move To' (start) point
        //  We need it at the beginning to successfully start the path
        points = [new Point(lp.x + ls, lp.y)]
            .concat(points)
            .concat(_transform.translate(_points, new Point(ls, 0)));
        this._shape.points[zoom] = _transform.rotate(points);

        this._shape.drawings[zoom] = [['M']
            .concat(drawings[0])
            .concat('L', 'C', 'L')
            .concat(drawings[1].reverse())
            .concat(_drawings)
        ];
    },
    getAnimatedPath: function (pathRatio) {

    }
});

DG.Entrance.arrow2 = function (latlngs, options) {
    return new DG.Entrance.Arrow2(latlngs, options);
};







//  --------------------------------------------------------------------------------------------------------------------
//DG.Entrance.Arrow.memory = {};
DG.Entrance.SHOW_FROM_ZOOM = 16;
/*eslint-disable space-in-brackets */
DG.Entrance.Arrow.SHAPE = {
    points: {
        16: [
            [ -6.5000,  -1.8000],
            [ -6.0522,  -1.8000],
            [ -7.0975,  -5.2537],
            [ -6.6619,  -6.2565], [ -6.5980,  -6.3550], [ -6.1757,  -6.1470],
            [  0.8371,  -0.3552],
            [  0.9275,  -0.1764], [  0.9275,   0.1764], [  0.8371,   0.3552],
            [ -6.1757,   6.1470],
            [ -6.5980,   6.3550], [ -6.6619,   6.2565], [ -7.0975,   5.2537],
            [ -6.0522,   1.8000],
            [ -6.5000,   1.8000]
        ],
        17: [
            [ -9.0000,  -2.4000],
            [ -7.8890,  -2.4000],
            [ -9.9245,  -7.2548],
            [ -9.3363,  -8.6404], [ -9.3448,  -8.6448], [ -8.8717,  -8.3508],
            [  1.0285,  -0.3552],
            [  1.1190,  -0.1764], [  1.1190,   0.1764], [  1.0285,   0.3552],
            [ -8.8717,   8.3508],
            [ -9.3448,   8.6448], [ -9.3363,   8.6404], [ -9.9245,   7.2548],
            [ -7.8890,   2.4000],
            [ -9.0000,   2.4000]
        ],
        18: [
            [-11.5000,  -3.0000],
            [-10.0795,  -3.0000],
            [-12.4909,  -9.3173],
            [-11.8402, -10.7654], [-11.5986, -10.7073], [-10.9380, -10.2258],
            [  1.1497,  -0.3552],
            [  1.2402,  -0.1764], [  1.2402,   0.1764], [  1.1497,   0.3552],
            [-10.9380,  10.2258],
            [-11.5986,  10.7073], [-11.8402,  10.7654], [-12.4909,   9.3173],
            [-10.0795,   3.0000],
            [-11.5000,   3.0000]
        ],
        19: [
            [-13.0000,  -3.6000],
            [-11.6600,  -3.6000],
            [-14.1696, -10.8351],
            [-13.5189, -12.2832], [-13.2773, -12.2251], [-12.6167, -11.7436],
            [  1.3061,  -0.3552],
            [  1.3966,  -0.1764], [  1.3966,   0.1764], [  1.3061,   0.3552],
            [-12.6167,  11.7436],
            [-13.2773,  12.2251], [-13.5189,  12.2832], [-14.1696,  10.8351],
            [-11.6600,   3.6000],
            [-13.0000,   3.6000]
        ]
    },
    drawings: {
        16: ['L', 'L', 'C', 'L', 'C', 'L', 'C', 'L', 'L'],
        17: ['L', 'L', 'C', 'L', 'C', 'L', 'C', 'L', 'L'],
        18: ['L', 'L', 'C', 'L', 'C', 'L', 'C', 'L', 'L'],
        19: ['L', 'L', 'C', 'L', 'C', 'L', 'C', 'L', 'L']
    }
};
/*eslint-enable space-in-brackets */


(function (points) {
    for (var i in points) {
        points[i] = points[i].map(function(point) { return DG.point(point); }); // eslint-disable-line no-loop-func
    }
})(DG.Entrance.Arrow.SHAPE.points);


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
