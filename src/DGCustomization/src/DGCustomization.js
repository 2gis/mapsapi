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
};

// Improve IHandler

L.Map.include({
	addHandler: function (name, HandlerClass) {
		if (!HandlerClass) { return; }

		var options = this.options[name],
			param = (options === Object(options)) ? options : null,
			handler = this[name] = new HandlerClass(this, param);

		this._handlers.push(handler);

		if (options) {
			handler.enable();
		}

		return this;
	}
});
