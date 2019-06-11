DG.Map.mergeOptions({
    geoclicker: false
});

DG.Geoclicker = DG.Handler.extend({
    clickCount: 0,
    pendingClick: 0,
    timeout: 250, // should be equal to 'delay' value in DoubleTap event

    initialize: function(map, options) { // (Object)
        this._map = map;
        this._controller = new DG.Geoclicker.Controller(map, options);
    },

    addHooks: function() {
        this._toggleEvents(true);

        // Monitor geoclicker usage statistics
        // TODO: remove after successful research
        if (typeof ga !== undefined) {
            // eslint-disable-next-line no-undef
            ga(DG.config.gaName + '.send', 'event', 'Geoclicker', 'Enable');
        }

        this._map
            .on('rulerstart', this._pause, this)
            .on('rulerend', this._unpause, this);
    },

    removeHooks: function() {
        this._toggleEvents();

        this._map
            .off('rulerstart', this._pause, this)
            .off('rulerend', this._unpause, this);
    },

    _checkOpenPopup: function() {
        if (DG.Browser.mobile && this._map._popup &&
            (this._map._popup.options.closeOnClick ||
            this._map.options.closePopupOnClick)) {
            this.popupWasOpen = true;
        }
    },

    _pause: function() {
        this._toggleEvents();
    },

    _unpause: function() {
        // Reenable event handling only in case geoclicker is enabled
        if (this.enabled()) {
            this._toggleEvents(true);
        }
    },

    _toggleEvents: function(flag) {
        this._map[flag ? 'on' : 'off'](this._mapEventsListeners, this);
        if (this._map.poi) {
            this._map.poi.getMetaLayer()[flag ? 'on' : 'off']('click', this._onMetaClick, this);
        }
    },

    getController: function() {
        return this._controller;
    },

    _onMetaClick: function(e) {
        this.clickCount = 0;
        clearTimeout(this.pendingClick);
        this.popupWasOpen = false;

        this._mapEventsListeners.click.call(this, e);
    },

    _mapEventsListeners: {
        langchange: function() {
            this._controller.reinvokeHandler();
        },

        popupclose: function(e) { // (Object)
            this._controller.handlePopupClose(e.popup);
        },

        click: function(e) { // (Object)
            if (this.clickCount === 0) {
                this.clickCount = 1;
                this._singleClick(e);
            } else {
                this.clickCount = 0;
                clearTimeout(this.pendingClick);
                this.popupWasOpen = false;
            }
        },

        dblclick: function() {
            if (DG.Browser.ielt9) {
                this.clickCount = 0;
                this.popupWasOpen = false;
                clearTimeout(this.pendingClick);
            }
        }
    },

    _singleClick: function(e) { // (Object)
        var self = this;

        clearTimeout(this.pendingClick);

        this.pendingClick = setTimeout(function() {
            if (e.meta) {
                self._checkOpenPopup();
                self._map.closePopup();
            }

            //  DGPopup's '_close' method is the only place where .popupWasOpen is modified
            //  It signals geoclicker that popup was open before user do a 'click' on map
            //  Multistage behavior is needed as this processing occurs after popup was already closed
            if (!self.popupWasOpen) {
                var zoom = self._map.getZoom();
                self._controller.handleClick(e.latlng, zoom, e.meta);
            }

            self.clickCount = 0;
            self.popupWasOpen = false;
        }, this.timeout);
    }
});

DG.Map.addInitHook('addHandler', 'geoclicker', DG.Geoclicker);
