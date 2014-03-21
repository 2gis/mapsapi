DG.Entrance.Arrow.SVG = DG.SVG.extend({

    getEvents: function () {
        var events = {
            move: this._update
        };
        if (this._zoomAnimated) {
            events.zoomanim = this._animateZoom;
        }
        if (DG.Browser.ie) {
            events.moveend = events.mousemove = events.zoomend = this._refresh; //JSAPI-3379
        }
        return events;
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

            markerStyle.path && marker.appendChild(this._getMarkerChild('path', markerStyle.path, layer));

            markerStyle.polygon && marker.appendChild(this._getMarkerChild('polygon', markerStyle.polygon, layer));

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
            this._container.appendChild(this._defs);
        }
        return this._defs;
    },

    _updateMarker: function (layer) {
        var zoom = layer._map.getZoom(),
            url = (zoom >= DG.Entrance.SHOW_FROM_ZOOM) ? layer._markerId + '-' + zoom : '';

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

        !this.hasLayer(renderer) && this.addLayer(renderer);

        return renderer;
    }
});
