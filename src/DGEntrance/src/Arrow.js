L.DG.Entrance.Arrow = L.Polyline.extend({

    _markers: {},

    initialize: function (latlngs, options) { // (Array, Object)
        var options = options || {},
            animation = this.getArrowAnimation(latlngs.length);

        options.animation = [animation];

        L.Polyline.prototype.initialize.call(this, latlngs, options);
    },

    _initElements: function () {
        this._map._initPathRoot();
        this._initPath();
        this._initMarkers();
        this._initStyle();

        this._map.on({'zoomend': this._updateMarker}, this);
    },

    _initMarkers: function () {
        var i, marker, markerPath,
            markers =  this.options.marker,
            id = this._markerId = 'arrow-marker-' + L.Util.stamp(this);

        for (i in markers) {
            if (markers.hasOwnProperty(i)) {
                marker = this._createElement('marker', markers[i].attr);
                marker.id = id + '-' + i;
                markerPath = this._createElement('path', markers[i].path);
                marker.appendChild(markerPath);
                this._markers[marker.id] = marker;
                this._path.parentNode.appendChild(marker);
            }
        }

        this._updateMarker();
    },

    _updateMarker: function() {
        var zoom = this._map.getZoom();
        this._path.setAttribute('marker-end', 'url(#' + this._markerId + '-' + zoom + ')');
    }
});

L.DG.Entrance.arrow = function (latlngs, options) {
    return new L.DG.Entrance.Arrow(latlngs, options);
};
