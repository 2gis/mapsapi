DG.Control.Fullscreen = DG.RoundControl.extend({

    statics: {
        Dictionary: {}
    },

    options: {
        position: 'topright',
        iconClass: 'fullscreen'
    },

    initialize: function(options) {
        DG.Util.setOptions(this, options);
        this._isFullscreen = false;
        this.on('click', this._toggleFullscreen);
    },

    _toggleFullscreen: function() {
        if (!this._isFullscreen) {
            this._toggle(true, 'request', 'on', 'requestfullscreen');
        } else {
            this._toggle(false, 'exit', 'on', 'cancelfullscreen');
        }

        this._renderTranslation();
        this._map.invalidateSize();
    },

    _renderTranslation: function() {
        this._link.title = this.t(this._isFullscreen ? 'title_min' : 'title_max');
    },

    _toggle: function(isEnabled, method, list, event) {
        var container = this._map._container;

        this._isFullscreen = isEnabled;
        this.setState(isEnabled ? 'active' : '');

        DG.screenfull[method](container);
        DG.DomEvent[list](document, DG.screenfull.api.fullscreenchange, this._onFullScreenStateChange, this);
        this._map.fire(event);
    },

    _onFullScreenStateChange: function() {
        if (!DG.screenfull.isFullscreen()) {
            this._toggle(false, 'exit', 'on', 'cancelfullscreen');
        }
    }
});

DG.control.fullscreen = function(options) {
    return new DG.Control.Fullscreen(options);
};

DG.Map.mergeOptions({
    fullscreenControl: true
});

DG.Map.addInitHook(function() {
    if (this.options.fullscreenControl) {
        this.fullscreenControl = DG.control.fullscreen(this.options.fullscreenControl);

        if (DG.screenfull.isAvailable()) {
            this.addControl(this.fullscreenControl);
        }
    }
});
