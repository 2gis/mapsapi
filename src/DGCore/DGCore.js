/**
 * Leaflet 2GIS redefinition
 * Version 1.0.0
 *
 * Copyright (c) 2013, 2GIS, Dima Rudenko
 */


/**
 * Zoom 2GIS redefinition
 *
 */
L.DG = L.DG || {};

L.DG.loaderParams = window.loaderBackup;

window.loaderBackup = undefined;

L.Control.Zoom.prototype.options = {
    position: L.DG.configTheme.controls.zoom.position
};

//@todo remove copypasted code from Leaflet
L.Control.Zoom.prototype.onAdd = function (map) {
    var zoomName = 'dg-zoom',
        container = L.DomUtil.create('div', zoomName);

    this._map = map;

    this._zoomInButton = this._createButton('+', 'Приблизить', zoomName + '__in', container, this._zoomIn, this);
    this._zoomOutButton = this._createButton('-', 'Отдалить', zoomName + '__out', container, this._zoomOut, this);

    map.on('zoomend zoomlevelschange', this._updateDisabled, this);

    return container;
};

/**
 * Popup 2GIS redefinition
 *
 */

(function () {
    var offsetX = L.DG.configTheme.balloonOptions.offset.x,
        offsetY = L.DG.configTheme.balloonOptions.offset.y,
        originalSetContent = L.Popup.prototype.setContent;

    L.Popup.prototype.options.offset = L.point(offsetX, offsetY);

    L.Popup.prototype.setContent = function (content) {
        if (typeof content === 'string') {
            content = '<div class="dg-callout">' + content + '</div>';
        } else {
            content = L.DomUtil.create('div', 'dg-callout').appendChild(content);
        }

        return originalSetContent.call(this, content);
    };

}());
L.Popup.include({
    _close: function () {
        var map = this._map;

        if (this._markerIcon) {
            L.DomUtil.removeClass(this._markerIcon, 'leaflet-marker-active');
        }

        if (map) {
            map._popup = null;

            map
                .removeLayer(this)
                .fire('popupclose', {popup: this});
        }
    }
});


/**
 * Marker 2GIS redefinition
 *
 */
L.Marker.prototype.options.icon = L.DG.divIcon();