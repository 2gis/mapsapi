DG.Control.Fullscreen = DG.RoundControl.extend({

    statics: {
        Dictionary: {}
    },

    options: {
        position: DG.Browser.touch ? 'bottomright' : 'topright',
        iconClass: 'fullscreen'
    },

    initialize: function (options) {
        DG.Util.setOptions(this, options);
        this._isFullscreen = false;
        this.on('click', this.toggleFullscreen);
    },

    toggleFullscreen: function () {
        if (!this._isFullscreen) {
            this._enterFullScreen();
        } else {
            this._exitFullScreen();
        }

        this._renderTranslation();
        this._map.invalidateSize();
    },

    _renderTranslation: function () {
        if (this._isFullscreen) {
            this._link.title = this.t('title_min');
        } else {
            this._link.title = this.t('title_max');
        }
    },

    _enterFullScreen: function () {
        var container = this._map._container;

        this._setControlState(true);

        DG.screenfull.request(container);
        DG.DomEvent.on(document, DG.screenfull.raw.fullscreenchange, this._onFullScreenStateChange, this);

        this._map.fire('requestfullscreen');
    },

    _exitFullScreen: function () {
        var container = this._map._container;

        this._setControlState(false);

        DG.screenfull.exit(container);
        DG.DomEvent.off(document, DG.screenfull.raw.fullscreenchange, this._onFullScreenStateChange, this);

        this._map.fire('cancelfullscreen');
    },

    _onFullScreenStateChange: function () {
        (!DG.screenfull.isFullscreen()) && this._exitFullScreen();
    },

    _setControlState: function (isEnabled) {
        this._isFullscreen = isEnabled;
        this.setState(isEnabled ? 'active' : '');
    }
});

DG.control.fullscreen = function (options) {
    return new DG.Control.Fullscreen(options);
};

DG.Map.mergeOptions({
    fullscreenControl: true
});

DG.Map.addInitHook(function () {
    if (this.options.fullscreenControl) {
        this.fullscreenControl = DG.control.fullscreen(this.options.fullscreenControl);
        this.addControl(this.fullscreenControl);
    }
});
