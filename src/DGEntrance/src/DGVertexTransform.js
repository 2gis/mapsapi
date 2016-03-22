DG.VertexTransform = function (vertices) {
    this._vertices = vertices;

    this._scale = null;
    this._angle = null;
    this._trans = null;
    this._matrix = null;

    this.load();
};

DG.VertexTransform.prototype = {
    load: function () {
        this.vertices = this._vertices.map(function (vertex) { return vertex.clone(); });
        this.vertices.clone = DG.VertexTransform.clone;
        return this;
    },

    save: function () {
        this._vertices = this.vertices.map(function (vertex) { return vertex.clone(); });
        return this;
    },

    setScale: function (scale) {
        this._scale = scale;
        return this;
    },

    getScale: function () {
        return this._scale;
    },

    setAngle: function (angle) {
        this._angle = angle;
        return this;
    },

    getAngle: function () {
        return this._angle;
    },

    setTrans: function (trans) {
        this._trans = trans;
        return this;
    },

    getTrans: function () {
        return this._trans;
    },

    setMatrix: function (matrix) {
        this._matrix = matrix;
        return this;
    },

    getMatrix: function () {
        return this._matrix;
    },

    scale: function (scale) {
        var v = this.vertices,
            i = v.length;

        scale = scale || this._scale || 1;
        while (i--) {
            v[i].x *= scale;
            v[i].y *= scale;
        }
        return this;
    },

    unScale: function (scale) {
        scale = scale || this._scale || 1;      //  Also safeguard against zero scale
        return this.scale(1 / scale);
    },

    rotate: function (angle) {
        var cos = angle ? angle.cos : this._angle ? this._angle.cos : 1,
            sin = angle ? angle.sin : this._angle ? this._angle.sin : 0,
            v = this.vertices,
            i = v.length, x, y;

        while (i--) {
            x = v[i].x;
            y = v[i].y;
            v[i].x = x * cos - y * sin;
            v[i].y = x * sin + y * cos;
        }
        return this;
    },

    unRotate: function (angle) {
        var cos = angle ? angle.cos : this._angle ? this._angle.cos : 1,
            sin = angle ? angle.sin : this._angle ? this._angle.sin : 0;
        return this.rotate({cos: cos, sin: -sin});
    },

    translate: function (trans) {
        var dx = trans ? trans.x : this._trans ? this._trans.x : 0,
            dy = trans ? trans.y : this._trans ? this._trans.y : 0,
            v = this.vertices,
            i = v.length;

        while (i--) {
            v[i].x += dx;
            v[i].y += dy;
        }
        return this;
    },

    unTranslate: function (trans) {
        var dx = trans ? trans.x : this._trans ? this._trans.x : 0,
            dy = trans ? trans.y : this._trans ? this._trans.y : 0;
        return this.translate({x: -dx, y: -dy});
    },

    transform: function (matrix) {
        var a = matrix ? matrix[0] : this._matrix ? this._matrix[0] : 1,
            b = matrix ? matrix[1] : this._matrix ? this._matrix[1] : 0,
            d = matrix ? matrix[4] : this._matrix ? this._matrix[4] : 1,
            c = matrix ? matrix[3] : this._matrix ? this._matrix[3] : 0,
            dx =  matrix ? matrix[2] : this._matrix ? this._matrix[2] : 0,
            dy =  matrix ? matrix[5] : this._matrix ? this._matrix[5] : 0,
            v = this.vertices,
            i = v.length, x, y;

        while (i--) {
            x = v[i].x;
            y = v[i].y;
            v[i].x = x * a - y * b + dx;
            v[i].y = x * c + y * d + dy;
        }
        return this;
    }
};


DG.VertexTransform.scale = function (vt, scale) {
    var x, y, result = [],
        v = vt.vertices;

    scale = scale || 1;
    for (var i = 0, len = v.length; i < len; i++) {
        x = v[i].x * scale;
        y = v[i].y * scale;
        result.push(new DG.Point(x, y));
    }
    result.clone = DG.VertexTransform.clone;
    return result;
};

DG.VertexTransform.unScale = function (vt, scale) {
    scale = scale || 1;         //  Also safeguard against zero scale
    return DG.VertexTransform.scale(vt, 1 / scale);
};

DG.VertexTransform.rotate = function (vt, angle) {
    var cos = angle ? angle.cos : 1,
        sin = angle ? angle.sin : 0,
        x, y, rx, ry, result = [],
        v = vt.vertices;

    for (var i = 0, len = v.length; i < len; i++) {
        rx = v[i].x;
        ry = v[i].y;
        x = rx * cos - ry * sin;
        y = rx * sin + ry * cos;
        result.push(new DG.Point(x, y));
    }
    result.clone = DG.VertexTransform.clone;
    return result;
};

DG.VertexTransform.unRotate = function (vt, angle) {
    var cos = angle ? angle.cos : 1,
        sin = angle ? angle.sin : 0;
    return DG.VertexTransform.rotate(vt, {cos: cos, sin: -sin});
};

DG.VertexTransform.translate = function (vt, trans) {
    var dx = trans ? trans.x : 0,
        dy = trans ? trans.y : 0,
        x, y, result = [],
        v = vt.vertices;

    for (var i = 0, len = v.length; i < len; i++) {
        x = v[i].x + dx;
        y = v[i].y + dy;
        result.push(new DG.Point(x, y));
    }
    result.clone = DG.VertexTransform.clone;
    return result;
};

DG.VertexTransform.unTranslate = function (vt, trans) {
    var dx = trans ? trans.x : 0,
        dy = trans ? trans.y : 0;
    return DG.VertexTransform.translate(vt, {x: -dx, y: -dy});
};

DG.VertexTransform.clone = function () {
    //  'this' is an array
    return new DG.VertexTransform(this).save();
};

DG.VertexTransform.getLength = function (x, y) {
    var dx, dy;

    if (typeof x === 'number') {
        //  'x' and 'y' are absolute coordinates of vector
        return Math.sqrt(x * x + y * y);
    } else {
        //  'x' and 'y' are vector objects
        dx = y.x - x.x;
        dy = y.y - x.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
};

DG.VertexTransform.getScaled = function (x, y, s) {
    var dx, dy;

    if (typeof x === 'number') {
        //  'x' and 'y' are absolute coordinates of vector
        return new DG.Point(x * s, y * s);
    } else {
        //  'x' and 'y' are vector objects
        dx = (y.x - x.x) * s;
        dy = (y.y - x.y) * s;
        return new DG.Point(x.x + dx, x.y + dy);
    }
};

DG.VertexTransform.getAngle = function (x, y, o) {
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
        //  'x' and 'y' are vector objects
        x1 = x.x; y1 = x.y;
        x2 = y.x; y2 = y.y;
        if (o) {
            x1 -= o.x; y1 -= o.y;
            x2 -= o.x; y2 -= o.y;
        }
        sp = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2);
        return {
            cos: (x1 * x2 + y1 * y2) / sp,
            sin: (x1 * y2 - x2 * y1) / sp
        };
    }
};

DG.VertexTransform.getAnglesSum = function (a, b) {
    return {
        cos: a.cos * b.cos - a.sin * b.sin,
        sin: a.sin * b.cos + a.cos * b.sin
    };
};

DG.VertexTransform.getAnglesDif = function (a, b) {
    return {
        cos: a.cos * b.cos + a.sin * b.sin,
        sin: a.sin * b.cos - a.cos * b.sin
    };
};
