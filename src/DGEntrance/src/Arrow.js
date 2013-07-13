L.DG.Entrance.Arrow = L.Polyline.extend({

    _markersPath: [],

    initialize: function (latlngs, options) { // (Array, Object)
        var options = options || {},
            animation = this.getArrowAnimation(latlngs.length);

        options.animation = [animation];

        L.Polyline.prototype.initialize.call(this, latlngs, options);
    },

    onAdd: function(map){
        L.Path.prototype.onAdd.call(this, map);
        map.on({'zoomend': this._updateMarker}, this);
    },

    onRemove: function(map){
       L.Path.prototype.onRemove.call(this, map);
       map.off({'zoomend': this._updateMarker}, this);
    },

    projectLatlngs: function () {
        L.Polyline.prototype.projectLatlngs.call(this);
        this._offsetLastPathPoint();
    },

    _initElements: function () {
        this._map._initPathRoot();
        this._initPath();
        this._initMarkers();
        this._initStyle();
    },

    _initMarkers: function () {
        var i, marker, markerPath,
            optionsByZoom =  this.options.byZoom,
            id = this._markerId = 'arrow-marker-' + L.Util.stamp(this);

        for (i in optionsByZoom) {
            if (optionsByZoom.hasOwnProperty(i)) {
                marker = this._createElement('marker', optionsByZoom[i].marker);
                marker.id = id + '-' + i;
                marker.setAttribute('orient', 'auto');
                marker.setAttribute('markerUnits', 'userSpaceOnUse');
                
                markerPath = this._createElement('path', optionsByZoom[i].markerPath);
                markerPath.setAttribute('fill', this.options.color);

                marker.appendChild(markerPath);
                this._path.parentNode.appendChild(marker);
                this._markersPath.push(markerPath);
            }
        }
        this._updateMarker();
    },

    _offsetLastPathPoint: function () {
        var origPoints = this._originalPoints,
            pointsLen = origPoints.length,
            byZoom = this.options.byZoom,
            zoom = this._map.getZoom(),
            offsetVector,
            offsetPercents,
            offsetTo;

        if (typeof byZoom[zoom] !== 'undefined') {
            offsetVector = {
                x: origPoints[pointsLen - 1].x - origPoints[pointsLen - 2].x,
                y: origPoints[pointsLen - 1].y - origPoints[pointsLen - 2].y
            };

            offsetPercents = { // lastPointOffset = N % of offsetVector
                x: Math.abs((byZoom[zoom].lastPointOffset * 100) / offsetVector.x),
                y: Math.abs((byZoom[zoom].lastPointOffset * 100) / offsetVector.y)
            };

            offsetTo = { // lastPointOffset less than offsetVector N times
                x: parseInt(offsetVector.x / (100 / offsetPercents.x)),
                y: parseInt(offsetVector.y / (100 / offsetPercents.y))
            };

            // move last point back by offsetVector direction
            origPoints[pointsLen - 1].x -= offsetTo.x;
            origPoints[pointsLen - 1].y -= offsetTo.y;
        };
    },

    _updateMarker: function() {
        var zoom = this._map.getZoom();
        if (zoom >= L.DG.Entrance.SHOW_FROM_ZOOM) {
            this._path.setAttribute('marker-end', 'url(#' + this._markerId + '-' + zoom + ')');
        } else {
            this._path.setAttribute('marker-end', 'url(#)');
        }
    },

    _updateStyle: function () {
        L.Polyline.prototype._updateStyle.call(this);

        for (var i = 0; i < this._markersPath.length; i++) {
            this._markersPath[i].setAttribute('fill-opacity', this.options.opacity);
        };
    },    
});

L.DG.Entrance.arrow = function (latlngs, options) {
    return new L.DG.Entrance.Arrow(latlngs, options);
};
