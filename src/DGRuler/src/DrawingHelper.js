L.DG.Ruler.DrawingHelper = L.Class.extend({

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

    initialize: function (map) {
        this._map = map;
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

        this._points.length = 0;
        this._points = null;

        this._frontline = null;
        this._backline = null;

        if (this._label) {
            this._map.removeLayer(this._label);
            this._label = null;
        }
    },

    _lineMouseEvents: {
        'mousemove' : function (event) {
            var latlng = event.latlng,
                target = event.layer,
                point = target._point,
                distance = this._calcDistance(point) + point._prev.getLatLng().distanceTo(latlng) / 1000;

            console.log( distance );
        }
    },

    _createPoint: function (latlng) {
        var point = L.marker(latlng, {
                icon : L.icon({
                    iconUrl: '__BASE_URL__/img/spacer.gif',
                    iconSize: [12, 12],
                    iconAnchor: [6, 6]
                }),
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

        return point.on('drag', function (event) {
            var latlng = event.target.getLatLng();
            this._outer.setLatLng(latlng);
            this._inner.setLatLng(latlng);
            this._pipka.setLatLng(latlng);
        });
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
            .on('drag', this._movePoint, this)
            .addTo(this._layers.mouse);

        point._next = null;
        point._prev = this._lastPoint;
        if (this._lastPoint) {
            this._lastPoint._next = point;
            this._addLeg(point);
        } else {
            this._firstPoint = point;
            this._initLabel();
        }
        this._lastPoint = point;

        this._layers.back.bringToBack();
        this._updateDistance();
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
                color: '#fff',
                opacity: 0,
                weight: 15
            }).addTo(this._layers.mouse)
        ];
        point._lines[2]._point = point;
    },

    _movePoint: function (event) {
        var point = event.target,
            next = point._next,
            latlng = point.getLatLng(),
            i;

        for (i = 0; point._prev && i < 3; point._lines[i].spliceLatLngs(1, 1, latlng), i++);
        for (i = 0; next && i < 3; next._lines[i].spliceLatLngs(0, 1, latlng), i++);

        this._updateDistance();
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