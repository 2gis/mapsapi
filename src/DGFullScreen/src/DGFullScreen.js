
/* global fullScreenApi */

DG.Control.Fullscreen = DG.RoundControl.extend({

    statics: {
        Dictionary: {}
    },

    options: {
        position: DG.Browser.touch ? 'bottomright' : 'topright',
        iconClass: 'fullscreen'
    },

    _isLegacy: (DG.screenfull && !(DG.Browser.android && DG.Browser.ff) && !DG.Browser.safari51) ? false : true,

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

        this._isFullscreen = true;
        this.setState('active');

        if (!this._isLegacy) {
            DG.screenfull.request(container);
            DG.DomEvent.on(document, DG.screenfull.raw.fullscreenchange, this._onFullScreenStateChange, this);
        } else {
            this._storePosition(container);
            // set full map mode style
            container.style.position = 'fixed';
            container.style.margin = '0px';
            container.style.padding = '0px';
            container.style.border = 'medium none';
            container.style.left = '0px';
            container.style.top = '0px';

            document.body.style.overflow = 'hidden';

            container.style.width = '100%';
            container.style.height = '100%';
            container.style.zIndex = '9999';

            // reset document.documentElement params
            document.documentElement.scrollTop = '0px';

            // reset document.body params
            document.body.scrollTop = '0px';
            document.body.style.margin = '0px';
            document.body.style.padding = '0px';
            DG.DomEvent.on(document, 'keyup', this._onKeyUp, this);
        }

        this._map.fire('requestfullscreen');
    },

    _exitFullScreen: function () {
        var container = this._map._container;

        this._isFullscreen = false;
        this.setState();

        if (!this._isLegacy) {
            DG.screenfull.exit();
            DG.DomEvent.off(document, DG.screenfull.raw.fullscreenchange, this._onFullScreenStateChange, this);
        } else {
            this._restorePosition(container);
            DG.DomEvent.off(document, 'keyup', this._onKeyUp);
        }


        this._map.fire('cancelfullscreen');
    },

    _onKeyUp: function (e) { // (Object)
        if (!e) {
            e = window.event;
        }
        if (e.keyCode === 27) {
            this._exitFullScreen();
        }
    },

    _onFullScreenStateChange: function () {
        if (!DG.screenfull.isFullscreen) { this._exitFullScreen(); }
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
