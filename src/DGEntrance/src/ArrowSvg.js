// Extends L.DG.Entrance.Arrow with SVG-specific rendering code
if (L.Browser.svg) {

    L.DG.Entrance.Arrow.include({

        _defs: null,

        _markersPath: [],

        _markersPolygons: [],

        initialize: function (latlngs, options) { // (Array, Object)
            /*jshint shadow: true */
            var options = options || {};
            /*jshint shadow: false */
            options.animation = this.getArrowAnimation(this._convertLatLngs(latlngs));

            this._markersPath = [];
            this._markersPolygons = [];

            L.Polyline.prototype.initialize.call(this, latlngs, options);
        },

        onAdd: function (map) { // (L.Map)
            L.Polyline.prototype.onAdd.call(this, map);
            this._initMarkers();

            map.on({'zoomend': this._updateMarker}, this);
            map.on({'zoomend': this._updateStyle}, this);
            map.on({'moveend': this._showMarker}, this);

            // see comments about "walking arrow" in JSAPI-3085
            map.on({'movestart': this._hideMarker}, this);
            map.on({'moveend': this._hideMarker}, this);
        },

        onRemove: function (map) { // (L.Map)
            L.Polyline.prototype.onRemove.call(this, map);
            map.off({'zoomend': this._updateMarker}, this);
            map.off({'zoomend': this._updateStyle}, this);
            map.off({'moveend': this._showMarker}, this);

            map.off({'movestart': this._hideMarker}, this);
            map.off({'moveend': this._hideMarker}, this);

            this._removeMarkers();
        },

        _initElements: function () {
            this._map._initPathRoot();
            this._initPath();
            this._initStyle();
        },

        _initMarkers: function () {
            var i, marker, markerPath, markerPolygon,
                optionsByZoom =  this.options.byZoom,
                id = this._markerId = 'arrow-marker-' + L.Util.stamp(this),
                svg = this._container.parentNode;

            this._initDefs();

            for (i in optionsByZoom) {
                if (optionsByZoom.hasOwnProperty(i)) {
                    marker = this._createElement('marker');
                    for (var key in optionsByZoom[i].marker) {
                        if (key !== 'polygon' && key !== 'path') {
                            marker.setAttribute(key, optionsByZoom[i].marker[key]);
                        }
                    }
                    marker.id = id + '-' + i;
                    marker.setAttribute('orient', 'auto');
                    marker.setAttribute('markerUnits', 'userSpaceOnUse');
                    marker.setAttribute('stroke-width', '0');

                    if (typeof optionsByZoom[i].marker.path !== 'undefined') {
                        markerPath = this._createElement('path');
                        markerPath.setAttribute('d', optionsByZoom[i].marker.path.d);
                        if (typeof optionsByZoom[i].marker.path.color !== 'undefined') {
                            markerPath.setAttribute('fill', optionsByZoom[i].marker.path.color);
                        }
                        else {
                            markerPath.setAttribute('fill', this.options.color);
                        }
                        marker.appendChild(markerPath);
                        this._markersPath.push(markerPath);
                    }

                    if (typeof optionsByZoom[i].marker.polygon !== 'undefined') {
                        markerPolygon = this._createElement('polygon');
                        markerPolygon.setAttribute('points', optionsByZoom[i].marker.polygon.points);
                        if (typeof optionsByZoom[i].marker.polygon.color !== 'undefined') {
                            markerPolygon.setAttribute('fill', optionsByZoom[i].marker.polygon.color);
                        }
                        else {
                            markerPolygon.setAttribute('fill', this.options.color);
                        }
                        marker.appendChild(markerPolygon);
                        this._markersPolygons.push(markerPolygon);
                    }

                    this._defs.appendChild(marker);

                }
            }

            svg.insertBefore(this._defs, svg.firstChild);
            this._updateMarker();
        },

        _initDefs: function () {
            if (!this._defs) {
                this._defs = this._createElement('defs');
            }
            return this._defs;
        },

        _removeMarkers: function () {
            var defs = this._defs;
            if (defs) {
                defs.parentNode.removeChild(defs);
            }
        },

        _updateMarker: function () {
            var zoom = this._map.getZoom();
            if (zoom >= L.DG.Entrance.SHOW_FROM_ZOOM) {
                this._showMarker();
            } else {
                this._hideMarker(false);
            }
        },

        _showMarker: function () {
            var zoom = this._map.getZoom();

            if (zoom >= L.DG.Entrance.SHOW_FROM_ZOOM) {
                this._path.setAttribute('marker-end', 'url(#' + this._markerId + '-' + zoom + ')');
            }
        },

        _hideMarker: function (onlyOutsideViewport) { // (Boolean)
            var origPoints = this._originalPoints,
                endPoint;

            if (typeof onlyOutsideViewport === 'undefined') {
                onlyOutsideViewport = true;
            }

            if (onlyOutsideViewport) {
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
            var optionsByZoom =  this.options.byZoom,
                zoom = this._map.getZoom(),
                i;

            L.Polyline.prototype._updateStyle.call(this);

            if (typeof optionsByZoom[zoom] !== 'undefined' &&
                typeof optionsByZoom[zoom].weight !== 'undefined') {
                this._path.setAttribute('stroke-width', optionsByZoom[zoom].weight);
            }

            if (typeof this.options.visibility !== 'undefined') {
                this._path.setAttribute('visibility', this.options.visibility);
            }

            for (i = 0; i < this._markersPath.length; i++) {
                this._markersPath[i].setAttribute('fill-opacity', this.options.opacity);
            }

            for (i = 0; i < this._markersPolygons.length; i++) {
                this._markersPolygons[i].setAttribute('fill-opacity', this.options.opacity);
            }
        }
    });

}
