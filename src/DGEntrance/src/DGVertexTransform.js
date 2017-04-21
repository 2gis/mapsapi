/*
 * DG.VertexTransform is a classic 2D matrix transformation class
 *
 * Prototype methods can scale/rotate/translate vertices
 *
 * Static methods do the same but return simple array instances with attached
 * .clone() method which can reconstruct full DG.VertexTransform object
 */

DG.VertexTransform = DG.Class.extend({
    initialize: function(vertices) {
        this._vertices = vertices;

        this._scale = null;
        this._angle = null;
        this._trans = null;
        this._matrix = null;

        this.load();
    },

    load: function() {
        this.vertices = this._vertices.map(function(vertex) { return vertex.clone(); });
        this.vertices.clone = DG.VertexTransform.clone;

        return this;
    },

    save: function() {
        this._vertices = this.vertices.map(function(vertex) { return vertex.clone(); });

        return this;
    },

    setScale: function(scale) {
        this._scale = scale;
        return this;
    },

    getScale: function() {
        return this._scale;
    },

    setAngle: function(angle) {
        this._angle = angle;
        return this;
    },

    getAngle: function() {
        return this._angle;
    },

    setTranslation: function(trans) {
        this._trans = trans;
        return this;
    },

    getTranslation: function() {
        return this._trans;
    },

    setMatrix: function(matrix) {
        this._matrix = matrix;
        return this;
    },

    getMatrix: function() {
        return this._matrix;
    },

    scale: function(scale) {
        var v = this.vertices;
        var i = v.length;

        scale = scale || this._scale || 1;
        while (i--) {
            v[i].x *= scale;
            v[i].y *= scale;
        }

        return this;
    },

    unScale: function(scale) {
        scale = scale || this._scale || 1;      //  Also safeguard against zero scale
        return this.scale(1 / scale);
    },

    rotate: function(angle) {
        var cos = angle ? angle.cos : (this._angle ? this._angle.cos : 1);
        var sin = angle ? angle.sin : (this._angle ? this._angle.sin : 0);
        var v = this.vertices;
        var i = v.length;
        var x, y;

        while (i--) {
            x = v[i].x;
            y = v[i].y;
            v[i].x = x * cos - y * sin;
            v[i].y = x * sin + y * cos;
        }

        return this;
    },

    unRotate: function(angle) {
        var cos = angle ? angle.cos : (this._angle ? this._angle.cos : 1);
        var sin = angle ? angle.sin : (this._angle ? this._angle.sin : 0);

        return this.rotate({cos: cos, sin: -sin});
    },

    translate: function(trans) {
        var dx = trans ? trans.x : (this._trans ? this._trans.x : 0);
        var dy = trans ? trans.y : (this._trans ? this._trans.y : 0);
        var v = this.vertices;
        var i = v.length;

        while (i--) {
            v[i].x += dx;
            v[i].y += dy;
        }

        return this;
    },

    unTranslate: function(trans) {
        var dx = trans ? trans.x : (this._trans ? this._trans.x : 0);
        var dy = trans ? trans.y : (this._trans ? this._trans.y : 0);

        return this.translate({x: -dx, y: -dy});
    },

    transform: function(matrix) {
        var a, b, c, d, dx, dy;
        var v = this.vertices;
        var i = v.length;
        var x, y;

        if (matrix) {
            a = matrix[0]; b = matrix[1]; dx = matrix[2];
            c = matrix[3]; d = matrix[4]; dy = matrix[5];
        } else if (this._matrix) {
            a = this._matrix[0]; b = this._matrix[1]; dx = this._matrix[2];
            c = this._matrix[3]; d = this._matrix[4]; dy = this._matrix[5];
        } else {
            a = 1; b = 0; dx = 0;
            c = 0; d = 1; dy = 0;
        }

        while (i--) {
            x = v[i].x;
            y = v[i].y;
            v[i].x = x * a + y * b + dx;
            v[i].y = x * c + y * d + dy;
        }

        return this;
    },

    statics: {
        scale: function(vt, scale) {
            var v = vt.vertices;
            var result = [];
            var x, y;

            scale = scale || 1;
            for (var i = 0; i < v.length; i++) {
                x = v[i].x * scale;
                y = v[i].y * scale;
                result.push(new DG.Point(x, y));
            }
            result.clone = DG.VertexTransform.clone;

            return result;
        },

        unScale: function(vt, scale) {
            scale = scale || 1;         //  Also safeguard against zero scale
            return DG.VertexTransform.scale(vt, 1 / scale);
        },

        rotate: function(vt, angle) {
            var cos = angle ? angle.cos : 1;
            var sin = angle ? angle.sin : 0;
            var v = vt.vertices;
            var x, y, rx, ry;
            var result = [];

            for (var i = 0; i < v.length; i++) {
                rx = v[i].x;
                ry = v[i].y;
                x = rx * cos - ry * sin;
                y = rx * sin + ry * cos;
                result.push(new DG.Point(x, y));
            }
            result.clone = DG.VertexTransform.clone;

            return result;
        },

        unRotate: function(vt, angle) {
            var cos = angle ? angle.cos : 1;
            var sin = angle ? angle.sin : 0;

            return DG.VertexTransform.rotate(vt, {cos: cos, sin: -sin});
        },

        translate: function(vt, trans) {
            var dx = trans ? trans.x : 0;
            var dy = trans ? trans.y : 0;
            var v = vt.vertices;
            var result = [];
            var x, y;

            for (var i = 0; i < v.length; i++) {
                x = v[i].x + dx;
                y = v[i].y + dy;
                result.push(new DG.Point(x, y));
            }
            result.clone = DG.VertexTransform.clone;

            return result;
        },

        unTranslate: function(vt, trans) {
            var dx = trans ? trans.x : 0;
            var dy = trans ? trans.y : 0;

            return DG.VertexTransform.translate(vt, {x: -dx, y: -dy});
        },

        clone: function() {
            //  'this' is an array
            return new DG.VertexTransform(this).save();
        },

        getLength: function(vec1, vec2) {
            var dx, dy;

            if (typeof vec1 === 'number') {
                //  'vec1' and 'vec2' are absolute coordinates of vector
                return Math.sqrt(vec1 * vec1 + vec2 * vec2);
            } else {
                //  'vec1' and 'vec2' are vector objects
                dx = vec2.x - vec1.x;
                dy = vec2.y - vec1.y;
                return Math.sqrt(dx * dx + dy * dy);
            }
        },

        getScaled: function(vec1, vec2, scale) {
            var dx, dy;

            if (typeof vec1 === 'number') {
                //  'vec1' and 'vec2' are absolute coordinates of vector
                return new DG.Point(vec1 * scale, vec2 * scale);
            } else {
                //  'vec1' and 'vec2' are vector objects
                dx = (vec2.x - vec1.x) * scale;
                dy = (vec2.y - vec1.y) * scale;
                return new DG.Point(vec1.x + dx, vec1.y + dy);
            }
        },

        getAngle: function(vec1, vec2, origin) {
            var l, sp, x1, y1, x2, y2;

            if (typeof vec1 === 'number') {
                //  'vec1' and 'vec2' are absolute coordinates of vector
                l = Math.sqrt(vec1 * vec1 + vec2 * vec2);
                if (l > 0) {
                    return {cos: vec1 / l, sin: vec2 / l};
                } else {
                    return {cos: 1, sin: 0};
                }
            } else {
                //  'vec1' and 'vec2' are vector objects
                x1 = vec1.x; y1 = vec1.y;
                x2 = vec2.x; y2 = vec2.y;
                if (origin) {
                    x1 -= origin.x; y1 -= origin.y;
                    x2 -= origin.x; y2 -= origin.y;
                }
                sp = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2);
                return {
                    cos: (x1 * x2 + y1 * y2) / sp,
                    sin: (x1 * y2 - x2 * y1) / sp
                };
            }
        },

        getAnglesSum: function(angle1, angle2) {
            return {
                cos: angle1.cos * angle2.cos - angle1.sin * angle2.sin,
                sin: angle1.sin * angle2.cos + angle1.cos * angle2.sin
            };
        },

        getAnglesDif: function(angle1, angle2) {
            return {
                cos: angle1.cos * angle2.cos + angle1.sin * angle2.sin,
                sin: angle1.sin * angle2.cos - angle1.cos * angle2.sin
            };
        }
    }
});
