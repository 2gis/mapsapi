DG.VectorTransform = function (latlngs) {
    this._vectors = latlngs;
    this._vFr = latlngs.length - 2;
    this._vTo = latlngs.length - 1;
    this._angle = null;
};

DG.VectorTransform.prototype = {
    transform: function (map, ring, scale) {
        var fr = map.project(this._vectors[this._vFr]),
            to = map.project(this._vectors[this._vTo]),
            po = map.getPixelOrigin(),
            dx = to.x,
            dy = to.y,
            x = dx - fr.x,
            y = dy - fr.y,
            rx, ry, cosS, sinS,
            _ring = [];

        dx -= po.x;
        dy -= po.y;
        scale = scale || 1;
        if (!this._angle) {
            this._angle = this._getAngle(x, y);
        }
        cosS = this._angle.cos * scale;
        sinS = this._angle.sin * scale;
        for (var j = 0, len = ring.length; j < len; j++) {
            rx = ring[j][0];
            ry = ring[j][1];
            x = rx * cosS - ry * sinS + dx;
            y = rx * sinS + ry * cosS + dy;
            _ring.push(new DG.Point(+x.toFixed(2), +y.toFixed(2)));
        }
        return _ring;
    },

    _scale: function (ring, scale) {
        var x, y, _ring = [];

        scale = scale || 1;
        for (var j = 0, len = ring.length; j < len; j++) {
            x = ring[j][0] * scale;
            y = ring[j][1] * scale;
            _ring.push([x, y]);
        }
        return _ring;
    },

    _unScale: function (ring, scale) {
        scale = scale || 1;     //  Also safeguard against zero scale
        return this._scale(ring, 1 / scale);
    },

    _rotate: function (ring, angle) {
        var cos = angle ? angle.cos : this._angle.cos,
            sin = angle ? angle.sin : this._angle.sin,
            x, y, rx, ry,
            _ring = [];

        for (var j = 0, len = ring.length; j < len; j++) {
            rx = ring[j][0];
            ry = ring[j][1];
            x = rx * cos - ry * sin;
            y = rx * sin + ry * cos;
            _ring.push([x, y]);
        }
        return _ring;
    },

    _unRotate: function (ring, angle) {
        var cos = angle ? angle.cos : this._angle.cos,
            sin = angle ? angle.sin : this._angle.sin;
        return this._rotate(ring, {cos: cos, sin: -sin});
    },

    _translate: function (ring, v) {
        var dx = v ? v[0] : 0,
            dy = v ? v[1] : 0,
            x, y, _ring = [];

        for (var j = 0, len = ring.length; j < len; j++) {
            x = ring[j][0] + dx;
            y = ring[j][1] + dy;
            _ring.push([x, y]);
        }
        return _ring;
    },

    _unTranslate: function (ring, v) {
        var dx = v ? v[0] : 0,
            dy = v ? v[1] : 0;
        return this._translate(ring, [-dx, -dy]);
    },

    _getLength: function (x, y) {
        var dx, dy;

        if (typeof x === 'number') {
            //  'x' and 'y' are absolute coordinates of vector
            return Math.sqrt(x * x + y * y);
        } else {
            //  'x' and 'y' are vector objects [x1, y1] and [x2, y2]
            dx = x[0] - y[0];
            dy = x[1] - y[1];
            return Math.sqrt(dx * dx + dy * dy);
        }
    },

    _getAngle: function (x, y, o) {
        var l, sp, x1, y1, x2, y2;

        if (typeof x === 'number') {
            //  'x' and 'y' are absolute coordinates of vector
            l = Math.sqrt(x * x + y * y);
            if (l > 0) {
                return {cos: x / l, sin: y / l};
            } else {
                return {cos: 1, sin: 0};
            }
        } else {
            //  'x' and 'y' are vector objects [x1, y1] and [x2, y2]
            x1 = x[0]; y1 = x[1];
            x2 = y[0]; y2 = y[1];
            if (o) {
                x1 -= o[0]; y1 -= o[1];
                x2 -= o[0]; y2 -= o[1];
            }
            sp = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2);
            return {
                cos: (x1 * x2 + y1 * y2) / sp,
                sin: (x1 * y2 - x2 * y1) / sp
            };
        }
    }

