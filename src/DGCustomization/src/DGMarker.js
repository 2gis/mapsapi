// Applies 2GIS divIcon to marker
DG.Marker.prototype.options.icon = DG.divIcon(DG.configTheme.markersData);

(function() {
    var _initialize = DG.Marker.prototype.initialize;

    // support old marker clickable option, clickable is same as interactive
    DG.Marker.include({
        initialize: function (latlng, options) {
            if (options && options.clickable) {
                options.interactive = options.clickable;
            }

            _initialize.call(this, latlng, options);
        }
    });
})();