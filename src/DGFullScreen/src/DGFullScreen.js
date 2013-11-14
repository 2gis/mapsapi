L.DG.FullScreen = L.DG.Control.extend({

    options: {
        position: L.DG.configTheme ? L.DG.configTheme.controls.fullScreen.position : 'topright',
        iconClass: 'fullscreen'
    },

    _isLegacy: false,

    _initialMapParams: {
        zIndex: null,
        position: null,
        left: null,
        top: null,
        border: null,
        marginTop: null,
        marginRight: null,
        marginBottom: null,
        marginLeft: null,
        paddingTop: null,
        paddingRight: null,
        paddingBottom: null,
        paddingLeft: null,
        previousSibling: null,
        width: null,
        height: null
    },

    _initialDocumentParams: {
        marginTop: null,
        marginRight: null,
        marginBottom: null,
        marginLeft: null,
        paddingTop: null,
        paddingRight: null,
        paddingBottom: null,
        paddingLeft: null,
        overflow: null,
        scrollTop: null
    },

    _initialDocumentElementParams: {
        scrollTop: null
    },

    initialize: function (options) {
        L.Util.setOptions(this, options);
        if (!fullScreenApi.supportsFullScreen) {
            this._isLegacy = true;
        }
        this.on('enable', this._enterFullScreen);
        this.on('disable', this._exitFullScreen);
        this.on('update', this._updateState);
    },

    _updateState: function () {
        this._renderTranslation();
        this._map.invalidateSize();
    },

    _renderTranslation: function () {
        if (this._active) {
            this._link.title = this.t('title_min');
        } else {
            this._link.title = this.t('title_max');
        }
    },

    _storePosition: function (container) { // (HTMLDivElement)

        // store initial map container params
        this._initialMapParams.zIndex = container.style.zIndex;
        this._initialMapParams.position = container.style.position;
        this._initialMapParams.left = container.style.left;
        this._initialMapParams.top = container.style.top;
        this._initialMapParams.border = container.style.border;
        this._initialMapParams.marginTop = container.style.marginTop;
        this._initialMapParams.marginRight = container.style.marginRight;
        this._initialMapParams.marginBottom = container.style.marginBottom;
        this._initialMapParams.marginLeft = container.style.marginLeft;
        this._initialMapParams.paddingTop = container.style.paddingTop;
        this._initialMapParams.paddingRight = container.style.paddingRight;
        this._initialMapParams.paddingBottom = container.style.paddingBottom;
        this._initialMapParams.paddingLeft = container.style.paddingLeft;
        this._initialMapParams.previousSibling = container.previousSibling;
        this._initialMapParams.width = container.style.width;
        this._initialMapParams.height = container.style.height;

        // store initial document.body params
        this._initialDocumentParams.marginTop = document.body.style.marginTop;
        this._initialDocumentParams.marginRight = document.body.style.marginRight;
        this._initialDocumentParams.marginBottom = document.body.style.marginBottom;
        this._initialDocumentParams.marginLeft = document.body.style.marginLeft;
        this._initialDocumentParams.paddingTop = document.body.style.paddingTop;
        this._initialDocumentParams.paddingRight = document.body.style.paddingRight;
        this._initialDocumentParams.paddingBottom = document.body.style.paddingBottom;
        this._initialDocumentParams.paddingLeft = document.body.style.paddingLeft;
        this._initialDocumentParams.overflow = document.body.style.overflow;
        this._initialDocumentParams.scrollTop = document.body.scrollTop;

        // store initial document.documentElement params
        this._initialDocumentElementParams.scrollTop = document.documentElement.scrollTop;
    },

    _restorePosition: function (container) { // (HTMLDivElement)

        // restore map container params
        container.style.position = this._initialMapParams.position;
        container.style.zIndex = this._initialMapParams.zIndex;
        container.style.left = this._initialMapParams.left;
        container.style.top = this._initialMapParams.top;
        container.style.border = this._initialMapParams.border;
        container.style.marginTop = this._initialMapParams.marginTop;
        container.style.marginRight = this._initialMapParams.marginRight;
        container.style.marginBottom = this._initialMapParams.marginBottom;
        container.style.marginLeft = this._initialMapParams.marginLeft;
        container.style.paddingTop = this._initialMapParams.paddingTop;
        container.style.paddingRight = this._initialMapParams.paddingRight;
        container.style.paddingBottom = this._initialMapParams.paddingBottom;
        container.style.paddingLeft = this._initialMapParams.paddingLeft;
        container.style.width = this._initialMapParams.width;
        container.style.height = this._initialMapParams.height;

        // restore document.body params
        document.body.style.overflow = this._initialDocumentParams.overflow;
        document.body.style.marginTop = this._initialDocumentParams.marginTop;
        document.body.style.marginRight = this._initialDocumentParams.marginRight;
        document.body.style.marginBottom = this._initialDocumentParams.marginBottom;
        document.body.style.marginLeft = this._initialDocumentParams.marginLeft;
        document.body.style.paddingTop = this._initialDocumentParams.paddingTop;
        document.body.style.paddingRight = this._initialDocumentParams.paddingRight;
        document.body.style.paddingBottom = this._initialDocumentParams.paddingBottom;
        document.body.style.paddingLeft = this._initialDocumentParams.paddingLeft;
        document.body.scrollTop = this._initialDocumentParams.scrollTop;

        // restore document.documentElement params
        document.documentElement.scrollTop = this._initialDocumentElementParams.scrollTop;
    },

    _enterFullScreen: function () {
        var container = this._map._container;

        if (!this._isLegacy) {
            fullScreenApi.requestFullScreen(container);
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
        }

        L.DomEvent.addListener(document, 'keyup', this._onKeyUp, this);

        this._map.fire('dgEnterFullScreen');
    },

    _exitFullScreen: function () {
        var container = this._map._container;

        if (!this._isLegacy) {
            fullScreenApi.cancelFullScreen();
        } else {
            this._restorePosition(container);
        }

        L.DomEvent.removeListener(document, 'keyup', this._onKeyUp);

        this._map.fire('dgExitFullScreen');
    },

    _onKeyUp: function (e) { // (Object)
        if (!e) {
            e = window.event;
        }
        if (e.keyCode === 27 && this._active === true) {
            this._exitFullScreen();
        }
    }
});

