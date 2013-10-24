L.DG.Ruler.DrawingHelper = L.Class.extend({

    includes: L.Mixin.Events,

    statics : {
        smallIcon : L.icon({
            iconUrl: '__BASE_URL__/img/spacer.gif',
            iconSize: [26, 26],
            iconAnchor: [13, 13]
        }),
        largeIcon : L.icon({
            iconUrl: '__BASE_URL__/img/spacer.gif',
            iconSize: [26, 26],
            iconAnchor: [13, 13]
        }),
        spaceIcon : L.icon({
            iconUrl: '__BASE_URL__/img/spacer.gif',
            iconSize: [0, 0],
            iconAnchor: [0, 0]
        })
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

            _label: null,

            _labelDistanceNode: null,
            _labelDeleteNode: null,

            _lineMarkerHelper: null,

            _points: null,
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
    },

    _lineMouseEvents: {
        'mouseover' : function (event) {
            var point;
            console.log('mouseover', this._morphingNow);
            if (this._morphingNow) {
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
        },
        'mouseout' : function () {
            if (this._lineMarkerHelper == null) {
                return;
            }
            console.log('mouseout');
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
            // console.log( distance );
        }
    },

    _insertPointInLine : function (event) {
        var latlng = this._lineMarkerHelper.getLatLng(),
            point = this._createPoint(latlng);

        console.log('mousedown');

        this._layers.back.addLayer(point._outer);
        this._layers.front
                        .addLayer(point._inner)
                        .addLayer(point._pipka);

        this._insertPointBefore(point, event.target._point);
        this._addLeg(point);

        point
            .on(this._pointDragEvents, this)
            .addTo(this._layers.mouse);

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

        here.lat = (here.lat + k * here.lng - k * b) / (k * k + 1);

        return [here.lat, k * here.lat + b];
    },

    _createPoint: function (latlng, expanded) {
        var point = expanded ? L.marker(latlng, {
                icon : L.DG.Ruler.DrawingHelper.spaceIcon,
            }) : L.marker(latlng, {
                icon : L.DG.Ruler.DrawingHelper.largeIcon,
                opacity : 0,
                draggable: true
            });

        point._outer = L.circleMarker(latlng, {
            color: '#fff',
            opacity: 1,
            fillColor: '#fff',
            fillOpacity: 1,
            weight: 1
        }).setRadius(13);
        point._inner = L.circleMarker(latlng, {
            color: '#0da5d5',
            opacity: 1,
            fillColor: '#0da5d5',
            fillOpacity: 1,
            weight: 1
        }).setRadius(9);
        point._pipka = L.circleMarker(latlng, {
            color: '#fff',
            opacity: 1,
            fillColor: '#fff',
            fillOpacity: 1,
            weight: 1
        }).setRadius(5);

        return point.on('move', function (event) {
            var latlng = event.target.getLatLng();
            this._outer.setLatLng(latlng);
            this._inner.setLatLng(latlng);
            this._pipka.setLatLng(latlng);
        });
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

        point._lines = [
            L.polyline(coordinates, {
                color: '#fff',
                opacity: 1,
                weight: 12
            }).addTo(this._layers.back),
            L.polyline(coordinates, {
                color: '#0da5d5',
                opacity: 1,
                weight: 4
            }).addTo(this._layers.front).bringToBack(),
            L.polyline(coordinates, {
                color: '#ff0000',
                opacity: 0,
                weight: 20
            }).on('mousedown', this._insertPointInLine, this).addTo(this._layers.mouse)
        ];
        point._lines[2]._point = point;
    },

    _updatePointLegs: function (point) {
        var next = point._next,
            latlng = point.getLatLng(),
            i;

        for (i = 0; point._prev && i < 3; point._lines[i].spliceLatLngs(1, 1, latlng), i++);
        for (i = 0; next && i < 3; next._lines[i].spliceLatLngs(0, 1, latlng), i++);
    },

    _initLabel: function () {
        this._firstPoint.bindLabel('<span class="dg-ruler-label-distance">0</span> км<a href="#" class="dg-ruler-label-close">X</a>', {
            static: true,
            className: 'dg-ruler-label',
            offset: new L.Point(-15, -40)
        });

        var labelNode = this._map.getContainer().querySelector('.dg-ruler-label');

        this._labelDistanceNode = labelNode.querySelector('.dg-ruler-label-distance');
        this._labelDeleteNode = labelNode.querySelector('.dg-ruler-label-close');

        L.DomEvent.addListener(this._labelDeleteNode, 'click', this._deleteFirstPoint, this);
    },

    _deleteFirstPoint: function (event) {
        var newFirst = this._firstPoint._next;

        L.DomEvent.stop(event);
        if (!newFirst) {
            return;
        }

        this._layers.back.removeLayer(this._firstPoint._outer);
        this._layers.front
                        .removeLayer(this._firstPoint._inner)
                        .removeLayer(this._firstPoint._pipka);
        for (var i = 0; i < 3; this._map.removeLayer(newFirst._lines[i]), i++);
        newFirst.prev = null;

        this._firstPoint = newFirst;
        this._updateDistance();
    },

    _calcDistance: function (finishPoint) {
        var sum = 0,
            point = this._firstPoint,
            finishPoint = finishPoint || null;

        while ((point = point._next) != finishPoint) {
            sum += point._prev.getLatLng().distanceTo(point.getLatLng());
        }

        return sum / 1000;
    },

    _updateDistance: function () {
        var distance = this._calcDistance();
        if (distance) {
            distance = distance.toFixed(2).split('.').join(',');
        }
        this._labelDistanceNode.innerHTML = distance;
    }

});