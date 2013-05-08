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
L.Control.Zoom.prototype.options = {
    position: L.DG.configTheme.controls.zoom.position
};

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
        offsetY = L.DG.configTheme.balloonOptions.offset.y;

    L.Popup.prototype.options = {
        minWidth: 50,
        maxWidth: 310,
        maxHeight: null,
        autoPan: true,
        closeButton: true,
        offset: new L.Point(offsetX, offsetY),
        autoPanPadding: new L.Point(5, 5),
        className: '',
        zoomAnimation: true
    };

    L.Popup.prototype._initLayout = function () {
        var prefix = 'leaflet-popup',
            containerClass = prefix + ' ' + this.options.className + ' leaflet-zoom-' + (this._animated ? 'animated' : 'hide'),
            container = this._container = L.DomUtil.create('div', containerClass),
            closeButton;

        if (this.options.closeButton) {
            closeButton = this._closeButton = L.DomUtil.create('a', prefix + '-close-button', container);
            closeButton.href = '#close';
            closeButton.innerHTML = '&#215;';
            L.DomEvent.disableClickPropagation(closeButton);
            L.DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);
        }

        var wrapper = this._wrapper = L.DomUtil.create('div', prefix + '-content-wrapper', container);
        L.DomEvent.disableClickPropagation(wrapper);

        this._contentNode = L.DomUtil.create('div', prefix + '-content dg-callout ', wrapper);
        L.DomEvent.on(this._contentNode, 'mousewheel', L.DomEvent.stopPropagation);

        this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
        this._tip = L.DomUtil.create('div', prefix + '-tip', this._tipContainer);
        L.DomEvent.addListener(this._tipContainer, 'click', function(event) {
            L.DomEvent.stopPropagation(event);
        });
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
L.Marker.prototype.options = {
    icon: L.DG.divIcon(),
    title: '',
    clickable: true,
    draggable: false,
    zIndexOffset: 0,
    opacity: 1,
    riseOnHover: false,
    riseOffset: 250
};


/**
 * Marker + popup bindPopup redefinition
 *
 */
L.Marker.include({
    openPopup: function () {
        if (this._popup && this._map && !this._map.hasLayer(this._popup)) {
            this._popup.setLatLng(this._latlng);
            this._map.openPopup(this._popup);
            // Mark icon as active
            L.DomUtil.addClass(this._icon, 'leaflet-marker-active');
        } else if (this._popup && this._map && this._map.hasLayer(this._popup)) {
            this._map.closePopup(this._popup);
            // Unmark icon as inactive
            L.DomUtil.removeClass(this._icon, 'leaflet-marker-active');
        }

        return this;
    },

    closePopup: function () {
        if (this._popup) {
            this._popup._close();
        }
        // Unmark icon as active
        L.DomUtil.removeClass(this._icon, 'leaflet-marker-active');

        return this;
    },

    bindPopup: function (content, options) {
        var anchor = L.point(this.options.icon.options.popupAnchor) || new L.Point(0, 0);

        anchor = anchor.add(L.Popup.prototype.options.offset);

        if (options && options.offset) {
            anchor = anchor.add(options.offset);
        }

        options = L.extend({offset: anchor}, options);

        if (!this._popup) {
            this
                .on('click', this.openPopup, this)
                .on('remove', this.closePopup, this)
                .on('move', this._movePopup, this);
        }

        if (content instanceof L.Popup) {
            L.setOptions(content, options);
            this._popup = content;
        } else {
            this._popup = new L.Popup(options, this)
                .setContent(content);
        }

        this._popup._markerIcon = this._icon;

        return this;
    }
});
