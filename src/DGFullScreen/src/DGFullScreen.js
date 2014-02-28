DG.Control.Fullscreen = DG.RoundControl.extend({

    statics: {
        Dictionary: {}
    },

    options: {
        position: DG.Browser.touch ? 'bottomright' : 'topright',
        iconClass: 'fullscreen'
    },

    _isLegacy: (DG.screenfull &&
                //fallback since srange android ff bug with fullscreen mode
                !(DG.Browser.android && DG.Browser.ff) &&
                //fallback for safari5.1 because of error on fullscreen exit
                !DG.Browser.safari51) ? false : true,

    initialize: function (options) {
        console.log(DG.screenfull._api());
        DG.Util.setOptions(this, options);
        this._isFullscreen = false;
        //this.on('click', this.toggleFullscreen);
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

        if (!this._isLegacy) {
            DG.screenfull.request(container);
            DG.DomEvent.on(document, DG.screenfull.raw.fullscreenchange, this._onFullScreenStateChange, this);
        } else {
            this._legacyRequest(container);
            DG.DomEvent.on(document, 'keyup', this._onKeyUp, this);
        }

        this._map.fire('requestfullscreen');
    },

    _exitFullScreen: function () {
        var container = this._map._container;

        this._setControlState(false);

        if (!this._isLegacy) {
            DG.screenfull.exit();
            DG.DomEvent.off(document, DG.screenfull.raw.fullscreenchange, this._onFullScreenStateChange, this);
        } else {
            this._restorePosition(container);
            DG.DomEvent.off(document, 'keyup', this._onKeyUp);
        }

        this._map.fire('cancelfullscreen');
    },

    _onFullScreenStateChange: function () {
        this._setControlState(DG.screenfull.isFullscreen);
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
