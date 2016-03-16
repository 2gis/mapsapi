DG.Bezier = function (coords) {
    this.points = coords;   //  [DG.Point(start), DG.Point(control1), (DG.Point(control2),)? DG.Point(end)]
    this.dpoints = this._getDerivatives();
    this.order = this.points.length - 1;
    this._lut = this._getLUTDefaults();
};

DG.bezier = function (coords) {
    if (typeof coords === 'number' || coords instanceof DG.Point) {
        coords = Array.prototype.slice.call(arguments);
    }

    if (typeof coords[0] === 'number') {
        coords = [
            new DG.Point(coords[0], coords[1]),
            new DG.Point(coords[2], coords[3]),
            new DG.Point(coords[4], coords[5]),
            new DG.Point(coords[6], coords[7])
        ];
    }

    return new DG.Bezier(coords);
};


DG.Bezier.prototype = {
    getPoint: function (t) {
        var p = this.points,
            mt, mt2, t2,
            a, b, c, d;

        if (t === 0) { return p[0]; }
        if (t === 1) { return p[this.order]; }

        mt = 1 - t;
        mt2 = mt * mt;
        t2 = t * t;
        if (this.order > 2) {
            a = mt2 * mt;
            b = mt2 * t * 3;
            c = mt * t2 * 3;
            d = t * t2;
        } else {
            p = [p[0], p[1], p[2], {x: 0, y: 0}];
            a = mt2;
            b = mt * t * 2;
            c = t2;
            d = 0;
        }
        return new DG.Point(
            a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x,
            a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y
        );
    },

    derivative: function (t) {
        var mt = 1 - t,
            a, b, c,
            p = this.dpoints[0];

        if (this.order > 2) {
            a = mt * mt;
            b = mt * t * 2;
            c = t * t;
        } else {
            p = [p[0], p[1], {x: 0, y: 0}];
            a = mt; b = t; c = 0;
        }

        return new DG.Point(
            a * p[0].x + b * p[1].x + c * p[2].x,
            a * p[0].y + b * p[1].y + c * p[2].y
        );
    },

    length: function () {
        var w_i = DG.Bezier.WEIGHT,
            x_i = DG.Bezier.ABSCISSA,
            len = x_i.length,
            z = 0.5,
            sum = 0,
            d, i, l, t;

        for (i = 0; i < len; i++) {
            t = z * x_i[i] + z;
            d = this.derivative(t);
            l = d.x * d.x + d.y * d.y;
            sum += w_i[i] * Math.sqrt(l);
        }

        return z * sum;
    },

    split1: function (z) {
        var p = this.points,
            z2, z3, mz, mz2, mz3,
            b$3, b$4, c$4, curve;

        if (z === 1) { return this; }

        curve = [];
        z2 = z * z;
        mz = z - 1;
        mz2 = mz * mz;

        curve.push(new DG.Point(
            p[0].x,
            p[0].y
        ));

        curve.push(new DG.Point(
            z * p[1].x - mz * p[0].x,
            z * p[1].y - mz * p[0].y
        ));

        b$3 = z * mz * 2;
        curve.push(new DG.Point(
            z2 * p[2].x - b$3 * p[1].x + mz2 * p[0].x,
            z2 * p[2].y - b$3 * p[1].y + mz2 * p[0].y
        ));

        if (this.order > 2) {
            z3 = z2 * z;
            mz3 = mz2 * mz;
            b$4 = z2 * mz * 3;
            c$4 = z * mz2 * 3;
            curve.push(new DG.Point(
                z3 * p[3].x - b$4 * p[2].x + c$4 * p[1].x - mz3 * p[0].x,
                z3 * p[3].y - b$4 * p[2].y + c$4 * p[1].y - mz3 * p[0].y
            ));
        }

        return new DG.Bezier(curve);
    },

    _getDerivatives: function () {
        var p = this.points,
            d, c, j, list,
            result = [];

        for(d = p.length, c = d - 1; d > 1; d--, c--) {
            list = [];
            for (j = 0; j < c; j++) {
                list.push(new DG.Point(
                    c * (p[j + 1].x - p[j].x),
                    c * (p[j + 1].y - p[j].y)
                ));
            }
            result.push(list);
            p = list;
        }

        return result;
    },

    getLUT: function (steps) {
        steps = steps || 125;
        if (this._lut.length !== steps + 1) {
            if (this.order > 2) {
                this._setLUT3(steps);
            } else {
                this._setLUT2(steps);
            }
        }
        return this._lut;
    },

    _setLUT2: function (steps) {

    },
    _setLUT3: function (steps) {
        var lut = this._getLUTDefaults(),
            s, t, p = this.points,
            mt, mt2, t2,
            a, b, c, d;

        lut.push({ x: p[0].x, y: p[0].y, l: 0 });
        for (s = 1; s < steps; s++) {
            t = s / steps;
            mt = 1 - t;
            mt2 = mt * mt;
            t2 = t * t;
            a = mt2 * mt;
            b = mt2 * t * 3;
            c = mt * t2 * 3;
            d = t * t2;
            lut.push({
                x: a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x,
                y: a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y
            });
        }
        lut.push({ x: p[3].x, y: p[3].y, l: 0 });
    },
/*
    _setLOD: function () {
        var lut = this._lut,
            sc = this._shortcuts,
            i, len, dx, dy;

        for (i = 1, len = lut.length; i < len; i++) {
            dx = lut[i].x - lut[i - 1].x;
            dy = lut[i].y - lut[i - 1].y;
            lut[i].l = lut[i - 1].l + Math.sqrt(dx * dx + dy * dy);
            if (dx !== 0) {
                sc.xReversed = sc.xReversed != undefined ? sc.xReversed : dx < 0;
                sc.xOrdered = sc.xOrdered && (sc.xReversed ? dx < 0 : dx > 0);
            }
            if (dy !== 0) {
                sc.yReversed = sc.yReversed != undefined ? sc.yReversed : dy < 0;
                sc.yOrdered = sc.yOrdered && (sc.yReversed ? dy < 0 : dy > 0);
            }
        }
    },
*/
    _getLUTDefaults: function () {
        this._shortcuts = {
            xOrdered: false,
            yOrdered: false,
            xReversed: undefined,
            yReversed: undefined
        };
        return this._lut = [];
    }
};

