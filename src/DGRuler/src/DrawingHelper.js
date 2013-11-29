L.DG.Ruler.DrawingHelper = L.Class.extend({

    statics : {
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
                        fillOpacity: 0,
                        weight: 4,
                        radius: 5
                    }
                }
            },
            small : {
                icon : L.icon({
                    iconUrl: '__BASE_URL__/img/spacer.gif',
                    iconSize: [26, 26],
                    iconAnchor: [13, 13]
                }),
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
                        fillOpacity: 0,
                        weight: 4,
                        radius: 2
                    }
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

    startDrawing: function () {
        this._lastPoint = null;

        this._layersContainer = L.featureGroup().addTo(this._map);
        L.Util.invokeEach(this._layers, function (name) {
            this._layersContainer.addLayer(this._layers[name] = L.featureGroup());
        }, this);

        this._mouselayerHovered = false;
		this._layers.mouse.on(this._lineMouseEvents, this);
                        // .on('mouseover mouseout', this._mouselayerHover, this)
                        // .on('mousemove', this._lineMouseEvents.mousemove, this);

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
        this._updateDistance();
    },

    // _mouselayerHover: function (event) {
    //     var that = this,
    //         type = event.type;

    //     clearTimeout(this._mouselayerHoverTimer);
    //     if (type === 'mouseover') {
    //         if (this._mouselayerHovered === true) {
    //             return;
    //         }
    //         this._lineMouseEvents[type].call(this, event);
    //         this._mouselayerHovered = true;
    //     } else {
    //         this._mouselayerHoverTimer = setTimeout(function(){
    //             that._lineMouseEvents[type].call(that, event);
    //             that._mouselayerHovered = false;
    //         }, 10);
    //     }
    // },

    _lineMouseEvents: {
        'mouseover' : function (event) {
            var target = event.layer,
                point = target._point;

            console.log('mouseover', target._point);
            if (this._morphingNow || !(target instanceof L.Path)) {
                return;
            }
            this._addRunningLabel(this._interpolate(point._prev.getLatLng(), point.getLatLng(), event.latlng));
        },
        'mouseout' : function () {
            console.log('mouseout');
            if (this._lineMarkerHelper) {
                this._layers.mouse.removeLayer(this._lineMarkerHelper);
                this._lineMarkerHelper = null;
            }
        },
        'mousemove' : function (event) {
            var latlng = event.latlng,
                target = event.layer,
                point = target._point,
                distance = this._calcDistance(point) + point._prev.getLatLng().distanceTo(latlng) / 1000;

            console.log('mousemove', target instanceof L.Path);

            if (this._morphingNow) {
                return;
            }
            if (!this._lineMarkerHelper) {
                this._addRunningLabel(latlng);
            }
            this._lineMarkerHelper.setLatLng(this._interpolate(point._prev.getLatLng(), point.getLatLng(), latlng));
            this._lineMarkerHelper.options.icon.setDistance(this._formatDistance(distance));
        }
    },

    _addRunningLabel : function (latlng) {
        var style = { opacity : 0 };
        point = this._lineMarkerHelper = this._createPoint(latlng, {
            layers : { front : style, middle : style, back : style },
            icon : L.DG.Ruler.distanceMarkerIcon({ transparent : true })
        });
        point.addTo(this._layers.mouse, this._layers);
        this._layers.back.bringToBack();
        this._layers.mouse.bringToFront();
    },

    _insertPointInLine : function (event) {
        var latlng = this._lineMarkerHelper.getLatLng(),
            point = this._createPoint(latlng);

        this._setPointLinks(point, event.target._point);
        this._addLeg(point);

        point
            .on(this._pointEvents, this)
            .addTo(this._layers.mouse, this._layers)
            ._setPointStyle(this.constructor.iconStyles['small']);

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
        var latlng = this._map.mouseEventToLatLng(event),
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
                point._prev._setPointStyle(this.constructor.iconStyles['small']);
            }
        } else {
            this._firstPoint = point;
        }

        this._layers.back.bringToBack();
        this._updateDistance();
    },

    _createPoint: function (latlng, style) {
        var pointStyle = style ? style : this.constructor.iconStyles['large'],
            layers = pointStyle.layers,
            point = L.DG.Ruler.layeredMarker(latlng, {
                icon : pointStyle.icon,
                layers : {
                    back : L.circleMarker(latlng, layers.back),
                    middle : L.circleMarker(latlng, layers.middle),
                    front : L.circleMarker(latlng, layers.front)
                }
            });

        return point;
    },

    _isEventOutside: function (event, parent) {
        var element = event.relatedTarget || event.toElement || event.fromElement;
        // console.log(element);
        // console.log(element = element.parentNode);
        // console.log(elemrent = element.parentNode);
        // while ( element && element !== parent) {
        //     element = element.parentNode;
        // }
        // console.log(element, parent);
        // return element !== parent;
        return true;
    },

    _pointEvents: {
        'drag' : function (event) {
            this._updatePointLegs(event.target);
            this._updateDistance();
        },
        'dragend' : function () {
            this._morphingNow = false;
        },
        'dragstart' : function () {
            this._morphingNow = true;
        },
        'mouseover' : function (event) {
            // if (this._isEventOutside(event.originalEvent, event.layer._icon)) {
                event.layer.setIcon(L.DG.Ruler.distanceMarkerIcon());
            // }
        },
        'mouseout' : function (event) {
            console.log('-- mouseout');
            // if (this._isEventOutside(event.originalEvent, event.layer._icon)) {
                // event.layer.setIcon(this.constructor.iconStyles.large.icon);
            // }
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
        return distance ? distance.toFixed(2).split('.').join(',') : 0;
    },

    _updateDistance: function () {
        this._firstPoint.options.icon.setDistance(this._formatDistance(this._calcDistance()));
    }
});