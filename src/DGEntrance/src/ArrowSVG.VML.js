// redefine some SVG methods to handle VML syntax which is similar but with some differences
DG.Entrance.Arrow.SVG.include(!L.Browser.vml ? {} : {

    _initMarkers: function (layer) {
        layer._markers = L.SVG.create('stroke');
        this._updateMarker(layer);
        layer._container.appendChild(layer._markers);
    },

    _updateMarker: function (layer) {
        var style = layer.options.byZoom[layer._map.getZoom()];

        layer._markers.endarrow =
            (style && style.vmlEndArrow) ? style.vmlEndArrow : 'classic';
        console.log(layer._markers);
    },

    _removeMarkers: function (layer) {
        layer._container.removeChild(layer._markers);
    },

    _updateStyle: function (layer) {
	    var stroke = layer._stroke,
            fill = layer._fill,
            options = layer.options,
            container = layer._container;

        container.stroked = !!options.stroke;
        container.filled = !!options.fill;

        if (options.stroke) {
            if (!stroke) {
                stroke = layer._stroke = L.SVG.create('stroke');
                container.appendChild(stroke);
            }
            stroke.weight = options.weight + 'px';
            stroke.color = options.color;
            stroke.opacity = options.opacity;

            if (options.dashArray) {
                stroke.dashStyle = L.Util.isArray(options.dashArray) ?
                    options.dashArray.join(' ') :
                    options.dashArray.replace(/( *, *)/g, ' ');
            } else {
                stroke.dashStyle = '';
            }
            stroke.endcap = options.lineCap.replace('butt', 'flat');
            stroke.joinstyle = options.lineJoin;

        } else if (stroke) {
            container.removeChild(stroke);
            layer._stroke = null;
        }

        if (options.fill) {
            if (!fill) {
                fill = layer._fill = L.SVG.create('fill');
                container.appendChild(fill);
            }
            fill.color = options.fillColor || options.color;
            fill.opacity = options.fillOpacity;

        } else if (fill) {
            container.removeChild(fill);
            layer._fill = null;
        }

        if (options.visibility) {
            layer.getContainer().style.visibility = options.visibility;
        }
    }
});