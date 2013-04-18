/**
 * L.DG.DivIcon is a lightweight HTML-based icon class (as opposed to the image-based L.Icon)
 *
 * Version 1.0.0
 * Copyright (c) 2013, 2GIS, Dima Rudenko
 */

L.DG = L.DG || {};
L.DG.DivIcon = L.Icon.extend({
    options: {
        iconSize: [16, 24],
        popupAnchor: [40, 16],
        html: '<div class="dg-marker dg-marker_default dg-marker_animated"></div>',
        className: 'leaflet-div-icon'
    },

    createIcon: function () {
        var div = this._div = document.createElement('div'),
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
                .on(div, 'mouseover', this.markerMousoverHandler, this)
                .on(div, 'mouseout', this.markerMousoutHandler, this)
                .on(div, 'mousedown', this.markerMousedownHandler, this)
                .on(div, 'mouseup', this.markerMouseupHandler, this);
        }

        this._setIconStyles(div, 'icon');
        return div;
    },

    createShadow: function () {
        return null;
    },

    markerMousoverHandler: function (event) {
        clearTimeout(this.markerAnimationTimeout);
        L.DomUtil.addClass(this.divMarker, 'dg-marker_mouseover');
    },

    markerMousoutHandler: function (event) {
        var _this = this;

        this.markerAnimationTimeout = setTimeout(function () {
            L.DomUtil.removeClass(_this.divMarker, 'dg-marker_mouseover');
            L.DomUtil.removeClass(_this.divMarker, 'dg-marker_mousedown');
        }, 100);
    },

    markerMousedownHandler: function (event) {
        L.DomUtil.addClass(this.divMarker, 'dg-marker_mousedown');
    },

    markerMouseupHandler: function (event, context) {
        L.DomUtil.removeClass(this.divMarker, 'dg-marker_mousedown');
    }
});


L.DG.divIcon = function (options) {
    return new L.DG.DivIcon(options);
};

