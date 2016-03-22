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

        this._isShown = false;
        this._progress = 1;

        //  TODO: Remove default?! (explicit shape option)
        this.options.shape = this.options.shape || DG.Entrance.Arrow.SHAPE;
        this._shape = {
            points: {},
            drawings: {},
            subparts: {},
            bounds: null
        };
        this._drawings = [];

        this._transform = new DG.ShapeTransform(latlngs);
        if (options.animation) {
            options.animation.on('step', this._animation, this);
        }

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

    setVisibility: function (isShown) {
        this._isShown = isShown;
        if (!this.options.animation) {
            this._reset();
        }
    },

    //  Caps
    setLatLngs: function (latlngs) { return this },             // eslint-disable-line
    addLatLng: function (latlng, latlngs) { return this },      // eslint-disable-line

    _animation: function (e) {
        this._progress = e.progress;
        this._reset();
    },

    _projectLatlngs: function (latlngs, result) {
        var weight, zoom, points, shape,
            map = this._map;

        if (map) {
            zoom = map.getZoom();
            if (this._isShown && this.options.shape.points[zoom]) {
                //  'weight' value is OK but '19' (max possible zoom) is hardcoded for now
                weight = 2.2 - ((19 - zoom) * 0.2);
                this.setStyle({weight: weight});

                if (!this._shape.points[zoom]) {
                    this._produceShape(zoom);
                }
                if (this.options.animation) {
                    shape = this._getSubShape(zoom, this._progress);
                    points = this._transform.transform(shape.points);
                    this._drawings = [shape.drawings];
                } else {
                    points = this._transform.transform(this._shape.points[zoom]);
                    this._drawings = [this._shape.drawings[zoom]];
                }
                result.push(points);

                //  TODO !!!
                this._bounds = this._getBounds(points);
                this._latlngs = [this._bounds.getSouthWest(), this._bounds.getNorthEast()];
            } else {
                this._latlngs = [this._transform._vertices[this._transform._vTo]];
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
            path, points, drawings, angles, width, arcs,
            i, len, x, ax, bx, ls, lp, subparts,
            lengths = [], Point = DG.Point;

        path = _transform.getTranslatedPath(zoom);

        angles = _transform.getAngles();

        lp = _points[_points.length - 1];
        width = Math.abs(lp.y);

        ls = Math.abs(lp.x) + width - Math.abs(path[1].x);
        ls = ls > 0 ? ls : 0;

        arcs = [[], [], []];
        drawings = [[], []];
        points = [[], [], path];
        subparts = {lengths: null, arcs: null, spi: -1, sdi: -1};
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

                arcs[2].push(1);
                arcs[1].push(points[1].length);
                points[1].push(new Point(x + ax,      -width));
                points[1].push(new Point(x + ax - bx, -width));

                transform(points, angles[i], new Point(x, 0));

                points[1].push(new Point(0 - ax + bx, -width));
                points[1].push(new Point(0 - ax,      -width));
                drawings[1].push('L', 'C');

                lengths.push(Math.abs(x + ax));
            } else {
                points[1].push(new Point(x - ax,      -width));
                drawings[1].push('L');

                arcs[2].push(0);
                arcs[0].push(points[0].length);
                points[0].push(new Point(x - ax,      +width));
                points[0].push(new Point(x - ax + bx, +width));

                transform(points, angles[i], new Point(x, 0));

                points[0].push(new Point(0 + ax - bx, +width));
                points[0].push(new Point(0 + ax,      +width));
                drawings[0].push('L', 'C');

                lengths.push(Math.abs(x - ax));
            }
        }

        ax = path[i + 1].x;
        bx = width * 4 / 3; // tan(PI/4) = 1
        points[0].push(new Point(ax, +width));
        points[1].push(new Point(ax, -width));
        points[0].push(new Point(ax - bx, +width));
        points[1].push(new Point(ax - bx, -width));

        lengths.push(Math.abs(ax));
        subparts.spi = points[0].length - 1;
        subparts.sdi = drawings[0].length + 1;

        //  Combine path points and return them to the original position
        points = points[0].concat(points[1].reverse());
        transform([points], angles.fullAngle, path[0]);

        //  Last arrow-shape point is actually 'Move To' (start) point
        //  We need it at the beginning to successfully start the path
        points = [new Point(lp.x + ls, lp.y)]
            .concat(points)
            .concat(_transform.translate(_points, new Point(ls, 0)));
        points = _transform.rotate(points);
        this._shape.points[zoom] = points;

        this._shape.drawings[zoom] = ['M']
            .concat(drawings[0])
            .concat('L', 'C', 'L')
            .concat(drawings[1].reverse())
            .concat(_drawings);

        //  We need to reconstruct arc's indexes but too mach variables already touched, reuse some of them
        ax = 1;
        bx = points.length - _points.length;
        subparts.arcs = arcs[2].map(function (i) {
            var a = arcs[i].shift();
            if (i > 0) {
                return new DG.ArcBezier(points.slice(bx - a - 4, bx - a));
            } else {
                return new DG.ArcBezier(points.slice(ax + a, ax + a + 4).reverse());
            }
        }).reverse();

        lengths[0] += ls;
        subparts.lengths = new DG.Metric.Segments().push(lengths.pop());
        lengths.reverse().forEach(function (v, i) {
            subparts.lengths.push(subparts.arcs[i].length()).push(v);
        });
        this._shape.subparts[zoom] = subparts;
    },

    _getSubShape: function (zoom, pathRatio) {
        var _points = this._shape.points[zoom],
            _drawings = this._shape.drawings[zoom],
            _subparts = this._shape.subparts[zoom],
            _lengths = _subparts.lengths,
            _transform = this._transform,
            _getScaled = DG.VertexTransform.getScaled,
            shape = this.options.shape,
            points, drawings, angle,
            Point = DG.Point;

        pathRatio = pathRatio > 1 ? 1 : pathRatio;

        var len = _lengths.getLength() * pathRatio,
            seg = _lengths.getIndex(len),
            segRatio = _lengths.getSegRatio(len),
            spiL = _subparts.spi, spiR = spiL + 3,
            sdiL = _subparts.sdi, sdiR = sdiL + 2,
            arc, lArc, pR, pL, arcI = 0, aed = 0;

        while (aed++ < seg) {
            if (aed & 1) {
                spiL--; spiR++;
                sdiL--; sdiR++;
            } else {
                lArc = _drawings[sdiL].toUpperCase() === 'C';
                if (lArc) {
                    spiL -= 3;
                    sdiL -= 1;
                } else {
                    spiR += 3;
                    sdiR += 1;
                }
                arcI++;
            }
        }

        if (seg & 1) {
            //  One path ends with an arc
            arc = _subparts.arcs[arcI];
            lArc = _drawings[sdiL].toUpperCase() === 'C';
            if (lArc) {
                arc = arc.split1(arc.getTbyL(_lengths.getSegLength(len)));
                points = _points.slice(spiL, spiR);
                points.unshift(arc.points[2], arc.points[1]);
                pR = _points[spiR];
                pL = arc.points[3];
                drawings = _drawings.slice(sdiL, sdiR);
            } else {
                arc = arc.split1(arc.getTbyL(_lengths.getSegLength(len)));
                points = _points.slice(spiL + 1, spiR + 1);
                points.push(arc.points[1], arc.points[2]);
                pR = arc.points[3];
                pL = _points[spiL];
                drawings = _drawings.slice(sdiL + 1, sdiR + 1);
            }
        } else {
            //  Both paths end with lines
            pL = _getScaled(_points[spiL], _points[spiL - 1], segRatio);
            pR = _getScaled(_points[spiR], _points[spiR + 1], segRatio);
            points = _points.slice(spiL, spiR + 1);
            drawings = _drawings.slice(sdiL, sdiR + 1);
        }

        angle = DG.VertexTransform.getAngle(new Point(pL.x - pR.x, pL.y - pR.y), new Point(0, 1));

        _points = _transform.unTranslate(shape.points[zoom], shape.points[zoom][0]);
        _points = _transform.unRotate(_points, angle);
        _points = _transform.translate(_points, pR);
        _points = [_points[_points.length - 1]]
            .concat(points)
            .concat(_points);

        _drawings = ['M']
            .concat(drawings)
            .concat(shape.drawings[zoom]);

        //  TODO
        return {points: _points, drawings: _drawings};
    }
});

DG.Entrance.arrow2 = function (latlngs, options) {
    return new DG.Entrance.Arrow2(latlngs, options);
};
