L.DG.Ruler = L.Control.extend({
    includes: L.DG.Locale,

    statics: {
        Dictionary: {}
    },

    options: {
        position: 'topright'
    },

    _active: false,
    _layers: null,

    _line: null,
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
        if (this._active) {
            console.log('lets finish');
            this._finishDrawing();
        } else {
            console.log('lets go');
            this._startDrawing();
        }
        this._active = !this._active;
    },

    _startDrawing: function () {
        this._map.on('click', this._addPoint, this);
        this._layers = L.featureGroup().addTo(this._map);
        this._line = L.polyline([], {
            color: 'blue',
            noClip : true
        }).addTo(this._map).on(this._lineEvents, this);
        this._points = [];
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
        mouseout : function (event) {
            this._map.removeLayer(this._lineMarkerHelper);
            this._lineMarkerHelper = null;
        }
    },

    _addPoint: function (event) {
        var marker = L.marker(event.latlng, { draggable : true }).on('drag', this._movePoint, this);

        marker._rulerPointId = this._points.push(marker) - 1;
        this._addLeg(event.latlng);
        this._layers.addLayer(marker);
    },

    _movePoint: function (event) {
        var target = event.target;
        this._line.spliceLatLngs(target._rulerPointId, 1, target.getLatLng());
    },

    _addLeg: function (latlng) {
        this._line.addLatLng(latlng);
    },

    _finishDrawing: function () {
        this._map.off('click', this._addPoint, this);
        this._map.removeLayer(this._layers);
        this._map.removeLayer(this._line);
        this._layers.clearLayers();
        this._layers = null;
        this._points.length = 0;
        this._points = null;
    },

    _renderTranslation: function () {
        this._link.title = this.t('button_title');
    }
});

L.DG.ruler = function (options) {
    return new L.DG.Ruler(options);
};