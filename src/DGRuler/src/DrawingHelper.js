L.DG.Ruler.DrawingHelper = L.Class.extend({

    includes: L.Mixin.Events,

    statics : {
        distanceIcon : L.DG.Ruler.distanceMarkerIcon({
            iconAnchor: [15, 15]
        }),
        pathStyles : {
            back : {
                color: '#fff',
                opacity: 1,
                weight: 12
            },
            front : {
                color: '#0da5d5',
                opacity: 1,
                weight: 4
            },
            mouse : {
                color: '#ff0000',
                opacity: 0,
                weight: 20
            }
        },
        iconStyles : {
            large : {
                icon : L.icon({
                    iconUrl: '__BASE_URL__/img/spacer.gif',
                    iconSize: [26, 26],
                    iconAnchor: [13, 13]
                }),
                outer : {
                    color: '#fff',
                    opacity: 1,
                    fillColor: '#fff',
                    fillOpacity: 1,
                    weight: 1,
                    radius: 13
                },
                inner : {
                    color: '#0da5d5',
                    opacity: 1,
                    fillColor: '#0da5d5',
                    fillOpacity: 1,
                    weight: 1,
                    radius: 9
                },
                pipka : {
                    color: '#fff',
                    opacity: 1,
                    fillColor: '#0da5d5',
                    fillOpacity: 0,
                    weight: 4,
                    radius: 5
                }
            },
            small : {
                icon : L.icon({
                    iconUrl: '__BASE_URL__/img/spacer.gif',
                    iconSize: [26, 26],
                    iconAnchor: [13, 13]
                }),
                outer : {
                    color: '#fff',
                    opacity: 1,
                    fillColor: '#fff',
                    fillOpacity: 1,
                    weight: 1,
                    radius: 9
                },
                inner : {
                    color: '#0da5d5',
                    opacity: 1,
                    fillColor: '#0da5d5',
                    fillOpacity: 1,
                    weight: 1,
                    radius: 5
                },
                pipka : {
                    color: '#fff',
                    opacity: 1,
                    fillColor: '#0da5d5',
                    fillOpacity: 0,
                    weight: 4,
                    radius: 2
                }
            }
        }
    },

    initialize: function (map) {
        L.extend(this, {
            _map : map,
            _layersContainer: null,
            _layers: {
                back : null,
                front : null,
                mouse : null
            },

            _lineMarkerHelper: null,

            _pointsCount: 0,
            _firstPoint: null,
            _lastPoint: null,

            _morphingNow: false
        });
    },

    startDrawing: function () {
        this._lastPoint = null;

        this._layersContainer = L.featureGroup().addTo(this._map);
        for (var i in this._layers) {
            if (this._layers.hasOwnProperty(i)) {
                this._layersContainer.addLayer(this._layers[i] = L.featureGroup());
            }
        }

		this._layers.mouse.on(this._lineMouseEvents, this);
        L.DomEvent.addListener(this._map.getPanes().mapPane, 'click', this._addPoint, this);
        return this;
    },

    finishDrawing: function () {
        L.DomEvent.removeListener(this._map.getPanes().mapPane, 'click', this._addPoint);

        this._layersContainer.clearLayers();
        this._map.removeLayer(this._layersContainer);

        for (var i in this._layers) {
            if (this._layers.hasOwnProperty(i)) {
                this._layers[i] = null;
            }
        }

        if (this._label) {
            this._map.removeLayer(this._label);
            this._label = null;
        }
        return this;
    },

    deleteFirstPoint: function (event) {
        var point = this._firstPoint,
            newFirst = point._next;

        L.DomEvent.stop(event);

        if (!newFirst) {
            return;
        }

        this._layers.back.removeLayer(point._outer);
        this._layers.front.removeLayer(point._inner).removeLayer(point._pipka);
        this._layers.mouse.removeLayer(point);

        L.Util.invokeEach(newFirst._legs, function (layer, line) {
            this._layers[layer].removeLayer(line);
        }, this);

        newFirst.prev = null;

        this._firstPoint = newFirst._setPointStyle('large');
        this._initLabel();
        this._updateDistance();
    },

    _lineMouseEvents: {
        'mouseover' : function (event) {
            var point;
            console.log('mouseover', this._morphingNow);
            if (this._morphingNow || !(event.layer instanceof L.Path)) {
                return;
            }
            point = this._lineMarkerHelper = this._createPoint(event.latlng, true);
            this._layers.back.addLayer(point._outer);
            this._layers.front
                        .addLayer(point._inner)
                        .addLayer(point._pipka)
                        .addLayer(point);
            this._layers.back.bringToBack();
            this._layers.mouse.bringToFront();
            this._initHoverLabel(point);
        },
        'mouseout' : function () {
            console.log('mouseout');
            if (this._lineMarkerHelper === null) {
                return;
            }
            this._layers.back.removeLayer(this._lineMarkerHelper._outer);
            this._layers.front
                        .removeLayer(this._lineMarkerHelper._inner)
                        .removeLayer(this._lineMarkerHelper._pipka)
                        .removeLayer(this._lineMarkerHelper);
            this._lineMarkerHelper = null;
        },
        'mousemove' : function (event) {
            var latlng = event.latlng,
                target = event.layer,
                point = target._point,
                distance = this._calcDistance(point) + point._prev.getLatLng().distanceTo(latlng) / 1000;

            if (this._morphingNow) {
                return;
            }
            this._lineMarkerHelper.setLatLng(this._interpolate(point._prev.getLatLng(), point.getLatLng(), latlng));
            this.fire('mousemove', { latlng : latlng, distance : distance });
        }
    },

    _insertPointInLine : function (event) {
        var latlng = this._lineMarkerHelper.getLatLng(),
            point = this._createPoint(latlng);

        this._layers.back.addLayer(point._outer);
        this._layers.front
                        .addLayer(point._inner)
                        .addLayer(point._pipka);

        this._insertPointBefore(point, event.target._point);
        this._addLeg(point);

        point
            .on(this._pointDragEvents, this)
            .addTo(this._layers.mouse)
            ._setPointStyle('small');

        var e = document.createEvent('MouseEvents');
        e.initMouseEvent('mousedown', true, true, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 1, point._icon);
        point._icon.dispatchEvent(e);
        this._morphingNow = true;

        this._lineMouseEvents.mouseout.apply(this);
        this._updatePointLegs(point);

        this._layers.back.bringToBack();
    },

    _interpolate: function (from, to, here) {
        var k = (to.lng - from.lng) / (to.lat - from.lat),
            b = from.lng - k * from.lat;

        here.lat = (here.lat + k * here.lng - k * b) / (k * k + 1); // Don't even ask me!

        return [here.lat, k * here.lat + b];
    },

    _createPoint: function (latlng, transparent) {
        var style = this.constructor.iconStyles.large,
            point = transparent ? L.marker(latlng, {
                icon : this.constructor.distanceIcon,
            }) : L.marker(latlng, {
                icon : style.icon,
                draggable: true
            });

        L.extend(point, {
            _outer : L.circleMarker(latlng, style.outer),
            _inner : L.circleMarker(latlng, style.inner),
            _pipka : L.circleMarker(latlng, style.pipka),
            _setPointStyle : this._setPointStyle
        });

        return point.on('move', function (event) {
            var latlng = event.target.getLatLng();
            this._outer.setLatLng(latlng);  // Here I'm only dreaming about google's .bindTo :)
            this._inner.setLatLng(latlng);
            this._pipka.setLatLng(latlng);
        });
    },

    _setPointStyle : function (styleName) {
        var style = L.DG.Ruler.DrawingHelper.iconStyles[styleName];

        this._outer.setStyle(style.outer);
        this._inner.setStyle(style.inner);
        this._pipka.setStyle(style.pipka);
        this.setIcon(style.icon);

        return this;
    },

    _insertPointBefore : function (point, before) {
        before = before || null;
        point._next = before;
        if (before) {
            point._prev = before._prev;
            before._prev._next = point;
            before._prev = point;
        } else {
            point._prev = this._lastPoint;
            if (this._lastPoint) {
                this._lastPoint._next = point;
            }
            this._lastPoint = point;
        }
    },

    _addPoint: function (event) {
        var latlng = this._map.mouseEventToLatLng(event),
            point = this._createPoint(latlng);

        L.DomEvent.stop(event);

        this._layers.back.addLayer(point._outer);
        this._layers.front
                        .addLayer(point._inner)
                        .addLayer(point._pipka);
        point
            .on(this._pointDragEvents, this)
            .addTo(this._layers.mouse);

        this._insertPointBefore(point);
        if (point._prev) {
            this._addLeg(point);
            if (point._prev._prev) {
                point._prev._setPointStyle('small');
            }
        } else {
            this._firstPoint = point;
            this._initLabel();
        }

        this._layers.back.bringToBack();
        this._updateDistance();
    },

    _pointDragEvents: {
        'drag' : function (event) {
            this._updatePointLegs(event.target);
            this._updateDistance();
        },
        'dragend' : function () {
            this._morphingNow = false;
        },
        'dragstart' : function () {
            this._morphingNow = true;
        }
    },

    _addLeg: function (point) {
        var coordinates = [point._prev.getLatLng(), point.getLatLng()];

        point._legs = {};

        L.Util.invokeEach(this.constructor.pathStyles, function (layer, style) {
            point._legs[layer] = L.polyline(coordinates, style).addTo(this._layers[layer]);
        }, this);

        point._legs.front.bringToBack();
        point._legs.mouse.on('mousedown', this._insertPointInLine, this);
        point._legs.mouse._point = point;
    },

    _updatePointLegs: function (point) {
        var latlng = point.getLatLng();

        if (point._prev) {
            L.Util.invokeEach(point._legs, function (layer, line) {
                line.spliceLatLngs(1, 1, latlng);
            });
        }
        if (point._next) {
            L.Util.invokeEach(point._next._legs, function (layer, line) {
                line.spliceLatLngs(0, 1, latlng);
            });
        }
    },

    _calcDistance: function (finishPoint) {
        var sum = 0,
            point = this._firstPoint,
            stopPoint = finishPoint || null;

        while ((point = point._next) !== stopPoint) {
            sum += point._prev.getLatLng().distanceTo(point.getLatLng());
        }

        return sum / 1000;
    },

    _formatDistance: function (distance) {
        return distance ? distance.toFixed(2).split('.').join(this.t(',')) : 0;
    },

    _initLabel: function () {
        this.fire('startChange', { marker : this._firstPoint });
    },

    _updateDistance: function () {
        this.fire('change', { distance : this._calcDistance() });
    },

    _initHoverLabel: function (marker) {
        this.fire('hover', { layerGroup : this._layers.mouse });
    }
});