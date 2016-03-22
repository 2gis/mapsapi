DG.ArrowPathTransform = function (path) {
    //  'path.offset' is initial points offset (-x / +x) to compensate arrow tip length

    //  Skip super initialization as we need only subset of DG.VertexTransform power
    this._lengths = new DG.Metric.Segments();
    this._vertices = [ [], [] ];    //  eslint-disable-line space-in-brackets
    this._drawings = [ [], [] ];    //  eslint-disable-line space-in-brackets
    //  this._arcs = [ ];   //  initialized in _setPath()

    this._setPath(path);
    this.subPath(1);
};

DG.ArrowPathTransform.prototype = DG.Util.create(DG.VertexTransform.prototype);
DG.extend(DG.ArrowPathTransform.prototype, {
    load: function () {
        return this.subPath(1);
    },

    save: function () {
        return this;    //  NoOp
    },

    _setPath: function (path) {
        var transform = DG.ArrowPathTransform.transform,
            vertices = this._vertices,
            drawings = this._drawings,
            Point = DG.Point, cx = -path.offset,
            arcs = [ [], [], [] ], lengths = [],    //  eslint-disable-line space-in-brackets
            i, len, x, ax, bx, angles, angle,
            width = path.width;

        vertices.push(path.vertices);   //  expect .pop() in final transform
        vertices[0].push(new DG.Point(path.offset, +width));
        vertices[1].push(new DG.Point(path.offset, -width));
        angles = DG.ArrowPathTransform.getAngles(path);

        for (i = 0, len = angles.length; i < len; i++) {
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

        ax = path.vertices[i + 1].x;
        bx = width * 4 / 3; // tan(PI/4) = 1
        vertices[0].push(new Point(ax, +width));
        vertices[1].push(new Point(ax, -width));
        vertices[0].push(new Point(ax - bx, +width));
        vertices[1].push(new Point(ax - bx, -width));
        drawings[0].push('L'); drawings[1].push('L');
        lengths.push(Math.abs(ax) - cx);

        //  Reverse right path
        vertices[1].reverse();
        drawings[1].reverse();
        //  Move vertices into original position (before last translation)
        angle = DG.VertexTransform.getAnglesSum(angles.fullAngle, path.getAngle());
        transform(vertices, angle, vertices.pop()[0]);  //  path.vertices[0]
        //  TODO: check and remove
        // transform(vertices, angles.fullAngle, vertices.pop()[0]);   //  path.vertices[0]
        // transform(vertices, path._angle, {x: 0, y: 0});

        //  We need to reconstruct arc's indexes but too mach variables already touched, reuse some of them
        ax = vertices[0].length;
        bx = vertices[1].length;
        this._arcs = arcs[2].map(function (i) {
            cx = arcs[i].shift();
            if (i > 0) {
                return new DG.ArcBezier(vertices[1].slice(bx - cx - 4, bx - cx));
            } else {
                return new DG.ArcBezier(vertices[0].slice(cx, cx + 4).reverse());
            }
        }).reverse();

        this._lengths.push(lengths.pop());
        lengths.reverse().forEach(function (l, i) {
            this._lengths.push(this._arcs[i].length()).push(l);
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

    _setAD: function (vL, vR) {
        this.angle = DG.VertexTransform.getAngle({x: vL.x - vR.x, y: vL.y - vR.y}, {x: 0, y: 1});
        this.displ = vR.clone();
    },

    subPath: function (pathRatio) {
        pathRatio = pathRatio > 1 ? 1 : pathRatio;

        //  Shortcut border cases (0%-length sub-path and full-path)
        if (pathRatio === 0 || pathRatio === 1) {
            this.vertices = this[pathRatio].vertices.map(function (vertex) { return vertex.clone(); });
            this.drawings = this[pathRatio].drawings;
            this._setAD(this.vertices[0], this.vertices[this.vertices.length - 1]);
            return this;
        }

        var getScaled = DG.VertexTransform.getScaled,
            vertices = this._vertices,
            drawings = this._drawings,
            lengths = this._lengths,
            len = lengths.getLength() * pathRatio,
            seg = lengths.getIndex(len),
            srt = lengths.getSegRatio(len),
            sviL = vertices[0].length - 2, sviR = 1,
            sdiL = drawings[0].length - 1, sdiR = 0,
            vR, vL, arc = 0, aed = 0;

        while (aed++ < seg) {
            if (aed & 1) {
                sviL--; sdiL--;
                sviR++; sdiR++;
            } else {
                if (drawings[0][sdiL] === 'C') {
                    sviL -= 3; sdiL -= 1;
                } else {
                    sviR += 3; sdiR += 1;
                }
                arc++;
            }
        }

        if (seg & 1) {
            //  One path ends with an arc
            arc = this._arcs[arc];
            if (drawings[0][sdiL] === 'C') {
                arc = arc.split1(arc.getTbyL(lengths.getSegLength(len)));
                vL = arc.points[3]; vR = vertices[1][sviR];
                this.vertices = arc.points.slice(1).reverse()
                    .concat(vertices[0].slice(sviL), vertices[1].slice(0, sviR + 1))
                    .map(function (vertex) { return vertex.clone(); });
                this.drawings = ['M'].concat(drawings[0].slice(sdiL), 'C', drawings[1].slice(0, sdiR));
            } else {
                arc = arc.split1(arc.getTbyL(lengths.getSegLength(len)));
                vL = vertices[0][sviL]; vR = arc.points[3];
                this.vertices = vertices[0].slice(sviL)
                    .concat(vertices[1].slice(0, sviR + 1), arc.points.slice(1))
                    .map(function (vertex) { return vertex.clone(); });
                this.drawings = ['M'].concat(drawings[0].slice(sdiL + 1), 'C', drawings[1].slice(0, sdiR + 1));
            }
        } else {
            //  Both paths end with lines
            vL = getScaled(vertices[0][sviL], vertices[0][sviL - 1], srt);
            vR = getScaled(vertices[1][sviR], vertices[1][sviR + 1], srt);
            this.vertices = [vL]
                .concat(vertices[0].slice(sviL), vertices[1].slice(0, sviR + 1), vR)
                .map(function (vertex) { return vertex.clone(); });
            this.drawings = ['M'].concat(drawings[0].slice(sdiL), 'C', drawings[1].slice(0, sdiR + 1));
        }

        this._setAD(vL, vR);
        return this;
    }
});

DG.ArrowPathTransform.getAngles = function (path) {
    var i, len, absSin, det, cos, sin, cot, angle,
        getAngle = DG.VertexTransform.getAngle,
        fullAngle = {cos: 1, sin: 0},
        vertices = path.vertices,
        angles = [];

    for (i = 1, len = vertices.length - 1; i < len; i++) {
        angle = getAngle(vertices[i - 1], vertices[i + 1], vertices[i]);

        absSin = Math.abs(angle.sin);
        if (absSin < 0.000001) {
            //  Exclude 180° angle from vertices array
            vertices.splice(vertices.length - i - 1, 1);
            len--; i--;
        } else {
            //  This is half ∢α cotangent, sign describes angle direction and used to shortcut stroke calculations
            //  '-1' - right angle is inner angle, '1' - left angle is inner angle (if seen from [0, 0] to [-1, 0])
            angle.cot = (1 + angle.cos) / angle.sin;

            //  We need to rotate next segment to [-1, 0] axis, so we need complementary angle actually
            angle.cos = -angle.cos;

            //  Complimentary angle also used to calculate it's quaternary ∢β tangent
            //  ∢β tangent used in approximation of outer arc segment by Bézier curve
            cot = (1 + angle.cos) / angle.sin;
            //sin = (cot < 0 ? -1 : 1) / Math.sqrt(1 + cot * cot);
            //cos = Math.sqrt(1 - sin * sin);
            //angle.tan = sin / (1 + cos);
            det = Math.sqrt(4 * cot * cot + 4) * (cot < 0 ? -1 : 1);
            angle.tan = -0.5 * (cot + cot - det);

            angles.push(angle);

            cos = fullAngle.cos * angle.cos - fullAngle.sin * angle.sin;
            sin = fullAngle.sin * angle.cos + fullAngle.cos * angle.sin;

            fullAngle = {cos: cos, sin: sin};
        }
    }

    //  Used in final stroke points translation
    angles.fullAngle =  {cos: fullAngle.cos, sin: -fullAngle.sin};
    return angles;
};

//  TODO - if length of 'latlngs' array is less than 2 or it is undefined next function produces exception
//  check this condition in outer routines?!
DG.ArrowPathTransform.getTranslatedPath = function (map, latlngs) {
    var i = latlngs.length - 1,
        v = map.project(latlngs[i]),
        dx = v.x, dy = v.y,
        path = new DG.VertexTransform([]);

    path.vertices.push(new DG.Point(0, 0));
    while (i--) {
        v = map.project(latlngs[i]);
        path.vertices.push(new DG.Point(v.x - dx, v.y - dy));
    }
    return path
        .setAngle(DG.VertexTransform.getAngle(-path.vertices[1].x, -path.vertices[1].y))
        .unRotate();
};

DG.ArrowPathTransform.transform = function (rings, angle, vector) {
    var cos = angle.cos, sin = angle.sin,
        dx = vector.x, dy = vector.y,
        ring, x, y, j, i = rings.length;

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
};






DG.ArrowTipTransform = function (path, shape) {
    this.drawings = shape.drawings; //  static mapping
    this._vertices = shape.vertices;

    this._setShape(path, shape);
};

DG.ArrowTipTransform.prototype = DG.Util.create(DG.VertexTransform.prototype);
DG.extend(DG.ArrowTipTransform.prototype, {
    _setShape: function (path, shape) {
        var sp = shape.vertices[0],
            width = Math.abs(sp.y),
            pl = path.vertices[1].x,    //  negative value
            length = sp.x,              //  negative value
            offset = pl - length + width + width;

        path.offset = length + (offset > 0 ? offset : 0);
        path.width = width;

        this._vertices = this.load().unTranslate(sp).vertices;
    },

    subShape: function (transform) {
        this.load().unRotate(transform.angle).translate(transform.displ);
        return this;
    }
});