L.DG.fullscreen = function (options) {
    return new L.DG.FullScreen(options);
};

L.Map.mergeOptions({
    fullScreenControl: true
});

L.Map.addInitHook(function () {
    if (this.options.fullScreenControl) {
        this.fullScreenControl = L.DG.fullscreen();
        this.addControl(this.fullScreenControl);
    }
});

/*
  Native FullScreen JavaScript API
  -------------
  source : http://johndyer.name/native-fullscreen-javascript-api-plus-jquery-plugin/
*/

(function () {
    var fullScreenApi = {
            supportsFullScreen: false,
            isFullScreen: function () { return false; },
            requestFullScreen: function () {},
            cancelFullScreen: function () {},
            fullScreenEventName: '',
            prefix: ''
        },
    browserPrefixes = 'webkit moz o ms khtml'.split(' '),
    ua = navigator.userAgent.toLowerCase();

    // check for native support exclude safari
    if (typeof document.exitFullscreen !== 'undefined') {
        fullScreenApi.supportsFullScreen = true;
    } else {

        // check for fullscreen support by vendor prefix
        for (var i = 0, il = browserPrefixes.length; i < il; i++) {
            fullScreenApi.prefix = browserPrefixes[i];

            if ((typeof document[fullScreenApi.prefix + 'CancelFullScreen'] !== 'undefined') &&
                !(ua.indexOf('safari') !== -1 && ua.indexOf('chrome')  === -1)) {
                fullScreenApi.supportsFullScreen = true;
                break;
            }
        }
    }

    // update methods to do something useful
    if (fullScreenApi.supportsFullScreen) {
        fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';

        fullScreenApi.isFullScreen = function () {
            switch (this.prefix) {
            case '':
                return document.fullScreen;
            case 'webkit':
                return document.webkitIsFullScreen;
            default:
                return document[this.prefix + 'FullScreen'];
            }
        };
        fullScreenApi.requestFullScreen = function (el) {
            return (this.prefix === '') ? el.requestFullscreen() : el[this.prefix + 'RequestFullScreen']();
        };
        fullScreenApi.cancelFullScreen = function () {
            return (this.prefix === '') ? document.exitFullscreen() : document[this.prefix + 'CancelFullScreen']();
        };
    }

    // export api
    window.fullScreenApi = fullScreenApi;
})();