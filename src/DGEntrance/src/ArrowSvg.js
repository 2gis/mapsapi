// Extends L.DG.Entrance.Arrow with SVG-specific rendering code
if (L.Browser.svg) {

    L.DG.Entrance.Arrow.include({

        initialize: function (latlngs, options) { // (Array, Object)
            var options = options || {},
                animation = this.getArrowAnimation(latlngs.length);

            options.animation = [animation];
            this._markersPath = [];

            L.Polyline.prototype.initialize.call(this, latlngs, options);
        },

        onAdd: function(map){
            L.Path.prototype.onAdd.call(this, map);
            map.on({'zoomend': this._updateMarker}, this);
            map.on({'movestart': this._hideMarker}, this);
            map.on({'moveend': this._showMarker}, this);
        },

        onRemove: function(map){
            L.Path.prototype.onRemove.call(this, map);
            map.off({'zoomend': this._updateMarker}, this);
            map.off({'movestart': this._hideMarker}, this);
            map.off({'moveend': this._showMarker}, this);
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
                    marker = this._createElement('marker');
                    for (var key in optionsByZoom[i].marker) {
                        marker.setAttribute(key, optionsByZoom[i].marker[key]);
                    }
                    marker.id = id + '-' + i;
                    marker.setAttribute('orient', 'auto');
                    marker.setAttribute('markerUnits', 'userSpaceOnUse');
                    marker.setAttribute('stroke-width', '0');

                    markerPath = this._createElement('path');
                    markerPath.setAttribute('d', optionsByZoom[i].markerPath.d);
                    markerPath.setAttribute('fill', this.options.color);

                    marker.appendChild(markerPath);
                    this._path.parentNode.appendChild(marker);
                    this._markersPath.push(markerPath);
                }
            }
            this._updateMarker();
        },

        _updateMarker: function() {
            var zoom = this._map.getZoom();
            if (zoom >= L.DG.Entrance.SHOW_FROM_ZOOM) {
                this._showMarker();
            } else {
                this._hideMarker(false);
            }
        },

        _showMarker: function() {
            var zoom = this._map.getZoom();
            this._path.setAttribute('marker-end', 'url(#' + this._markerId + '-' + zoom + ')');
        },

        _hideMarker: function(detectViewport) {
            var origPoints = this._originalPoints,
                endPoint;

            if (typeof detectViewport === 'undefined') {
                detectViewport = true;
            }

            if (detectViewport) {
                endPoint = origPoints[origPoints.length - 1];       
                if (!this._map._pathViewport.contains(endPoint)) {
                    this._path.setAttribute('marker-end', 'url(#)');
                }
            }
            else {
                this._path.setAttribute('marker-end', 'url(#)');
            }
        },

        _updateStyle: function () {
            L.Polyline.prototype._updateStyle.call(this);

            for (var i = 0; i < this._markersPath.length; i++) {
                this._markersPath[i].setAttribute('fill-opacity', this.options.opacity);
            }
        }
    });

}
