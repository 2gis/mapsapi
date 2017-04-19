// from https://github.com/Turfjs/turf-inside/blob/master/index.js
DG.PolyUtil.inside = function(point, polygon, pointReduce) {
    pointReduce = pointReduce || DG.PolyUtil._defaultPointReduce;
    var polys = polygon.coordinates;
    var pt = pointReduce(point);

    // normalize to multipolygon
    if (polygon.type === 'Polygon') {
        polys = [polys];
    }

    var insidePoly = false;
    var i = 0;
    while (i < polys.length && !insidePoly) {
        // check if it is in the outer ring first
        if (this._inRing(pt, polys[i][0], pointReduce)) {
            var inHole = false;
            var k = 1;
            // check for the point in any of the holes
            while (k < polys[i].length && !inHole) {
                if (this._inRing(pt, polys[i][k], pointReduce)) {
                    inHole = true;
                }
                k++;
            }
            if (!inHole)  {
                insidePoly = true;
            }
        }
        i++;
    }
    return insidePoly;
};

// pt is [x,y] and ring is [[x,y], [x,y],..]
DG.PolyUtil._inRing = function(pt, ring, pointReduce) {
    var isInside = false;
    for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        var pi = pointReduce(ring[i]);
        var pj = pointReduce(ring[j]);
        var xi = pi[0], yi = pi[1];
        var xj = pj[0], yj = pj[1];
        var intersect = ((yi > pt[1]) !== (yj > pt[1])) &&
            (pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi);

        if (intersect) {
            isInside = !isInside;
        }
    }
    return isInside;
};

DG.PolyUtil._defaultPointReduce = function(point) {
    return point;
};
