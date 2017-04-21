if (!DG.screenfull.api ||
    //fallback since srange android ff bug with fullscreen mode
    (DG.Browser.android && DG.Browser.gecko) ||
    //fallback for safari5.1 because of error on fullscreen exit
    DG.Browser.safari51) {

    DG.Screenfull.include({
        _fullscreenClass: 'DGFullScreen_legacy-mode',
        _fullscreenBodyClass: this._fullscreenClass + '-body',
        _api: function() {
            return {fullscreenchange: 'keyup'};
        },

        _mapParams: [
            'zIndex', 'position', 'left', 'top', 'border', 'marginTop', 'marginRight',
            'marginBottom', 'marginLeft', 'paddingTop', 'paddingRight', 'paddingBottom',
            'paddingLeft', 'previousSibling', 'width', 'height'
        ],

        _documentParams: [
            'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'paddingTop',
            'paddingRight', 'paddingBottom', 'paddingLeft', 'overflow', 'scrollTop'
        ],
        _initialDocumentParams: {},
        _initialMapParams: {},
        _initialDocumentElementParams: {},

        exit: function(container) { // (HTMLDivElement)

            DG.DomUtil.removeClass(container, this._fullscreenClass);
            DG.DomUtil.removeClass(document.body, this._fullscreenBodyClass);

            // restore map container params
            this._mapParams.forEach(function(cssRule) {
                container.style[cssRule] = this._initialMapParams[cssRule];
            }, this);

            // restore map container params
            this._documentParams.forEach(function(cssRule) {
                document.body.style[cssRule] = this._initialDocumentParams[cssRule];
            }, this);

            // restore document.documentElement params
            document.documentElement.scrollTop = this._initialDocumentElementParams.scrollTop;
        },

        request: function(container) { // (HTMLDivElement)
            this._storePosition(container);
            // set full map mode style
            DG.DomUtil.addClass(container, this._fullscreenClass);
            DG.DomUtil.addClass(document.body, this._fullscreenBodyClass);

            // reset document.documentElement params
            document.documentElement.scrollTop = '0px';
        },

        _storePosition: function(container) { // (HTMLDivElement)

            // store initial map container params
            this._mapParams.forEach(function(cssRule) {
                this._initialMapParams[cssRule] = container.style[cssRule];
            }, this);

            // store initial document.body params
            this._documentParams.forEach(function(cssRule) {
                this._initialDocumentParams[cssRule] = document.body.style[cssRule];
            }, this);

            // store initial document.documentElement params
            this._initialDocumentElementParams.scrollTop = document.documentElement.scrollTop;
        },

        _onFullScreenStateChange: function(e) { // (Object)
            if (!e) {
                e = window.event;
            }
            if (e.keyCode === 27) {
                this._exitFullScreen();
            }
        }
    });

    DG.screenfull = new DG.Screenfull();
}
