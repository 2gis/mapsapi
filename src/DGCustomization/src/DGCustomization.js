//Inject observing localization change
var controlAddTo = DG.Control.prototype.addTo;

DG.Control.include({
    addTo: function (map) {
        map.on('langchange', this._renderTranslation, this);

        return controlAddTo.call(this, map);
    },
    _renderTranslation: function () {}
});

// Applies 2GIS divIcon to marker
DG.Marker.prototype.options.icon = DG.divIcon(DG.configTheme.markersData);

// Adds posibility to change max zoom level
DG.Map.prototype.setMaxZoom = function (maxZoom) {
    this._layersMaxZoom = maxZoom;
    if (this.getZoom() > maxZoom) {
        this.setZoom(maxZoom);
    }
};

// Add some browser detection
DG.Browser.ff = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1);
DG.Browser.safari51 = (/5\.1[\.\d]* Safari/.test(navigator.userAgent));
