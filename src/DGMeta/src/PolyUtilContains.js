// ray tracing method: http://algolist.ru/maths/geom/belong/poly2d.php

DG.PolyUtil.contains = function (point, geometry) { // (DG.LatLng, Array) -> Boolean
    var edges, i, len,
        parity = 0,
        vertices = [];

    for (i = 0, len = geometry.length; i < len; i++) {
        vertices.push(DG.point(geometry[i]));
    }

    edges = this._getEdges(vertices);
    for (i = 0, len = edges.length; i < len; i++) {
        switch (this._getEdgeType(edges[i], point)) {
            case 'TOUCHING':
                return true;
            case 'CROSSING':
                parity = 1 - parity;
                break;
        }
    }
    return parity ? true : false;
};

// returns array with edge objects
DG.PolyUtil._getEdges = function (vertices) { // (Array) -> Array
    var edges = [];
    var edge;
    var startPoint;
    var endPoint;

    for (var i = 0, len = vertices.length; i < len; i++) {
        startPoint = vertices[i];
        endPoint = (i !== len - 1) ? vertices[i + 1] : vertices[0];
        edge = {
            startPoint: startPoint,
            endPoint: endPoint
        };
        edges.push(edge);
    }

    return edges;
};

// result should be: 'CROSSING', 'INESSENTIAL' or 'TOUCHING'
DG.PolyUtil._getEdgeType = function (edge, point) { // (Object, DG.Point) -> String
    var pointPosition = this._classify(edge, point);
    switch (pointPosition) {
        case 'LEFT':
            return ((edge.startPoint.y < point.y) && (point.y <= edge.endPoint.y)) ? 'CROSSING' : 'INESSENTIAL';
        case 'RIGHT':
            return ((edge.endPoint.y < point.y) && (point.y <= edge.startPoint.y)) ? 'CROSSING' : 'INESSENTIAL';
        case 'BETWEEN':
        case 'ORIGIN':
        case 'DESTINATION':
            return 'TOUCHING';
        default:
            return 'INESSENTIAL';
    }
};

// determines the position of a point relative to the edge
// result should be: 'LEFT', 'RIGHT', 'BEHIND', 'BEYOND', 'ORIGIN', 'DESTINATION', 'BETWEEN'
DG.PolyUtil._classify = function (edge, point) { // (Object, DG.Point) -> String
    var a;
    var b;
    var sa;

    a = {
        x: edge.endPoint.x - edge.startPoint.x,
        y: edge.endPoint.y - edge.startPoint.y
    };
    b = {
        x: point.x - edge.startPoint.x,
        y: point.y - edge.startPoint.y
    };

    sa = a.x * b.y - b.x * a.y;
    if (sa > 0) {
        return 'LEFT';
    }
    if (sa < 0) {
        return 'RIGHT';
    }
    if ((a.x * b.x < 0) || (a.y * b.y < 0)) {
        return 'BEHIND';
    }
    if (this._getLengthSquared(a) < this._getLengthSquared(b)) {
        return 'BEYOND';
    }
    if (DG.PolyUtil._areEquals(edge.startPoint, point)) {
        return 'ORIGIN';
    }
    if (DG.PolyUtil._areEquals(edge.endPoint, point)) {
        return 'DESTINATION';
    }
    return 'BETWEEN';
};

DG.PolyUtil._getLengthSquared = function (point) { // (DG.Point) -> Number
    return Math.pow(point.x, 2) + Math.pow(point.y, 2);
};

DG.PolyUtil._areEquals = function (point1, point2) { // (DG.Point, DG.Point) -> Boolean
    return point1.x === point2.x && point1.y === point2.y;
};
