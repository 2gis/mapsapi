/*
 * DG.ArrowPathTransform class is a core of arrow's body calculations
 *
 * General ideas are:
 *      We construct arrow body with stroke points making arcs on outer path turns
 *      Processing is done segment by segment around {0, 0} virtual point
 *          and resulting 'path' finally rotated to it's original map's angle (.fullAngle)
 *      Subset of this vertices lately used in .subPath() calculations which can be used
 *          in animations for ex.
 *
 *  Final translation (see DG.Entrance.Arrow) moves arrow objects to their original positions
 */

DG.ArrowPathTransform = DG.VertexTransform.extend({
    initialize: function(path) {
        //  'path.offset' is initial points offset (-x / +x) to compensate arrow tip length

        //  Skip super initialization as we need only subset of DG.VertexTransform power
        this._lengths = new DG.Metric.Segments();
        this._vertices = [[], []];
        this._drawings = [[], []];
        //  this._arcs = [];    //  initialized in _setPath()

        this._setPath(path);
        this.subPath(1);
    },

    load: function() {
        return this.subPath(1);
    },

    save: function() {
        return this;    //  NoOp
    },

    //  Method constructs new path points with some displacement from original 'path'
    //  Outer corners will be smoothed by arcs (cubic Bézier curves)
    _setPath: function(path) {
        var transform = DG.ArrowPathTransform.transform;
        var vertices = this._vertices;
        var drawings = this._drawings;
        var Point = DG.Point;
        var width = path.width;
        var arcs = [[], [], []];
        var lengths = [];

        var i, x,
            ax, bx, cx,
            angles, angle;

        vertices.push(path.vertices);   //  expect .pop() in final transform
        vertices[0].push(new DG.Point(path.offset, +width));
        vertices[1].push(new DG.Point(path.offset, -width));
        angles = DG.ArrowPathTransform.getAngles(path);

        cx = -path.offset;
        for (i = 0; i < angles.length; i++) {
            x = path.vertices[i + 1].x;
            ax = width * angles[i].cot;

            //  http://pomax.github.io/bezierinfo/#circles_cubic
            //  actual equation is (4/3 * tan(α/4) * radius)
            bx = angles[i].tan * width * 8 / 3;

            //  Next code can be combined by -/+ inversion but for simplicity it is left as is
            if (ax > 0) {
                vertices[0].push(new Point(x + ax,      +width));
                drawings[0].push('L');

                arcs[2].push(1);
                arcs[1].push(vertices[1].length);
                vertices[1].push(new Point(x + ax,      -width));
                vertices[1].push(new Point(x + ax - bx, -width));

                transform(vertices, angles[i], {x: x, y: 0});

                vertices[1].push(new Point(0 - ax + bx, -width));
                vertices[1].push(new Point(0 - ax,      -width));
                drawings[1].push('L', 'C');

                lengths.push(Math.abs(x + ax) - cx); cx = +ax;
            } else {
                vertices[1].push(new Point(x - ax,      -width));
                drawings[1].push('L');

                arcs[2].push(0);
                arcs[0].push(vertices[0].length);
                vertices[0].push(new Point(x - ax,      +width));
                vertices[0].push(new Point(x - ax + bx, +width));

                transform(vertices, angles[i], {x: x, y: 0});

                vertices[0].push(new Point(0 + ax - bx, +width));
                vertices[0].push(new Point(0 + ax,      +width));
                drawings[0].push('L', 'C');

                lengths.push(Math.abs(x - ax) - cx); cx = -ax;
            }
        }

        //  Final segments and tail arc
        ax = path.vertices[i + 1].x;
        bx = width * 4 / 3; // tan(PI/4) = 1

        vertices[0].push(new Point(ax, +width));
        vertices[1].push(new Point(ax, -width));

        vertices[0].push(new Point(ax - bx, +width));
        vertices[1].push(new Point(ax - bx, -width));

        drawings[0].push('L');
        drawings[1].push('L');

        lengths.push(Math.abs(ax) - cx);

        //  Reverse right path
        vertices[1].reverse();
        drawings[1].reverse();

        //  Move vertices into original position (before last translation)
        angle = DG.VertexTransform.getAnglesSum(angles.fullAngle, path.getAngle());
        transform(vertices, angle, vertices.pop()[0]);  //  path.vertices[0]

        //  We need to reconstruct arc's indexes but too many variables already touched, reuse some of them
        ax = vertices[0].length;
        bx = vertices[1].length;
        this._arcs = arcs[2].map(function(i) {
            cx = arcs[i].shift();
            if (i > 0) {
                return new DG.ArcBezier(vertices[1].slice(bx - cx - 4, bx - cx));
            } else {
                return new DG.ArcBezier(vertices[0].slice(cx, cx + 4).reverse());
            }
        }).reverse();

        this._lengths.push(lengths.pop());
        lengths.reverse().forEach(function(l, i) {
            this._lengths.push(this._arcs[i].getLength()).push(l);
        }, this);

        //  Shortcut border cases (0%-length sub-path and full-path)
        this[0] = {
            vertices: [vertices[0][ax - 2], vertices[0][ax - 1], vertices[1][0], vertices[1][1]],
            drawings: ['M', 'C']
        };
        this[1] = {
            vertices: vertices[0].concat(vertices[1]),
            drawings: ['M'].concat(drawings[0], 'C', drawings[1])
        };
    },

    _setAngleAndDisplacement: function(vL, vR) { // Used in DG.ArrowTipTransform.subShape()
        this.angle = DG.VertexTransform.getAngle({x: vL.x - vR.x, y: vL.y - vR.y}, {x: 0, y: 1});
        this.displ = vR.clone();
    },

    subPath: function(pathRatio) {
        pathRatio = pathRatio > 1 ? 1 : pathRatio;

        //  Shortcut border cases (0%-length sub-path and full-path)
        if (pathRatio === 0 || pathRatio === 1) {
            this.vertices = this[pathRatio].vertices.map(function(vertex) { return vertex.clone(); });
            this.drawings = this[pathRatio].drawings;
            this._setAngleAndDisplacement(this.vertices[0], this.vertices[this.vertices.length - 1]);
            return this;
        }

        var getScaled = DG.VertexTransform.getScaled;
        var vertices = this._vertices;
        var drawings = this._drawings;
        var lengths = this._lengths;
        var len = lengths.getLength() * pathRatio;
        var segIndex = lengths.getIndex(len);
        var segRatio = lengths.getSegRatio(len);
        var vertexIndexLeft = vertices[0].length - 2;
        var vertexIndexRight = 1;
        var drawingIndexLeft = drawings[0].length - 1;
        var drawingIndexRight = 0;
        var vertexLeft, vertexRight;
        var arc = 0, aed = 0;

        while (aed++ < segIndex) {
            if (aed % 2 == 1) {
                vertexIndexLeft--;
                drawingIndexLeft--;
                vertexIndexRight++;
                drawingIndexRight++;
            } else {
                if (drawings[0][drawingIndexLeft] === 'C') {
                    vertexIndexLeft -= 3;
                    drawingIndexLeft -= 1;
                } else {
                    vertexIndexRight += 3;
                    drawingIndexRight += 1;
                }
                arc++;
            }
        }

        if (segIndex % 2 == 1) {
            //  One path ends with an arc
            arc = this._arcs[arc];
            if (drawings[0][drawingIndexLeft] === 'C') {
                arc = arc.getCurveBefore(arc.getTbyL(lengths.getSegLength(len)));
                vertexLeft = arc.points[3];
                vertexRight = vertices[1][vertexIndexRight];
                this.vertices = arc.points.slice(1).reverse()
                    .concat(vertices[0].slice(vertexIndexLeft), vertices[1].slice(0, vertexIndexRight + 1))
                    .map(function(vertex) { return vertex.clone(); });
                this.drawings = ['M'].concat(drawings[0].slice(drawingIndexLeft), 'C', drawings[1].slice(0, drawingIndexRight));
            } else {
                arc = arc.getCurveBefore(arc.getTbyL(lengths.getSegLength(len)));
                vertexLeft = vertices[0][vertexIndexLeft];
                vertexRight = arc.points[3];
                this.vertices = vertices[0].slice(vertexIndexLeft)
                    .concat(vertices[1].slice(0, vertexIndexRight + 1), arc.points.slice(1))
                    .map(function(vertex) { return vertex.clone(); });
                this.drawings = ['M'].concat(drawings[0].slice(drawingIndexLeft + 1), 'C', drawings[1].slice(0, drawingIndexRight + 1));
            }
        } else {
            //  Both paths end with lines
            vertexLeft = getScaled(vertices[0][vertexIndexLeft], vertices[0][vertexIndexLeft - 1], segRatio);
            vertexRight = getScaled(vertices[1][vertexIndexRight], vertices[1][vertexIndexRight + 1], segRatio);
            this.vertices = [vertexLeft]
                .concat(vertices[0].slice(vertexIndexLeft), vertices[1].slice(0, vertexIndexRight + 1), vertexRight)
                .map(function(vertex) { return vertex.clone(); });
            this.drawings = ['M'].concat(drawings[0].slice(drawingIndexLeft), 'C', drawings[1].slice(0, drawingIndexRight + 1));
        }

        this._setAngleAndDisplacement(vertexLeft, vertexRight);
        return this;
    },

    statics: {
        getAngles: function(path) {
            var getAngle = DG.VertexTransform.getAngle;
            var fullAngle = {cos: 1, sin: 0};
            var vertices = path.vertices;
            var angles = [];

            var absSin, angle,
                cos, sin, cot, temp, sign;

            for (var i = 1, len = vertices.length - 1; i < len; i++) {
                angle = getAngle(vertices[i - 1], vertices[i + 1], vertices[i]);

                absSin = Math.abs(angle.sin);
                if (absSin < 0.000001) {
                    //  Exclude 180° angle from vertices array
                    vertices.splice(vertices.length - i - 1, 1);
                    len--;
                    i--;
                } else {
                    //  This is half ∢α cotangent, sign describes angle direction and used to shortcut stroke calculations
                    //  '-1' - right angle is inner angle, '1' - left angle is inner angle (if seen from [0, 0] to [-1, 0])
                    angle.cot = (1 + angle.cos) / angle.sin;

                    //  We need to rotate next segment to [-1, 0] axis, so we need complementary angle actually
                    angle.cos = -angle.cos;

                    //  Complimentary angle also used to calculate it's quaternary ∢β tangent
                    //  ∢β tangent used in approximation of outer arc segment by Bézier curve
                    cot = (1 + angle.cos) / angle.sin;
                    sign = cot < 0 ? -1 : 1;
                    temp = sign * Math.sqrt(4 * cot * cot + 4);
                    angle.tan = -0.5 * (cot + cot - temp);

                    angles.push(angle);

                    cos = fullAngle.cos * angle.cos - fullAngle.sin * angle.sin;
                    sin = fullAngle.sin * angle.cos + fullAngle.cos * angle.sin;

                    fullAngle = {cos: cos, sin: sin};
                }
            }

            //  Used in final stroke points translation
            angles.fullAngle =  {cos: fullAngle.cos, sin: -fullAngle.sin};
            return angles;
        },

        //  TODO - if length of 'latlngs' array is less than 2 or it is undefined next function produces exception
        //  check this condition in outer routines?!
        getTranslatedPath: function(map, latlngs) {
            var path = new DG.VertexTransform([]);
            var i = latlngs.length - 1;
            var v = map.project(latlngs[i]);
            var dx = v.x, dy = v.y;

            path.vertices.push(new DG.Point(0, 0));
            while (i--) {
                v = map.project(latlngs[i]);
                path.vertices.push(new DG.Point(v.x - dx, v.y - dy));
            }
            return path
                .setAngle(DG.VertexTransform.getAngle(-path.vertices[1].x, -path.vertices[1].y))
                .unRotate();
        },

        transform: function(rings, angle, vector) {
            var i = rings.length;
            var cos = angle.cos;
            var sin = angle.sin;
            var dx = vector.x;
            var dy = vector.y;
            var ring, x, y, j;

            while (i--) {
                ring = rings[i];
                j = ring.length;
                while (j--) {
                    x = ring[j].x - dx;
                    y = ring[j].y - dy;
                    ring[j].x = x * cos - y * sin;
                    ring[j].y = x * sin + y * cos;
                }
            }
        }
    }
});
