L.DG.Entrance.Arrow = L.Polyline.extend({

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
    },

    _initMarkers: function () {
        var i, marker, markerPath,
            optionsByZoom =  this.options.byZoom,
            id = this._markerId = 'arrow-marker-' + L.Util.stamp(this);

        for (i in optionsByZoom) {
            if (optionsByZoom.hasOwnProperty(i)) {
                marker = this._createElement('marker', optionsByZoom[i].marker);
                marker.id = id + '-' + i;
                markerPath = this._createElement('path', optionsByZoom[i].markerPath);
                marker.appendChild(markerPath);
                this._path.parentNode.appendChild(marker);
            }
        }

        this._updateMarker();
    },

    onAdd: function(map){
        L.Path.prototype.onAdd.call(this, map);
        map.on({'zoomend': this._updateMarker}, this);
    },

    onRemove: function(map){
       L.Path.prototype.onRemove.call(this, map);
       map.off({'zoomend': this._updateMarker}, this);
    },

    _updatePath: function () {
        L.Polyline.prototype._updatePath.call(this);
        this._offsetPath();
    },

    _offsetPath: function () {
        var origPoints = this._originalPoints,
            byZoom = this.options.byZoom,
            zoom = this._map.getZoom(),
            offsetVector,
            offsetVectorInPercents,
            offsetTo;

        if (typeof byZoom[zoom] !== 'undefined') {
            var offsetX = byZoom[zoom].marker.refX / 2;
            var offsetY = byZoom[zoom].marker.refY / 2;

            for (var i = 1; i < origPoints.length; i++) {
                offsetVector = {
                    x: origPoints[i].x - origPoints[i-1].x,
                    y: origPoints[i].y - origPoints[i-1].y
                }
                offsetVectorInPercents = {
                    x: Math.abs(offsetX / offsetVector.x),
                    y: Math.abs(offsetY / offsetVector.y)
                }
                
                offsetTo = {
                    x: offsetVector.x * offsetVectorInPercents.x,
                    y: offsetVector.y * offsetVectorInPercents.y
                }

                origPoints[i].x -= offsetTo.x;
                origPoints[i].y -= offsetTo.y;
                if (i === 1) {
                    origPoints[0].x -= offsetTo.x;
                    origPoints[0].y -= offsetTo.y;                    
                };
            };
        };
    },

    _updateMarker: function() {
        var zoom = this._map.getZoom();
        if (zoom >= L.DG.Entrance.SHOW_FROM_ZOOM) {
            this._path.setAttribute('marker-end', 'url(#' + this._markerId + '-' + zoom + ')');
        } else {
            this._path.setAttribute('marker-end', 'url(#)');
        }
    }
});

L.DG.Entrance.arrow = function (latlngs, options) {
    return new L.DG.Entrance.Arrow(latlngs, options);
};
