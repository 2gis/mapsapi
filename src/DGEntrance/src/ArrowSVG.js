DG.Entrance.Arrow.SVG = DG.SVG.extend({

    _defs: null,

    // _markers: [],

    getEvents: function () {
        var events = {
            move: this._update
        };
        if (this._zoomAnimated) {
            events.zoomanim = this._animateZoom;
        }
        return events;
    },

    _initMarkers: function (layer) {
        var marker, markerPath, markerPolygon,
            optionsByZoom =  layer.options.byZoom,
            id = layer._markerId = 'arrow-marker-' + DG.Util.stamp(layer);

        // console.log(this);

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
                    markerPath.setAttribute('fill', layer.options.color);
                }
                marker.appendChild(markerPath);
                // layer._markers.push(markerPath);
            }

            if (typeof optionsByZoom[zoom].marker.polygon !== 'undefined') {
                markerPolygon = DG.SVG.create('polygon');
                markerPolygon.setAttribute('points', optionsByZoom[zoom].marker.polygon.points);
                if (typeof optionsByZoom[zoom].marker.polygon.color !== 'undefined') {
                    markerPolygon.setAttribute('fill', optionsByZoom[zoom].marker.polygon.color);
                }
                else {
                    markerPolygon.setAttribute('fill', layer.options.color);
                }
                marker.appendChild(markerPolygon);
                // layer._markers.push(markerPolygon);
            }

            layer._markers.push(marker);
            this._getDefs().appendChild(marker);
        }, this);

        // svg.insertBefore(this._getDefs(), svg.firstChild);

        this._updateMarker(layer);
    },

    _getDefs: function () {
        this._defs = this._defs || DG.SVG.create('defs');
        if (!this._defs.parentNode) {
            this._container.appendChild(this._defs);
        }
        return this._defs;
    },

    _updateMarker: function (layer) {
        var zoom = layer._map.getZoom();
        if (zoom >= DG.Entrance.SHOW_FROM_ZOOM) {
            layer._path.setAttribute('marker-end', 'url(#' + layer._markerId + '-' + zoom + ')');
        } else {
            layer._path.setAttribute('marker-end', 'url(#)');
        }
    },

    _removeMarkers: function (layer) {
        var defs = this._getDefs();
        // console.log('renderer', this, 'layer', layer);
        // console.log(defs);
        if (!defs && !layer._markers) { return; }

        layer._markers.forEach(function (marker) {
            defs.removeChild(marker);
            // layer._markers.splice(key, 1);
        });
        layer._markers.length = 0;
    },

    // _update: function () {
    //     DG.SVG.prototype._update.call(this);

    //     this._updateMarker();
    // },

    _updateStyle: function (layer) {
        var path = layer._path,
            options = layer.options;

        if (!path) { return; }
        // var optionsByZoom =  this.options.byZoom,
        //     zoom = this._map.getZoom();
        // console.log(optionsByZoom[zoom].weight, this.options.weight);

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

        path.setAttribute('visibility', options.visibility);

        layer._markers.forEach(function (path) {
            path.setAttribute('fill-opacity', options.opacity);
        });
    }
});


L.Map.include({
    getArrowRenderer: function () {
        var renderer = this._arrowRenderer;

        if (!renderer) {
            renderer = this._arrowRenderer = new DG.Entrance.Arrow.SVG();
        }

        if (!this.hasLayer(renderer)) {
            this.addLayer(renderer);
        }
        return renderer;
    }
});
