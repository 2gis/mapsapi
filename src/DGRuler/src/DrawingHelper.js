L.DG.Ruler.DrawingHelper = L.Class.extend({

    statics : {
        pathStyles : {
            back : {
                color: '#fff',
                opacity: 1,
                weight: 12
            },
            middle : {
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
                layers : {
                    back : {
                        color: '#fff',
                        opacity: 1,
                        fillColor: '#fff',
                        fillOpacity: 1,
                        weight: 1,
                        radius: 13
                    },
                    middle : {
                        color: '#0da5d5',
                        opacity: 1,
                        fillColor: '#0da5d5',
                        fillOpacity: 1,
                        weight: 1,
                        radius: 9
                    },
                    front : {
                        color: '#fff',
                        opacity: 1,
                        fillColor: '#0da5d5',
                        fillOpacity: 1,
                        weight: 4,
                        radius: 5
                    }
                }
            },
            small : {
                layers : {
                    back : {
                        color: '#fff',
                        opacity: 1,
                        fillColor: '#fff',
                        fillOpacity: 1,
                        weight: 1,
                        radius: 9
                    },
                    middle : {
                        color: '#0da5d5',
                        opacity: 1,
                        fillColor: '#0da5d5',
                        fillOpacity: 1,
                        weight: 1,
                        radius: 5
                    },
                    front : {
                        color: '#fff',
                        opacity: 1,
                        fillColor: '#0da5d5',
                        fillOpacity: 1,
                        weight: 4,
                        radius: 2
                    }
                }
            }
        }
    },

    initialize: function (map, options) {
        this._map = map;
        this._translate = options.translate;
        this._reset();
    },

    startDrawing: function () {
        this._layersContainer = L.featureGroup().addTo(this._map);
        L.Util.invokeEach(this._layers, function (name) {
            this._layersContainer.addLayer(this._layers[name] = L.featureGroup());
        }, this);

		this._layers.mouse.on(this._lineMouseEvents, this);
        this._map.on('click', this._addPoint, this);

        return this;
    },

    finishDrawing: function () {
        this._map
                .removeLayer((this._layersContainer.clearLayers()))
                .off('click', this._addPoint, this);

        L.Util.invokeEach(this._layers, function (name) {
            this._layers[name].clearLayers();
        }, this);

        return this._reset();
    },

    renderTranslation : function () {
        this._updateDistance();
    },

    _reset : function () {
        L.extend(this, {
            _layersContainer: null,
            _layers: {
                back : null,
                middle : null,
                front : null,
                mouse : null
            },
            _lineMarkerHelper: null,
            _firstPoint: null,
            _lastPoint: null,
            _morphingNow: false
        });
    },

    _lineMouseEvents: {
        mouseover : function (event) {
            var target = event.layer;

            if (this._morphingNow) {
                return;
            }
            if (target instanceof L.Marker && target !== this._firstPoint) {
                target.setText(this._calcDistance(target._next));
            } else if (target instanceof L.Path) {
                var point = target._point,
                    prevLatlng = point._prev.getLatLng(),
                    interpolated = this._interpolate(prevLatlng, point.getLatLng(), event.latlng);

                this._lineMarkerHelper = this._addRunningLabel(interpolated, point);
            }
        },
        mouseout : function (event) {
            var target = event.layer;

            if (this._morphingNow || target === this._firstPoint) {
                return;
            }
            if (target instanceof L.Marker) {
                target.collapse();
            } else {
                this._removeRunningLabel();
            }
        },
        mousemove : function (event) {
            if (this._morphingNow) {
                return;
            }

            var latlng = event.latlng,
                point = event.layer._point,
                interpolated = this._interpolate(point._prev.getLatLng(), point.getLatLng(), latlng);

            if (this._lineMarkerHelper) {
                this._lineMarkerHelper
                                    .setLatLng(interpolated)
                                    .setText(this._calcDistance(point, point._prev.getLatLng().distanceTo(interpolated)));
            }
        },
        layeradd : function () {
            L.Util.invokeEach(this._layers, function (name) {
                this._layers[name].bringToFront();
            }, this);
        }
    },

    _addRunningLabel : function (latlng, previousPoint) {
        var style = { opacity : 0, fillOpacity: 1 },
            point = this._createPoint(latlng, {
                layers : { front : style, middle : style, back : style },
                eventTransparent : true,
                text : this._calcDistance(previousPoint, previousPoint.getLatLng().distanceTo(latlng))
            });
        return point.addTo(this._layers.mouse, this._layers);
    },

    _removeRunningLabel : function () {
        if (this._lineMarkerHelper) {
            this._layers.mouse.removeLayer(this._lineMarkerHelper);
            this._lineMarkerHelper = null;
        }
    },

    _insertPointInLine : function (event) {
        var latlng = this._lineMarkerHelper.getLatLng(),
            point = this._createPoint(latlng, this.constructor.iconStyles['small']);

        this._setPointLinks(point, event.target._point);
        this._addLeg(point);

        point
            .on(this._pointEvents, this)
            .addTo(this._layers.mouse, this._layers)
            .setText(this._calcDistance(point._next));

        var e = document.createEvent('MouseEvents');
        e.initMouseEvent('mousedown', true, true, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 1, point._icon);
        point._icon.dispatchEvent(e);

        this._removeRunningLabel();
        this._updatePointLegs(point);
    },

    _interpolate: function (from, to, here) {
        var k = (to.lng - from.lng) / (to.lat - from.lat),
            b = from.lng - k * from.lat;

        if (k == Infinity) { // Infinity is not the limit!
            here.lat = to.lat;
        } else {
            here.lat = (here.lat + k * here.lng - k * b) / (k * k + 1); // Don't even ask me!
            here.lng = k * here.lat + b;
        }
        return here;
    },

    _setPointLinks : function (point, before) {
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
        var latlng = event.latlng,
            point;

        L.DomEvent.stop(event);

        point = this._createPoint(latlng);
        point
            .addTo(this._layers.mouse, this._layers)
            .on(this._pointEvents, this);

        this._setPointLinks(point);
        if (point._prev) {
            this._addLeg(point);
            if (point._prev._prev) {
                point._prev.setPointStyle(this.constructor.iconStyles['small'].layers);
            }
        } else {
            this._firstPoint = point;
        }

        this._updateDistance();
    },

    _createPoint: function (latlng, style) {
        var pointStyle = style ? style : this.constructor.iconStyles['large'],
            layers = pointStyle.layers;

        return L.DG.Ruler.layeredMarker(latlng, {
            eventTransparent : !!pointStyle.eventTransparent,
            layers : {
                front : L.circleMarker(latlng, layers.front),
                middle : L.circleMarker(latlng, layers.middle),
                back : L.circleMarker(latlng, layers.back)
        }});
    },

    _pointEvents: {
        'drag' : function (event) {
            var point = event.target;
            this._updatePointLegs(point);
            this._updateDistance();
            point.setText(this._calcDistance(point._next));
        },
        'dragend' : function () {
            this._morphingNow = false;
        },
        'dragstart' : function () {
            this._morphingNow = true;
        }
    },

    _deleteFirstPoint: function (event) {
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

        this._firstPoint = newFirst.setPointStyle('large');
        this._updateDistance();
    },

    _addLeg: function (point) {
        var coordinates = [point._prev.getLatLng(), point.getLatLng()];

        point._legs = {};

        L.Util.invokeEach(this.constructor.pathStyles, function (layer, style) {
            point._legs[layer] = L.polyline(coordinates, style).addTo(this._layers[layer]);
        }, this);

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

    _calcDistance: function (finishPoint, tail) {
        var distance = tail ? tail : 0,
            point = this._firstPoint,
            stopPoint = finishPoint || null,
            units = 'm';

        while ((point = point._next) !== stopPoint) {
            distance += point._prev.getLatLng().distanceTo(point.getLatLng());
        }

        if (distance > 1000) {
            distance /= 1000;
            distance = distance.toFixed(2).split('.').join(this._translate(','));
            units = 'km';
        } else {
            distance = ~~distance;
        }

        return [distance || 0, ' ', this._translate(units)].join('');
    },

    _updateDistance: function () {
        this._firstPoint.setText(this._calcDistance());
    }
});