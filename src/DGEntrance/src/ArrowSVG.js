DG.Entrance.Arrow.SVG = DG.SVG.extend({

    getEvents: function () {
        var events = {
            viewreset: this._reset,
            zoom: this._onZoom,
            moveend: this._onMoveEnd
        };
        if (this._zoomAnimated) {
            events.zoomanim = this._onAnimZoom;
        }
        if (DG.Browser.ie) {
            events.mousemove = events.zoomend = this._refresh; //JSAPI-3379
        }
        return events;
    },

    _onMoveEnd: function (e) {
        if (DG.Browser.ie) {
            this._refresh();
        }

        this._update(e);
    },

    _initMarkers: function (layer) {
        var marker, markerStyle,
            optionsByZoom =  layer.options.byZoom,
            id = layer._markerId = 'arrow-marker-' + DG.Util.stamp(layer);

        Object.keys(optionsByZoom).map(function (zoom) {
            marker = DG.SVG.create('marker');
            markerStyle = optionsByZoom[zoom].marker;

            Object.keys(markerStyle)
                .filter(function (key) {
                    return key !== 'polygon' && key !== 'path';
                })
                .forEach(function (key) {
                    marker.setAttribute(key, markerStyle[key]);
                });

            marker.id = id + '-' + zoom;
            marker.setAttribute('orient', 'auto');
            marker.setAttribute('markerUnits', 'userSpaceOnUse');
            marker.setAttribute('stroke-width', '0');

            if (markerStyle.path) {
                marker.appendChild(this._getMarkerChild('path', markerStyle.path, layer));
            }

            if (markerStyle.polygon) {
                marker.appendChild(this._getMarkerChild('polygon', markerStyle.polygon, layer));
            }


            layer._markers.push(marker);
            this._getDefs().appendChild(marker);
        }, this);

        this._updateMarker(layer);
    },

    _getMarkerChild: function (type, options, layer) {
        var markerPath = DG.SVG.create('path'),
            vector = (type === 'path') ? 'd' : 'points';

        markerPath.setAttribute(vector, options[vector]);

        markerPath.setAttribute('fill', options.color ? options.color : layer.options.color);

        return markerPath;
    },

    _getDefs: function () {
        this._defs = this._defs || DG.SVG.create('defs');
        if (!this._defs.parentNode) {
            if (this._container.childElementCount) {
                this._container.insertBefore(this._defs, this._container.firstChild);
            } else {
                this._container.appendChild(this._defs);
            }
        }
        return this._defs;
    },

    _updateMarker: function (layer) {
        if (!layer._map) { return; }

        var zoom = layer._map.getZoom(),
            bound = layer._map.getBounds(),
            lastPoint = layer._latlngs[layer._latlngs.length - 1],
            url = (zoom >= DG.Entrance.SHOW_FROM_ZOOM && bound.contains(lastPoint)) ? layer._markerId + '-' + zoom : '';

        layer._path.setAttribute('marker-end', 'url(#' + url + ')');
    },

    _removeMarkers: function (layer) {
        var defs = this._getDefs(),
            markers = layer._markers;

        if (!defs && !markers) { return; }

        markers.forEach(function (marker) {
            defs.removeChild(marker);
        });
        markers.length = 0;
    },

    _refresh: function () {
        this._container.parentNode.insertBefore(this._container, this._container);
    },

    _updateStyle: function (layer) {
        var path = layer._path,
            options = layer.options;

        DG.SVG.prototype._updateStyle.call(this, layer);

        path.setAttribute('visibility', options.visibility);

        layer._markers.forEach(function (marker) {
            marker.setAttribute('fill-opacity', options.opacity);

            var paths = marker.getElementsByTagName('path');

            for (var i = 0; i < paths.length; i++) {
                paths[i].setAttribute('fill', options.color);
            }
        });

        this._updateMarker(layer);
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
