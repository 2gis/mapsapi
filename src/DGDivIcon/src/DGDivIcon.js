/**
 * L.DG.DivIcon is a lightweight HTML-based icon class (as opposed to the image-based L.Icon)
 *
 * Version 1.0.0
 * Copyright (c) 2013, 2GIS, Dima Rudenko
 */

L.DG = L.DG || {};
L.DG.DivIcon = L.Icon.extend({
    options: { // @todo get it from theme paramethers
        iconSize: [16, 24],
        popupAnchor: [40, 16],
        html: '<div class="dg-marker dg-marker_default dg-marker_animated"></div>',
        className: 'leaflet-div-icon',
        iconAnchor: [7, 23]
    },

    createIcon: function () {
        var div = document.createElement('div'),
            options = this.options;

        if (options.html) {
            div.innerHTML = options.html;
        }

        if (options.bgPos) {
            div.style.backgroundPosition =
                (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
        }

        this.divMarker = div.firstChild;


        if (L.DG.configTheme.markersData.animation) {
            L.DomEvent
                .on(div, 'mouseover', this.markerMousoverHandler)
                .on(div, 'mouseout', this.markerMousoutHandler)
                .on(div, 'mousedown', this.markerMousedownHandler)
                .on(div, 'mouseup', this.markerMouseupHandler);
        }

        this._setIconStyles(div, 'icon');
        return div;
    },

    createShadow: function () {
        return null;
    },

    markerMousoverHandler: function () {
        clearTimeout(this._markerAnimationTimeout);
        L.DomUtil.addClass(this.firstChild, 'dg-marker_mouseover');
    },

    markerMousoutHandler: function () {
        var _this = this;

        this._markerAnimationTimeout = setTimeout(function () {
            L.DomUtil.removeClass(_this.firstChild, 'dg-marker_mouseover');
            L.DomUtil.removeClass(_this.firstChild, 'dg-marker_mousedown');
        }, 100);
    },

    markerMousedownHandler: function () {
        L.DomUtil.addClass(this.firstChild, 'dg-marker_mousedown');
    },

    markerMouseupHandler: function () {
        L.DomUtil.removeClass(this.firstChild, 'dg-marker_mousedown');
    }
});


L.DG.divIcon = function (options) {
    return new L.DG.DivIcon(options);
};

