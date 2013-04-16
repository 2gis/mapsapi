/**
 * Leaflet ControlZoom redefinition
 * Version 1.0.0
 *
 * Copyright (c) 2013, 2GIS, Dima Rudenko
 */

L.Control.Zoom.prototype.options = {
    position: L.DG.configTheme.controls.zoom.position
};

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


L.Popup.prototype._initLayout = function () {
    var prefix = 'leaflet-popup',
        containerClass = prefix + ' ' + this.options.className + ' leaflet-zoom-' +
            (this._animated ? 'animated' : 'hide'),
        container = this._container = L.DomUtil.create('div', containerClass),
        closeButton;

    if (this.options.closeButton) {
        closeButton = this._closeButton =
            L.DomUtil.create('a', prefix + '-close-button', container);
        closeButton.href = '#close';
        closeButton.innerHTML = '&#215;';
        L.DomEvent.disableClickPropagation(closeButton);

        L.DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);
    }

    var wrapper = this._wrapper =
        L.DomUtil.create('div', prefix + '-content-wrapper', container);
    L.DomEvent.disableClickPropagation(wrapper);

    this._contentNode = L.DomUtil.create('div', prefix + '-content dg-callout ', wrapper);
    L.DomEvent.on(this._contentNode, 'mousewheel', L.DomEvent.stopPropagation);

    this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
    this._tip = L.DomUtil.create('div', prefix + '-tip', this._tipContainer);
};