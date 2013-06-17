// Sets default zoom position from current theme

L.Control.Zoom.prototype.options = {
    position: L.DG.configTheme.controls.zoom.position
};

// TODO: think about pull request to leaflet with zoom control button's titles as options

L.Control.Zoom.prototype.onAdd = function (map) {
    var zoomName = 'dg-zoom',
        container = L.DomUtil.create('div', zoomName);

    this._map = map;

    this._zoomInButton = this._createButton('+', 'Приблизить', zoomName + '__in', container, this._zoomIn, this);
    this._zoomOutButton = this._createButton('-', 'Отдалить', zoomName + '__out', container, this._zoomOut, this);

    map.on('zoomend zoomlevelschange', this._updateDisabled, this);

    return container;
};

// Adds 2GIS-related popup content wrapper and offset

(function () {
    var offsetX = L.DG.configTheme.balloonOptions.offset.x,
        offsetY = L.DG.configTheme.balloonOptions.offset.y,
        originalSetContent = L.Popup.prototype.setContent,
        originalUpdateLayout = L.Popup.prototype._updateLayout;
        //bar = baron.noConflict();

    L.Popup.prototype.options.offset = L.point(offsetX, offsetY);

    L.Popup.prototype.setContent = function (content) {
        content = '<div class="scroller"><div class="container">' + content + '<div class="scroller__bar-wrapper"><div class="scroller__bar"></div></div></div></div>';
        return originalSetContent.call(this, content);
    };

    L.Popup.prototype._updateLayout = function () {
        var dgCallout = this._contentNode.children[0],
            dgScroller = dgCallout.children[0];

        originalUpdateLayout.call(this, content);
        
        // example: http://jsbin.com/iloheg/7/edit
        baron({
            scroller: '.scroller',
            bar: '.scroller__bar',
            barOnCls: 'baron',
            $: function(selector, context) {
              return bonzo(qwery(selector, context));
            },
            event: function(elem, event, func, mode) {
              if (mode == 'trigger') {
                mode = 'fire';
              }
              bean[mode || 'on'](elem, event, func);
            }      
        });
    };

}());

L.Popup.include({

    _close: function () {
        if (this._map) {
            this._map.closePopup(this);
        }
    }

});

L.Map.include({
    openPopup: function (popup, latlng, options) { // (Popup) or (String || HTMLElement, LatLng[, Object])
        this.closePopup();

        if (!(popup instanceof L.Popup)) {
            var content = popup;

            popup = new L.Popup(options)
                .setLatLng(latlng)
                .setContent(content);
        }
        this._popup = popup;

        if (popup._source._icon) {
            L.DomUtil.addClass(popup._source._icon, 'leaflet-marker-active');
        }

        return this
                .addLayer(popup)
                .fire('popupopen', {'popup': popup});
    },

    closePopup: function (popup) {
        if (!popup || popup === this._popup) {
            popup = this._popup;
            this._popup = null;
        }
        if (popup) {
            if (popup._source._icon) {
                L.DomUtil.removeClass(popup._source._icon, 'leaflet-marker-active');
            }

            this
                .removeLayer(popup)
                .fire('popupclose', {'popup': popup});
        }
        return this;
    }
});

// Applies 2GIS divIcon to marker

L.Marker.prototype.options.icon = L.DG.divIcon();
