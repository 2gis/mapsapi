L.DG = L.DG || {};

L.DG.DivIcon = L.Icon.extend({
    options: {},

    createIcon: function () {
        var div = document.createElement('div'),
            options = L.Util.extend(this.options, L.DG.configTheme.markersData);

        if (options.html) {
            div.innerHTML = options.html;
        }

        if (options.bgPos) {
            div.style.backgroundPosition =
                (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
        }

        this.divMarker = div.firstChild;


        if (options.animation) {
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
