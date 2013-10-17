L.DG.Ruler = L.Control.extend({
    includes: L.DG.Locale,

    statics: {
        Dictionary: {}
    },

    options: {
        position: 'topright'
    },

    _active: false,
    _layersContainer: null,
    _layers: {
        back : null,
        front : null,
        mouse : null
    },

    _line: null,
    _label: null,
    _lineMarkerHelper: null,

    _points: null,

    onAdd: function () {
        var container = L.DomUtil.create('div', 'leaflet-control-locate leaflet-bar');

        this._link = L.DomUtil.create('a', 'leaflet-bar-part leaflet-bar-part-single', container);
        this._link.href = '#';
        this._link.title = this.t('button_title');

        L.DomEvent
            .disableClickPropagation(this._link)
            .on(this._link, 'click', this._controlClick, this);

        return container;
    },

    _controlClick: function (event) {
        L.DomEvent.preventDefault(event);
        this[this._active = !this._active ? '_startDrawing' : '_finishDrawing']();
    },

    _startDrawing: function () {
        this._points = [];

        this._layersContainer = L.featureGroup().addTo(this._map);
        for (var i in this._layers) {
            if (this._layers.hasOwnProperty(i)) {
                this._layersContainer.addLayer(this._layers[i] = L.featureGroup());
            }
        }

        this._backline = L.polyline([], {
            color: '#fff',
            opacity: 1,
            weight: 12
        });
        this._layers.back.addLayer(this._backline);

        this._line = L.polyline([], {
            color: '#0da5d5',
            opacity: 1,
            weight: 4
        });
        this._layers.front.addLayer(this._line);

        this._map.on('click', this._addPoint, this);
    },

    _initLabel: function () {
        this._points[0].bindLabel('0 км', {
            static: true,
            className: 'dg-ruler-label',
            offset: new L.Point(-15, -40)
        });
    },

    _calcDistance: function () {
        var sum = 0,
            length = this._points.length;

        if (length < 2) {
            return 0;
        }
        for (var i = 0; i < length - 1; i++) {
            sum += this._points[i].getLatLng().distanceTo(this._points[i + 1].getLatLng());
        }
        return sum / 1000;
    },

    _updateDistance: function () {
        var distance = this._calcDistance();
        if (distance) {
            distance = distance.toFixed(2).split('.').join(',');
        }
        this._points[0].bindLabel(distance + ' км');
    },

    _lineEvents: {
        mouseover : function (event) {
            this._lineMarkerHelper = L.marker(event.latlng, {
                draggable : true
            }).addTo(this._map).on('drag', this._movePoint, this);
        },
        mousemove : function (event) {
            this._lineMarkerHelper.setLatLng(event.latlng);
        },
        mouseout : function () {
            this._map.removeLayer(this._lineMarkerHelper);
            this._lineMarkerHelper = null;
        }
    },

    _addPoint: function (event) {
        var latlng = event.latlng,
            circleOuter = L.circleMarker(latlng, {
                color: '#fff',
                opacity: 1,
                fillColor: '#fff',
                fillOpacity: 1,
                weight: 1
            }).setRadius(13),
            circleInner = L.circleMarker(latlng, {
                color: '#0da5d5',
                opacity: 1,
                fillColor: '#0da5d5',
                fillOpacity: 1,
                weight: 1
            }).setRadius(9),
            pipka = L.circleMarker(latlng, {
                color: '#fff',
                opacity: 1,
                fillColor: '#fff',
                fillOpacity: 1,
                weight: 1
            }).setRadius(5),
            dragElement = L.marker(latlng, {
                icon : L.icon({
                    iconUrl: 'blank',
                    iconSize: [12, 12],
                    iconAnchor: [6, 6]
                }),
                opacity : 0,
                draggable: true
            });

        dragElement._rulerPointId = this._points.push(dragElement) - 1;
        dragElement
            .on('drag', function (event) {
                var latlng = event.target.getLatLng();
                circleOuter.setLatLng(latlng);
                circleInner.setLatLng(latlng);
                pipka.setLatLng(latlng);
            }).on('drag', this._movePoint, this);

        this._addLeg(event.latlng);
        this._layers.back.addLayer(circleOuter);
        this._layers.front.addLayer(circleInner);
        this._layers.front.addLayer(pipka);
        this._layers.mouse.addLayer(dragElement);
        this._layers.back.bringToBack();

        if (this._points.length == 1) {
            this._initLabel();
        } else {
            this._updateDistance();
        }
    },

    _movePoint: function (event) {
        var target = event.target;
        this._line.spliceLatLngs(target._rulerPointId, 1, target.getLatLng());
        this._backline.spliceLatLngs(target._rulerPointId, 1, target.getLatLng());
        this._updateDistance();
    },

    _addLeg: function (latlng) {
        this._line.addLatLng(latlng);
        this._backline.addLatLng(latlng);
    },

    _finishDrawing: function () {
        this._map.off('click', this._addPoint, this);
        this._map.removeLayer(this._layers);
        this._map.removeLayer(this._line);
        this._layers.clearLayers();
        this._layers = null;
        this._points.length = 0;
        this._points = null;

        if (this._label) {
            this._map.removeLayer(this._label);
            this._label = null;
        }
    },

    _renderTranslation: function () {
        this._link.title = this.t('button_title');
    }
});

L.DG.ruler = function (options) {
    return new L.DG.Ruler(options);
};