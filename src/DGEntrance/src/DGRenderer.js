/*
 * Actual painting methods that can draw complex objects with curves
 *
 * Point coordinates must be provided in layer._vertices object
 * And types of line must be provided in layer._drawings object
 */

DG.extend(L.Canvas.prototype, {
    _updateComplexPath: function (layer, closed) {
        var i, j, k, d, x, y, _x, _y, points;
        var drawings = layer._drawings;
        var vertices = layer._vertices;
        var ctx = this._ctx;

        this._drawnLayers[layer._leaflet_id] = layer;

        //  TODO: Do we need to do a 'beginPath()' and possible 'closePath()' per ring?!
        ctx.beginPath();

        for (i = 0; i < vertices.length; i++) {
            points = vertices[i];
            x = y = 0;

            for (j = 0, k = 0; j < points.length; /* j++, k++ */) {
                d = drawings[i][k++];
                _x = points[j].x; _y = points[j++].y;
                switch (d) {
                    case 'M':   ctx.moveTo(x  = _x, y  = _y); break;
                    case 'm':   ctx.moveTo(x += _x, y += _y); break;
                    case 'L':   ctx.lineTo(x  = _x, y  = _y); break;
                    case 'l':   ctx.lineTo(x += _x, y += _y); break;
                    case 'C':
                        ctx.bezierCurveTo(_x, _y,
                            points[j].x, points[j++].y,
                            x = points[j].x, y = points[j++].y);
                        break;
                    case 'c':
                        ctx.bezierCurveTo(x + _x, y + _y,
                            x + points[j].x, y + points[j++].y,
                            x += points[j].x, y += points[j++].y);
                        break;
                    case 'Q':
                        ctx.quadraticCurveTo(_x, _y,
                            x = points[j].x, y = points[j++].y);
                        break;
                    case 'q':
                        ctx.quadraticCurveTo(x + _x, y + _y,
                            x += points[j].x, y += points[j++].y);
                        break;
                }
            }
            if (closed) {
                ctx.closePath();
            }
        }

        this._fillStroke(ctx, layer);
    }
});


DG.extend(L.SVG.prototype, {
    _updateComplexPath: function (layer, closed) {
        this._setPath(layer, L.SVG.complexPointsToPath(layer._vertices, layer._drawings, closed));
    }
});


DG.extend(L.SVG, {
    complexPointsToPath: function (vertices, drawings, closed) {
        var str = '';
        var svg = DG.Browser.svg;
        var i, j, k, n, d, points;

        for (i = 0; i < vertices.length; i++) {
            points = vertices[i];

            //  Speedup hot path by removing if/ternary condition checks but duplicating loops
            if (svg) {
                for (j = 0, k = 0; j < points.length; /* j++, k++ */) {
                    d = drawings[i][k++];
                    switch (d) {
                        case 'C':
                        case 'c':   n = 3; break;
                        case 'Q':
                        case 'q':   n = 2; break;

                        default:    n = 1;  //  'M', 'm', 'L', 'l', ...
                    }
                    str += d;
                    while (n--) {
                        str += points[j].x.toFixed(4) + ',' + points[j++].y.toFixed(4) + ' ';
                    }
                }
            } else {
                for (j = 0, k = 0; j < points.length; /* j++, k++ */) {
                    d = drawings[i][k++];
                    switch (d) {
                        case 'M':   d = 'm'; n = 1; break;
                        case 'm':   d = 't'; n = 1; break;
                        case 'L':   d = 'l'; n = 1; break;
                        case 'l':   d = 'r'; n = 1; break;
                        case 'C':   d = 'c'; n = 3; break;
                        case 'c':   d = 'v'; n = 3; break;
                        case 'Q':
                            //  VML spec has 'qb' command in 'v' attribute string but no 'relativeTo' compliment
                            //  So we'll emulate Cubic Bézier curve by applying Quadratic variant in both cases
                            //  TODO: Both control points will use the same value but this is not true solution
                            str += 'C' +
                                points[j].x.toFixed(4) + ',' + points[j].y.toFixed(4) + ' ' +
                                points[j].x.toFixed(4) + ',' + points[j++].y.toFixed(4) + ' ' +
                                points[j].x.toFixed(4) + ',' + points[j++].y.toFixed(4) + ' ';
                            d = ''; n = 0; break;
                        case 'q':
                            str += 'c' +
                                points[j].x.toFixed(4) + ',' + points[j].y.toFixed(4) + ' ' +
                                points[j].x.toFixed(4) + ',' + points[j++].y.toFixed(4) + ' ' +
                                points[j].x.toFixed(4) + ',' + points[j++].y.toFixed(4) + ' ';
                            d = ''; n = 0; break;

                        default:    n = 1;
                    }
                    str += d;
                    while (n--) {
                        str += points[j].x.toFixed(4) + ',' + points[j++].y.toFixed(4) + ' ';
                    }
                }
            }

            str += closed ? (svg ? 'z' : 'x') : '';
        }

        // SVG complains about empty path strings
        return str || 'm0,0';
    }
});
