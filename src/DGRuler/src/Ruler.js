L.DG.Ruler = L.Class.extend({

    options: {
        editable: true
    },

    includes: L.DG.Locale,

    statics: {
        Dictionary: {}
    },

    _rulerPane: null,
    _pathRoot: null,

    initialize: function (options) {
        L.Util.setOptions(this, options);
        this._reset();
    },

    onAdd: function (map) { // (L.Map)
        this._map = map.on('dgLangChange', this._updateDistance, this);

        if (!this._rulerPane) {
            this._rulerPane = L.DomUtil.create('div', 'dg-ruler-pane', map._panes.overlayPane);
        }

        this._layersContainer = L.featureGroup().addTo(this._map);
        Object.keys(this._layers).forEach(function (name) {
            this._layersContainer.addLayer(this._layers[name] = L.featureGroup());
        }, this);
        this._layers.mouse.on(this._lineMouseEvents, this);

        if (this.options.editable) {
            map.on('click', this._handleMapClick, this);
        }
    },

    onRemove: function (map) {  // (L.Map)
        map
            .off('dgLangChange', this._updateDistance, this)
            .off('click', this._handleMapClick, this)
            .removeLayer(this._layersContainer.clearLayers());

        this._layers.mouse.off(this._lineMouseEvents, this);
        Object.keys(this._layers).forEach(function (name) {
            this._layers[name].clearLayers();
        }, this);

        this._reset();
    },

    getTotalDistance: function () { // ()
        return this._calcDistance();
    },

    spliceLatLngs: function (index, pointsToRemove) {   // (Number, Number, args ...)
        var oldLength = this._points.length,
            mutationStart = index >= 0 ? Math.min(index, oldLength) : oldLength - index,
            removed = Array.prototype.splice.apply(this._points, arguments).map(function (point) {
                this._layers.mouse.removeLayer(point);
                return point.getLatLng();
            }, this);

        for (var i = mutationStart, length = this._points.length, style; i < length; i++) {
            if (!(this._points[i] instanceof L.DG.Ruler.LayeredMarker)) {
                this._points[i] = this._createPoint(this._points[i])
                                        .on(this._pointEvents, this)
                                        .addTo(this._layers.mouse, this._layers);
            }
            if (i && !this._points[i - 1]._legs) {
                this._addLegs(this._points[i - 1]);
            }
            this._points[i].setPointStyle(this.options.iconStyles[i && i < length - 1 ? 'small' : 'large']);
            this._points[i]._pos = i;
        }
        if (mutationStart === 0) {
            this._addCloseHandler(this._points[0]);
        } else {
            this._points[mutationStart - 1].setPointStyle(this.options.iconStyles.small);
        }
        this._updateDistance();
        return removed;
    },

    addLatLng: function (latlng) {  // (L.LatLng)
        this.spliceLatLngs(this._points.length, 0, latlng);
        return this;
    },
    
    getLatLngs: function () {   // ()
        return this._points.map(function (point) {
            return point.getLatLng();
        });
    },

    setLatLngs: function (latlngs) {    // (Array)
        var args = latlngs.slice();
        args.unshift(0, this._points.length);
        this.spliceLatLngs.apply(this, args);
        return this;
    },

    _reset : function () {  // ()
        L.extend(this, {
            _layersContainer: null,
            _layers: {
                back: null,
                middle: null,
                front: null,
                mouse: null
            },
            _lineMarkerHelper: null,
            _morphingNow: false,
            _points: []
        });
    },

    _initPathRoot : function () {   // ()
        if (!this._map._pathRoot) {
            return;
        }
        this._rulerPane.appendChild(this._pathRoot = this._map._pathRoot.cloneNode(false));
        this._map.on(this._pathRootEvents, this);
        L.DomUtil.addClass(this._pathRoot, 'dg-ruler-pane__pathroot');
    },

    _handleMapClick: function (event) {   // (MouseEvents)
        var latlng = event.latlng.wrap();
        if (!latlng.equals(event.latlng)) {
            this._map.fitWorld();
        }
        this.addLatLng(latlng);
    },

    _pathRootEvents: {
        zoomanim: function () {
            this._pathRoot.style[L.DomUtil.TRANSFORM] = this._map._pathRoot.style[L.DomUtil.TRANSFORM];
        },
        moveend : function () {
            ['width', 'height', 'viewBox', 'style'].forEach(function (attr) {
                this._pathRoot.setAttribute(attr, this._map._pathRoot.getAttribute(attr));
            }, this);
        }
    },

    _lineMouseEvents: {
        mouseover : function (event) {  // (MouseEvent)
            if (this._morphingNow) {
                return;
            }
            var target = event.layer;
            
            if (target instanceof L.Marker && target._hoverable && target._pos !== 0) {
                target.setText(this._getFormatedDistance(target));
            } else if (target instanceof L.Path && !this._lineMarkerHelper) {
                var point = target._point;

                this._lineMarkerHelper = this._addRunningLabel(
                    this._interpolate(point.getLatLng(), this._points[point._pos + 1].getLatLng(), event.latlng),
                    point);
            }
        },
        mouseout : function (event) {   // (MouseEvent)
            var target = event.layer;

            if (this._morphingNow || target._pos === 0) {
                return;
            }
            if (target instanceof L.Marker) {
                target._hoverable = true;
                target.collapse();
            } else {
                this._removeRunningLabel();
            }
        },
        mousemove : function (event) {  // (MouseEvent)
            if (this._morphingNow || !this._lineMarkerHelper) {
                return;
            }

            var point = event.layer._point,
                latlng = this._interpolate(point.getLatLng(), this._points[point._pos + 1].getLatLng(), event.latlng);

            this._lineMarkerHelper
                    .setLatLng(latlng)
                    .setText(this._getFormatedDistance(point, point.getLatLng().distanceTo(latlng)));
        },
        layeradd : function () {    // ()
            Object.keys(this._layers).forEach(function (name) {
                this._layers[name].bringToFront();
            }, this);
        }
    },

    _addRunningLabel : function (latlng, previousPoint) {   // (L.LatLng, L.DG.Ruler.LayeredMarker)
        var point = this._createPoint(latlng, {}).addTo(this._layers.mouse, this._layers);
        
        this._rulerPane.appendChild(point._icon);
        return point.setText(this._getFormatedDistance(previousPoint, previousPoint.getLatLng().distanceTo(latlng)));
    },

    _removeRunningLabel : function () { // ()
        if (this._lineMarkerHelper) {
            this._layers.mouse.removeLayer(this._lineMarkerHelper);
            this._lineMarkerHelper = null;
        }
    },

    _insertPointInLine : function (event) { // (MouseEvent)
        var latlng = this._lineMarkerHelper.getLatLng(),
            insertPos = event.target._point._pos + 1,
            point;

        this.spliceLatLngs(insertPos, 0, latlng);
        point = this._points[insertPos];
        point.setText(this._getFormatedDistance(point));

        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initMouseEvent('mousedown', true, true, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 1, point._icon);
            point._icon.dispatchEvent(e);
        } else {
            point._icon.fireEvent('onMouseDown', L.extend(document.createEventObject(), {
                button: 1,
                bubbles: true,
                cancelable: true
            }));
        }

        this._removeRunningLabel();
        this._updateLegs(point);
    },

    _interpolate: function (from, to, here) {   // (L.LatLng, L.LatLng, L.LatLng)
        var k = (to.lng - from.lng) / (to.lat - from.lat),
            b = from.lng - k * from.lat;
        
        // http://en.wikipedia.org/wiki/Line_(geometry)
        
        if (k === Infinity) { // Infinity is not the limit!
            here.lat = to.lat;
        } else {
            here.lat = (here.lat + k * here.lng - k * b) / (k * k + 1); // Don't even ask me!
            here.lng = k * here.lat + b;
        }
        return here;
    },

    _addCloseHandler: function (point) {    // (L.DG.Ruler.LayeredMarker)
        var closeNode = point.querySelector('.dg-ruler-label-delete');
        closeNode.style.display = 'inline-block';
        L.DomEvent.addListener(closeNode, 'click', this._deleteFirstPoint, this);
    },

    _createPoint: function (latlng, style) {    // (L.LatLng, Object)
        var pointStyle = style ? style : this.options.iconStyles.large,
            layers = {};

        Object.keys(pointStyle).forEach(function (layer) {
            layers[layer] = L.circleMarker(latlng, pointStyle[layer]);
        });

        return L.DG.Ruler.layeredMarker(latlng, {
            layers : layers,
            draggable : this.options.editable
        });
    },

    _pointEvents: {
        'drag' : function (event) { // (Event)
            var point = event.target;
            this._updateLegs(point);
            this._updateDistance();
            if (point !== this._points[0]) {
                point.setText(this._getFormatedDistance(point));
            }
        },
        'dragend' : function () {   // ()
            this._morphingNow = false;
        },
        'dragstart' : function () { // ()
            this._morphingNow = true;
        }
    },

    _deleteFirstPoint: function (event) {   // (DOMEvent)
        L.DomEvent.stop(event);
        if (this._points.length === 1) {
            return;
        }
        this.spliceLatLngs(0, 1);
    },

    _addLegs: function (point) {
        var coordinates = [point.getLatLng(), this._points[point._pos + 1].getLatLng()],
            pathStyles = this.options.pathStyles;

        point._legs = {};
        Object.keys(pathStyles).forEach(function (layer) {
            point._legs[layer] = L.polyline(coordinates, pathStyles[layer]).addTo(this._layers[layer]);
        }, this);

        if (!this._pathRoot) {
            this._initPathRoot();
        }
        this._pathRoot.appendChild(point._legs.mouse._container);

        point._legs.mouse._point = point.on('remove', this._removeLeg, this);
        if (this.options.editable) {
            point._legs.mouse.on('mousedown', this._insertPointInLine, this);
        }
    },

    _removeLeg: function (event) {  // (Event)
        var legs = event.target._legs;
        Object.keys(legs).forEach(function (layer) {
            this._layers[layer].removeLayer(legs[layer]);
        }, this);
    },

    _updateLegs: function (point) {    // (L.DG.Ruler.LayeredMarker)
        var latlng = point.getLatLng(),
            previousPoint = this._points[point._pos - 1];

        if (previousPoint) {
            Object.keys(previousPoint._legs).forEach(function (layer) {
                previousPoint._legs[layer].spliceLatLngs(1, 1, latlng);
            });
        }
        if (point._legs) {
            Object.keys(point._legs).forEach(function (layer) {
                point._legs[layer].spliceLatLngs(0, 1, latlng);
            });
        }
    },

    _calcDistance: function (finishPoint, tail) { // (L.DG.Ruler.LayeredMarker, Number)
        var distance = tail ? tail : 0,
            calcTo = finishPoint ? finishPoint._pos : this._points.length - 1;

        for (var i = 0; i < calcTo; i++) {
            distance += this._points[i].getLatLng().distanceTo(this._points[i + 1].getLatLng());
        }

        return distance;
    },

    _getFormatedDistance: function (finishPoint, tail) { // (L.DG.Ruler.LayeredMarker, Number)
        var distance = this._calcDistance.apply(this, arguments),
            units = 'm';

        if (distance > 1000) {
            distance /= 1000;
            distance = distance.toFixed(2).split('.').join(this.t(','));
            units = 'km';
        } else {
            distance = Math.round(distance);
        }

        return [distance || 0, ' ', this.t(units)].join('');
    },

    _updateDistance: function () {  // ()
        if (this._points.length) {
            this._points[0].setText(this._getFormatedDistance());
        }
    }
});

L.DG.ruler = function (options) { // (Object)
    return new L.DG.Ruler(options);
};