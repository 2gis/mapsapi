/* jshint ignore:start */
DG.Wkt = {};

DG.Wkt.toGeoJSON = function (_) {
    if (DG.Util.isArray(_)) {
        _ = _[0];
    }
    var parts = _.split(';');
    _ = parts.pop();

    var i = 0,
        srid = (parts.shift() || '').split('=').pop();

    function $(re) {
        var match = _.substring(i).match(re);
        if (!match) {
            return null;
        }
        else {
            i += match[0].length;
            return match[0];
        }
    }

    function crs(obj) {
        if (obj && srid.match(/\d+/)) {
            obj.crs = {
                type: 'name',
                'properties': {
                    name: 'urn:ogc:def:crs:EPSG::' + srid
                }
            };
        }

        return obj;
    }

    function white() { $(/^\s*/); }

    function multicoords() {
        white();
        var depth = 0, rings = [], stack = [rings],
            pointer = rings, elem;
        while (elem =
            $(/^(\()/) ||
            $(/^(\))/) ||
            $(/^(\,)/) ||
            $(/^[-+]?([0-9]*\.[0-9]+|[0-9]+)/)) {
            if (elem === '(') {
                stack.push(pointer);
                pointer = [];
                stack[stack.length - 1].push(pointer);
                depth++;
            } else if (elem === ')') {
                pointer = stack.pop();
                depth--;
                if (depth === 0) {
                    break;
                }
            } else if (elem === ',') {
                pointer = [];
                stack[stack.length - 1].push(pointer);
            } else {
                pointer.push(parseFloat(elem));
            }
            white();
        }
        stack.length = 0;
        if (depth !== 0) {
            return null;
        }
        return rings;
    }

    function coords() {
        var list = [], item, pt;
        while (pt =
            $(/^[-+]?([0-9]*\.[0-9]+|[0-9]+)/) ||
            $(/^(\,)/)) {
            if (pt === ',') {
                list.push(item);
                item = [];
            } else {
                if (!item) {
                    item = [];
                }
                item.push(parseFloat(pt));
            }
            white();
        }
        if (item) {
            list.push(item);
        }
        return list.length ? list : null;
    }

    function point() {
        if (!$(/^(point)/i)) { return null; }
        white();
        if (!$(/^(\()/)) { return null; }
        var c = coords();
        white();
        if (!$(/^(\))/)) { return null; }
        return {
            type: 'Point',
            coordinates: c[0]
        };
    }

    function multipoint() {
        if (!$(/^(multipoint)/i)) { return null; }
        white();
        var c = multicoords();
        white();
        return {
            type: 'MultiPoint',
            coordinates: c
        };
    }

    function multilinestring() {
        if (!$(/^(multilinestring)/i)) { return null; }
        white();
        var c = multicoords();
        white();
        return {
            type: 'MultiLineString',
            coordinates: c
        };
    }

    function linestring() {
        if (!$(/^(linestring)/i)) { return null; }
        white();
        if (!$(/^(\()/)) { return null; }
        var c = coords();
        if (!$(/^(\))/)) { return null; }
        return {
            type: 'LineString',
            coordinates: c
        };
    }

    function polygon() {
        if (!$(/^(polygon)/i)) { return null; }
        white();
        return {
            type: 'Polygon',
            coordinates: multicoords()
        };
    }

    function multipolygon() {
        if (!$(/^(multipolygon)/i)) { return null; }
        white();
        return {
            type: 'MultiPolygon',
            coordinates: multicoords()
        };
    }

    function geometrycollection() {
        var geometries = [], geometry;

        if (!$(/^(geometrycollection)/i)) { return null; }
        white();

        if (!$(/^(\()/)) { return null; }
        while (geometry = root()) {
            geometries.push(geometry);
            white();
            $(/^(\,)/);
            white();
        }
        if (!$(/^(\))/)) { return null; }

        return {
            type: 'GeometryCollection',
            geometries: geometries
        };
    }

    function root() {
        return point() ||
            linestring() ||
            polygon() ||
            multipoint() ||
            multilinestring() ||
            multipolygon() ||
            geometrycollection();
    }

    return crs(root());
};

DG.Wkt.geoJsonLayer = function (data, opts) {
    return DG.geoJson(DG.Wkt.toGeoJSON(data), opts);
};

DG.Wkt.toLatLngs = function (data) {
    var coords = DG.Wkt.toGeoJSON(data).coordinates;
    return DG.Util.isArray(coords) ?
        coords
            .map(function (coord) {
                return DG.Util.isArray(coord[0]) ? DG.GeoJSON.coordsToLatLngs(coord) : [DG.GeoJSON.coordsToLatLng(coord)];
            })
            .reduce(function (arr, coord) {
                return arr.concat(coord);
            }) :
        DG.GeoJSON.coordsToLatLngs(coords);
};

DG.Wkt.toPoints = function (data) {
    return DG.Wkt.toGeoJSON(data).coordinates;
};

DG.Wkt.pointsToLatLngOnMap = function (wkt, map) {
    return (function parsePoints(points) {
        return (Array.isArray(points) && Array.isArray(points[0])) ?
            points.map(parsePoints) :
            map.containerPointToLatLng(points);
    })(DG.Wkt.toPoints(wkt));
};
/* jshint ignore:end */