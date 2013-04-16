/**
 * Leaflet ControlZoom redefinition
 * Version 1.0.0
 *
 * Copyright (c) 2013, 2GIS, Dima Rudenko
 */
L.Control.Zoom.prototype.onAdd = function (map) {
    var zoomName = 'dg-zoom',
        container = L.DomUtil.create('div', zoomName);

    this._map = map;

    this._zoomInButton = this._createButton(
        '+', 'Zoom in', zoomName + '__in', container, this._zoomIn, this);
    this._zoomOutButton = this._createButton(
        '-', 'Zoom out', zoomName + '__out', container, this._zoomOut, this);

    map.on('zoomend zoomlevelschange', this._updateDisabled, this);

    return container;
};

L.Control.Zoom.prototype.options = {
    position: L.DG.configTheme.controls.zoom.position
};