/*
    unTransform: function (map, ring, scale) {
        //  TODO:   Implement if needed
        return ring;
    }
*/
};

DG.ShapeTransform = function (vectors) {
    DG.VectorTransform.call(this, vectors);
    this._map = null;
    this._shape = null;
    this._angles = null;
};

DG.ShapeTransform.prototype = DG.Util.create(DG.VectorTransform.prototype);
DG.extend(DG.ShapeTransform.prototype, {
    prepare: function (map, shape) {
        var ov = this._getLastVector(map);

        this._map = map;
        this._shape = shape;
        this._angle = this._getAngle(ov.x, ov.y);
        this._angles = this._getAngles();
        return this;
    },

    transform: function (scale) {
        var to = this._map.project(this._vectors[this._vTo]),
            po = this._map.getPixelOrigin(),
            dx = to.x - po.x,
            dy = to.y - po.y,
            ring = this._shape.points[this._map.getZoom()],
            x, y, _ring = [];

        if (ring) {
            scale = scale || 1;
            for (var j = 0, len = ring.length; j < len; j++) {
                x = ring[j][0] * scale + dx;
                y = ring[j][1] * scale + dy;
                _ring.push(new DG.Point(+x.toFixed(2), +y.toFixed(2)));
            }
        }
        return _ring;
    },

    getAngles: function () {
        return this._angles;
    },

    _getAngles: function () {
        var i, len, absSin, cos, sin, angle, angles = [],
            path = this.getTranslatedPath(),
            fullAngle = {cos: 1, sin: 0};

        for (i = 1, len = path.length - 1; i < len; i++) {
            angle = this._getAngle(path[i - 1], path[i + 1], path[i]);

            absSin = Math.abs(angle.sin);
            if (absSin < 0.000001) {
                //  Exclude angle from vectors array
                this._excludeVector(i);
            } else {
                //  This is half ∢α cotangent, sign describes angle direction and used to shortcut stroke calculations
                //  '1' - right angle is inner angle, '-1' - left angle is inner angle (if seen from [0, 0] to [-1, 0])
                angle.cot = (1 + angle.cos) / absSin * (angle.sin < 0 ? 1 : -1);
                angles.push(angle);

                cos = fullAngle.cos * angle.cos - fullAngle.sin * angle.sin;
                sin = fullAngle.sin * angle.cos + fullAngle.cos * angle.sin;

                fullAngle = {cos: cos, sin: sin};
            }
        }

        //  Used in final stroke points translation
        //angles.fullAngle = fullAngle;
        angles.fullAngle =  {cos: fullAngle.cos, sin: -fullAngle.sin};
        return angles;
    },

    getTranslatedPath: function (zoom) {
        var map = this._map,
            vectors = this._vectors,
            i = vectors.length - 1,
            dx, dy, v, path = [];

        zoom = zoom || map.getMaxZoom();
        v = map.project(vectors[i], zoom);
        dx = v.x; dy = v.y;
        path.push([0, 0]);

        while (i--) {
            v = map.project(vectors[i], zoom);
            path.push([v.x - dx, v.y - dy]);
        }

        return this._unRotate(path);
    },

    getEmptyPoints: function (num) {
        var result = [];

        num = num || this._vectors.length;
        while (num--) {
            result.push([0, 0], [0, 0]);
        }
        return result;
    },

    _excludeVector: function (index) {
        index = this._vectors.length - index - 1;
        this._vectors.splice(index, 1);
    },

    _getLastVector: function (map) {
        return map.project(this._vectors[this._vTo])
            .subtract(map.project(this._vectors[this._vFr]));
    }
});

DG.ShapeTransform.transform = function (ring, angle, vector) {
    var cos = angle.cos, sin = angle.sin,
        dx = vector[0], dy = vector[1],
        x, y, rx, ry, _ring = [];

    for (var j = 0, len = ring.length; j < len; j++) {
        rx = ring[j][0] - dx;
        ry = ring[j][1] - dy;
        x = rx * cos - ry * sin;
        y = rx * sin + ry * cos;
        _ring.push([x, y]);
    }
    return _ring;
};
