// Extends DG.Entrance.Arrow with SVG-specific rendering code
if (DG.Browser.svg) {

    DG.Entrance.Arrow.include({

        _defs: null,

        _markersPath: [],

        _markersPolygons: [],

        initialize: function (latlngs, options) { // (Array, Object)
            this._setLatLngs(latlngs);
            /*jshint shadow: true */
            var options = options || {};
            /*jshint shadow: false */
            options.animation = this.getArrowAnimation(this._convertLatLngs(latlngs));

            this._markersPath = [];
            this._markersPolygons = [];

            L.setOptions(this, options);
            // console.log(this);
        },

        onAdd: function (map) { // (DG.Map)
            DG.Polyline.prototype.onAdd.call(this, map);
            // this._renderer._updateStyle = this._updateStyle;
            // console.log(this._renderer);
            this._initMarkers();

            // map.on({'zoomend': this._updateMarker}, this);
            // map.on({'zoomend': this._updateStyleByZoom}, this);
            // map.on({'moveend': this._showMarker}, this);

            // see comments about "walking arrow" in JSAPI-3085
            // map.on({'movestart': this._hideMarker}, this);
            // map.on({'moveend': this._hideMarker}, this);
        },

        onRemove: function (map) { // (DG.Map)
            DG.Polyline.prototype.onRemove.call(this, map);

            // map.off({'zoomend': this._updateMarker}, this);
            // map.off({'zoomend': this._updateStyleByZoom}, this);
            // map.off({'moveend': this._showMarker}, this);

            // map.off({'movestart': this._hideMarker}, this);
            // map.off({'moveend': this._hideMarker}, this);

            this._removeMarkers();
        },

        getEvents: function () {
            return {
                viewreset: this._project,
                moveend: this._update,
                drag: this._update,
                zoomend: this._updateStyleByZoom
            };
        },



        // _initElements: function () {
        //     this._map._initPathRoot();
        //     this._renderer._initPath();
        //     this._renderer._initStyle();
        // },

        _initMarkers: function () {
            var marker, markerPath, markerPolygon,
                optionsByZoom =  this.options.byZoom,
                id = this._markerId = 'arrow-marker-' + DG.Util.stamp(this),
                svg = this.getContainer();

            Object.keys(optionsByZoom).map(function (zoom) {
                marker = DG.SVG.create('marker');
                Object.keys(optionsByZoom[zoom].marker)
                    .filter(function (key) {
                        return key !== 'polygon' && key !== 'path';
                    })
                    .forEach(function (key) {
                        marker.setAttribute(key, optionsByZoom[zoom].marker[key]);
                    });

                marker.id = id + '-' + zoom;
                marker.setAttribute('orient', 'auto');
                marker.setAttribute('markerUnits', 'userSpaceOnUse');
                marker.setAttribute('stroke-width', '0');

                if (typeof optionsByZoom[zoom].marker.path !== 'undefined') {
                    markerPath = DG.SVG.create('path');
                    markerPath.setAttribute('d', optionsByZoom[zoom].marker.path.d);
                    if (typeof optionsByZoom[zoom].marker.path.color !== 'undefined') {
                        markerPath.setAttribute('fill', optionsByZoom[zoom].marker.path.color);
                    }
                    else {
                        markerPath.setAttribute('fill', this.options.color);
                    }
                    marker.appendChild(markerPath);
                    this._markersPath.push(markerPath);
                }

                if (typeof optionsByZoom[zoom].marker.polygon !== 'undefined') {
                    markerPolygon = DG.SVG.create('polygon');
                    markerPolygon.setAttribute('points', optionsByZoom[zoom].marker.polygon.points);
                    if (typeof optionsByZoom[zoom].marker.polygon.color !== 'undefined') {
                        markerPolygon.setAttribute('fill', optionsByZoom[zoom].marker.polygon.color);
                    }
                    else {
                        markerPolygon.setAttribute('fill', this.options.color);
                    }
                    marker.appendChild(markerPolygon);
                    this._markersPolygons.push(markerPolygon);
                }

                this._getDefs().appendChild(marker);
            }, this);

            // svg.insertBefore(this._getDefs(), svg.firstChild);
            svg.appendChild(this._getDefs());
            this._updateMarker();
        },

        _getDefs: function () {
            this._defs = this._defs || DG.SVG.create('defs');
            return this._defs;
        },

        _removeMarkers: function () {
            var defs = this._getDefs();
            if (defs) {
                defs.parentNode.removeChild(defs);
            }
        },

        _update: function () {
            DG.Polyline.prototype._update.call(this);

            this._updateMarker();
        },

        _updateMarker: function () {
            var zoom = this._map.getZoom();
            if (zoom >= DG.Entrance.SHOW_FROM_ZOOM) {
                this._showMarker();
            } else {
                this._hideMarker(false);
            }
        },

        _showMarker: function () {
            var zoom = this._map.getZoom();

            if (zoom >= DG.Entrance.SHOW_FROM_ZOOM) {
                this._path.setAttribute('marker-end', 'url(#' + this._markerId + '-' + zoom + ')');
            }
        },

        _hideMarker: function (onlyOutsideViewport) { // (Boolean)
            // var origPoints = this._originalPoints,
            var origPoints = this._latlngs,
                endPoint;

            if (typeof onlyOutsideViewport === 'undefined') {
                onlyOutsideViewport = true;
            }

            if (onlyOutsideViewport) {
                endPoint = origPoints[origPoints.length - 1];
                if (!this._map.getBounds().contains(endPoint)) {
                    this._path.setAttribute('marker-end', 'url(#)');
                }
            }
            else {
                this._path.setAttribute('marker-end', 'url(#)');
            }
        },

        _updateStyleByZoom: function () {
            var optionsByZoom = this.options.byZoom,
                zoom = this._map.getZoom();

            this.setStyle(optionsByZoom[zoom]);
        },

        _updateStyle: function (layer) {
            var path = layer._path,
                options = layer.options;

            if (!path) { return; }

            if (options.stroke) {
                path.setAttribute('stroke', options.color);
                path.setAttribute('stroke-opacity', options.opacity);
                path.setAttribute('stroke-width', options.weight);
                path.setAttribute('stroke-linecap', options.lineCap);
                path.setAttribute('stroke-linejoin', options.lineJoin);

                if (options.dashArray) {
                    path.setAttribute('stroke-dasharray', options.dashArray);
                } else {
                    path.removeAttribute('stroke-dasharray');
                }

            } else {
                path.setAttribute('stroke', 'none');
            }

            if (options.fill) {
                path.setAttribute('fill', options.fillColor || options.color);
                path.setAttribute('fill-opacity', options.fillOpacity);
                path.setAttribute('fill-rule', 'evenodd');
            } else {
                path.setAttribute('fill', 'none');
            }

            path.setAttribute('pointer-events', options.pointerEvents || (options.clickable ? 'auto' : 'none'));

            // var optionsByZoom =  options.byZoom,
            //     zoom = layer._map.getZoom(),
            //     i;

            // console.log(DG.Polyline.prototype._updateStyle);
            // DG.Polyline.prototype._renderer._updateStyle.call(layer);

            // if (typeof optionsByZoom[zoom] !== 'undefined' &&
            //     typeof optionsByZoom[zoom].weight !== 'undefined') {
            //     layer._path.setAttribute('stroke-width', optionsByZoom[zoom].weight);
            // }

            // if (typeof layer.options.visibility !== 'undefined') {
            path.setAttribute('visibility', options.visibility);
            // }

            layer._markersPath.forEach(function (path) {
                path.setAttribute('fill-opacity', options.opacity);
            });

            layer._markersPolygons.forEach(function (path) {
                path.setAttribute('fill-opacity', options.opacity);
            });
            // for (i = 0; i < layer._markersPath.length; i++) {
            //     layer._markersPath[i].setAttribute('fill-opacity', options.opacity);
            // }

            // for (i = 0; i < layer._markersPolygons.length; i++) {
            //     layer._markersPolygons[i].setAttribute('fill-opacity', options.opacity);
            // }
        }
    });

}
