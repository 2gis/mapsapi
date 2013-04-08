/**
 * Leaflet DG ControlZoom
 * Version 1.0.0
 *
 * Copyright (c) 2013, 2GIS, Dima Rudenko
 */

L.DG = L.DG || {};
L.DG.ControlZoom = L.Control.Zoom.extend({
    options: {
        position: L.DG.configTheme.controls.zoom.position
    },

    initialize: function () {
        L.Control.prototype.initialize.call(this);
    },

    onAdd: function (map) {
        var zoomName = 'dg-zoom',
            container = L.DomUtil.create('div', zoomName + ' leaflet-bar');

        this._map = map;

        this._zoomInButton = this._createButton(
            '+', 'Zoom in', zoomName + '__in', container, this._zoomIn, this);
        this._zoomOutButton = this._createButton(
            '-', 'Zoom out', zoomName + '__out', container, this._zoomOut, this);

        map.on('zoomend zoomlevelschange', this._updateDisabled, this);

        return container;
    }
});

L.Map.mergeOptions({
    zoomControl: false
});

L.Map.addInitHook(function () {
    this.dgZoomControl = new L.DG.ControlZoom();
    this.addControl(this.dgZoomControl);

});

L.DG.controlZoom = function (options) {
    return new L.DG.ControlZoom(options);
};