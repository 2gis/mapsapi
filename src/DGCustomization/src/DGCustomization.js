//Inject observing localization change
var controlAddTo = L.Control.prototype.addTo;

L.Control.include({
    addTo: function (map) {
        map.on('dgLangChange', this._renderTitles, this);

        return controlAddTo.call(this, map);
    },
    _renderTitles: function () {}
});


// Applies 2GIS divIcon to marker
L.Marker.prototype.options.icon = L.DG.divIcon();

// Adds posibility to change max zoom level
L.Map.prototype.setMaxZoom = function (maxZoom) {
    this._layersMaxZoom = maxZoom;
};