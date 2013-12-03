//Inject observing localization change
var controlAddTo = L.Control.prototype.addTo;

L.Control.include({
    addTo: function (map) {
        map.on('dgLangChange', this._renderTranslation, this);

        return controlAddTo.call(this, map);
    },
    _renderTranslation: function () {}
});

// Applies 2GIS divIcon to marker
L.Marker.prototype.options.icon = L.divIcon(L.DG.configTheme.markersData);

// Adds posibility to change max zoom level
L.Map.prototype.setMaxZoom = function (maxZoom) {
    this._layersMaxZoom = maxZoom;
    if (this.getZoom() > maxZoom) {
        this.setZoom(maxZoom);
    }
};