DG.Bezier.WEIGHT = [
    0.3626837833783620,
    0.3626837833783620,
    0.3137066458778873,
    0.3137066458778873,
    0.2223810344533745,
    0.2223810344533745,
    0.1012285362903763,
    0.1012285362903763
];
DG.Bezier.ABSCISSA = [
   -0.1834346424956498,
    0.1834346424956498,
   -0.5255324099163290,
    0.5255324099163290,
   -0.7966664774136267,
    0.7966664774136267,
   -0.9602898564975363,
    0.9602898564975363
];


//  This curve is monotonically ordered by 'X' coordinate and has P[0] = {0, 0} and P[3] = {1, 1}
//  We can utilize this facts to shortcut calculations
DG.TimeBezier = function (controlPoint1, controlPoint2) {
    DG.Bezier.call(this, [DG.TimeBezier.START, controlPoint1, controlPoint2, DG.TimeBezier.END]);
};

DG.TimeBezier.prototype = DG.Util.create(DG.Bezier.prototype);
DG.extend(DG.TimeBezier.prototype, {
    getYbyX: function (x, steps) {
        var lut = this.getLUT(steps),
            min = 0, max = lut.length - 1, mid;
        if (x <= 0) return 0;
        if (x >= 1) return 1;
        //  'X' is monotonically increasing so we can do a simple binary search (LUT)
        //  and then fine-tune the result by linear interpolation assuming 'Y' is not changed so radically
        while (true) {
            mid = min + (max - min >> 1);
            if (x < lut[mid].x) {
                max = mid;
            } else {
                min = mid;
            }
            if (max - min < 2) break;
        }
        x = (x - lut[min].x) / (lut[max].x - lut[min].x);
        return (lut[min].y + (lut[max].y - lut[min].y) * x);
    },

    getLUT: function (steps) {
        var p = this.points,
            mt, t2, b, c, d,
            s, t, lut;

        steps = steps || 240;
        if (this._lut.length === steps + 1) {
            return this._lut;
        } else {
            this._lut = lut = [];
        }

        lut.push({ x: 0, y: 0 });
        for (s = 1; s < steps; s++) {
            t = s / steps;
            mt = 1 - t;
            t2 = t * t;
            //  We don't need 'a' coefficient because p[0] is {0, 0}
            b = mt * mt * t * 3;
            c = mt * t2 * 3;
            d = t * t2;
            lut.push({
                x: b * p[1].x + c * p[2].x + d,
                y: b * p[1].y + c * p[2].y + d
            });
        }
        lut.push({ x: 1, y: 1 });

        return lut;
    }
});

DG.TimeBezier.START = new DG.Point(0, 0);
DG.TimeBezier.END = new DG.Point(1, 1);



//  This is cubic Bezier describing circular arc
DG.ArcBezier = function (coords) {
    DG.Bezier.call(this, coords);
    this.getLUT();
    this.getLengths();
};

DG.ArcBezier.prototype = DG.Util.create(DG.Bezier.prototype);
DG.extend(DG.ArcBezier.prototype, {
    getTbyL: function (l) {
        var lut = this.getLUT(), x, y,
            min = 0, max = lut.length - 1, mid;

        if (l <= 0) return 0;
        if (l >= lut[max].l) return 1;
        //  'L' is monotonically increasing so we can do a binary search (LUT)
        while (true) {
            mid = min + (max - min >> 1);
            if (l < lut[mid].l) {
                max = mid;
            } else {
                min = mid;
            }
            if (max - min < 2) break;
        }
        l = (l - lut[min].l) / (lut[max].l - lut[min].l);

        x = (lut[min].x + (lut[max].x - lut[min].x) * l);
        y = (lut[min].y + (lut[max].y - lut[min].y) * l);

        //  BUT this is a part of story, we need a projection of this point to the actual curve and it's reverse 't' val
        var p, dx, dy, t,
            et = max / lut.length,
            dt = min / lut.length,
            s = 1 / lut.length / 10,    //  TODO
            d = Math.pow(2, 53) - 1;

        for (t = dt; dt < et; dt += s) {
            p = this.getPoint(dt);
            dx = p.x - x; dy = p.y - y;
            l = Math.sqrt(dx * dx + dy * dy);
            if (l < d) {
                d = l;
                t = dt;
            }
        }
        return t;
    },

    getLengths: function () {
        var lut = this._lut,
            i, len, dx, dy;

        lut[0].l = 0;
        for (i = 1, len = lut.length; i < len; i++) {
            dx = lut[i].x - lut[i - 1].x;
            dy = lut[i].y - lut[i - 1].y;
            lut[i].l = lut[i - 1].l + Math.sqrt(dx * dx + dy * dy);
        }
    },

    length: function () {
        return this._lut[this._lut.length - 1].l;
    }
});
