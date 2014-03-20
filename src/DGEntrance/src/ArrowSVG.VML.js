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
        var options = layer.options,
            container = layer._container;

        DG.SVG.prototype._updateStyle.call(this, layer);

        if (options.visibility) {
            container.style.visibility = options.visibility;
        }
    }
});