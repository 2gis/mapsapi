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
        graf = baron.noConflict();

    L.Popup.prototype.options.offset = L.point(offsetX, offsetY);

    L.Popup.prototype.setContent = function (content) {
        this._structureAdded = false;
        return originalSetContent.call(this, content);
    };

    L.Popup.prototype._updateStructure = function () {
        this._content = '<div class="container">' + this._content + '</div>';
        this._structureAdded = true;
    };

    L.Popup.prototype._updateBaronStructure = function () {
        this._content = '<div class="scroller"><div class="container">' + this._originalContent + '</div><div class="scroller__bar-wrapper"><div class="scroller__bar"></div></div></div>';
        this._structureBaronAdded = true;
    };

    L.Popup.prototype._update = function () {
        if (!this._map) { return; }
        var shouldInitBaron;

        this._container.style.visibility = 'hidden';

        if (this._isStructureAdded(false)) {
            this._originalContent =  this._content;
            this._updateStructure();
        }

        this._updateContent();
        this._updateLayout();
        this._updatePosition();

        shouldInitBaron = this._shouldInitBaron();

        if (shouldInitBaron) {
             if (this._isStructureAdded(true)) {
                this._updateBaronStructure();
                this._updateContent();
            }
            this._initBaron();
        }

        this._container.style.visibility = '';

        this._adjustPan();
    };

    L.Popup.prototype._isStructureAdded = function (baron) {
        return ( baron? !(!!this._structureBaronAdded) : !(!!this._structureAdded) );
    };

    L.Popup.prototype._shouldInitBaron = function () {
        var popupHeight = this._contentNode.offsetHeight,
            maxHeight = this.options.maxHeight;

            return (maxHeight && maxHeight <= popupHeight);
    };

    L.Popup.prototype._initBaron = function () {
        var self = this;
        graf({
            scroller: '.scroller',
            bar: '.scroller__bar',
            $: function(selector, context) {
              return bonzo(qwery(selector, context));
            },
            event: function(elem, event, func, mode) {
              if (mode == 'trigger') {
                mode = 'fire';
                console.log(event);
              }
              bean[mode || 'on'](elem, event, func);
              //self._map[mode || 'on'](event, func);
            }
        }).fix({
            elements: '.header__title',
            outside: 'header__title_state_fixed',
            before: 'header__title_position_top',
            after: 'header__title_position_bottom',
            radius: 10
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

        if (popup._source && popup._source._icon) {
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
            if (popup._source && popup._source._icon) {
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
